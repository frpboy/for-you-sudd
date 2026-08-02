import { describe, expect, it } from "vitest";
import { countdownParts, getBirthdayState } from "@/lib/birthday-state";
describe("birthday state", () => {
  it("uses the Asia/Kolkata birthday boundary", () => {
    expect(getBirthdayState("2026-08-08", new Date("2026-08-07T18:29:59.999Z"))).toBe("before");
    expect(getBirthdayState("2026-08-08", new Date("2026-08-07T18:30:00.000Z"))).toBe("birthday");
  });
  it("does not return negative countdown parts", () => expect(countdownParts("2026-08-08", new Date("2027-01-01")).days).toBe(0));
});
