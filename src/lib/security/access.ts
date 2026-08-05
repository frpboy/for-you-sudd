import "server-only";
import { timingSafeEqual } from "node:crypto";
import { normalizeAnswer } from "@/lib/answer-normalization";

const attempts = new Map<string, { count: number; until: number }>();
const windowMs = 15 * 60 * 1000;
const maximumAttempts = Number(process.env.ACCESS_RATE_LIMIT_MAX ?? 8);

export function checkRateLimit(key: string) {
  const now = Date.now(); const entry = attempts.get(key);
  if (!entry || entry.until < now) { attempts.set(key, { count: 1, until: now + windowMs }); return true; }
  entry.count += 1; return entry.count <= maximumAttempts;
}

export function verifyPassphrase(value: string) {
  const expected = process.env.ACCESS_PASSPHRASE;
  if (!expected) return process.env.NODE_ENV !== "production" && normalizeAnswer(value) === "demo";
  const actualBytes = Buffer.from(value); const expectedBytes = Buffer.from(expected);
  return actualBytes.length === expectedBytes.length && timingSafeEqual(actualBytes, expectedBytes);
}

export function allowedOrigin(origin: string | null, expectedOrigin: string) {
  if (origin === expectedOrigin) return true;
  try {
    const hostname = new URL(origin ?? "").hostname;
    return (hostname === "127.0.0.1" || hostname === "localhost" || hostname === "::1") && expectedOrigin.includes("://localhost:");
  } catch { return false; }
}
