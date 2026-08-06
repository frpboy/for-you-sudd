"use client";
/* eslint-disable @next/next/no-img-element -- protected same-origin media endpoints cannot be optimized by Next/Image without exposing source keys. */
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Image as ImageIcon,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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
  | "malayalam-letter"
  | "cake"
  | "gift"
  | "ending"
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
  "malayalam-letter": "From my heart",
  cake: "Cake",
  gift: "Gift",
  ending: "Ending",
  secret: "A small secret",
};

export function StoryExperience({ content }: { content: SafeContent }) {
  const reduced = useReducedMotion();
  const [hasBirthdayStarted, setHasBirthdayStarted] = useState(() => hasLocalBirthdayStarted(content.project.birthday));
  const sequence = useMemo<View[]>(
    () => [
      ...(!hasBirthdayStarted ? ["countdown" as const] : []),
      "welcome",
      "voice",
      "chapters",
      "numbers",
      "albums",
      "videos",
      "quiz",
      ...(content.features.memoryJar ? ["memories" as const] : []),
      ...(content.features.reasons ? ["reasons" as const] : []),
      ...(content.features.dreams ? ["dreams" as const] : []),
      ...(content.features.cake ? ["cake" as const] : []),
      "voices",
      "gift",
      "letter",
      "final-photo",
      "final-note",
      "malayalam-letter",
      "ending",
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
  const [videosReady, setVideosReady] = useState(false);
  const [finaleReady, setFinaleReady] = useState(false);
  const [completedViews, setCompletedViews] = useState<Set<View>>(() => new Set());
  const [visitedViews, setVisitedViews] = useState<Set<View>>(() => new Set());
  const [activity, setActivity] = useState(0);
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
  const voiceResumeTimer = useRef<number | null>(null);
  const heartCount = useRef(0);
  const restoredProgress = useRef(false);
  const ambientStarted = useRef(false);
  const idleTimer = useRef<number | null>(null);
  const autoAdvance = useRef<() => void>(() => undefined);
  const index = sequence.indexOf(view);
  const galleryPhotos = useMemo(() => [...new Set(content.albums.flatMap((album) => album.mediaIds))]
    .map((id) => content.media.find((item) => item.id === id))
    .filter((item): item is SafeContent["media"][number] => item?.kind === "image"), [content.albums, content.media]);
  useEffect(() => {
    const player = document.getElementById("ambient-audio") as HTMLAudioElement | null;
    if (!player) return;
    audio.current = player;
    const syncStarted = () => {
      ambientStarted.current = true;
      setVideosReady(true);
      setAmbientEnabled(true);
    };
    document.addEventListener("ambientstarted", syncStarted);
    if (!player.paused) syncStarted();
    return () => {
      document.removeEventListener("ambientstarted", syncStarted);
      if (audio.current === player) audio.current = null;
    };
  }, []);
  useEffect(() => {
    const color = mediaId ? "#1B1B1B" : view === "preflight" ? "#111111" : "#F6F0E6";
    const theme = document.getElementById("app-theme-color") as HTMLMetaElement | null;
    if (theme) theme.content = color;
    const colorScheme = document.getElementById("app-color-scheme") as HTMLMetaElement | null;
    if (colorScheme) colorScheme.content = color === "#F6F0E6" ? "light" : "dark";
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
      const progress = Math.min(1, Math.max(0, (now - started) / duration));
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
    void player.play().then(() => { ambientStarted.current = true; setVideosReady(true); setAmbientEnabled(true); }).catch(() => undefined);
  }, [ambientVolume]);
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
    setVisitedViews((current) => current.has(view) ? current : new Set(current).add(view));
    setFinaleReady(false);
    setView(next);
    window.history.pushState({ story: next }, "", `#${next}`);
  }
  const completeView = useCallback((completed: View) => {
    setCompletedViews((current) => current.has(completed) ? current : new Set(current).add(completed));
    if (completed === "final-note" || completed === "malayalam-letter") setFinaleReady(true);
  }, []);
  const requiresCompletion = view === "voice" || view === "voices" || view === "quiz" || view === "final-note" || view === "malayalam-letter" || view === "cake" || view === "gift";
  const pageReady = !requiresCompletion || completedViews.has(view);
  const noteActivity = useCallback(() => setActivity((current) => current + 1), []);
  useEffect(() => {
    if (!pageReady || view === "ending" || view === "preflight") return;
    idleTimer.current = window.setTimeout(() => autoAdvance.current(), 30_000);
    return () => { if (idleTimer.current) window.clearTimeout(idleTimer.current); };
  }, [activity, pageReady, view]);
  function next() {
    if (view === "chapters" && chapter < content.chapters.length - 1) {
      setChapter((value) => value + 1);
      return;
    }
    const nextView = sequence[index + 1];
    if (nextView) go(nextView);
  }
  autoAdvance.current = next;
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
    if (view === "albums" || view === "videos" || view === "letter") storyShell.current?.scrollTo({ top: 0 });
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
    if (!start || mediaId || view === "preflight") return;
    const x = clientX - start.x;
    const y = clientY - start.y;
    const velocity = Math.abs(x) / Math.max(1, performance.now() - start.time);
    if (Math.abs(y) > Math.abs(x) * 1.35 && ["letter", "final-note", "malayalam-letter"].includes(view)) return;
    if (["final-note", "malayalam-letter"].includes(view) && !finaleReady && !completedViews.has(view)) return;
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
    if (mediaId || view === "preflight" || (["final-note", "malayalam-letter"].includes(view) && !finaleReady && !completedViews.has(view))) return;
    if ((event.target as HTMLElement).closest("[data-story-interactive], button, input, label, audio, video, select, textarea, a")) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = (event.clientX - bounds.left) / bounds.width;
    const edge = view === "albums" || view === "videos" || (view === "voice" && activeVoice.current && !activeVoice.current.paused) ? 0.05 : 0.3;
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
  const showAmbient = !reduced && ["start", "welcome", "countdown", "gift", "ending"].includes(view);
  const playVoice = useCallback((voice: HTMLAudioElement) => {
    if (activeVoice.current === voice && !voice.paused) return;
    if (activeVoice.current && activeVoice.current !== voice) activeVoice.current.pause();
    if (voiceResumeTimer.current) window.clearTimeout(voiceResumeTimer.current);
    activeVoice.current = voice;
    const player = audio.current;
    const startVoice = () => { player?.pause(); void voice.play(); };
    if (ambientEnabled && player && !player.paused) fadeAmbient(0, 300, startVoice);
    else startVoice();
  }, [ambientEnabled, fadeAmbient]);
  const voiceEnded = useCallback((voice: HTMLAudioElement) => {
    if (activeVoice.current !== voice) return;
    activeVoice.current = null;
    if (!ambientEnabled) return;
    if (voiceResumeTimer.current) window.clearTimeout(voiceResumeTimer.current);
    voiceResumeTimer.current = window.setTimeout(() => {
      const player = audio.current;
      if (!player || !ambientEnabled) return;
      player.volume = 0;
      void player.play().then(() => fadeAmbient(ambientVolume, 600)).catch(() => undefined);
    }, 400);
  }, [ambientEnabled, ambientVolume, fadeAmbient]);
  const burstConfetti = useCallback(() => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 2400);
  }, []);
  const celebrateCandle = useCallback(() => {
    setConfetti(true);
    window.setTimeout(() => setConfetti(false), 1000);
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.setValueAtTime(880, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1320, context.currentTime + 0.32);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.045, context.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.55);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.56);
  }, []);
  const unlockFinale = useCallback(() => setFinaleReady(true), []);
  return (
    <main
      ref={storyShell}
      className={`story-shell${view === "albums" || view === "videos" ? " is-gallery" : ""}${["letter", "final-note", "malayalam-letter"].includes(view) ? " is-letter" : ""}`}
      onPointerDownCapture={noteActivity}
      onKeyDownCapture={noteActivity}
      onScrollCapture={noteActivity}
      onClickCapture={(event) => {
        noteActivity();
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
            if (!ambientStarted.current) return;
            if (audio.current?.paused) {
              void audio.current.play().then(() => setAmbientEnabled(true)).catch(() => undefined);
            }
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
          className={`story-view${view === "videos" ? " is-video-placeholder" : ""}`}
          initial={reduced || visitedViews.has(view) ? false : { opacity: 0, y: 18 }}
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
          {view === "voice" && (
            <Voice
              content={content}
              onPlayVoice={playVoice}
              onVoiceEnded={voiceEnded}
              completed={completedViews.has("voice")}
              onComplete={() => completeView("voice")}
            />
          )}
          {view === "voices" && <Voices content={content} onPlayVoice={playVoice} onVoiceEnded={voiceEnded} onComplete={() => completeView("voices")} />}
          {view === "quiz" && (
            <Quiz
              item={content.quiz[quiz]}
              final={quiz === content.quiz.length - 1}
              completed={completedViews.has("quiz")}
              onCorrect={() => { burstConfetti(); if (quiz === content.quiz.length - 1) completeView("quiz"); }}
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
          {view === "final-note" && <FinalNote content={content} completed={completedViews.has("final-note")} onReady={() => completeView("final-note")} />}
          {view === "malayalam-letter" && <MalayalamLetter completed={completedViews.has("malayalam-letter")} onReady={() => completeView("malayalam-letter")} />}
          {view === "final-photo" && <FinalPhoto content={content} />}
          {view === "cake" && <Cake completed={completedViews.has("cake")} onCelebrate={() => { celebrateCandle(); completeView("cake"); }} />}
          {view === "gift" && (
            <Gift completed={completedViews.has("gift")} onOpen={() => { burstConfetti(); completeView("gift"); }} />
          )}
          {view === "ending" && <Ending />}
          {view === "secret" && (
            <SecretAlbum
              content={content}
              onOpen={setMediaId}
              onExit={() => go("ending")}
            />
          )}
        </motion.section>
      </AnimatePresence>
      <Videos content={content} active={view === "videos"} enabled={videosReady} />
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
function Videos({ content, active, enabled }: { content: SafeContent; active: boolean; enabled: boolean }) {
  const players = useRef<Array<HTMLVideoElement | null>>([]);
  const videos = content.videos.map((video) => ({ video, media: content.media.find((item) => item.id === video.mediaId) })).filter((item): item is { video: SafeContent["videos"][number]; media: SafeContent["media"][number] } => Boolean(item.media));
  const playAll = useCallback(() => { players.current.forEach((video) => { if (video) void video.play().catch(() => undefined); }); }, []);
  useEffect(() => { if (enabled) playAll(); }, [enabled, playAll]);
  useEffect(() => {
    const visibility = () => { if (document.hidden) players.current.forEach((video) => video?.pause()); else if (enabled) playAll(); };
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, [enabled, playAll]);
  return (
    <section className={`collection video-memories${active ? " is-active" : ""}`} aria-hidden={!active}>
      <p className="eyebrow">little moments in motion</p>
      <h1>Little moving memories</h1>
      {videos.length ? (
        <div className="video-list">
          {videos.map(({ video, media }, index) => <article className="video-card" key={video.id}><video ref={(element) => { players.current[index] = element; }} src={enabled ? `/api/media/${media.id}` : undefined} muted loop playsInline preload="auto" aria-label={video.title} /><span>{video.title}</span></article>)}
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
  completed,
  onComplete,
}: {
  content: SafeContent;
  onPlayVoice: (voice: HTMLAudioElement) => void;
  onVoiceEnded: (voice: HTMLAudioElement) => void;
  completed: boolean;
  onComplete: () => void;
}) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const media = content.voice.mediaId
    ? content.media.find((item) => item.id === content.voice.mediaId)
    : undefined;
  return (
    <section className="voice voice-opening">
      <p className="eyebrow">just for you <Heart size={13} fill="currentColor" /></p>
      <h1>Before anything else…<br />I wanted you to hear me first. <Heart size={22} fill="currentColor" /></h1>
      {media ? (
        <div className="inline-audio">
          <audio ref={audio}
            src={`/api/media/${media.id}`}
            preload="metadata"
            onPlay={() => { setPlaying(true); if (audio.current) onPlayVoice(audio.current); }}
            onPause={() => { setPlaying(false); if (audio.current) onVoiceEnded(audio.current); }}
            onEnded={() => { setPlaying(false); if (audio.current) onVoiceEnded(audio.current); onComplete(); }}
          />
          <button className={`voice-play ${playing ? "is-playing" : ""}`} onClick={() => { if (!audio.current) return; if (audio.current.paused) onPlayVoice(audio.current); else audio.current.pause(); }} aria-label={playing ? "Pause voice message" : "Play voice message"}><span>{playing ? "❚❚" : "▶"}</span></button>
          <div className="wave" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} style={{ animationDelay: `${index * 45}ms` }} />)}</div>
          <p>{playing ? "Playing for you…" : completed ? "A little voice to keep close." : "Close your eyes for a moment and just listen."}</p>
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
function Voices({ content, onPlayVoice, onVoiceEnded, onComplete }: { content: SafeContent; onPlayVoice: (voice: HTMLAudioElement) => void; onVoiceEnded: (voice: HTMLAudioElement) => void; onComplete: () => void }) {
  const voices = content.voices.length ? content.voices : content.voice.mediaId ? [{ id: "voice-01", title: "One More Message ♥", description: "Before we continue, I wanted you to hear this.", mediaId: content.voice.mediaId }] : [];
  return <section className="voice voices"><p className="eyebrow">before your gift…</p><h1>There are a few people<br />who wanted to wish you<br />something special. <Heart size={22} fill="currentColor" /></h1><p className="lede">Take a moment and listen before opening your final surprise.</p>{voices.length ? voices.map((voice, index) => { const media = content.media.find((item) => item.id === voice.mediaId); return media && <VoiceCard key={voice.id} media={media} number={index + 1} title={voice.title} description={voice.description} duration={voice.duration} onPlayVoice={onPlayVoice} onVoiceEnded={onVoiceEnded} onComplete={index === voices.length - 1 ? onComplete : undefined} />; }) : <Empty title="More little surprises are waiting" text="Approved recordings will appear here when they are ready." />}<p className="voice-note">Some words stay with us forever. Swipe when you are ready to continue our story.</p></section>;
}
function VoiceCard({ media, number, title, description, duration, onPlayVoice, onVoiceEnded, onComplete }: { media: SafeContent["media"][number]; number: number; title: string; description?: string; duration?: string; onPlayVoice: (voice: HTMLAudioElement) => void; onVoiceEnded: (voice: HTMLAudioElement) => void; onComplete?: () => void }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  return <article className={`voice-card ${playing ? "is-playing" : ""}`}><audio ref={audio} src={`/api/media/${media.id}`} preload="metadata" onPlay={() => { setPlaying(true); if (audio.current) onPlayVoice(audio.current); }} onPause={() => { setPlaying(false); if (audio.current) onVoiceEnded(audio.current); }} onEnded={() => { setPlaying(false); if (audio.current) onVoiceEnded(audio.current); onComplete?.(); }} /><span className="voice-count">Message {String(number).padStart(2, "0")} ♥</span><h2>{title}</h2>{description && <p>{description}</p>}<div className="voice-card-actions"><button className="secondary" onClick={() => { if (!audio.current) return; if (audio.current.paused) onPlayVoice(audio.current); else audio.current.pause(); }}>{playing ? "Pause" : "Play"} <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span></button>{duration && <small>{duration}</small>}</div><div className="wave card-wave" aria-hidden="true">{Array.from({ length: 22 }, (_, index) => <i key={index} style={{ animationDelay: `${index * 35}ms` }} />)}</div></article>;
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
  completed,
  onCorrect,
  onNext,
}: {
  item: StoryContent["quiz"][number];
  final: boolean;
  completed: boolean;
  onCorrect: () => void;
  onNext: () => void;
}) {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [accepted, setAccepted] = useState(completed);
  const isAccepted = accepted || completed;
  const dateQuestion = item.acceptedAnswers.some((value) =>
    /^\d{4}-\d{2}-\d{2}$/.test(value),
  );
  const updateAnswer = (value: string) => {
    setAnswer(value);
      if (!completed) setAccepted(false);
    setFeedback("");
  };
  const submit = () => {
    if (matchesAnswer(answer, item.acceptedAnswers)) {
      setAccepted(true);
      setFeedback("That is right. ✦");
      onCorrect();
      navigator.vibrate?.(15);
      if (!final) window.setTimeout(onNext, 900);
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
      <button className="primary quiz-reveal" onClick={submit} disabled={isAccepted}>
        {isAccepted ? "Memory unlocked" : "Reveal this memory"} <ArrowRight />
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
function FinalNote({ content, completed, onReady }: { content: SafeContent; completed: boolean; onReady: () => void }) {
  return (
    <article className="letter final-note">
      <p className="eyebrow">one last note</p>
      <h1>For you, {content.participants.nickname}.</h1>
      <HandwrittenPaper completed={completed} onReady={onReady} />
      <footer>{content.letter.signature}</footer>
    </article>
  );
}
function FinalPhoto({ content }: { content: SafeContent }) {
  const photo = content.media.find((item) => item.id === "photo-last") ?? content.media.find((item) => item.kind === "image");
  return <section className="final-photo"><p className="eyebrow">one more look</p>{photo && <MediaImage media={photo} priority />}<p>Always us.</p></section>;
}
const malayalamLetter = `എന്റെ ജീവിതത്തിൽ എനിക്ക് ഏറ്റവും വിലപ്പെട്ട ഒരാൾ നീയാണ്... 🥹❤️ നിന്നെ കണ്ടതിനുശേഷമാണ് സ്നേഹത്തിന് ഇത്രയും ഭംഗിയുണ്ടെന്ന് ഞാൻ മനസ്സിലാക്കിയത്.എന്റെ സന്തോഷങ്ങളിലും സങ്കടങ്ങളിലും എന്നെ ചേർത്ത് പിടിച്ച് കൂടെയുണ്ടാകുന്ന ഒരേയൊരു മനുഷ്യൻ നീ. 🫂 നീ എന്നെ മനസ്സിലാക്കുന്ന ഓരോ നിമിഷവും എനിക്ക് ലോകം മുഴുവൻ സ്വന്തമായതുപോലെയാണ് തോന്നുന്നത്.എത്ര ദൂരെയായാലും, എത്ര തിരക്കായാലും, നിന്റെ ഒരു മെസ്സേജോ ഒരു വിളിയോ മതി എന്റെ ദിവസം മനോഹരമാക്കാൻ. 🥹💞എനിക്ക് ഒരുപാട് ആളുകളെ നഷ്ടമായിട്ടുണ്ടാകാം... പക്ഷേ നിന്നെ മാത്രം ഒരിക്കലും നഷ്ടപ്പെടുത്താൻ ഞാൻ ആഗ്രഹിക്കുന്നില്ല. കാരണം നീ എന്റെ ജീവിതത്തിലെ ഒരു ഭാഗമല്ല... എന്റെ ജീവിതം തന്നെയാണ്. 💕 എന്റെ പ്രാർത്ഥനകളിൽ എന്നും ആദ്യം വരുന്ന പേര് നീയാണ്. ഇനി എത്രയൊക്കെ കാലം കഴിഞ്ഞാലും എന്നും എപ്പോഴും നീ എന്റെ കൂടെതന്നെ ഉണ്ടാവണം. 🥹🤎\n\n"I choose you... today, tomorrow, and forever.!!" 🥹❤️🌍`;
const handwrittenLetter = `Happy Birthdeyyy ponneehh
. You are most
favourite person in my life . This day I wanna thank you for beingg my Life I wanted to make you feel special
, and try to make
you more happiest you're the best I've in my life
LOVE YOU SO MUCH
I'll loveyouh forever ( And I'll loveyouh alwayyss , And you will forever
be mine and I will forever be yours
You bring light, laughter, and make my life wonderful .
May your day be filled with all the happiness you deserve, and may this year bring you endless success, peace, and joy.
Always stay the amazing person you are — the world is better with you in it.
Love you always.
And once again happy birthday shuttmani May you have a happy and blessed day
I'm always here to support you, to stand by your side in difficult times and to celebrate with you in happy times Thank you for making everything good for me
Stay happy and healthy my dear shuttmaniii`;
const handwrittenLines = handwrittenLetter.split("\n");
function MalayalamLetter({ completed, onReady }: { completed: boolean; onReady: () => void }) {
  const text = useRef<HTMLSpanElement>(null);
  const cursor = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (completed) {
      if (text.current) text.current.textContent = malayalamLetter;
      return;
    }
    if (text.current) text.current.textContent = "";
    cursor.current?.classList.remove("is-fading");
    const [body, quote] = malayalamLetter.split("\n\n");
    const segment = (value: string) => Array.from(new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(value), ({ segment }) => segment);
    const bodyGraphemes = segment(body);
    const quoteGraphemes = segment(quote);
    let writingQuote = false;
    let index = 0;
    let next = performance.now();
    let frame = 0;
    let timer = 0;
    const delayFor = (glyph: string) => glyph === "," ? 150 + Math.random() * 100 : glyph === "." || glyph === "…" ? 350 + Math.random() * 150 : 60 + Math.random() * 60;
    const tick = (now: number) => {
      const graphemes = writingQuote ? quoteGraphemes : bodyGraphemes;
      if (now >= next && index < graphemes.length) {
        const glyph = graphemes[index++];
        if (text.current) text.current.textContent += `${writingQuote && index === 1 ? "\n\n" : ""}${glyph}`;
        next = now + delayFor(glyph);
      }
      if (index < graphemes.length) frame = requestAnimationFrame(tick);
      else if (!writingQuote) {
        writingQuote = true;
        index = 0;
        next = now + 850 + Math.random() * 150;
        frame = requestAnimationFrame(tick);
      } else timer = window.setTimeout(() => { cursor.current?.classList.add("is-fading"); onReady(); }, 2300);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); window.clearTimeout(timer); };
  }, [completed, onReady]);
  return <article className="finale-letter malayalam-letter"><p className="eyebrow">from my heart</p><p className="typed-letter" aria-label={malayalamLetter}><span ref={text} /><span ref={cursor} className="typing-cursor" aria-hidden="true" /></p></article>;
}
function HandwrittenPaper({ completed, onReady }: { completed: boolean; onReady: () => void }) {
  const paper = useRef<HTMLDivElement>(null);
  const refs = useRef<Array<HTMLParagraphElement | null>>([]);
  const [lines, setLines] = useState(handwrittenLines);
  const [layoutReady, setLayoutReady] = useState(false);
  useLayoutEffect(() => {
    const element = paper.current;
    if (!element) return;
    const line = element.querySelector("p");
    if (!line) return;
    const style = getComputedStyle(line);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;
    context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const maxWidth = element.clientWidth - Number.parseFloat(getComputedStyle(element).paddingLeft) - Number.parseFloat(getComputedStyle(element).paddingRight);
    const wrapped = handwrittenLines.flatMap((source) => {
      if (!source) return [""];
      const words = source.split(" ");
      const result: string[] = [];
      let line = "";
      words.forEach((word) => {
        const next = line ? `${line} ${word}` : word;
        if (line && context.measureText(next).width > maxWidth) {
          result.push(line);
          line = word;
        } else line = next;
      });
      if (line) result.push(line);
      return result;
    });
    refs.current = [];
    setLines(wrapped);
    setLayoutReady(true);
  }, []);
  useEffect(() => {
    if (!layoutReady) return;
    if (completed) {
      refs.current.forEach((element) => element?.style.setProperty("--ink-reveal", "1"));
      return;
    }
    let line = 0;
    let started = performance.now();
    const writingDuration = (value: string) => Math.max(700, value.length * 34 + (value.match(/[,.]/g)?.length ?? 0) * 110 + Math.random() * 100);
    let duration = writingDuration(lines[line]);
    let frame = 0;
    let timer = 0;
    const tick = (now: number) => {
      const element = refs.current[line];
      if (!element) return;
      const progress = Math.min(1, Math.max(0, (now - started) / duration));
      element.style.setProperty("--ink-reveal", String(progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
      else if (line < lines.length - 1) {
        line += 1;
        started = now + 180;
        duration = writingDuration(lines[line]);
        frame = requestAnimationFrame(tick);
      } else timer = window.setTimeout(onReady, 3500);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); window.clearTimeout(timer); };
  }, [completed, layoutReady, lines, onReady]);
  return <div ref={paper} data-story-interactive className={`handwritten-paper${layoutReady ? " is-ready" : ""}`} aria-label={handwrittenLetter}>{lines.map((line, index) => <p key={`${index}-${line}`} ref={(element) => { refs.current[index] = element; }} style={{ "--ink-reveal": 0 } as React.CSSProperties}>{line || " "}</p>)}</div>;
}
function Cake({ completed, onCelebrate }: { completed: boolean; onCelebrate: () => void }) {
  const [lit, setLit] = useState(!completed);
  const isLit = lit && !completed;
  return (
    <section className="cake">
      <p className="eyebrow">make a wish</p>
      <button
        className={`cake-art ${isLit ? "lit" : ""}`}
        onClick={() => { if (!isLit) return; setLit(false); onCelebrate(); navigator.vibrate?.(15); }}
        aria-label="Blow out the candle"
      >
        <span className="flame" />
        <span className="cake-base"><i /><i /><i /></span>
      </button>
      <h1>{isLit ? "Tap the candle" : "Wish made."}</h1>
      <p>
        {isLit
          ? "Your tap is all it takes."
          : "May this year be as lovely as you are."}
      </p>
    </section>
  );
}
function Gift({ completed, onOpen }: { completed: boolean; onOpen: () => void }) {
  const [open, setOpen] = useState(completed);
  const isOpen = open || completed;
  return (
    <section className="gift">
      <p className="eyebrow">one last thing</p>
      <button
        className={`gift-box ${isOpen ? "open" : ""}`}
        onClick={() => {
          if (isOpen) return;
          setOpen(true);
          onOpen();
          navigator.vibrate?.(15);
        }}
        aria-label="Open your gift"
      >
        <span className="gift-lid" /><span className="gift-ribbon" /><span className="gift-body" />
      </button>
      <h1>{isOpen ? "A whole world of love." : "Open your gift."}</h1>
      <p>{isOpen ? "happy birthday shuttmani" : "A little shake, then a tap."}</p>
    </section>
  );
}
function Ending() {
  const [signature, setSignature] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setSignature(true), 3600);
    return () => window.clearTimeout(timer);
  }, []);
  return <section className="cinematic-ending"><p className={`cinematic-ending-copy${signature ? " is-signature" : ""}`}>{signature ? <>Made with love,<br />Rashi</> : <>Happy Birthday,<br />Sudd.<br /><Heart fill="currentColor" aria-label="love" /></>}</p></section>;
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
