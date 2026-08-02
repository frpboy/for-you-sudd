import { existsSync, readFileSync } from "node:fs";
import { isAbsolute, resolve } from "node:path";
import { contentSchema } from "../src/content/schema";

const configuredPath = process.env.CONTENT_CONFIG_PATH ?? "content/content-config.demo.json";
const path = isAbsolute(configuredPath) ? configuredPath : resolve(process.cwd(), configuredPath);
const content = contentSchema.parse(JSON.parse(readFileSync(path, "utf8")));
const ids = new Set<string>(); const errors: string[] = [];
for (const item of content.media) { if (ids.has(item.id)) errors.push(`Duplicate media ID: ${item.id}`); ids.add(item.id); const source = resolve(content.mode === "demo" ? "public" : (process.env.PRIVATE_MEDIA_ROOT ?? "."), item.privatePath); if (!existsSync(source)) errors.push(`Missing media for ${item.id}; expected ${source}`); }
for (const album of content.albums) for (const id of album.mediaIds) if (!ids.has(id)) errors.push(`Album ${album.id} references unknown media: ${id}`);
for (const video of content.videos) if (!ids.has(video.mediaId)) errors.push(`Video ${video.id} references unknown media: ${video.mediaId}`);
const productionCheck = process.env.CONTENT_VALIDATION_PRODUCTION === "true";
if (productionCheck && content.mode !== "private") errors.push("Production validation requires a private content configuration.");
if (productionCheck && !content.privacy.approvedForProduction && process.env.ALLOW_INCOMPLETE_PRIVATE_CONTENT !== "true") errors.push("Private content is not approved for production.");
if (productionCheck && content.media.some((item) => item.approval !== "approved") && process.env.ALLOW_INCOMPLETE_PRIVATE_CONTENT !== "true") errors.push("Every production media item must be approved.");
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`Content valid: ${content.mode} mode, ${content.media.length} media items.`);
