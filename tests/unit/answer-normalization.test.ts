import { describe, expect, it } from "vitest";
import { matchesAnswer, normalizeAnswer } from "@/lib/answer-normalization";
describe("answer normalization", () => { it("matches punctuation and case variants", () => { expect(normalizeAnswer("  SWITZERLAND! ")).toBe("switzerland"); expect(matchesAnswer("Switzerland!", ["switzerland"])).toBe(true); }); });
