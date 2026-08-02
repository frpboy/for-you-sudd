import { NextRequest, NextResponse } from "next/server";
import { Readable } from "node:stream";
import { findPrivateMedia, streamMedia } from "@/lib/media/provider";
import { isValidSession, sessionCookieName } from "@/lib/security/session";

export const runtime = "nodejs";
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isValidSession(request.cookies.get(sessionCookieName)?.value)) return new NextResponse("Not found", { status: 404 });
  const item = findPrivateMedia((await params).id); if (!item) return new NextResponse("Not found", { status: 404 });
  const range = request.headers.get("range");
  const headers = new Headers({ "Content-Type": item.type, "Accept-Ranges": "bytes", "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" });
  if (!range) { headers.set("Content-Length", String(item.size)); return new NextResponse(Readable.toWeb(streamMedia(item.source)) as ReadableStream, { headers }); }
  const match = /bytes=(\d*)-(\d*)/.exec(range); if (!match) return new NextResponse(null, { status: 416 });
  const start = match[1] ? Number(match[1]) : 0; const end = match[2] ? Math.min(Number(match[2]), item.size - 1) : item.size - 1;
  if (start > end || start >= item.size) return new NextResponse(null, { status: 416 });
  headers.set("Content-Range", `bytes ${start}-${end}/${item.size}`); headers.set("Content-Length", String(end - start + 1));
  return new NextResponse(Readable.toWeb(streamMedia(item.source, start, end)) as ReadableStream, { status: 206, headers });
}
