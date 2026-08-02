import "server-only";
import { readFileSync } from "node:fs";
import { isAbsolute, resolve } from "node:path";
import { cache } from "react";
import { contentSchema, type StoryContent } from "@/content/schema";

const projectRoot = process.cwd();
export const getContent = cache((): StoryContent => {
  const configuredContent = process.env.PRIVATE_CONTENT_CONFIG;
  const configuredPath = process.env.CONTENT_CONFIG_PATH ?? "content/content-config.demo.json";
  const path = isAbsolute(configuredPath) ? configuredPath : resolve(/* turbopackIgnore: true */ projectRoot, configuredPath);
  const raw = JSON.parse(configuredContent ?? readFileSync(path, "utf8")) as unknown;
  return contentSchema.parse(raw);
});

export function getMedia(content: StoryContent, id: string) {
  return content.media.find((item) => item.id === id);
}
