export type BirthdayState = "before" | "birthday";
export const birthdayMoment = (birthday: string) => new Date(`${birthday}T00:00:00+05:30`);
export const getBirthdayState = (birthday: string, now = new Date()): BirthdayState => now < birthdayMoment(birthday) ? "before" : "birthday";
export const countdownParts = (birthday: string, now = new Date()) => {
  const delta = Math.max(0, birthdayMoment(birthday).getTime() - now.getTime());
  return { days: Math.floor(delta / 86400000), hours: Math.floor(delta / 3600000) % 24, minutes: Math.floor(delta / 60000) % 60, seconds: Math.floor(delta / 1000) % 60 };
};
