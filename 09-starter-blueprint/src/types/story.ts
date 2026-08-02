export type StorySectionId =
  | "welcome" | "countdown" | "timeline" | "gallery" | "videos"
  | "voice" | "quiz" | "memories" | "reasons" | "dreams"
  | "letter" | "cake" | "finale" | "ending";

export type StoryState = {
  section: StorySectionId;
  chapterIndex: number;
  quizIndex: number;
  quizCompleted: boolean;
  overlay: null | { kind: "image" | "video"; mediaId: string };
};

export type StoryEvent =
  | { type: "NEXT" }
  | { type: "PREVIOUS" }
  | { type: "OPEN_MEDIA"; kind: "image" | "video"; mediaId: string }
  | { type: "CLOSE_MEDIA" }
  | { type: "QUIZ_ACCEPTED" }
  | { type: "REPLAY" };
