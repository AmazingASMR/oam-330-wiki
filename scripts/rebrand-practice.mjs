#!/usr/bin/env node
import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const DIR = fileURLToPath(new URL("../content/practice/", import.meta.url))

function rebrand(text) {
  let out = text
  // title: "Practice — ... (Session N)" -> simplified
  out = out.replace(/^title:\s*"Practice\s*—\s*(.+?)\s*\(Session\s*1\)"\s*$/m, 'title: "$1 — practice questions"')
  out = out.replace(/^title:\s*"Practice\s*—\s*(.+?)\s*\(Session\s*2\)"\s*$/m, 'title: "$1 — practice questions (Part 2)"')
  // strip date and session from frontmatter
  out = out.replace(/^date:\s*2026-\d{2}-\d{2}\s*\n/m, "")
  out = out.replace(/^session:\s*\d+\s*\n/m, "")
  // body H1: "# Practice — X (Session N)"
  out = out.replace(/^#\s+Practice\s*—\s*(.+?)\s*\(Session\s*1\)\s*$/m, "# $1 — practice questions")
  out = out.replace(/^#\s+Practice\s*—\s*(.+?)\s*\(Session\s*2\)\s*$/m, "# $1 — practice questions (Part 2)")
  // soften exam-flavored phrases in intros
  out = out.replace(/the cumulative final is most likely to ask/g, "the course most often asks across modules")
  out = out.replace(/Same protocol as Session 1/g, "Same protocol as Part 1")
  out = out.replace(/Session 1's? distribution/g, "Part 1's distribution")
  out = out.replace(/\bS1 didn't test\b/g, "Part 1 didn't cover")
  out = out.replace(/\bS1 didn't isolate\b/g, "Part 1 didn't isolate")
  return out
}

let changed = 0
for (const name of readdirSync(DIR)) {
  if (!name.endsWith(".md")) continue
  const p = join(DIR, name)
  const before = readFileSync(p, "utf8")
  const after = rebrand(before)
  if (before !== after) {
    writeFileSync(p, after)
    changed++
  }
}
console.log("Rebranded", changed, "practice files")
