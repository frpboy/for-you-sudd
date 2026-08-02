import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const path = resolve(process.cwd(), process.env.CONTENT_CONFIG_PATH ?? "content/content-config.private.json");
process.stdout.write(JSON.stringify(JSON.parse(readFileSync(path, "utf8"))));
