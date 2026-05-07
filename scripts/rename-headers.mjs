#!/usr/bin/env node
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = fileURLToPath(new URL("../content/", import.meta.url))

function walk(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) out.push(...walk(p))
    else if (p.endsWith(".md")) out.push(p)
  }
  return out
}

function rename(text) {
  let out = text
  out = out.replace(/^(##+)\s+Likely MCQ angles\s*$/gm, "$1 Notes on application")
  out = out.replace(/^(##+)\s+High-yield MCQ traps.*$/gm, "$1 Common points of confusion")
  out = out.replace(/^(##+)\s+Distractor pairs.*$/gm, "$1 Close-pair distinctions")
  return out
}

let changed = 0
for (const p of walk(ROOT)) {
  const before = readFileSync(p, "utf8")
  const after = rename(before)
  if (before !== after) {
    writeFileSync(p, after)
    changed++
  }
}
console.log("Renamed headers in", changed, "files")
