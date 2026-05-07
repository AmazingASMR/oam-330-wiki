#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = fileURLToPath(new URL("../content/", import.meta.url))

// Pages excluded by Quartz ignorePatterns
const IGNORE = new Set(["log.md", "new-class-setup-guide.md", "coverage.md", "GUIDE.md"])

function walk(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) out.push(...walk(p))
    else if (p.endsWith(".md")) out.push(p)
  }
  return out
}

// Build set of valid slugs (Quartz-style: lower? Quartz preserves case for slugs)
const validSlugs = new Set()
const validBaseNames = new Set() // last segment, for shortest-path resolution
for (const p of walk(ROOT)) {
  const rel = relative(ROOT, p).replace(/\\/g, "/")
  if (IGNORE.has(rel)) continue
  const slug = rel.replace(/\.md$/, "")
  validSlugs.add(slug)
  const base = slug.split("/").pop()
  validBaseNames.add(base)
}

const wikilinkRe = /\[\[([^\]|#]+?)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/g
const dead = []

for (const p of walk(ROOT)) {
  const rel = relative(ROOT, p).replace(/\\/g, "/")
  if (IGNORE.has(rel)) continue
  const text = readFileSync(p, "utf8")
  let m
  while ((m = wikilinkRe.exec(text)) !== null) {
    let target = m[1].trim()
    target = target.replace(/\.md$/, "")
    // Quartz with markdownLinkResolution: "shortest"
    if (validSlugs.has(target)) continue
    // Try shortest: just basename
    const base = target.split("/").pop()
    if (validBaseNames.has(base) && !target.includes("/")) continue
    dead.push({ file: rel, target: m[1].trim(), full: m[0] })
  }
}

console.log("Dead wikilinks:", dead.length)
for (const d of dead) {
  console.log(`  ${d.file}: ${d.full}`)
}
