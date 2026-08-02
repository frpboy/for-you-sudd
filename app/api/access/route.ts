import { NextRequest, NextResponse } from "next/server";
import { allowedOrigin, checkRateLimit, verifyPassphrase } from "@/lib/security/access";
import { createSessionToken, sessionCookie } from "@/lib/security/session";

export async function POST(request: NextRequest) {
  if (!allowedOrigin(request.headers.get("origin"), request.nextUrl.origin)) return NextResponse.json({ error: "Unable to continue." }, { status: 403 });
  const client = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (!checkRateLimit(client)) return NextResponse.json({ error: "Please wait a moment before trying again." }, { status: 429 });
  const body = await request.json().catch(() => null) as { passphrase?: unknown } | null;
  if (typeof body?.passphrase !== "string" || !verifyPassphrase(body.passphrase)) return NextResponse.json({ error: "That did not unlock this story. Please try again." }, { status: 401 });
  const response = NextResponse.json({ ok: true }); response.cookies.set(sessionCookie(createSessionToken())); return response;
}
