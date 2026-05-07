---
title: "New-Class Setup Guide for Claude Code"
---

# New-Class Setup Guide for Claude Code

Paste this as your first message in a fresh Claude Code session when you want to build the same exam-prep wiki for a different class. It's based on what worked, what broke, and what was added beyond the original schema during the OAM 330 build.

The OAM 330 vault is the reference implementation — open any of its files (modules, concepts, cross-cuts, practice) to see the canonical patterns end to end.

---

## What you're building

A short-horizon, MCQ-focused exam-prep wiki adapted from Karpathy's LLM-wiki pattern. The student curates source material (study guides, slide decks, readings, syllabus); the agent (you) writes everything in the wiki — concept pages, module overviews, reading summaries, cross-cut synthesis pages, MCQ practice sets, and a final consolidated cram sheet.

Final deliverables (exam-ready):
- ~150-200 markdown files: 1 per concept, 1 per reading, 1 per module, 4-5 cross-cuts, 15-25 practice sets
- A `coverage.md` checklist tracking every testable bullet
- A `cross-cuts/distractor-pairs.md` cram sheet (single highest-leverage page on exam morning)
- A 60-80 page comprehensive course-guide PDF rendered via Chrome headless

---

## The schema (canonical design — adapt minimally)

**Vault structure:**

```
/raw/                  source material (read-only, never edit)
  /study-guides/         the canonical scope — every bullet must map to a concept
  /slides/               PPTX one per session; named with module-number prefix
  /readings/             PDFs of assigned readings
  /notes/                syllabus + any student notes

/wiki/                 the study material (you write everything here)
  GUIDE.md               vault orientation + study progression (write this near the end)
  index.md               full catalog of every page
  coverage.md            127-bullet-style checklist mirroring the study guides
  log.md                 append-only chronological build record

  /modules/              one page per module, numbered prefix (01-foo.md)
  /concepts/             one page per testable term, lowercase-hyphenated slug
  /readings/             one page per assigned reading, author-title-keyword slug
  /cross-cuts/           4-5 synthesis pages spanning multiple modules
  /practice/             MCQ drill sets with answer keys
```

**Page schemas** — these are non-negotiable. All pages of the same type follow the same structure. Run a normalization pass after the initial build to enforce uniformity (the "modules vary on section names" problem will happen).

### Concept page (`wiki/concepts/{slug}.md`):

```yaml
---
term: <Term>
module: <Module Name>
study_guide: [<which guides this appears on>]
sources: ["<filename1>", "<filename2>"]   # ALWAYS QUOTE — see "Pitfalls" below
confidence: high   # high | medium | low | gap
---
```

Body, in this order, capped at ~250 words:

```markdown
## Definition
<one precise sentence — exam-ready>

## Why it matters
<1-2 sentences>

## Key distinctions
- **<closest concept #1>** — <how this differs>
- **<closest concept #2>** — <how this differs>
(2-3 distinctions; this is the MCQ distractor zone — never skip)

## Example(s)
<concrete examples from slides or readings>

## Likely MCQ angles
<1-2 sentences on how this is most likely tested>
```

### Module page (`wiki/modules/{NN}-{slug}.md`):

```markdown
---
module: <Module Name>
number: <N>
scope: [tags]
---

# Module <N> — <Module Name>

[optional callout: "**New on the Final**" or similar]

## What this module is fundamentally about
<3-5 sentences explaining the module's spine>

## Headline empirical points
<5-10 numeric anchors / study names / verbatim slide phrases — testable at the verbatim level>

## Concepts

### <Theme group 1 name>
- [[concepts/foo]] — <one-line gloss with substance from the concept page>
- [[concepts/bar]] — <one-line gloss>

### <Theme group 2 name>
- [[concepts/baz]] — <one-line gloss>

## Assigned readings
- [[readings/foo]] — <publication + key thesis or named example>

## Reading-specific testable points
<reading-only items not enshrined as concept pages but MCQ-eligible>

## Cross-cut connections
- [[cross-cuts/distractor-pairs]] — <module-specific cram pairs>
- [[cross-cuts/foo]] — <how this cross-cut applies HERE>

## High-yield MCQ traps
<bullet list of distractor pairs unique to this module>

## Likely exam patterns
<3-5 bullets on question types the prof will ask for this module>
```

### Reading page (`wiki/readings/{slug}.md`):

```markdown
---
title: <Author — Title>
module: <Module Name>
type: article | book chapter | podcast transcript
---

## Source
<full citation with parens, periods, etc. — body section so YAML stays simple>

[Optional `> [!warning]` callout for OCR-failure caveats]

## Main argument
## Key terms introduced
## Examples used
## Connections to lecture concepts
- [[concepts/foo]] — <how this reading reinforces or extends the concept>
```

### Cross-cut page (`wiki/cross-cuts/{slug}.md`):

```markdown
---
title: Cross-cut — <Name>
modules: [list of module names that span this cross-cut]
study_guide: [tags]
---

# Cross-cut — <Name>

## Why this matters
## [Synthesis content sections — module-by-module breakdown]
## High-yield MCQ traps
## Synthesis question patterns (optional)
```

The `distractor-pairs.md` cram sheet is exempt from the synthesis template — it's a table-heavy reference page (per-module distractor pairs + cross-module synthesis pairs + numeric-anchors table + exact-quote list).

### Practice page (`wiki/practice/{slug}.md`):

```markdown
---
type: module | cross-cut | cumulative-mixed
module: <Module Name>          # only when type=module
cross_cut: <slug>              # only when type=cross-cut
session: <integer>
date: <YYYY-MM-DD>
question_count: <N>
---

# Practice — <name> (Session <N>)

## Instructions
## Questions
### Q1. <stem>
A. ...
B. ...
C. ...
D. ...

---

## Answer Key
### Q1. **<letter>** — <one-sentence rationale>
- A wrong: <why> (per-distractor "why wrong" notes are non-negotiable — they're what makes the practice useful)
- ...

## Concepts to re-read on misses
- Q1 → [[concepts/<slug>]]
```

---

## Workflow (5 phases)

### Phase A — Scope lock-down (~60-90 min)
1. Read the 2-3 study guides; parse every bullet into `coverage.md`.
2. Read the syllabus; build the reading list.
3. Skip creating empty concept stubs — agents will create concept files with content during Phase B (the empty-stub middle state added overhead with no benefit).
4. Update `index.md`.

### Phase B — Module ingest (~3-4 hours, parallelizable)
Dispatch one general-purpose Agent per module. Each agent:
1. Reads the module's slide deck(s) (PPTX) and assigned reading(s) (PDF).
2. Writes concept pages (one per testable bullet) with the 5-section schema.
3. Writes reading-summary pages.
4. Writes/overwrites the module page body.

Ordering: prioritize new-on-final modules first, then the heaviest content modules, then refresh the older midterm content last. Use 3-6 agents in parallel.

### Phase C — Cross-cuts (~45 min)
Dispatch 4 parallel agents, one per cross-cut theme. Themes typically include the master frame the course references repeatedly (e.g., System 1/System 2), plus 3 thematic syntheses spanning 3+ modules.

### Phase D — Lint pass (~15 min)
Single agent reads everything, produces a prioritized study list (Tier 1 / Tier 2 / Tier 3) appended to `log.md`. Identifies coverage gaps, low-confidence pages, missing distinctions, reading-only points the slides don't cover, slide/reading contradictions, orphan concepts, cross-cut candidates. Output as a prioritized study list, not a generic report.

### Phase E — Practice loop (iterative, 60-120 min per session)
For each priority module, generate 8-12 MCQs (mix of definition-match, scenario-application, comparison). Student answers cold, scores. Agent updates concept pages on misses, lowers confidence on missed concepts, queues for re-drill.

### Augmentations beyond the original schema (do these last)
1. **`distractor-pairs.md` cram sheet** — single page consolidating all sister-concept distractor pairs from every concept page's Key distinctions section, plus a numeric-anchors table and an exact-quotes list. This becomes the morning-of-exam cram page.
2. **`GUIDE.md`** — top-level orientation page explaining the vault and the study progression. Link from `index.md` as "Start here."
3. **Comprehensive course-guide PDF** — single 60-80 page document with embedded CSS visuals (pyramid, flowchart, 2x2 grids, side-by-side comparisons, etc.). Render via Chrome headless.

---

## Tooling discoveries (use these directly — don't re-derive)

### PPTX text extraction
The Read tool doesn't natively handle PPTX. Standard pattern:

```bash
unzip -p "<path>.pptx" "ppt/slides/slide*.xml" | python3 -c "import sys, re; t=sys.stdin.read(); print('\n'.join(re.findall(r'<a:t[^>]*>([^<]*)</a:t>', t)))"
```

This streams only the slide-XML payload — never reads embedded media into memory. Files of 100+ MB (with embedded video) extract in seconds because the text payload is tiny.

Bash fallback if no python3:
```bash
unzip -p "<path>" "ppt/slides/slide*.xml" | grep -oE '<a:t[^>]*>[^<]*' | sed -E 's/<a:t[^>]*>//'
```

### PDF text extraction
Read tool handles most PDFs natively. For tricky ones, use `pdftotext -layout` (may be available on Windows via xpdf) or `pypdf` (`python3 -m pip install --user pypdf`).

### Image-only PDFs
Some PDFs are scanned or image-only — `pdftotext` returns only page-header chrome. On a typical Windows machine **no OCR toolchain is installed** (no tesseract/pdftoppm/ghostscript/pytesseract/pdfplumber/PyMuPDF). When this happens:
- Don't fabricate quotes or numbers
- Reconstruct the reading from canonical knowledge of the article + slide-deck framing
- Add an explicit `> [!warning]` extraction caveat in the body
- Flag in `coverage.md` and `index.md`

If the user wants to fix this: install `tesseract` + `poppler` via Chocolatey.

### YAML parsing for audits
Install pyyaml: `python3 -m pip install --user pyyaml`. Use it to verify all frontmatter parses. Catches subtle issues an agent's eyeball won't.

### PDF generation
Chrome headless on Windows (Edge as fallback):

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="<output>.pdf" "file:///c:/path/to/<input>.html"
```

Build a single self-contained HTML with embedded `<style>` block. Use CSS for all visuals (flexbox/grid + borders + bg colors) — don't try to use SVG or external images. Page-break-before on every module section.

---

## Pitfalls (each of these bit me; avoid)

### Frontmatter YAML
- **Sources lists must always be quoted.** `&` in unquoted strings (e.g., `Influence & Persuasion`) trips YAML's anchor-scanner. Use `sources: ["foo", "bar"]` always.
- **Filenames with internal commas need extra care.** Don't naively split `sources: [...]` on commas — a script that does will break filenames like `Outliers - Ch 7, sections 1-6, 8-12, & 14.pdf` into 4 garbage items. Either keep filenames on one line manually, or use block-style YAML lists.
- **Embedded quotes in `term:` values** (e.g., `term: "N of 1" Problem`) need single-quoted wrapping: `term: '"N of 1" Problem'`.
- **Don't add non-schema fields** like `source:` or `note:` at the top level — Obsidian's Properties UI renders them but they pollute the schema. Move citations and notes into body sections.

### Module-page conventions
After parallel agents write module pages, you WILL have section-name divergence ("Cross-references" vs "Cross-cut connections" vs "Cross-module links"). Run a normalization pass that renames everything to canonical headers. Use Module 7 (or whichever module emerged cleanest) as the standard.

### Em-dash gloss style
Module pages should use em-dash (` — `, space-em-space, U+2014) to gloss every wiki-link. Bare links without glosses are worthless for fast review.

### Don't pre-create empty stubs
The original schema's "create empty gap-status concept stubs in Phase A" step adds overhead with no benefit. Phase B agents create concept files with content directly. Coverage.md is the source of truth for "is this bullet covered" — flip its checkboxes when you fill the concept page.

### Module 1 / intro modules
Often have no testable bullets on the study guide. Decide early: keep a stub module page or fill it from slide 1 anyway? OAM 330 build filled M1 from slide 01 because the cumulative final tested framing-level cloze ("common sense is ___ but not ___"). Worth ~30 min of extra work.

### Don't fabricate
Agents will pad. Be explicit in every prompt: "Don't fabricate. If a concept page truly doesn't have content, leave it `confidence: gap` and let lint catch it." Watch out especially for image-only PDF readings — agents will reconstruct from canonical knowledge unless you forbid it.

### Practice files
Per-distractor "why wrong" notes are the difference between useful practice and wasted practice. Always require them in the prompt. Agents will skip them if you don't insist.

---

## Memory setup

Save 2 memory files immediately so future sessions wake up oriented:

`memory/MEMORY.md`:
```
- [Project: <class> exam wiki](project_<class>_wiki.md) — short-horizon exam-prep wiki; final is <date>; schema at README.md in vault root
- [User: <class> student](user_<class>_student.md) — <name>, taking <class> (<prof>, <term>); curates sources, runs drills, expects agent to write the wiki content
```

Project memory should record the schema location, the exam date, the student/agent division of labor, and any class-specific quirks. User memory should record the student's role, the collaboration mode, and any feedback rules that emerge.

---

## Bootstrap order for the new session

1. Confirm vault location, exam date, study-guide count.
2. Create the directory tree (`/raw/{study-guides,slides,readings,notes}/` + `/wiki/{modules,concepts,readings,cross-cuts,practice}/`).
3. Save the schema (this guide's "Schema" section, or a copy of OAM 330's `README.md` adapted for the new class) at the vault root as `README.md`.
4. Save memory files (above).
5. Wait for the student to drop source material into `/raw/`.
6. Run Phase A → B → C → D → E.
7. Add `distractor-pairs.md`, `GUIDE.md`, comprehensive PDF.
8. Run normalization pass for module-page consistency.
9. Run frontmatter YAML audit (PyYAML).
10. Done.

---

## Time budget

For a 3-credit semester course with 3 study guides, ~25 slide decks, ~25 readings, expect:
- Phase A: 60-90 min
- Phase B: 3-4 hours (with 6 parallel agents)
- Phase C: 45 min
- Phase D: 15 min
- Phase E: 60-120 min per drill session
- Augmentations (cram sheet + GUIDE + PDF + normalization + audit): 90 min

Total ~7-9 hours of agent dispatch + the student's drilling time. Tight overnight if needed.

---

## What success looks like

By exam day:
- `coverage.md` all green at confidence ≥ medium
- Every cross-cut page exists
- Practice folder shows 1+ drill set per module + 1 cross-cut + 2 cumulative
- `distractor-pairs.md` cram sheet exists
- `GUIDE.md` exists
- Comprehensive course-guide PDF exists
- `log.md` shows clean arc from `scaffold → ingest → synthesize → lint → drill → normalize → export`
- 0 YAML parse failures across all wiki files

The student's final session is a 30-min cram of `distractor-pairs.md` + 1 timed cumulative practice set + concept-page re-reads on misses. If both come back clean, the wiki has done its job.
