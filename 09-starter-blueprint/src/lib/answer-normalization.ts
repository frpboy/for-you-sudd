export function normalizeTextAnswer(value: string): string {
  return value.normalize("NFKC").trim().replace(/\s+/g, " ").toLocaleLowerCase("en-IN");
}

export function isAcceptedTextAnswer(value: string, accepted: readonly string[]): boolean {
  const normalized = normalizeTextAnswer(value);
  return accepted.some((candidate) => normalizeTextAnswer(candidate) === normalized);
}

export function isAcceptedIsoDate(value: string, accepted: readonly string[]): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && accepted.includes(value);
}
