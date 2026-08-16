import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import test from "node:test";

execFileSync(process.execPath, ["scripts/build.mjs"], { stdio: "inherit" });

const html = await readFile("dist/index.html", "utf8");
const css = await readFile("dist/styles.css", "utf8");

test("build resolves every deployment placeholder", () => {
  assert.doesNotMatch(html, /%%[A-Z_]+%%/);
});

test("page contains both public service destinations", () => {
  assert.match(html, /XMind 转测试用例/);
  assert.match(html, />Kairo</);
  assert.match(html, /https:\/\/120\.26\.115\.87\//);
  assert.match(html, /https:\/\/120\.26\.115\.87:18380\//);
});

test("page includes responsive, accessible motion behavior", () => {
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /:focus-visible/);
});
