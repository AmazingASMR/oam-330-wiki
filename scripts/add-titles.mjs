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

function parseFrontmatter(text) {
  if (!text.startsWith("---\n")) return { block: null, fields: {}, after: text }
  const end = text.indexOf("\n---", 4)
  if (end === -1) return { block: null, fields: {}, after: text }
  const block = text.slice(4, end)
  const after = text.slice(end + 4).replace(/^\n/, "")
  const fields = {}
  const lines = block.split("\n")
  for (const line of lines) {
    const m = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/)
    if (m) fields[m[1]] = m[2]
  }
  return { block, fields, after }
}

function firstH1(body) {
  const m = body.match(/^#\s+(.+?)\s*$/m)
  return m ? m[1].trim() : null
}

function quote(s) {
  if (/^".*"$/.test(s)) return s
  return JSON.stringify(s)
}

function deriveTitle(path, fm, body) {
  if (fm.fields.title) return null
  const norm = path.replace(/\\/g, "/")
  if (norm.includes("/concepts/") && fm.fields.term) {
    return fm.fields.term.replace(/^["']|["']$/g, "")
  }
  if (norm.includes("/modules/") && fm.fields.module && fm.fields.number) {
    return `Module ${fm.fields.number} — ${fm.fields.module}`
  }
  const h1 = firstH1(body)
  if (h1) return h1
  return null
}

function ensureTitle(path) {
  const text = readFileSync(path, "utf8")
  const fm = parseFrontmatter(text)
  const title = deriveTitle(path, fm, fm.after)
  if (!title) return false
  let newText
  if (fm.block === null) {
    newText = "---\ntitle: " + quote(title) + "\n---\n\n" + fm.after
  } else {
    newText = "---\ntitle: " + quote(title) + "\n" + fm.block + "\n---\n" + (fm.after ? "\n" + fm.after : "")
  }
  writeFileSync(path, newText)
  return true
}

let changed = 0
for (const p of walk(ROOT)) {
  if (ensureTitle(p)) changed++
}
console.log("Updated", changed, "files")
