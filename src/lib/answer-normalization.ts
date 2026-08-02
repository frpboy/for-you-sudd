export const normalizeAnswer = (value: string) => value.trim().toLocaleLowerCase("en-IN").replace(/[^a-z0-9]+/g, " ").trim();
export const matchesAnswer = (answer: string, accepted: string[]) => accepted.some((item) => normalizeAnswer(item) === normalizeAnswer(answer));
