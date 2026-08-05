"use client";
/* eslint-disable @next/next/no-img-element -- protected same-origin media endpoints cannot be optimized by Next/Image without exposing source keys. */
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Image as ImageIcon,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { StoryContent } from "@/content/schema";
import { countdownParts, getBirthdayState } from "@/lib/birthday-state";
import { matchesAnswer } from "@/lib/answer-normalization";

type SafeContent = Omit<StoryContent, "media"> & {
  media: Omit<StoryContent["media"][number], "privatePath">[];
};
type View =
  | "preflight"
  | "start"
  | "welcome"
  | "countdown"
  | "chapters"
  | "numbers"
  | "albums"
  | "videos"
  | "voice"
  | "voices"
  | "quiz"
  | "memories"
  | "reasons"
  | "dreams"
  | "letter"
  | "final-photo"
  | "final-note"
  | "cake"
  | "gift"
  | "ending"
  | "closing"
  | "secret";
const labels: Record<View, string> = {
  preflight: "Loading",
  start: "Start",
  welcome: "Welcome",
  countdown: "Birthday",
  chapters: "Our story",
  numbers: "Our numbers",
  albums: "Photos",
  videos: "Videos",
  voice: "Voice",
  voices: "Voices",
  quiz: "Quiz",
  memories: "Memories",
  reasons: "Reasons",
  dreams: "Dreams",
  letter: "Letter",
  "final-photo": "Always us",
  "final-note": "One last note",
  cake: "Cake",
  gift: "Gift",
  ending: "Ending",
  closing: "Always",
  secret: "A small secret",
};

export function StoryExperience({ content }: { content: SafeContent }) {
  const reduced = useReducedMotion();
  const sequence = useMemo<View[]>(
    () => [
      "voice",
      "welcome",
      "countdown",
      "chapters",
      "numbers",
      "albums",
      "videos",
      "voices",
      "quiz",
      ...(content.features.memoryJar ? ["memories" as const] : []),
      ...(content.features.reasons ? ["reasons" as const] : []),
      ...(content.features.dreams ? ["dreams" as const] : []),
      ...(content.features.cake ? ["cake" as const] : []),
      "letter",
      "gift",
      "final-photo",
      "final-note",
      "ending",
      "closing",
    ],
    [content.features],
  );
  const [view, setView] = useState<View>(() =>
    typeof window === "undefined"
      ? "voice"
      : (localStorage.getItem("for-u-sudd-progress") as View) || "voice",
  );
  const [chapter, setChapter] = useState(0);
  const [quiz, setQuiz] = useState(0);
  const [ambientEnabled, setAmbientEnabled] = useState(() => typeof window === "undefined" || localStorage.getItem("for-u-sudd-ambient") !== "false");
  const [ambientVolume, setAmbientVolume] = useState(() => typeof window === "undefined" ? 1 : Number(localStorage.getItem("for-u-sudd-ambient-volume") ?? 1));
  const [showMusicControls, setShowMusicControls] = useState(false);
  const [mediaId, setMediaId] = useState<string | null>(null);
  const [confetti, setConfetti] = useState(false);
  const [fireworks, setFireworks] = useState(false);
  const [floatingHeart, setFloatingHeart] = useState<number | null>(null);
  const [tapPulse, setTapPulse] = useState<{ x: number; y: number; id: number } | null>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const activeVoice = useRef<HTMLAudioElement | null>(null);
  const resumeAfterFocus = useRef(false);
  const mediaWarmed = useRef(false);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const fadeFrame = useRef<number | null>(null);
  const heartCount = useRef(0);
  const index = sequence.indexOf(view);
  useEffect(() => {
    localStorage.setItem("for-u-sudd-progress", view);
  }, [view]);
  useEffect(() => { localStorage.setItem("for-u-sudd-ambient", String(ambientEnabled)); }, [ambientEnabled]);
  useEffect(() => { localStorage.setItem("for-u-sudd-ambient-volume", String(ambientVolume)); }, [ambientVolume]);
  useEffect(() => {
    if (reduced) return;
    const launch = () => {
      heartCount.current += 1;
      setFloatingHeart(heartCount.current);
      window.setTimeout(() => setFloatingHeart(null), 5000);
    };
    const timer = window.setInterval(launch, 18000);
    return () => window.clearInterval(timer);
  }, [reduced]);
  useEffect(() => {
    if (view === "preflight" || mediaWarmed.current) return;
    mediaWarmed.current = true;
    const timer = window.setTimeout(() => {
      content.media.filter((item) => item.kind === "image").forEach((item) => {
        const image = new Image();
        image.decoding = "async";
        image.src = `/api/media/${item.id}`;
      });
    }, 250);
    return () => window.clearTimeout(timer);
  }, [content.media, view]);
  const fadeAmbient = useCallback((target: number, duration = 1000, after?: () => void) => {
    const player = audio.current;
    if (!player) return;
    if (fadeFrame.current) cancelAnimationFrame(fadeFrame.current);
    const from = player.volume;
    const started = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / duration);
      const eased = progress * progress * (3 - 2 * progress);
      player.volume = from + (target - from) * eased;
      if (progress < 1) fadeFrame.current = requestAnimationFrame(tick);
      else { fadeFrame.current = null; after?.(); }
    };
    fadeFrame.current = requestAnimationFrame(tick);
  }, []);
  const playAmbient = useCallback(() => {
    const player = audio.current;
    if (!player) return;
    player.volume = ambientVolume;
    void player.play().catch(() => undefined);
  }, [ambientVolume]);
  useEffect(() => { if (ambientEnabled && content.musicMediaId) playAmbient(); }, [ambientEnabled, content.musicMediaId, playAmbient]);
  useEffect(() => {
    const pauseForInterruption = () => {
      const player = audio.current;
      resumeAfterFocus.current = Boolean(player && ambientEnabled && !player.paused);
      player?.pause();
    };
    const resumeAfterInterruption = () => {
      const player = audio.current;
      if (resumeAfterFocus.current && ambientEnabled && player)
        void player.play().catch(() => setMuted(true));
      resumeAfterFocus.current = false;
    };
    const visibility = () =>
      document.hidden ? pauseForInterruption() : resumeAfterInterruption();
    addEventListener("blur", pauseForInterruption);
    addEventListener("focus", resumeAfterInterruption);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      removeEventListener("blur", pauseForInterruption);
      removeEventListener("focus", resumeAfterInterruption);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [ambientEnabled]);
  function go(next: View) {
    setView(next);
    window.history.pushState({ story: next }, "", `#${next}`);
  }
  function next() {
    if (view === "chapters" && chapter < content.chapters.length - 1) {
      setChapter((value) => value + 1);
      return;
    }
    const nextView = sequence[index + 1];
    if (nextView) go(nextView);
  }
  function previous() {
    if (view === "chapters" && chapter > 0) {
      setChapter((value) => value - 1);
      return;
    }
    const previousView = sequence[index - 1];
    if (previousView) go(previousView);
  }
  function handleSwipeEnd(event: React.PointerEvent<HTMLElement>) {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start || view === "quiz" || view === "preflight" || view === "closing") return;
    const x = event.clientX - start.x;
    const y = event.clientY - start.y;
    if (Math.abs(x) < 56 || Math.abs(x) < Math.abs(y) * 1.4) return;
    if (x < 0) next(); else previous();
  }
  useEffect(() => {
    const onPop = () => {
      const target = window.location.hash.slice(1) as View;
      if (sequence.includes(target)) setView(target);
    };
    addEventListener("popstate", onPop);
    return () => removeEventListener("popstate", onPop);
  }, [sequence]);
  const active = content.media.find((item) => item.id === mediaId);
  const musicSrc = content.musicMediaId
    ? `/api/media/${content.musicMediaId}`
    : undefined;
  const showAmbient = !reduced && ["start", "welcome", "countdown", "gift", "ending"].includes(view);
  const duckAmbient = useCallback(() => { if (ambientEnabled && !audio.current?.paused) fadeAmbient(ambientVolume * 0.25, 900); }, [ambientEnabled, ambientVolume, fadeAmbient]);
  const restoreAmbient = useCallback(() => { if (ambientEnabled && !audio.current?.paused) fadeAmbient(ambientVolume, 1000); }, [ambientEnabled, ambientVolume, fadeAmbient]);
  const playVoice = useCallback((voice: HTMLAudioElement) => {
    if (activeVoice.current && activeVoice.current !== voice) activeVoice.current.pause();
    activeVoice.current = voice;
    duckAmbient();
    void voice.play();
  }, [duckAmbient]);
  const voiceEnded = useCallback((voice: HTMLAudioElement) => {
    if (activeVoice.current !== voice) return;
    activeVoice.current = null;
    restoreAmbient();
  }, [restoreAmbient]);
  useEffect(() => {
    if (view === "closing") fadeAmbient(0, 1800, () => audio.current?.pause());
  }, [fadeAmbient, view]);
  const burstConfetti = useCallback(() => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 2400);
  }, []);
  const burstFireworks = useCallback(() => {
    setFireworks(true);
    window.setTimeout(() => setFireworks(false), 3100);
  }, []);
  return (
    <main
      className="story-shell"
      onClickCapture={(event) => {
        if (!event.detail) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        setTapPulse({ x: event.clientX - bounds.left, y: event.clientY - bounds.top, id: Date.now() });
      }}
      onPointerDown={(event) => { swipeStart.current = { x: event.clientX, y: event.clientY }; }}
      onPointerUp={handleSwipeEnd}
    >
      {showAmbient && (
        <div className="ambient-particles" aria-hidden="true">
          {Array.from({ length: 9 }, (_, index) => <i key={index} />)}
        </div>
      )}
      {tapPulse && <span key={tapPulse.id} className="tap-pulse" aria-hidden="true" style={{ left: tapPulse.x, top: tapPulse.y }} onAnimationEnd={() => setTapPulse(null)} />}
      {floatingHeart && <span className="floating-heart" key={floatingHeart} aria-hidden="true">♥</span>}
      <audio ref={audio} src={musicSrc} loop preload="metadata" />
      {confetti && (
        <div className="confetti" aria-hidden="true">
          {Array.from({ length: 26 }, (_, index) => (
            <i
              key={index}
              style={{
                left: `${(index * 31) % 100}%`,
                animationDelay: `${(index % 9) * 90}ms`,
              }}
            />
          ))}
        </div>
      )}
      {fireworks && <div className="fireworks" aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <i key={index} style={{ left: `${12 + index * 19}%`, animationDelay: `${index * 240}ms` }} />)}</div>}
      <header className="story-header">
        <span className="story-brand">
          for u, {content.participants.nickname.toLowerCase()}
        </span>
        <div className="story-progress" aria-label={`${labels[view]}, ${index + 1} of ${sequence.length}`}>
          {sequence.map((item, progressIndex) => <i key={item} className={progressIndex <= index ? "is-active" : ""} />)}
        </div>
        <button
          className="icon-button"
          aria-label={ambientEnabled ? "Pause ambient music" : "Play ambient music"}
          onClick={() => {
            if (ambientEnabled) audio.current?.pause(); else playAmbient();
            setAmbientEnabled((value) => !value);
          }}
        >
          {ambientEnabled ? <Volume2 /> : <VolumeX />}
        </button>
        <button className="music-settings" aria-label="Adjust ambient music volume" onClick={() => setShowMusicControls((value) => !value)}>♫</button>
        {showMusicControls && <label className="ambient-volume">Ambient volume<input type="range" min="0" max="1" step="0.05" value={ambientVolume} onChange={(event) => { const value = Number(event.target.value); setAmbientVolume(value); if (audio.current && ambientEnabled) audio.current.volume = value; }} /></label>}
      </header>
      <AnimatePresence mode="wait">
        <motion.section
          key={view + chapter + quiz}
          className="story-view"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: reduced ? 0.15 : 0.48 }}
        >
          {view === "preflight" && <Preflight onReady={() => go("start")} />}
          {view === "start" && <Start onBegin={() => { setAmbientEnabled(true); playAmbient(); go("welcome"); }} />}
          {view === "welcome" && <Welcome content={content} />}
          {view === "countdown" && <Countdown birthday={content.project.birthday} />}
          {view === "chapters" && (
            <Chapter
              chapter={content.chapters[chapter]}
              media={content.media.find(
                (item) => item.id === content.chapters[chapter].mediaId,
              )}
            />
          )}
          {view === "numbers" && <OurNumbers content={content} />}
          {view === "albums" && <Albums content={content} onOpen={setMediaId} />}
          {view === "videos" && <Videos content={content} />}
          {view === "voice" && (
            <Voice
              content={content}
              onPlayVoice={playVoice}
              onVoiceEnded={voiceEnded}
              onNext={next}
            />
          )}
          {view === "voices" && <Voices content={content} onPlayVoice={playVoice} onVoiceEnded={voiceEnded} />}
          {view === "quiz" && (
            <Quiz
              item={content.quiz[quiz]}
              final={quiz === content.quiz.length - 1}
              onCorrect={burstConfetti}
              onNext={() =>
                quiz < content.quiz.length - 1
                  ? setQuiz((value) => value + 1)
                  : next()
              }
            />
          )}
          {view === "memories" && (
            <Reveal title="A jar of little things" entries={content.memories} />
          )}
          {view === "reasons" && (
            <Reveal title="Reasons you are loved" entries={content.reasons} />
          )}
          {view === "dreams" && (
            <Reveal title="Someday, together" entries={content.dreams} />
          )}
          {view === "letter" && (
            <Letter content={content} onOpen={setMediaId} />
          )}
          {view === "final-note" && (
            <FinalNote content={content} onOpen={setMediaId} />
          )}
          {view === "final-photo" && <FinalPhoto content={content} />}
          {view === "cake" && <Cake onNext={next} />}
          {view === "gift" && (
            <Gift onOpen={burstConfetti} onNext={next} />
          )}
          {view === "ending" && (
            <Ending
              content={content}
              onFirework={burstFireworks}
              onSecret={() => go("secret")}
              onReplay={() => {
                localStorage.removeItem("for-u-sudd-progress");
                setChapter(0);
                setQuiz(0);
                go("welcome");
              }}
            />
          )}
          {view === "closing" && <Closing />}
          {view === "secret" && (
            <SecretAlbum
              content={content}
              onOpen={setMediaId}
              onExit={() => go("ending")}
            />
          )}
        </motion.section>
      </AnimatePresence>
      {view !== "quiz" && view !== "closing" && <p className="swipe-hint" aria-hidden="true">Swipe to wander through the memories</p>}
      <AnimatePresence>
        {active?.kind === "image" && (
          <MediaOverlay media={active} onClose={() => setMediaId(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}

function Preflight({ onReady }: { onReady: () => void }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="poster preflight">
      <Heart className="poster-heart" fill="currentColor" aria-hidden="true" />
      <p className="eyebrow">a little heartbeat</p>
      <h1>{ready ? "Every love story has a beginning." : ""}</h1>
      {ready && <p>Ours started with a single message.</p>}
      <button className="screen-tap" onClick={onReady} aria-label="Reveal the story" />
    </div>
  );
}
function Start({
  onBegin,
}: {
  onBegin: () => void;
}) {
  return (
    <div className="poster start">
      <Heart className="poster-heart" fill="currentColor" aria-hidden="true" />
      <p className="eyebrow">for u, {"sudd"}</p>
      <h1>
        For you,
        <br />
        <em>always.</em>
      </h1>
      <p>Touch anywhere when you are ready.</p>
      <button className="screen-tap" onClick={onBegin} aria-label="Begin the story" />
    </div>
  );
}
function Welcome({
  content,
}: {
  content: SafeContent;
}) {
  return (
    <div className="poster">
      <p className="eyebrow">08 · 08 · 2026</p>
      <h1>
        Happy Birthday,
        <br />
        <em>{content.participants.nickname}.</em>
      </h1>
      <p className="lede">{content.greeting}</p>
      <p className="swipe-copy">Swipe left to begin</p>
    </div>
  );
}
function Countdown({
  birthday,
}: {
  birthday: string;
}) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const state = getBirthdayState(birthday, now);
  const parts = countdownParts(birthday, now);
  return (
    <div className="poster countdown">
      <p className="eyebrow">the day is almost here</p>
      {state === "before" ? (
        <>
          <h1>
            Counting down
            <br />
            to <em>you.</em>
          </h1>
          <div
            className="time-grid"
            aria-label={`${parts.days} days, ${parts.hours} hours, ${parts.minutes} minutes and ${parts.seconds} seconds remaining`}
          >
            {Object.entries(parts).map(([key, value]) => (
              <div key={key}>
                <strong>{String(value).padStart(2, "0")}</strong>
                <span>{key}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1>
            It is your
            <br />
            <em>day.</em>
          </h1>
          <p>Let the celebration begin.</p>
        </>
      )}
      <p className="swipe-copy">Your next memory is one swipe away</p>
    </div>
  );
}
function Chapter({
  chapter,
  media,
}: {
  chapter: StoryContent["chapters"][number];
  media?: SafeContent["media"][number];
}) {
  return (
    <article className="chapter">
      <div className="chapter-image">
        {media && <MediaImage media={media} />}
      </div>
      <div>
        <p className="eyebrow">{chapter.date}</p>
        <h1>{chapter.title}</h1>
        <p className="lede">{chapter.body}</p>
      </div>
    </article>
  );
}
function OurNumbers({ content }: { content: SafeContent }) {
  const [days] = useState(() => Math.max(1, Math.floor((Date.now() - new Date("2025-12-19T00:00:00+05:30").getTime()) / 86400000)));
  const entries = [["♥", `${days} Days together`], ["✦", "18,342 Messages"], ["◌", `${content.chapters.length + content.albums.length} Memories here`], ["▷", `${content.videos.length} Videos`], ["∞", "1 Promise"], ["♥", "∞ Love"]];
  return <section className="our-numbers"><p className="eyebrow">the little things add up</p><h1>Our <em>numbers.</em></h1><div>{entries.map(([mark, label], index) => <p key={label} style={{ animationDelay: `${index * 90}ms` }}><b>{mark}</b>{label}</p>)}</div></section>;
}
function Albums({
  content,
  onOpen,
}: {
  content: SafeContent;
  onOpen: (id: string) => void;
}) {
  const photos = [...new Set(content.albums.flatMap((album) => album.mediaIds))]
    .map((id) => content.media.find((item) => item.id === id))
    .filter((item): item is SafeContent["media"][number] => Boolean(item));
  const moments = photos.flatMap((photo, index) => {
    const video = content.videos[Math.floor(index / 5)];
    const videoMedia = index % 5 === 4 && video ? content.media.find((item) => item.id === video.mediaId) : undefined;
    return videoMedia ? [photo, videoMedia] : [photo];
  });
  return (
    <section className="collection polaroid-stack">
      <p className="eyebrow">in no particular order</p>
      <h1>Little pieces of <em>us.</em></h1>
      <div className="photo-grid mixed-memories">
        {moments.map((media) => media.kind === "video" ? <video className="polaroid memory-video" key={media.id} src={`/api/media/${media.id}`} controls playsInline preload="metadata" /> : <button className="photo-button polaroid" onClick={() => onOpen(media.id)} key={media.id}><MediaImage media={media} /><span>{media.caption}</span></button>)}
      </div>
    </section>
  );
}
function Videos({ content }: { content: SafeContent }) {
  return (
    <section className="collection">
      <p className="eyebrow">press play</p>
      <h1>Little moving memories</h1>
      {content.videos.length ? (
        <div className="video-list">
          {content.videos.map((video) => {
            const media = content.media.find(
              (item) => item.id === video.mediaId,
            );
            const poster = media?.posterId
              ? content.media.find((item) => item.id === media.posterId)
              : undefined;
            return (
              media && (
                <article className="video-card" key={video.id}>
                  <video
                    src={`/api/media/${media.id}`}
                    controls
                    playsInline
                    preload="metadata"
                    poster={poster ? `/api/media/${poster.id}` : undefined}
                  />
                  <span>{video.title}</span>
                </article>
              )
            );
          })}
        </div>
      ) : (
        <Empty
          title="More is on its way"
          text="Approved video memories will appear here when they are ready."
        />
      )}
    </section>
  );
}
function Voice({
  content,
  onPlayVoice,
  onVoiceEnded,
  onNext,
}: {
  content: SafeContent;
  onPlayVoice: (voice: HTMLAudioElement) => void;
  onVoiceEnded: (voice: HTMLAudioElement) => void;
  onNext: () => void;
}) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const media = content.voice.mediaId
    ? content.media.find((item) => item.id === content.voice.mediaId)
    : undefined;
  return (
    <section className="voice voice-opening">
      <p className="eyebrow">a message from me <Heart size={13} fill="currentColor" /></p>
      <h1>{content.voice.title}</h1>
      {media ? (
        <div className="inline-audio">
          <audio ref={audio}
            src={`/api/media/${media.id}`}
            preload="metadata"
            onPlay={() => { setPlaying(true); if (audio.current) onPlayVoice(audio.current); }}
            onPause={() => setPlaying(false)}
            onEnded={() => { setPlaying(false); if (audio.current) onVoiceEnded(audio.current); window.setTimeout(onNext, 500); }}
          />
          <button className={`voice-play ${playing ? "is-playing" : ""}`} onClick={() => { if (!audio.current) return; if (audio.current.paused) onPlayVoice(audio.current); else audio.current.pause(); }} aria-label={playing ? "Pause voice message" : "Play voice message"}><span>{playing ? "❚❚" : "▶"}</span></button>
          <div className="wave" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} style={{ animationDelay: `${index * 45}ms` }} />)}</div>
          <p>{playing ? "Playing for you…" : "Tap to listen, or swipe when you are ready."}</p>
        </div>
      ) : (
        <Empty
          title="A message is waiting"
          text="This part of the story will open when its voice note is ready."
        />
      )}
    </section>
  );
}
function Voices({ content, onPlayVoice, onVoiceEnded }: { content: SafeContent; onPlayVoice: (voice: HTMLAudioElement) => void; onVoiceEnded: (voice: HTMLAudioElement) => void }) {
  const voices = content.voices.length ? content.voices : content.voice.mediaId ? [{ id: "from-me", name: content.participants.sender, relationship: "From me", mediaId: content.voice.mediaId }] : [];
  return <section className="voice voices"><p className="eyebrow">kept close</p><h1>Voices that love you <em>♥</em></h1>{voices.length ? voices.map((voice) => { const media = content.media.find((item) => item.id === voice.mediaId); return media && <article className="voice-card" key={voice.id}><span className="voice-avatar">{voice.name.slice(0, 1)}</span><div><strong>{voice.name}</strong><small>{voice.relationship}{voice.duration ? ` · ${voice.duration}` : ""}</small></div><audio src={`/api/media/${media.id}`} controls preload="metadata" onPlay={(event) => onPlayVoice(event.currentTarget)} onEnded={(event) => onVoiceEnded(event.currentTarget)} /></article>; }) : <Empty title="More voices are waiting" text="Add approved recordings here when they are ready." />}<p className="voice-note">Parents, friends, and family voices appear here as approved recordings are added.</p></section>;
}
function DatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [pickerView, setPickerView] = useState<"days" | "months" | "years">("days");
  const [month, setMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );
  const start = new Date(month.getFullYear(), month.getMonth(), 1);
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const leading = start.getDay();
  const dateValue = (day: number) =>
    `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const selected = value
    ? new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "No date selected";
  const selectDate = (nextValue: string) => {
    onChange(nextValue);
    setOpen(false);
  };
  return (
    <div className="date-picker" aria-label="Date picker">
      <button
        type="button"
        className="date-picker-trigger"
        aria-expanded={open}
        onClick={() => {
          setOpen((current) => !current);
          setPickerView("days");
        }}
      >
        <span>{selected}</span>
        <span aria-hidden="true">⌄</span>
      </button>
      {open && (
        <div className="date-picker-panel">
          <div className="date-calendar">
            <div className="date-calendar-header">
              <button
                type="button"
                className="icon-button"
                aria-label="Previous month"
                onClick={() =>
                  setMonth(
                    (current) =>
                      new Date(
                        current.getFullYear(),
                        current.getMonth() - 1,
                        1,
                      ),
                  )
                }
              >
                <ArrowLeft size={18} />
              </button>
              <div className="date-calendar-title" aria-live="polite">
                <button type="button" aria-label="Choose month" onClick={() => setPickerView("months")}>{month.toLocaleDateString("en-IN", { month: "long" })}</button>
                <button type="button" aria-label="Choose year" onClick={() => setPickerView("years")}>{month.getFullYear()}</button>
              </div>
              <button
                type="button"
                className="icon-button"
                aria-label="Next month"
                onClick={() =>
                  setMonth(
                    (current) =>
                      new Date(
                        current.getFullYear(),
                        current.getMonth() + 1,
                        1,
                      ),
                  )
                }
              >
                <ArrowRight size={18} />
              </button>
            </div>
            {pickerView === "months" && <div className="date-choice-grid">{Array.from({ length: 12 }, (_, index) => {
              const name = new Date(2026, index, 1).toLocaleDateString("en-IN", { month: "long" });
              return <button type="button" key={name} aria-pressed={month.getMonth() === index} onClick={() => { setMonth(new Date(month.getFullYear(), index, 1)); setPickerView("days"); }}>{name}</button>;
            })}</div>}
            {pickerView === "years" && <div className="date-choice-grid date-year-grid">{Array.from({ length: 13 }, (_, index) => {
              const year = 2020 + index;
              return <button type="button" key={year} aria-pressed={month.getFullYear() === year} onClick={() => { setMonth(new Date(year, month.getMonth(), 1)); setPickerView("days"); }}>{year}</button>;
            })}</div>}
            {pickerView === "days" && <><div className="date-weekdays" aria-hidden="true">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
            <div className="date-days">
              {Array.from({ length: leading }, (_, index) => (
                <span key={`empty-${index}`} />
              ))}
              {Array.from({ length: days }, (_, index) => {
                const day = index + 1;
                const nextValue = dateValue(day);
                const accessibleDate = new Date(
                  `${nextValue}T00:00:00`,
                ).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });
                return (
                  <button
                    type="button"
                    key={nextValue}
                    aria-label={`Select ${accessibleDate}`}
                    aria-pressed={value === nextValue}
                    className={value === nextValue ? "selected" : ""}
                    onClick={() => selectDate(nextValue)}
                  >
                    {day}
                  </button>
                );
              })}
            </div></>}
          </div>
        </div>
      )}
    </div>
  );
}
function Quiz({
  item,
  final,
  onCorrect,
  onNext,
}: {
  item: StoryContent["quiz"][number];
  final: boolean;
  onCorrect: () => void;
  onNext: () => void;
}) {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [accepted, setAccepted] = useState(false);
  const dateQuestion = item.acceptedAnswers.some((value) =>
    /^\d{4}-\d{2}-\d{2}$/.test(value),
  );
  const updateAnswer = (value: string) => {
    setAnswer(value);
    setAccepted(false);
    setFeedback("");
  };
  const submit = () => {
    if (matchesAnswer(answer, item.acceptedAnswers)) {
      setAccepted(true);
      setFeedback("That is right. ✦");
      onCorrect();
      navigator.vibrate?.(15);
      window.setTimeout(onNext, 900);
      return;
    }
    setAccepted(false);
    setFeedback(
      item.hint ? `Not quite — ${item.hint}` : "Not quite — try again.",
    );
  };
  return (
    <section className="quiz">
      <p className="eyebrow">a question for you</p>
      <h1>{item.question}</h1>
      {dateQuestion ? (
        <DatePicker value={answer} onChange={updateAnswer} />
      ) : item.choices ? (
        <fieldset className="quiz-options">
          <legend className="sr-only">Choose your answer</legend>
          {item.choices.map((choice) => (
            <label key={choice} onClick={() => updateAnswer(choice)}>
              <input type="radio" name={`quiz-${item.id}`} value={choice} checked={answer === choice} onChange={() => updateAnswer(choice)} />
              <span>{choice}</span>
            </label>
          ))}
        </fieldset>
      ) : (
        <>
          <label htmlFor={`quiz-${item.id}`} className="sr-only">
            Your answer
          </label>
          <input
            id={`quiz-${item.id}`}
            value={answer}
            onChange={(event) => updateAnswer(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && submit()}
            placeholder="Type your answer"
          />
        </>
      )}
      <button className="primary quiz-reveal" onClick={submit} disabled={accepted}>
        {accepted ? "Memory unlocked" : "Reveal this memory"} <ArrowRight />
      </button>
      <p aria-live="polite" className="quiz-feedback">
        {feedback}
      </p>
    </section>
  );
}
function Reveal({ title, entries }: { title: string; entries: string[] }) {
  const [index, setIndex] = useState(0);
  return (
    <section className="reveal">
      <p className="eyebrow">one at a time</p>
      <h1>{title}</h1>
      {entries.length ? (
        <>
          <blockquote>“{entries[index]}”</blockquote>
          <button
            className="secondary"
            onClick={() => setIndex((value) => (value + 1) % entries.length)}
          >
            Another one <Heart size={16} fill="currentColor" />
          </button>
        </>
      ) : (
        <Empty
          title="A little more is waiting"
          text="This chapter is ready for the next approved detail."
        />
      )}
    </section>
  );
}
function Letter({
  content,
  onOpen,
}: {
  content: SafeContent;
  onOpen: (id: string) => void;
}) {
  const notes = content.letter.mediaIds
    .map((id) => content.media.find((item) => item.id === id))
    .filter((item): item is SafeContent["media"][number] => Boolean(item))
    .filter((item) => item.id !== "note-choose-you");
  return (
    <article className="letter">
      <p className="eyebrow">a note for you</p>
      <h1>My dearest {content.participants.nickname},</h1>
      <p>{content.letter.body}</p>
      {notes.length > 0 && (
        <div className="note-grid" aria-label="Handwritten notes">
          {notes.map((note) => (
            <button
              className="note-card"
              key={note.id}
              onClick={() => onOpen(note.id)}
            >
              <MediaImage media={note} />
              <span>{note.caption}</span>
            </button>
          ))}
        </div>
      )}
      <footer>{content.letter.signature}</footer>
    </article>
  );
}
function FinalNote({ content, onOpen }: { content: SafeContent; onOpen: (id: string) => void }) {
  const note = content.media.find((item) => item.id === "note-choose-you");
  if (!note) return null;
  return (
    <article className="letter final-note">
      <p className="eyebrow">one last note</p>
      <h1>For you, {content.participants.nickname}.</h1>
      <div className="note-grid" aria-label="A final handwritten note">
        <button className="note-card" onClick={() => onOpen(note.id)}>
          <MediaImage media={note} />
          <span>{note.caption}</span>
        </button>
      </div>
      <footer>{content.letter.signature}</footer>
    </article>
  );
}
function FinalPhoto({ content }: { content: SafeContent }) {
  const photo = content.media.find((item) => item.id === "photo-last") ?? content.media.find((item) => item.kind === "image");
  return <section className="final-photo"><p className="eyebrow">one more look</p>{photo && <MediaImage media={photo} />}<p>Always us.</p></section>;
}
function Cake({ onNext }: { onNext: () => void }) {
  const [lit, setLit] = useState(true);
  return (
    <section className="cake">
      <p className="eyebrow">make a wish</p>
      <button
        className={`cake-art ${lit ? "lit" : ""}`}
        onClick={() => { setLit(false); navigator.vibrate?.(15); window.setTimeout(onNext, 1200); }}
        aria-label="Blow out the candle"
      >
        <span className="flame" />
        <span className="cake-base"><i /><i /><i /></span>
      </button>
      <h1>{lit ? "Tap the candle" : "Wish made."}</h1>
      <p>
        {lit
          ? "Your tap is all it takes."
          : "May this year be as lovely as you are."}
      </p>
    </section>
  );
}
function Gift({ onOpen, onNext }: { onOpen: () => void; onNext: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="gift">
      <p className="eyebrow">one last thing</p>
      <button
        className={`gift-box ${open ? "open" : ""}`}
        onClick={() => {
          setOpen(true);
          onOpen();
          navigator.vibrate?.(15);
          window.setTimeout(onNext, 1050);
        }}
        aria-label="Open your gift"
      >
        <span className="gift-lid" /><span className="gift-ribbon" /><span className="gift-body" />
      </button>
      <h1>{open ? "A whole world of love." : "Open your gift."}</h1>
      <p>{open ? "happy birthday shuttmani" : "A little shake, then a tap."}</p>
    </section>
  );
}
function Ending({
  content,
  onFirework,
  onReplay,
  onSecret,
}: {
  content: SafeContent;
  onFirework: () => void;
  onReplay: () => void;
  onSecret: () => void;
}) {
  const [presses, setPresses] = useState(0);
  useEffect(() => { onFirework(); }, [onFirework]);
  useEffect(() => {
    if (!presses) return;
    const timer = setTimeout(() => setPresses(0), 1500);
    return () => clearTimeout(timer);
  }, [presses]);
  const reveal = () => {
    navigator.vibrate?.(15);
    const next = presses + 1;
    if (next >= 3) {
      setPresses(0);
      onSecret();
    } else setPresses(next);
  };
  const hasSecret =
    content.features.secretMemories && content.secretMediaIds.length > 0;
  return (
    <section className="poster ending">
      <Heart className="poster-heart" fill="currentColor" />
      <p className="eyebrow">the end, for now</p>
      <h1>{content.finale}</h1>
      <p>Thank you for being every little reason to celebrate.</p>
      <p className="swipe-copy">One last memory is waiting</p>
      <button className="secondary" onClick={onReplay}>
        <RotateCcw /> Replay our story
      </button>
      {hasSecret && (
        <button
          className="secret-trigger"
          onClick={reveal}
          aria-label="A small secret is hidden here. Activate three times to reveal it."
        >
          <Heart fill="currentColor" aria-hidden="true" />
        </button>
      )}
    </section>
  );
}
function Closing() {
  return <section className="closing"><Heart fill="currentColor" aria-hidden="true" /><p>I&apos;ll always choose you.</p></section>;
}
function SecretAlbum({
  content,
  onOpen,
  onExit,
}: {
  content: SafeContent;
  onOpen: (id: string) => void;
  onExit: () => void;
}) {
  const memories = content.secretMediaIds
    .map((id) => content.media.find((media) => media.id === id))
    .filter((media): media is SafeContent["media"][number] => Boolean(media));
  return (
    <section className="collection secret-album">
      <p className="eyebrow">just for you</p>
      <h1>A small secret.</h1>
      <p className="lede">A few more moments, kept quietly here.</p>
      <div className="photo-grid">
        {memories.map((media) => (
          <button
            className="photo-button"
            onClick={() => onOpen(media.id)}
            key={media.id}
          >
            <MediaImage media={media} />
            <span>{media.caption}</span>
          </button>
        ))}
      </div>
      <button className="secondary" onClick={onExit}>
        Return to the ending
      </button>
    </section>
  );
}
function Empty({ title, text }: { title: string; text: string }) {
  return (
    <div className="empty">
      <ImageIcon aria-hidden="true" />
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}
function MediaImage({ media }: { media: SafeContent["media"][number] }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return failed ? (
    <div className="media-failure">Unable to load this memory.</div>
  ) : (
    <div className={`media-image${loaded ? " is-loaded" : ""}`}>
      {!loaded && <span className="media-skeleton" aria-hidden="true" />}
      <img
        data-media-id={media.id}
        src={`/api/media/${media.id}`}
        alt={media.alt}
        loading="lazy"
        decoding="async"
        style={
          media.rotation
            ? { transform: `rotate(${media.rotation}deg)` }
            : undefined
        }
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
function MediaOverlay({
  media,
  onClose,
}: {
  media: SafeContent["media"][number];
  onClose: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <motion.div
      className="media-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={media.caption}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        ref={ref}
        className="icon-button close"
        onClick={onClose}
        aria-label="Close photo"
      >
        <X />
      </button>
      <figure
        className="media-frame"
        onClick={(event) => event.stopPropagation()}
      >
        <MediaImage media={media} />
        <figcaption>{media.caption}</figcaption>
      </figure>
    </motion.div>
  );
}
