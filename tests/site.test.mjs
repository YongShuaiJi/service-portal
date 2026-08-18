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
  assert.match(html, /https:\/\/xmind\.yondavo\.com\//);
  assert.match(html, /https:\/\/kairo\.yondavo\.com\//);
});

test("page presents the Yondavo brand without a personal name", () => {
  assert.match(html, /Yondavo — Make useful things\./);
  assert.match(html, /做有用的东西。/);
  assert.doesNotMatch(html, /永帅|YONGSHUAI|YongShuaiJi/);
});

test("page includes responsive, accessible motion behavior", () => {
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /@media \(prefers-color-scheme: dark\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /:focus-visible/);
});
