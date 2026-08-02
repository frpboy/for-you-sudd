export type BirthdayState = "before" | "birthday" | "after";

export function getBirthdayState(nowEpochMs: number, birthdayStartEpochMs: number, nextDayEpochMs: number): BirthdayState {
  if (nowEpochMs < birthdayStartEpochMs) return "before";
  if (nowEpochMs < nextDayEpochMs) return "birthday";
  return "after";
}

export function getCountdownMs(nowEpochMs: number, birthdayStartEpochMs: number): number {
  return Math.max(0, birthdayStartEpochMs - nowEpochMs);
}
