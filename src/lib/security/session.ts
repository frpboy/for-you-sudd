import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

const cookieName = "for-u-sudd-session";
const maxAge = 60 * 60 * 12;
const secret = () => process.env.SESSION_SECRET ?? (process.env.NODE_ENV === "production" ? "" : "local-development-session-secret-change-me");
const sign = (payload: string) => createHmac("sha256", secret()).update(payload).digest("base64url");

export function createSessionToken(now = Date.now()) {
  if (!secret()) throw new Error("SESSION_SECRET is required in production.");
  const payload = Buffer.from(JSON.stringify({ exp: now + maxAge * 1000, v: 1 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function isValidSession(token?: string) {
  if (!token || !secret()) return false;
  const [payload, provided] = token.split(".");
  if (!payload || !provided) return false;
  const expected = sign(payload);
  if (provided.length !== expected.length || !timingSafeEqual(Buffer.from(provided), Buffer.from(expected))) return false;
  try { return (JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { exp: number }).exp > Date.now(); } catch { return false; }
}

export const sessionCookie = (value: string) => ({ name: cookieName, value, httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production" && process.env.ALLOW_INSECURE_TEST_COOKIE !== "true", path: "/", maxAge });
export const sessionCookieName = cookieName;
