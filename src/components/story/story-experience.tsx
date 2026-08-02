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
import { useEffect, useMemo, useRef, useState } from "react";
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
  | "albums"
  | "videos"
  | "voice"
  | "quiz"
  | "memories"
  | "reasons"
  | "dreams"
  | "letter"
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
  albums: "Photos",
  videos: "Videos",
  voice: "Voice",
  quiz: "Quiz",
  memories: "Memories",
  reasons: "Reasons",
  dreams: "Dreams",
  letter: "Letter",
  cake: "Cake",
  gift: "Gift",
  ending: "Ending",
  secret: "A small secret",
};

export function StoryExperience({ content }: { content: SafeContent }) {
  const reduced = useReducedMotion();
  const sequence = useMemo<View[]>(
    () => [
      "preflight",
      "start",
      "welcome",
      "countdown",
      "chapters",
      "albums",
      "videos",
      "voice",
      "quiz",
      ...(content.features.memoryJar ? ["memories" as const] : []),
      ...(content.features.reasons ? ["reasons" as const] : []),
      ...(content.features.dreams ? ["dreams" as const] : []),
      "letter",
      ...(content.features.cake ? ["cake" as const] : []),
      "gift",
      "ending",
    ],
    [content.features],
  );
  const [view, setView] = useState<View>(() =>
    typeof window === "undefined"
      ? "preflight"
      : (localStorage.getItem("for-u-sudd-progress") as View) || "preflight",
  );
  const [chapter, setChapter] = useState(0);
  const [quiz, setQuiz] = useState(0);
  const [muted, setMuted] = useState(
    () =>
      typeof window === "undefined" ||
      localStorage.getItem("for-u-sudd-muted") !== "false",
  );
  const [mediaId, setMediaId] = useState<string | null>(null);
  const [confetti, setConfetti] = useState(false);
  const [tapPulse, setTapPulse] = useState<{ x: number; y: number; id: number } | null>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const resumeAfterFocus = useRef(false);
  const mediaWarmed = useRef(false);
  const index = sequence.indexOf(view);
  useEffect(() => {
    localStorage.setItem("for-u-sudd-progress", view);
  }, [view]);
  useEffect(() => {
    localStorage.setItem("for-u-sudd-muted", String(muted));
  }, [muted]);
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
  useEffect(() => {
    if (!content.musicMediaId || !audio.current) return;
    audio.current.muted = muted;
    if (!muted && view !== "start")
      void audio.current.play().catch(() => setMuted(true));
  }, [muted, view, content.musicMediaId]);
  useEffect(() => {
    const pauseForInterruption = () => {
      const player = audio.current;
      resumeAfterFocus.current = Boolean(player && !muted && !player.paused);
      player?.pause();
    };
    const resumeAfterInterruption = () => {
      const player = audio.current;
      if (resumeAfterFocus.current && !muted && player)
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
  }, [muted]);
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
  const pauseMusicForVoice = () => audio.current?.pause();
  const burstConfetti = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 2400);
  };
  const resumeMusicAfterVoice = () => {
    if (!document.hidden && !muted)
      void audio.current?.play().catch(() => setMuted(true));
  };
  return (
    <main
      className="story-shell"
      onClickCapture={(event) => {
        if (!event.detail) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        setTapPulse({ x: event.clientX - bounds.left, y: event.clientY - bounds.top, id: Date.now() });
      }}
    >
      {tapPulse && <span key={tapPulse.id} className="tap-pulse" aria-hidden="true" style={{ left: tapPulse.x, top: tapPulse.y }} onAnimationEnd={() => setTapPulse(null)} />}
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
      <header className="story-header">
        <span className="story-brand">
          for u, {content.participants.nickname.toLowerCase()}
        </span>
        <span aria-live="polite">
          {labels[view]} · {index + 1} / {sequence.length}
        </span>
        <button
          className="icon-button"
          aria-label={muted ? "Turn music on" : "Mute music"}
          onClick={() => setMuted((value) => !value)}
        >
          {muted ? <VolumeX /> : <Volume2 />}
        </button>
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
          {view === "start" && (
            <Start
              onBegin={() => go("welcome")}
              muted={muted}
              setMuted={setMuted}
            />
          )}
          {view === "welcome" && <Welcome content={content} onNext={next} />}
          {view === "countdown" && (
            <Countdown birthday={content.project.birthday} onNext={next} />
          )}
          {view === "chapters" && (
            <Chapter
              chapter={content.chapters[chapter]}
              media={content.media.find(
                (item) => item.id === content.chapters[chapter].mediaId,
              )}
            />
          )}
          {view === "albums" && (
            <Albums content={content} onOpen={setMediaId} />
          )}
          {view === "videos" && (
            <Videos
              content={content}
              onForegroundPlay={pauseMusicForVoice}
              onForegroundEnd={resumeMusicAfterVoice}
            />
          )}
          {view === "voice" && (
            <Voice
              content={content}
              onForegroundPlay={pauseMusicForVoice}
              onForegroundEnd={resumeMusicAfterVoice}
            />
          )}
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
          {view === "cake" && <Cake onNext={next} />}
          {view === "gift" && (
            <Gift onOpen={burstConfetti} />
          )}
          {view === "ending" && (
            <Ending
              content={content}
              onSecret={() => go("secret")}
              onReplay={() => {
                localStorage.removeItem("for-u-sudd-progress");
                setChapter(0);
                setQuiz(0);
                go("welcome");
              }}
            />
          )}
          {view === "secret" && (
            <SecretAlbum
              content={content}
              onOpen={setMediaId}
              onExit={() => go("ending")}
            />
          )}
        </motion.section>
      </AnimatePresence>
      {view !== "start" && view !== "ending" && view !== "quiz" && (
        <nav className="story-nav" aria-label="Story navigation">
          <button
            className="secondary"
            onClick={previous}
            disabled={index === 0}
          >
            <ArrowLeft aria-hidden="true" /> Back
          </button>
          <button className="primary" onClick={next}>
            Continue <ArrowRight aria-hidden="true" />
          </button>
        </nav>
      )}
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
    const timer = setTimeout(() => setReady(true), 420);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="poster preflight">
      <Heart className="poster-heart" fill="currentColor" aria-hidden="true" />
      <p className="eyebrow">loading memories</p>
      <h1>{ready ? "Ready when you are." : "Just a moment…"}</h1>
      <p>
        {ready
          ? "The first memory is waiting."
          : "Preparing only the next small piece of your story."}
      </p>
      {ready && (
        <button className="primary" onClick={onReady}>
          Continue <ArrowRight />
        </button>
      )}
    </div>
  );
}
function Start({
  onBegin,
  muted,
  setMuted,
}: {
  onBegin: () => void;
  muted: boolean;
  setMuted: (value: boolean) => void;
}) {
  return (
    <div className="poster start">
      <Heart className="poster-heart" fill="currentColor" aria-hidden="true" />
      <p className="eyebrow">a private birthday story</p>
      <h1>
        For you,
        <br />
        <em>always.</em>
      </h1>
      <p>One small journey made from the moments that matter.</p>
      <button className="primary" onClick={onBegin}>
        Tap to begin <ArrowRight aria-hidden="true" />
      </button>
      <button className="quiet-button" onClick={() => setMuted(!muted)}>
        {muted ? (
          <>
            <Volume2 /> Begin with music
          </>
        ) : (
          <>
            <VolumeX /> Begin quietly
          </>
        )}
      </button>
    </div>
  );
}
function Welcome({
  content,
  onNext,
}: {
  content: SafeContent;
  onNext: () => void;
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
      <button className="primary" onClick={onNext}>
        Begin our story <ArrowRight />
      </button>
    </div>
  );
}
function Countdown({
  birthday,
  onNext,
}: {
  birthday: string;
  onNext: () => void;
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
      <button className="primary" onClick={onNext}>
        Continue <ArrowRight />
      </button>
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
function Albums({
  content,
  onOpen,
}: {
  content: SafeContent;
  onOpen: (id: string) => void;
}) {
  return (
    <section className="collection">
      <p className="eyebrow">the little things</p>
      <h1>Our photo album</h1>
      {content.albums.map((album) => (
        <div className="album" key={album.id}>
          <h2>{album.title}</h2>
          <div className="photo-grid">
            {album.mediaIds.map((id) => {
              const media = content.media.find((item) => item.id === id);
              return (
                media && (
                  <button
                    className="photo-button"
                    onClick={() => onOpen(id)}
                    key={id}
                  >
                    <MediaImage media={media} />
                    <span>{media.caption}</span>
                  </button>
                )
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
function Videos({
  content,
  onForegroundPlay,
  onForegroundEnd,
}: {
  content: SafeContent;
  onForegroundPlay: () => void;
  onForegroundEnd: () => void;
}) {
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
                    onPlay={onForegroundPlay}
                    onPause={onForegroundEnd}
                    onEnded={onForegroundEnd}
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
  onForegroundPlay,
  onForegroundEnd,
}: {
  content: SafeContent;
  onForegroundPlay: () => void;
  onForegroundEnd: () => void;
}) {
  const media = content.voice.mediaId
    ? content.media.find((item) => item.id === content.voice.mediaId)
    : undefined;
  return (
    <section className="voice">
      <p className="eyebrow">a voice to keep</p>
      <h1>{content.voice.title}</h1>
      {media ? (
        <div className="inline-audio">
          <audio
            src={`/api/media/${media.id}`}
            controls
            preload="metadata"
            onPlay={onForegroundPlay}
            onPause={onForegroundEnd}
            onEnded={onForegroundEnd}
          />
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
      <button className="primary" onClick={accepted ? onNext : submit}>
        {accepted ? (final ? "Open the letter" : "Next question") : "Continue"}{" "}
        <ArrowRight />
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
    .filter((item): item is SafeContent["media"][number] => Boolean(item));
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
function Cake({ onNext }: { onNext: () => void }) {
  const [lit, setLit] = useState(true);
  return (
    <section className="cake">
      <p className="eyebrow">make a wish</p>
      <button
        className={`cake-art ${lit ? "lit" : ""}`}
        onClick={() => setLit(false)}
        aria-label="Blow out the candle"
      >
        <span className="flame" />
        🎂
      </button>
      <h1>{lit ? "Tap the candle" : "Wish made."}</h1>
      <p>
        {lit
          ? "Your tap is all it takes."
          : "May this year be as lovely as you are."}
      </p>
      {!lit && (
        <button className="primary" onClick={onNext}>
          One more surprise <ArrowRight />
        </button>
      )}
    </section>
  );
}
function Gift({ onOpen }: { onOpen: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="gift">
      <p className="eyebrow">one last thing</p>
      <button
        className={`gift-box ${open ? "open" : ""}`}
        onClick={() => {
          setOpen(true);
          onOpen();
        }}
        aria-label="Open your gift"
      >
        🎁
      </button>
      <h1>{open ? "A whole world of love." : "Open your gift."}</h1>
      <p>{open ? "Happy Birthday, Sudd." : "Tap it — no shaking required."}</p>
    </section>
  );
}
function Ending({
  content,
  onReplay,
  onSecret,
}: {
  content: SafeContent;
  onReplay: () => void;
  onSecret: () => void;
}) {
  const [presses, setPresses] = useState(0);
  useEffect(() => {
    if (!presses) return;
    const timer = setTimeout(() => setPresses(0), 1500);
    return () => clearTimeout(timer);
  }, [presses]);
  const reveal = () => {
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
