import "server-only";
import { createReadStream, existsSync, statSync } from "node:fs";
import { basename, resolve } from "node:path";
import { getContent, getMedia } from "@/content/loader";

const types: Record<string, string> = { ".jpeg": "image/jpeg", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".mp4": "video/mp4", ".mp3": "audio/mpeg", ".m4a": "audio/mp4", ".ogg": "audio/ogg" };
const extension = (path: string) => path.slice(path.lastIndexOf(".")).toLowerCase();

export function findPrivateMedia(id: string) {
  const content = getContent(); const media = getMedia(content, id);
  if (!media) return null;
  const root = content.mode === "demo" ? resolve(process.cwd(), "public") : (process.env.PRIVATE_MEDIA_ROOT ?? resolve(process.cwd(), "private-media"));
  const source = resolve(/* turbopackIgnore: true */ root, media.privatePath);
  if (!existsSync(source) || basename(source) !== basename(media.privatePath)) return null;
  return { source, media, size: statSync(source).size, type: types[extension(source)] ?? "application/octet-stream" };
}

export function streamMedia(path: string, start?: number, end?: number) { return createReadStream(path, start === undefined ? undefined : { start, end }); }

export async function fetchRemoteMedia(id: string, range: string | null) {
  const baseUrl = process.env.PRIVATE_MEDIA_BASE_URL;
  if (!baseUrl) return null;
  const media = getMedia(getContent(), id);
  if (!media) return null;
  const url = new URL(encodeURIComponent(media.privatePath), baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`);
  const headers = new Headers(); const token = process.env.PRIVATE_MEDIA_TOKEN;
  if (range) headers.set("Range", range); if (token) headers.set("Authorization", `Bearer ${token}`);
  const response = await fetch(url, { headers, redirect: "follow", cache: "no-store" });
  return response.ok || response.status === 206 ? { response, media } : null;
}
