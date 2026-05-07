---
title: "OAM 330 Final Exam Prep Wiki — Schema"
---

# OAM 330 Final Exam Prep Wiki — Schema

This is the schema for an exam-prep wiki for **OAM 330: Principles of Organization & Management** (Prof. Williams, Spring 2026). The final is **Saturday, May 2, 3-6 p.m.**, multiple-choice, cumulative.

This wiki is an adaptation of Karpathy's LLM Wiki pattern for a short-horizon, multiple-choice exam. The job is not long-term knowledge accumulation — it is to take the study guides, lecture slides, and assigned readings and compile them into a precise, MCQ-ready reference that the student can drill against.

You (the agent) write everything. The student curates sources, asks questions, and runs practice loops.

## Ground truth

**The three study guides define the testable scope.** Nothing in the wiki is "complete" until every bullet on Midterm 1, Midterm 2, and Final Exam study guides maps to a covered concept page. The Final is cumulative, so all three guides are in scope.

**The slides set the emphasis.** When slides and readings disagree on definitions, slides win — but the disagreement gets noted on the concept page. Readings often supply examples that appear in MCQ stems.

**Multiple choice has implications:**
- Definitions must be precise and short. Vague paraphrases lose points.
- For every concept, anticipate the 2–3 closest concepts it could be confused with. These will be distractors.
- Concrete examples from lecture often appear in stems verbatim or near-verbatim. Capture them.
- "Content of readings" appears as a bullet on every study guide section. This means reading-specific points are testable, not just lecture content.

## Architecture

```
/raw/
  /raw/study-guides/     # Midterm 1, Midterm 2, Final — the canonical scope
  /raw/syllabus.pdf
  /raw/slides/           # one PPTX per class session, named by module
  /raw/readings/         # PDFs, articles, podcast transcripts/notes
  /raw/notes/            # student's own notes, if any

/wiki/
  index.md               # master index + study-guide-bullet → page map
  coverage.md            # checklist mirroring the 3 study guides
  log.md                 # chronological record of ingests, queries, lint passes

  /wiki/modules/         # one page per module (10 modules — see list below)
  /wiki/concepts/        # one page per testable term from a study guide
  /wiki/readings/        # one summary page per assigned reading
  /wiki/cross-cuts/      # synthesis pages on themes spanning modules
  /wiki/practice/        # generated MCQs with answer keys and explanations
```

**Modules** (from the syllabus):
1. About Organizational Behavior
2. Empirical Approaches to OB
3. Decision Making
4. Personality & Culture
5. Motivation
6. Influence & Persuasion
7. Power & Leadership
8. Social Identity & Diversity
9. Negotiation
10. Groups & Teams
11. Ethics
12. Happiness & Wrap-up

Modules 1–5 are Midterm 1 scope. 6–9 are Midterm 2 scope. 10–12 are new on the Final but the whole thing is cumulative.

## Page formats

### Concept pages — `/wiki/concepts/{slug}.md`

The most important page type. One per testable term. Frontmatter:

```yaml
---
term: Equity theory
module: Motivation
study_guide: [M1, Final]
sources: [slides/05-motivation.pptx, readings/pink-drive-ch2.pdf]
confidence: high   # high | medium | low | gap
---
```

Body sections, in this order:

- **Definition** — one sentence, precise, exam-ready.
- **Why it matters** — what behavior or outcome does this concept explain?
- **Key distinctions** — the 2–3 concepts a student might confuse this with, and how they differ. *This is the MCQ distractor section. Don't skip it.*
- **Example(s)** — concrete examples from lecture or readings, kept short.
- **Likely MCQ angles** — 1–2 sentences on how this is most likely to be tested (definition match, scenario application, comparison, etc.).

If the concept has `confidence: gap`, leave the body empty but still create the page so it shows up in lint as missing. Don't fabricate definitions.

### Module pages — `/wiki/modules/{module}.md`

Top-level overview of one module. Lists every concept page in the module, the assigned readings, and a 3–5 sentence "what this module is fundamentally about." Use this for fast context-loading before drilling.

### Reading pages — `/wiki/readings/{author-title}.md`

One per assigned reading. Sections: Main argument, Key terms introduced, Examples used, Connections to lecture concepts. Cite specific page or section numbers when possible — the student should be able to flip back to the source if a page is contested.

### Cross-cut pages — `/wiki/cross-cuts/`

For themes that recur across modules. Strong candidates based on the study guides:

- **Cultural differences** — appears in Personality, Motivation, Influence, Power & Leadership, Negotiation. Build one page that consolidates by domain (decision-making, fairness perceptions, power distance, negotiation style).
- **Decision-making biases** — System 1/2 surfaces under Decision Making but informs Influence (peripheral route) and Ethics (ethical fading, visceral responses).
- **System 1 vs. System 2 thread** — runs through Decision Making, Influence, and Ethics.
- **Fairness and justice** — distributive, procedural, equity, and how they show up across Motivation and Negotiation.

Cross-cuts are where you'll catch the synthesis questions the exam is most likely to ask.

### `coverage.md`

A flat checklist that mirrors the three study guides bullet-for-bullet. Each row is one bullet, with a link to its concept page and a status. Format:

```
## Final Exam — Groups & Teams
- [x] Definition of a group → [[concepts/group-definition]]
- [x] Role of social identity in groups → [[concepts/social-identity-groups]]
- [ ] Punctuated equilibrium model → GAP
- [x] Roles & norms in groups → [[concepts/roles-and-norms]]
...
```

Update this on every ingest. When the student asks "what am I weak on," this is the file you read first.

### `index.md`

Catalog of every wiki page with a one-line summary. Organized by module, then concept type. Read this first when answering any query.

### `log.md`

Append-only chronological record. Use this prefix format:

```
## [YYYY-MM-DD HH:MM] ingest | <source name>
## [YYYY-MM-DD HH:MM] query | <topic>
## [YYYY-MM-DD HH:MM] lint | <findings>
## [YYYY-MM-DD HH:MM] practice | <module(s)>, <num questions>, <weak spots>
```

## Workflow

### Initial setup (do this in order)

1. **Ingest the three study guides first.** Parse each bullet into a row in `coverage.md`. Every bullet becomes a stub concept page in `/wiki/concepts/` with `confidence: gap`. After this step, `coverage.md` is the complete map of testable scope, and every bullet is currently a gap.

2. **Ingest the syllabus** to populate the reading list — create empty stubs in `/wiki/readings/` for every assigned reading. Don't fill them yet.

3. **Ingest lecture slides, one module at a time.** For each slide deck:
   - Update or create the module page.
   - For every concept on a slide that maps to a coverage bullet, fill in the concept page (definition → distinctions → example → MCQ angles). Flip the coverage row to ✅ and bump `confidence` to medium or high.
   - If a slide introduces a concept *not* on any study guide, create the concept page with `study_guide: []` and lower priority. Mention it but don't over-invest.
   - Append a log entry.

4. **Ingest assigned readings.** For each reading: write the reading page, then sweep relevant concept pages to add reading-specific examples or definitions. Flag where readings disagree with slides.

5. **First lint pass.** Run the lint workflow (below). The output is the student's actual study list.

### Ingest (single source)

When the student drops a new source into `/raw/`:

1. Read it.
2. Identify which study guide bullets it speaks to.
3. Update the relevant concept pages, module page, and (if a reading) the reading page.
4. Update `index.md` and `coverage.md`.
5. Append to `log.md`.
6. Briefly summarize for the student what changed and which gaps it filled.

A single source can touch 10–15 wiki pages. That's normal.

### Query

The student asks a question. Default response patterns:

- **"Explain X"** — pull the concept page, plus the 2–3 closest concepts (from Key distinctions). Don't just paraphrase the definition — frame it as it would appear on an MCQ.
- **"Compare X and Y"** — produce a short comparison table. Distinctions, examples, when each applies. File the table back to a cross-cut page if it's a connection worth keeping.
- **"What would an MCQ on X look like"** — generate 2–3 questions with 4 options each, mark the correct answer, and explain why each distractor is wrong. File these to `/wiki/practice/`.
- **"Quiz me on module Y"** — pull a mix of definition-match, scenario-application, and comparison questions for that module. Track the student's answers in the practice file and update concept-page `confidence` based on what they miss.

Good queries that produce reusable content (comparison tables, drill sets, synthesis pages) get filed back into the wiki. Don't let valuable artifacts disappear into chat.

### Lint

Run when asked, or every time the student starts a session. Check for:

- **Coverage gaps.** Every bullet on the three study guides should map to a concept page with `confidence` ≥ medium. List remaining gaps, ordered by module then by likely exam weight.
- **Low-confidence pages.** Concept pages where the definition is fuzzy or the distinctions are missing.
- **Missing distinctions.** Concept pages with no Key distinctions section. These will lose MCQ points.
- **Reading-only content.** Bullets where lecture slides don't cover the term, but readings do (e.g., the dagger† readings from study.net). Flag these — they're easy to miss.
- **Contradictions** between slide and reading on the same concept.
- **Orphan pages.** Concepts on slides that don't map to any study guide bullet — flag for deletion or de-prioritization.
- **Cross-cut candidates.** Themes appearing in 3+ concept pages without a cross-cut page yet.

Output the lint as a prioritized study list, not a generic report.

### Practice loop (for the final week)

The most useful loop close to exam day:

1. Pick a module (or a cross-cut theme).
2. Generate 8–12 MCQs covering definitions, scenarios, and comparisons for that module.
3. Student answers without reference. Score.
4. For every miss, the agent updates the relevant concept page — sharpen the definition, expand the Key distinctions, add the missed example.
5. Lower `confidence` on missed concepts to medium and re-drill them in the next session.
6. Append a `practice` entry to `log.md` listing weak spots.

This is the closest the wiki gets to a flashcard system. Keep practice question files small and focused — one file per module per session.

## Conventions

- Concept slugs are lowercase, hyphenated, descriptive: `equity-theory.md`, not `et.md`.
- Wiki links use Obsidian-style `[[concepts/equity-theory]]` so the graph view works.
- Don't fabricate. If a study guide bullet has no source coverage, the concept page stays a gap until a source appears.
- When slides and readings disagree, follow the slide and note the reading's variant in a "Per [reading]" subsection. The exam follows the slides.
- Keep concept pages short. If a page is over ~250 words, something belongs on a different page.
- Append-only `log.md`. Never edit past entries.

## What success looks like

By exam day, `coverage.md` should be all ✅ at `confidence: high`, every cross-cut page should exist, the practice folder should show three or more drill sessions per module, and `log.md` should show a clear arc from ingest → lint → drill → re-drill on weak spots.

The student's final session is a lint run plus one mixed-module practice set. If both come back clean, the wiki has done its job.
