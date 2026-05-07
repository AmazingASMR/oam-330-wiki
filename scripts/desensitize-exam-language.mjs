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

function rewrite(text) {
  let out = text
  // Replacements for module-level summaries
  out = out.replace(/\bexam-cram pairs\b/g, "close-pair distinctions worth memorizing")
  out = out.replace(/\bexam-flagged\b/g, "slide-flagged")
  out = out.replace(/\bexam-cram\b/g, "close-pair")
  out = out.replace(/\bExpect 2[–-]3 of these on the Final\.?/g, "These scenario-to-mechanism mappings are worth practicing.")
  out = out.replace(/the cumulative final is most likely to ask/g, "recur most often across modules")
  out = out.replace(/\b(on|for) the [Ff]inal\b/g, "across the course")
  out = out.replace(/\b(on|for) the [Ee]xam\b/g, "in the material")
  out = out.replace(/\bMCQ stems? often\b/gi, "Stems often")
  out = out.replace(/\bMCQ stems?\b/g, "scenario stems")
  out = out.replace(/\bWhat MCQ stem might ask\b/g, "How it tends to be applied")
  out = out.replace(/\bWhich is most likely to be tested\b/gi, "Which framing is most common")
  out = out.replace(/\bMCQ-ready phrase is\b/g, "canonical phrase is")
  out = out.replace(/\bMCQ-ready takeaway\b/g, "canonical takeaway")
  out = out.replace(/\bMCQ-ready\b/g, "concise")
  out = out.replace(/\bexam cram sheet\b/g, "consolidated reference")
  out = out.replace(/\bcram sheet\b/g, "synthesis sheet")
  out = out.replace(/\bcram page\b/g, "synthesis page")
  out = out.replace(/\bsits? on the synthesis sheet\b/g, "appears on the close-pair distinctions page")
  // Section headers
  out = out.replace(/^##\s+Likely exam patterns\s*$/gm, "## Notes on application")
  // Inline phrases
  out = out.replace(/\bMCQ-bait\b/g, "worth memorizing precisely")
  out = out.replace(/\bMCQ trap\b/g, "common confusion")
  out = out.replace(/\bMCQ traps\b/g, "common confusions")
  out = out.replace(/\beasy MCQ trap\b/g, "easy confusion")
  out = out.replace(/\bnamed-N is worth memorizing precisely\b/g, "named-N is worth memorizing precisely")
  // Generic "MCQ" inline phrases — convert to neutral "question" terminology
  out = out.replace(/\bMCQ gold\b/g, "high-yield")
  out = out.replace(/\bMCQ-takers\b/g, "students reviewing this")
  out = out.replace(/\bMCQ-?trap zone\b/g, "common confusion point")
  out = out.replace(/\bnear-certain MCQ\b/g, "common test point")
  out = out.replace(/\bMCQ distractor pair\b/g, "close-pair distinction")
  out = out.replace(/\bcumulative synthesis MCQ\b/g, "cumulative synthesis question")
  out = out.replace(/\bScenario MCQ:\b/g, "Scenario:")
  out = out.replace(/\bThe MCQ will most likely test\b/g, "Questions most likely cover")
  out = out.replace(/\bMCQ contrast\b/g, "contrast point")
  out = out.replace(/\b(an?|the) MCQ\b/g, "$1 question")
  out = out.replace(/\bMCQs?\b/g, "questions")
  return out
}

let changed = 0
for (const p of walk(ROOT)) {
  const before = readFileSync(p, "utf8")
  const after = rewrite(before)
  if (before !== after) {
    writeFileSync(p, after)
    changed++
  }
}
console.log("Desensitized exam language in", changed, "files")
