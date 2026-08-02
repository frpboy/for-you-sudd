export type StoryEvent = { type: "AUTHORIZED" | "STARTED" | "NEXT" | "PREVIOUS" | "GO_TO" | "REPLAY" | "RESET"; view?: string };
export type StoryState = { view: string; chapter: number; quiz: number };
export const initialStoryState: StoryState = { view: "preflight", chapter: 0, quiz: 0 };
export function storyReducer(state: StoryState, event: StoryEvent): StoryState {
  if (event.type === "AUTHORIZED") return { ...state, view: "start" };
  if (event.type === "STARTED") return { ...state, view: "welcome" };
  if (event.type === "GO_TO" && event.view) return { ...state, view: event.view };
  if (event.type === "REPLAY" || event.type === "RESET") return initialStoryState;
  if (event.type === "NEXT" && state.view === "chapters") return { ...state, chapter: state.chapter + 1 };
  if (event.type === "PREVIOUS" && state.view === "chapters") return { ...state, chapter: Math.max(0, state.chapter - 1) };
  return state;
}
