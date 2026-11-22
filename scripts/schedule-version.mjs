#!/usr/bin/env node
// Schedule version for fall-league-schedule.html — keeps an open page from silently showing an old schedule.
//
// The version is a hash of everything between <!-- SCHEDULE:START and <!-- SCHEDULE:END --> (every date, gym,
// address, time, matchup and score). Any published schedule change — including a venue or time correction —
// changes it. The page carries the version in <meta name="schedule-version">; schedule-version.json carries the
// same version, which open pages poll (js/league-schedule.js) and reload on a difference.
//
//   node scripts/schedule-version.mjs            update the meta tags + schedule-version.json (no-op if unchanged)
//   node scripts/schedule-version.mjs --check    exit 1 if they are out of date (run by CI on every PR / push)
//
// Run it after every schedule change, before committing. The published time is set only when the version
// changes (or pass --published 2026-11-22T10:15:00-08:00 to record the actual publish time).
import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PAGE = join(ROOT, "fall-league-schedule.html");
const JSON_FILE = join(ROOT, "schedule-version.json");
const args = process.argv.slice(2);
const check = args.includes("--check");
const pubArg = args.includes("--published") ? args[args.indexOf("--published") + 1] : null;

function fail(msg) { console.error("schedule-version: " + msg); process.exit(1); }

const html = readFileSync(PAGE, "utf8");
const start = html.indexOf("<!-- SCHEDULE:START");
const end = html.indexOf("<!-- SCHEDULE:END -->");
if (start < 0 || end < 0 || end < start) fail("SCHEDULE:START / SCHEDULE:END markers not found in fall-league-schedule.html");
const block = html.slice(start, end).replace(/\r\n/g, "\n");
const version = createHash("sha256").update(block, "utf8").digest("hex").slice(0, 16);

const metaV = /<meta name="schedule-version" content="([^"]*)">/;
const metaP = /<meta name="schedule-published" content="([^"]*)">/;
const curV = (html.match(metaV) || [])[1] ?? null;
const curP = (html.match(metaP) || [])[1] ?? null;
let json = null;
try { json = JSON.parse(readFileSync(JSON_FILE, "utf8")); } catch { json = null; }

if (check) {
  const problems = [];
  if (curV !== version) problems.push(`page meta schedule-version is ${curV ?? "missing"}, schedule content is ${version}`);
  if (!curP || Number.isNaN(Date.parse(curP))) problems.push("page meta schedule-published is missing or not a date");
  if (!json || json.version !== version) problems.push(`schedule-version.json version is ${json?.version ?? "missing"}, expected ${version}`);
  if (!json || json.publishedAt !== curP) problems.push("schedule-version.json publishedAt does not match the page meta schedule-published");
  if (problems.length) fail(problems.join("\n  ") + "\n  Run: node scripts/schedule-version.mjs");
  console.log(`schedule-version: OK ${version} (published ${curP})`);
  process.exit(0);
}

if (pubArg && Number.isNaN(Date.parse(pubArg))) fail(`--published ${pubArg} is not a date`);
const unchanged = curV === version && json?.version === version && curP && json?.publishedAt === curP;
if (unchanged && !pubArg) { console.log(`schedule-version: unchanged ${version} (published ${curP})`); process.exit(0); }
const publishedAt = pubArg ? new Date(pubArg).toISOString() : (curV === version && curP ? curP : new Date().toISOString());

const EOL = html.includes("\r\n") ? "\r\n" : "\n"; // the working copy may be CRLF (git autocrlf); match it
const tags = `<meta name="schedule-version" content="${version}">${EOL}  <meta name="schedule-published" content="${publishedAt}">`;
let out;
if (curV !== null) out = html.replace(metaV, `<meta name="schedule-version" content="${version}">`).replace(metaP, `<meta name="schedule-published" content="${publishedAt}">`);
else out = html.replace(/(<meta name="viewport"[^>]*>)/, `$1${EOL}  ${tags}`);
if (!metaV.test(out) || !metaP.test(out)) fail("could not write the meta tags");
writeFileSync(PAGE, out);
writeFileSync(JSON_FILE, JSON.stringify({ version, publishedAt }, null, 2) + "\n");
console.log(`schedule-version: ${curV ?? "none"} -> ${version} (published ${publishedAt})`);
