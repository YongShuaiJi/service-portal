import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const sourceDir = path.join(root, "src");
const outputDir = path.join(root, "dist");

const defaults = {
  PORTAL_URL: "https://120.26.115.87/",
  XMIND_URL: "https://120.26.115.87:18443/",
  KAIRO_URL: "https://120.26.115.87:18380/",
};

function externalUrl(name) {
  const value = process.env[name] || defaults[name];
  const parsed = new URL(value);
  if (parsed.protocol !== "https:") {
    throw new Error(`${name} must use HTTPS`);
  }
  return parsed.toString();
}

const replacements = Object.fromEntries(
  Object.keys(defaults).map((name) => [`%%${name}%%`, externalUrl(name)]),
);

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

let html = await readFile(path.join(sourceDir, "index.html"), "utf8");
for (const [placeholder, value] of Object.entries(replacements)) {
  html = html.replaceAll(placeholder, value);
}

if (/%%[A-Z_]+%%/.test(html)) {
  throw new Error("unresolved build placeholder");
}

await writeFile(path.join(outputDir, "index.html"), html);
await cp(path.join(sourceDir, "styles.css"), path.join(outputDir, "styles.css"));
await cp(path.join(sourceDir, "robots.txt"), path.join(outputDir, "robots.txt"));

console.log(`Built static portal in ${outputDir}`);
