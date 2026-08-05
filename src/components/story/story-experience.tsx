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
import { matchesAnswer } from "@/lib/answer-normalization";
import { hasLocalBirthdayStarted } from "@/lib/birthday-state";

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
  const [hasBirthdayStarted, setHasBirthdayStarted] = useState(() => hasLocalBirthdayStarted(content.project.birthday));
  const sequence = useMemo<View[]>(
    () => [
      ...(!hasBirthdayStarted ? ["countdown" as const] : []),
      "welcome",
      "chapters",
      "numbers",
      "albums",
      "videos",
      "voice",
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
    [content.features, hasBirthdayStarted],
  );
  const [view, setView] = useState<View>(() =>
    typeof window === "undefined" ? (hasLocalBirthdayStarted(content.project.birthday) ? "welcome" : "countdown") : (() => {
      const saved = localStorage.getItem("for-u-sudd-progress") as View | null;
      return saved === "countdown" && hasLocalBirthdayStarted(content.project.birthday) ? "welcome" : saved || (hasLocalBirthdayStarted(content.project.birthday) ? "welcome" : "countdown");
    })(),
  );
  const [progressRestored, setProgressRestored] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [quiz, setQuiz] = useState(0);
  const [ambientEnabled, setAmbientEnabled] = useState(() => typeof window === "undefined" || localStorage.getItem("for-u-sudd-ambient") !== "false");
  const [ambientVolume, setAmbientVolume] = useState(() => typeof window === "undefined" ? 1 : Number(localStorage.getItem("for-u-sudd-ambient-volume") ?? 1));
  const [showMusicControls, setShowMusicControls] = useState(false);
  const [mediaId, setMediaId] = useState<string | null>(null);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [completedAt] = useState<string | null>(() => typeof window === "undefined" ? null : localStorage.getItem("for-u-sudd-completed-at"));
  const [showReturnPrompt, setShowReturnPrompt] = useState(() => typeof window !== "undefined" && Boolean(localStorage.getItem("for-u-sudd-completed-at")));
  const [confetti, setConfetti] = useState(false);
  const [fireworks, setFireworks] = useState(false);
  const [floatingHeart, setFloatingHeart] = useState<number | null>(null);
  const [tapPulse, setTapPulse] = useState<{ x: number; y: number; id: number } | null>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const storyShell = useRef<HTMLElement>(null);
  const activeVoice = useRef<HTMLAudioElement | null>(null);
  const resumeAfterFocus = useRef(false);
  const resumeVoiceAfterFocus = useRef<HTMLAudioElement | null>(null);
  const swipeStart = useRef<{ x: number; y: number; time: number } | null>(null);
  const ignoreNextTap = useRef(false);
  const navigationLocked = useRef(false);
  const fadeFrame = useRef<number | null>(null);
  const heartCount = useRef(0);
  const restoredProgress = useRef(false);
  const index = sequence.indexOf(view);
  const galleryPhotos = useMemo(() => [...new Set(content.albums.flatMap((album) => album.mediaIds))]
    .map((id) => content.media.find((item) => item.id === id))
    .filter((item): item is SafeContent["media"][number] => item?.kind === "image"), [content.albums, content.media]);
  useEffect(() => {
    const color = mediaId ? "#1B1B1B" : ["preflight", "closing"].includes(view) ? "#111111" : "#F6F0E6";
    let theme = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!theme) {
      theme = document.createElement("meta");
      theme.name = "theme-color";
      document.head.append(theme);
    }
    theme.content = color;
  }, [mediaId, view]);
  useEffect(() => {
    if (restoredProgress.current) return;
    restoredProgress.current = true;
    const saved = localStorage.getItem("for-u-sudd-progress") as View | null;
    const restored = saved === "countdown" && hasLocalBirthdayStarted(content.project.birthday)
      ? "welcome"
      : saved && sequence.includes(saved) ? saved : null;
    const timer = window.setTimeout(() => {
      if (restored) setView(restored);
      setProgressRestored(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [content.project.birthday, sequence]);
  useEffect(() => {
    if (!progressRestored) return;
    localStorage.setItem("for-u-sudd-progress", view);
  }, [progressRestored, view]);
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
    const nextView = view === "chapters" && chapter < content.chapters.length - 1
      ? "chapters" : sequence[index + 1];
    const nextMediaId = nextView === "chapters"
      ? content.chapters[view === "chapters" ? chapter + 1 : 0]?.mediaId
      : nextView === "voice" ? content.voice.mediaId
      : nextView === "videos" ? content.videos[0]?.mediaId
      : undefined;
    const nextMedia = content.media.find((item) => item.id === nextMediaId);
    if (!nextMedia) return;
    const element = nextMedia.kind === "image" ? new Image() : document.createElement(nextMedia.kind === "video" ? "video" : "audio");
    if (element instanceof HTMLImageElement) element.decoding = "async";
    else element.preload = "metadata";
    element.src = `/api/media/${nextMedia.id}`;
  }, [chapter, content.chapters, content.media, content.videos, content.voice.mediaId, index, sequence, view]);
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
    void player.play().then(() => setAmbientEnabled(true)).catch(() => setAmbientEnabled(false));
  }, [ambientVolume]);
  useEffect(() => { if (ambientEnabled && content.musicMediaId) playAmbient(); }, [ambientEnabled, content.musicMediaId, playAmbient]);
  useEffect(() => {
    const pauseForInterruption = () => {
      const player = audio.current;
      resumeAfterFocus.current = Boolean(player && ambientEnabled && !player.paused);
      player?.pause();
      const voice = activeVoice.current;
      resumeVoiceAfterFocus.current = voice && !voice.paused ? voice : null;
      voice?.pause();
    };
    const resumeAfterInterruption = () => {
      const player = audio.current;
      if (resumeAfterFocus.current && ambientEnabled && player)
        void player.play().catch(() => undefined);
      resumeAfterFocus.current = false;
      if (resumeVoiceAfterFocus.current) void resumeVoiceAfterFocus.current.play().catch(() => undefined);
      resumeVoiceAfterFocus.current = null;
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
  useEffect(() => {
    const checkBirthday = () => {
      if (hasBirthdayStarted || !hasLocalBirthdayStarted(content.project.birthday)) return;
      setHasBirthdayStarted(true);
      if (view === "countdown") {
        setView("welcome");
        window.history.replaceState({ story: "welcome" }, "", "#welcome");
      }
    };
    checkBirthday();
    const timer = window.setInterval(checkBirthday, 1000);
    return () => window.clearInterval(timer);
  }, [content.project.birthday, hasBirthdayStarted, view]);
  useEffect(() => {
    if (view === "albums" || view === "videos") storyShell.current?.scrollTo({ top: 0 });
    else if (storyShell.current) storyShell.current.scrollTop = 0;
  }, [view]);
  function navigate(direction: "next" | "previous") {
    if (navigationLocked.current) return;
    navigationLocked.current = true;
    window.setTimeout(() => { navigationLocked.current = false; }, 800);
    navigator.vibrate?.(6);
    if (direction === "next") next(); else previous();
  }
  function handleSwipeEnd(event: React.PointerEvent<HTMLElement>) {
    handleGestureEnd(event.clientX, event.clientY);
  }
  function handleGestureEnd(clientX: number, clientY: number) {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start || mediaId || view === "quiz" || view === "preflight" || view === "closing") return;
    const x = clientX - start.x;
    const y = clientY - start.y;
    const velocity = Math.abs(x) / Math.max(1, performance.now() - start.time);
    if (Math.abs(y) > Math.abs(x) * 1.35 && (view === "albums" || view === "videos")) {
      const shell = storyShell.current;
      if (shell && Math.abs(y) >= 80) {
        if (y < 0 && shell.scrollTop + shell.clientHeight >= shell.scrollHeight - 2) navigate("next");
        if (y > 0 && shell.scrollTop <= 2) navigate("previous");
      }
      return;
    }
    if (Math.abs(x) < Math.abs(y) * 1.35 || (Math.abs(x) < 80 && velocity < 0.45)) return;
    ignoreNextTap.current = true;
    if (x < 0) navigate("next"); else navigate("previous");
  }
  function handleStoryTap(event: React.MouseEvent<HTMLElement>) {
    if (ignoreNextTap.current) {
      ignoreNextTap.current = false;
      return;
    }
    if (mediaId || view === "quiz" || view === "preflight" || view === "closing") return;
    if ((event.target as HTMLElement).closest("[data-story-interactive], button, input, label, audio, video, select, textarea, a")) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = (event.clientX - bounds.left) / bounds.width;
    const edge = view === "albums" || view === "videos" ? 0.05 : 0.3;
    if (position <= edge) navigate("previous");
    if (position >= 1 - edge) navigate("next");
  }
  useEffect(() => {
    window.history.pushState({ leaveGuard: true }, "", window.location.href);
    const onPop = () => {
      setShowLeaveConfirm(true);
      window.history.pushState({ leaveGuard: true }, "", window.location.href);
    };
    addEventListener("popstate", onPop);
    return () => removeEventListener("popstate", onPop);
  }, []);
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
    if (view !== "closing") return;
    const completed = localStorage.getItem("for-u-sudd-completed-at") ?? new Date().toISOString();
    localStorage.setItem("for-u-sudd-completed-at", completed);
    fadeAmbient(0, 4500, () => audio.current?.pause());
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
      ref={storyShell}
      className={`story-shell${view === "albums" || view === "videos" ? " is-gallery" : ""}`}
      onClickCapture={(event) => {
        if (!event.detail) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        setTapPulse({ x: event.clientX - bounds.left, y: event.clientY - bounds.top, id: Date.now() });
      }}
      onClick={handleStoryTap}
      onPointerDown={(event) => { swipeStart.current = { x: event.clientX, y: event.clientY, time: performance.now() }; }}
      onPointerUp={handleSwipeEnd}
      onPointerCancel={() => { swipeStart.current = null; }}
      onTouchStart={(event) => {
        if (swipeStart.current) return;
        const touch = event.touches[0];
        if (touch) swipeStart.current = { x: touch.clientX, y: touch.clientY, time: performance.now() };
      }}
      onTouchEnd={(event) => {
        if (!swipeStart.current) return;
        const touch = event.changedTouches[0];
        if (touch) handleGestureEnd(touch.clientX, touch.clientY);
      }}
      onTouchCancel={() => { swipeStart.current = null; }}
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
      <header className="story-header" data-story-interactive>
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
            if (audio.current?.paused) playAmbient();
            else {
              audio.current?.pause();
              setAmbientEnabled(false);
            }
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
          transition={{ duration: reduced ? 0.15 : 0.72 }}
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
          {view === "numbers" && <OurNumbers />}
          {view === "albums" && <Albums content={content} onOpen={setMediaId} />}
          {view === "videos" && <Videos content={content} />}
          {view === "voice" && (
            <Voice
              content={content}
              onPlayVoice={playVoice}
              onVoiceEnded={voiceEnded}
              onNext={() => navigate("next")}
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
                  : navigate("next")
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
          {view === "cake" && <Cake onNext={() => navigate("next")} />}
          {view === "gift" && (
            <Gift onOpen={burstConfetti} onNext={() => navigate("next")} />
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
          <MediaOverlay media={active} photos={galleryPhotos} onChange={setMediaId} onClose={() => setMediaId(null)} />
        )}
      </AnimatePresence>
      {showLeaveConfirm && (
        <div className="leave-overlay" role="dialog" aria-modal="true" aria-labelledby="leave-title">
          <div className="leave-dialog">
            <h2 id="leave-title">Leave this story?</h2>
            <div><button className="secondary" onClick={() => window.location.assign("/access")}>Yes</button><button className="primary" onClick={() => setShowLeaveConfirm(false)}>Continue</button></div>
          </div>
        </div>
      )}
      {showReturnPrompt && completedAt && (
        <div className="leave-overlay" role="dialog" aria-modal="true" aria-labelledby="return-title">
          <div className="leave-dialog return-dialog">
            <Heart fill="currentColor" aria-hidden="true" />
            <h2 id="return-title">Welcome back.</h2>
            <p>Completed on<br />{new Date(completedAt).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true })}</p>
            <small>Made with love by {content.participants.sender}.</small>
            <div><button className="secondary" onClick={() => { setChapter(0); setQuiz(0); setView("welcome"); setShowReturnPrompt(false); }}>Replay</button><button className="primary" onClick={() => setShowReturnPrompt(false)}>Continue</button></div>
          </div>
        </div>
      )}
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
  const target = new Date(`${birthday}T00:00:00`);
  const remaining = Math.max(0, target.getTime() - now.getTime());
  const parts = { days: Math.floor(remaining / 86400000), hours: Math.floor(remaining / 3600000) % 24, minutes: Math.floor(remaining / 60000) % 60, seconds: Math.floor(remaining / 1000) % 60 };
  return (
    <div className="poster countdown birthday-gate">
      <p className="eyebrow">almost there…</p>
      <h1>Your special day<br />is getting <em>closer.</em></h1>
      <p>Every second brings us closer to celebrating you.</p>
      <div className="time-grid" aria-label={`${parts.days} days, ${parts.hours} hours, ${parts.minutes} minutes and ${parts.seconds} seconds remaining`}>
        {Object.entries(parts).map(([key, value]) => <div key={key}><strong>{String(value).padStart(2, "0")}</strong><span>{key}</span></div>)}
      </div>
      <p className="swipe-copy">The story will begin when it&apos;s time ♥</p>
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
        {media && <MediaImage media={media} priority />}
      </div>
      <div>
        <p className="eyebrow">{chapter.date}</p>
        <h1>{chapter.title}</h1>
        <p className="lede">{chapter.body}</p>
      </div>
    </article>
  );
}
function OurNumbers() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const timer = window.setInterval(() => setNow(new Date()), 1000); return () => window.clearInterval(timer); }, []);
  const elapsed = Math.max(0, now.getTime() - new Date("2025-12-26T18:12:00+05:30").getTime());
  const days = Math.floor(elapsed / 86400000);
  const hours = Math.floor(elapsed / 3600000) % 24;
  const minutes = Math.floor(elapsed / 60000) % 60;
  const seconds = Math.floor(elapsed / 1000) % 60;
  return <section className="our-numbers live-numbers"><p className="eyebrow">together since</p><h1>26 December 2025<br /><em>6:12 PM</em></h1><div className="live-duration" aria-live="polite"><p><b>♥</b><strong>{days}</strong><span>Days</span></p><p><strong>{String(hours).padStart(2, "0")}</strong><span>Hours</span></p><p><strong>{String(minutes).padStart(2, "0")}</strong><span>Minutes</span></p><p><strong>{String(seconds).padStart(2, "0")}</strong><span>Seconds</span></p></div></section>;
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
    .filter((item): item is SafeContent["media"][number] => item?.kind === "image");
  return (
    <section className="collection polaroid-stack">
      <p className="eyebrow">in no particular order</p>
      <h1>Little pieces of <em>us.</em></h1>
      <div className="photo-grid mixed-memories">
        {photos.map((media) => <button className="photo-button polaroid" onClick={() => onOpen(media.id)} key={media.id}><MediaImage media={media} /><span>{media.caption}</span></button>)}
      </div>
    </section>
  );
}
function Videos({ content }: { content: SafeContent }) {
  const active = useRef<HTMLVideoElement | null>(null);
  const playVisible = useCallback((video: HTMLVideoElement, visible: boolean) => {
    if (!visible) {
      if (active.current === video) active.current = null;
      video.pause();
      return;
    }
    if (active.current && active.current !== video) active.current.pause();
    active.current = video;
    void video.play().catch(() => undefined);
  }, []);
  return (
    <section className="collection">
      <p className="eyebrow">little moments in motion</p>
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
                <VideoCard key={video.id} media={media} poster={poster} title={video.title} onVisibilityChange={playVisible} />
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
function VideoCard({ media, poster, title, onVisibilityChange }: { media: SafeContent["media"][number]; poster?: SafeContent["media"][number]; title: string; onVisibilityChange: (video: HTMLVideoElement, visible: boolean) => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      const isVisible = entry.isIntersecting && entry.intersectionRatio > 0;
      setVisible(isVisible);
      if (isVisible) setLoaded(true);
      onVisibilityChange(video, isVisible);
    }, { threshold: 0.01 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [onVisibilityChange]);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const visibility = () => onVisibilityChange(video, !document.hidden && visible);
    document.addEventListener("visibilitychange", visibility);
    visibility();
    return () => document.removeEventListener("visibilitychange", visibility);
  }, [onVisibilityChange, visible]);
  return <article className="video-card"><video ref={ref} src={loaded ? `/api/media/${media.id}` : undefined} muted loop playsInline preload="metadata" poster={loaded && poster ? `/api/media/${poster.id}` : undefined} aria-label={title} /><span>{title}</span></article>;
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
            onPause={() => { setPlaying(false); if (audio.current) onVoiceEnded(audio.current); }}
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
  const voices = content.voices.length ? content.voices : content.voice.mediaId ? [{ id: "voice-01", title: "One More Message ♥", description: "Before we continue, I wanted you to hear this.", mediaId: content.voice.mediaId }] : [];
  return <section className="voice voices"><p className="eyebrow">before we continue…</p><h1>A few words for <em>you.</em></h1><p className="lede">I wanted you to hear a few special voices. Take your time. ♥</p>{voices.length ? voices.map((voice, index) => { const media = content.media.find((item) => item.id === voice.mediaId); return media && <VoiceCard key={voice.id} media={media} number={index + 1} title={voice.title} description={voice.description} duration={voice.duration} onPlayVoice={onPlayVoice} onVoiceEnded={onVoiceEnded} />; }) : <Empty title="More little surprises are waiting" text="Approved recordings will appear here when they are ready." />}<p className="voice-note">Some words stay with us forever. Swipe when you are ready to continue our story.</p></section>;
}
function VoiceCard({ media, number, title, description, duration, onPlayVoice, onVoiceEnded }: { media: SafeContent["media"][number]; number: number; title: string; description?: string; duration?: string; onPlayVoice: (voice: HTMLAudioElement) => void; onVoiceEnded: (voice: HTMLAudioElement) => void }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  return <article className={`voice-card ${playing ? "is-playing" : ""}`}><audio ref={audio} src={`/api/media/${media.id}`} preload="metadata" onPlay={() => { setPlaying(true); if (audio.current) onPlayVoice(audio.current); }} onPause={() => { setPlaying(false); if (audio.current) onVoiceEnded(audio.current); }} onEnded={() => { setPlaying(false); if (audio.current) onVoiceEnded(audio.current); }} /><span className="voice-count">Message {String(number).padStart(2, "0")} ♥</span><h2>{title}</h2>{description && <p>{description}</p>}<div className="voice-card-actions"><button className="secondary" onClick={() => { if (!audio.current) return; if (audio.current.paused) onPlayVoice(audio.current); else audio.current.pause(); }}>{playing ? "Pause" : "Play"} <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span></button>{duration && <small>{duration}</small>}</div><div className="wave card-wave" aria-hidden="true">{Array.from({ length: 22 }, (_, index) => <i key={index} style={{ animationDelay: `${index * 35}ms` }} />)}</div></article>;
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
  return <section className="final-photo"><p className="eyebrow">one more look</p>{photo && <MediaImage media={photo} priority />}<p>Always us.</p></section>;
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
  return <section className="closing"><Heart fill="currentColor" aria-hidden="true" /><p>Thank you<br />for taking this little journey.</p></section>;
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
function MediaImage({ media, priority = false }: { media: SafeContent["media"][number]; priority?: boolean }) {
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
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
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
  photos,
  onChange,
  onClose,
}: {
  media: SafeContent["media"][number];
  photos: SafeContent["media"];
  onChange: (id: string) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const pinch = useRef<{ distance: number; scale: number } | null>(null);
  const drag = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const photoIndex = photos.findIndex((photo) => photo.id === media.id);
  const move = (direction: -1 | 1) => {
    const next = photos[photoIndex + direction];
    if (next) onChange(next.id);
  };
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
      onPointerDown={(event) => { gesture.current = { x: event.clientX, y: event.clientY }; }}
      onPointerUp={(event) => {
        const start = gesture.current;
        gesture.current = null;
        if (!start) return;
        const distance = event.clientX - start.x;
        if (Math.abs(distance) >= 60 && Math.abs(distance) > Math.abs(event.clientY - start.y) * 1.3) move(distance < 0 ? 1 : -1);
      }}
      onTouchStart={(event) => {
        if (gesture.current) return;
        const touch = event.touches[0];
        if (touch) gesture.current = { x: touch.clientX, y: touch.clientY };
      }}
      onTouchEnd={(event) => {
        const start = gesture.current;
        gesture.current = null;
        const touch = event.changedTouches[0];
        if (!start || !touch) return;
        const distance = touch.clientX - start.x;
        if (Math.abs(distance) >= 60 && Math.abs(distance) > Math.abs(touch.clientY - start.y) * 1.3) move(distance < 0 ? 1 : -1);
      }}
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
        onDoubleClick={() => {
          setScale((value) => value === 1 ? 2 : 1);
          setPan({ x: 0, y: 0 });
        }}
        onPointerDown={(event) => {
          if (scale === 1) return;
          event.stopPropagation();
          drag.current = { x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y };
        }}
        onPointerMove={(event) => {
          if (!drag.current) return;
          event.stopPropagation();
          setPan({ x: drag.current.panX + event.clientX - drag.current.x, y: drag.current.panY + event.clientY - drag.current.y });
        }}
        onPointerUp={(event) => { if (drag.current) event.stopPropagation(); drag.current = null; }}
        onTouchStart={(event) => {
          if (scale > 1) event.stopPropagation();
          if (event.touches.length !== 2) return;
          const [first, second] = [event.touches[0], event.touches[1]];
          pinch.current = { distance: Math.hypot(first.clientX - second.clientX, first.clientY - second.clientY), scale };
        }}
        onTouchMove={(event) => {
          if (!pinch.current || event.touches.length !== 2) return;
          event.stopPropagation();
          const [first, second] = [event.touches[0], event.touches[1]];
          const distance = Math.hypot(first.clientX - second.clientX, first.clientY - second.clientY);
          setScale(Math.min(3, Math.max(1, pinch.current.scale * distance / pinch.current.distance)));
        }}
        onTouchEnd={(event) => { if (scale > 1) event.stopPropagation(); pinch.current = null; if (scale === 1) setPan({ x: 0, y: 0 }); }}
      >
        <div className="zoomable-media" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})` }}><MediaImage media={media} priority /></div>
        <figcaption>{media.caption}</figcaption>
      </figure>
    </motion.div>
  );
}
