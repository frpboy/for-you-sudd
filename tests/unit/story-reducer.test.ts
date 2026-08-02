import { describe, expect, it } from "vitest";
import { initialStoryState, storyReducer } from "@/lib/story/reducer";
describe("story reducer", () => { it("advances chapter navigation without going below zero", () => { expect(storyReducer(initialStoryState, { type: "AUTHORIZED" }).view).toBe("start"); expect(storyReducer({ ...initialStoryState, view: "chapters" }, { type: "PREVIOUS" }).chapter).toBe(0); expect(storyReducer({ ...initialStoryState, view: "chapters" }, { type: "NEXT" }).chapter).toBe(1); }); });
