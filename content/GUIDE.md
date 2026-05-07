# OAM 330 Vault — Guide & Study Progression

This is the top-level orientation page. Read it first if you've never opened this vault before, or if you're returning and need a fast re-orient.

**Exam:** Saturday 2026-05-02, 3-6 p.m., GBS 201 (Agashiwala–Lim) / GBS 204 (Liu–Zheng) — multiple-choice, cumulative across 12 modules.

---

## What this vault is

A short-horizon, MCQ-focused exam-prep wiki built from the three study guides (Midterm 1, Midterm 2, Final), all 24 lecture slide decks, and 22 assigned readings. The job isn't summarization — it's compiling everything into precise, distractor-aware reference pages you can drill against.

Coverage at exam time: **127 of 127 testable bullets ✅** across 132 concept pages, 22 readings, 12 modules, 5 cross-cuts, and 20 practice sets (195 MCQs).

The vault was built incrementally from 2026-05-01 23:45 onward; full audit trail in [[log.md]].

---

## Architecture — what each folder is for

```
/raw/                  source material (don't edit)
  /study-guides/         Midterm 1, Midterm 2, Final — define testable scope
  /slides/               24 PPTX, one per session
  /readings/             22 PDFs assigned across the course
  /notes/                Syllabus

/wiki/                 your study material
  GUIDE.md               this file
  index.md               full catalog of every page
  coverage.md            127-bullet checklist mirroring the study guides
  log.md                 chronological build record + lint + audit entries

  /modules/              one page per module (M1–M12)
  /concepts/             132 pages, one per testable term
  /readings/             22 pages, one per assigned reading
  /cross-cuts/           5 synthesis pages spanning multiple modules
  /practice/             20 MCQ drill sets with answer keys
```

---

## Conventions (uniform across all pages of the same type)

**Concept pages** (`wiki/concepts/{slug}.md`) — 132 of them, all canonical:
- Frontmatter: `term`, `module`, `study_guide`, `sources`, `confidence`
- Body: Definition → Why it matters → Key distinctions → Example(s) → Likely MCQ angles
- Capped at ~250 words

**Module pages** (`wiki/modules/{NN}-{slug}.md`) — 12, normalized to M7 pattern:
- "What this module is fundamentally about" (3-5 sentences)
- "Concepts" with H3 sub-headers grouping concepts thematically; em-dash gloss on every link
- "Assigned readings" with em-dash glosses
- "Cross-cut connections" with em-dash glosses

**Reading pages** (`wiki/readings/{slug}.md`) — 22, all canonical:
- Body: Source → Main argument → Key terms introduced → Examples used → Connections to lecture concepts

**Cross-cut pages** (`wiki/cross-cuts/{slug}.md`) — 5:
- 4 synthesis pages: Why this matters → module-by-module breakdown → High-yield MCQ traps
- 1 cram sheet ([[cross-cuts/distractor-pairs]]): tables of ~75 distractor pairs + numeric anchors + exact-quote list

**Practice pages** (`wiki/practice/{slug}.md`) — 20:
- Instructions → Questions (4 options each) → Answer Key (with per-distractor "why wrong") → Concepts to re-read on misses

---

## Navigation — three high-leverage entry points

1. **[[cross-cuts/distractor-pairs]]** — single highest-leverage page. Read aloud the morning of the exam. ~75 sister-pair distinctions + 19 numeric anchors + 11 exact-quote items.
2. **[[log.md]]** — search for the `lint` entry; that's the prioritized study list (Tier 1/2/3 + reading-only points). Most useful summary in the vault.
3. **[[index.md]]** — full catalog of every page, organized by module. Use for "where is X?" lookups.

For "what's testable?", jump to **[[coverage.md]]** — every study-guide bullet, linked to its concept page, with status.

---

## Study progression — phased plan

### Phase A — First-time orientation (15 min)
Goal: know what's in the vault and where to find things.

1. Read this guide.
2. Open [[index.md]] — skim the module list and concept counts.
3. Open [[coverage.md]] — confirm everything is ✅ and note the few `medium`-confidence flags at the bottom.
4. Open [[log.md]] — find the `lint` entry, scan the Tier-1 items.

### Phase B — Module-level review (60-90 min, do twice if you can)
Goal: walk through every module's spine and refresh weak spots.

For each of M1–M12 in turn:
1. Open the module page (e.g., [[modules/03-decision-making]]).
2. Read "What this module is fundamentally about" (3-5 sentences).
3. Skim the H3-grouped concept list with em-dash glosses. **Star anything you can't immediately re-state.**
4. Click into starred concept pages, read Definition + Key distinctions.
5. Skim the linked reading glosses; click in if a name (Cialdini, Kahneman, Pink) doesn't ring a bell.

If short on time: prioritize M10, M11, M12 (new on Final) → M3, M5, M6 (heaviest content) → M2, M4, M7, M8, M9 (familiar from midterms) → M1 (intro framing).

### Phase C — Synthesis review (30 min)
Goal: cross-module patterns the cumulative final is most likely to test.

Read the 4 synthesis cross-cuts cold:
- [[cross-cuts/system-1-system-2]] — runs through M3, M6, M11
- [[cross-cuts/decision-making-biases]] — M3 catalog + Cialdini exploits + ethical biases
- [[cross-cuts/cultural-differences]] — M4 → M5 → M6 → M7 → M8 → M9
- [[cross-cuts/fairness-and-justice]] — M5, M8, M9, M11

### Phase D — Drill loop (60-120 min, iterative)
Goal: convert recognition into recall.

1. Pick a practice set. Start with [[practice/cumulative-mixed-session-1]] (15 Qs, all 12 modules).
2. **Close the wiki**, answer all questions cold, time yourself (~25 min).
3. Score. For every miss:
   - Open the linked concept page.
   - Re-read Definition + Key distinctions.
   - Note which sister concept tripped you up.
4. Move to [[practice/cumulative-mixed-session-2]] (18 Qs, gap-fills Session 1).
5. For weak modules surfaced by misses, drill the matching session-1 set:
   - [[practice/m02-empirical-approaches-session-1]] — 10 Qs
   - [[practice/m03-decision-making-session-1]] (12 Qs) + [[practice/m03-decision-making-session-2]] (10 Qs re-drill)
   - [[practice/m04-personality-and-culture-session-1]] — 10 Qs
   - [[practice/m05-motivation-session-1]] — 10 Qs
   - [[practice/m06-influence-and-persuasion-session-1]] (12 Qs) + [[practice/m06-influence-and-persuasion-session-2]] (10 Qs re-drill)
   - [[practice/m07-power-and-leadership-session-1]] — 8 Qs
   - [[practice/m08-social-identity-and-diversity-session-1]] — 10 Qs
   - [[practice/m09-negotiation-session-1]] — 10 Qs
   - [[practice/m10-groups-and-teams-session-1]] — 10 Qs
   - [[practice/m11-ethics-session-1]] (10 Qs) + [[practice/m11-ethics-session-2]] (10 Qs re-drill)
   - [[practice/m12-happiness-session-1]] — 6 Qs
6. For synthesis weakness, drill the cross-cut sets:
   - [[practice/cross-cut-cultural-differences-session-1]] — 6 Qs
   - [[practice/cross-cut-system-1-system-2-session-1]] — 6 Qs
   - [[practice/cross-cut-decision-making-biases-session-1]] — 6 Qs
   - [[practice/cross-cut-fairness-and-justice-session-1]] — 6 Qs

### Phase E — Final cram (30 min)
Goal: lock in the highest-leverage MCQ-trap distinctions.

1. Read [[cross-cuts/distractor-pairs]] aloud, top to bottom. Stop at any pair where you can't recite the distinguishing feature.
2. Re-read the linked concept page for any pair you stumbled on.
3. Re-read the numeric-anchor table at the end (50/40/10 split, 74% Asch, ~$75K money-happiness, 18%→35% DAV, etc.).
4. Re-read the exact-quote list (3 themes, 3 alternative explanations, 3 obstacles, 5 moral foundations, 4 mechanisms enabling unethical behavior).

---

## Recommended timeline for today (2026-05-02)

The schedule given the exam at 15:00 and the open-review session 10:00–13:00 at GBS 500:

| Time | Activity | Pages |
|---|---|---|
| Now → 06:00 | Sleep | — |
| 09:00 | Wake, breakfast | — |
| 09:00–09:30 | This guide + [[cross-cuts/distractor-pairs]] | Phase E preview |
| 09:30–10:00 | Travel to GBS 500 | bring 1 content question |
| 10:00–13:00 | Open review with Sandy Ge | (also re-read weak concept pages between Q&A) |
| 13:00–13:30 | Lunch | — |
| 13:30–14:00 | Take [[practice/cumulative-mixed-session-2]] cold + score | 18 Qs, ~25 min |
| 14:00–14:30 | Re-read concept pages on misses + final cram-sheet pass | Phase E |
| 14:30–15:00 | Travel to GBS 201/204 | — |
| 15:00–18:00 | Exam | — |

If you don't sleep: collapse Phase B into 30 min of speed-skimming module pages, then Phase D for an hour, then Phase E. Don't try to memorize new content past 11 a.m. — at that point, only drill what you've seen.

---

## Confidence flags — what to watch out for

**1 medium-confidence concept page** (slide is genuinely thin):
- [[concepts/negative-advertising]] — slide 14 says only "Risky, but effective." Page is honest about it; don't expect a deep MCQ stem.

**3 reading pages reconstructed from bad PDFs** (no OCR tooling on this system):
- [[readings/kahneman-dont-blink]] — image-only PDF; canonical-knowledge reconstruction
- [[readings/amabile-kramer-happier-work-harder]] — image-only PDF; canonical-knowledge reconstruction
- [[readings/grant-goodbye-mbti]] — fragmented PDF; key phrases verbatim-confirmed; partially source-verified

For these 4: don't cite as verbatim-quote sources. Use them as recognition primers.

**3 promoted from medium → high after audit** (verbatim-verified against the relevant slide deck):
- [[concepts/ethical-frameworks-sources]] — deck 26 slides 15-17 (Faith / Moral Foundations / Professional guidelines)
- [[concepts/moral-foundations-five]] — deck 26 slide 16's full table
- [[concepts/employee-misconduct-types]] — deck 27 slide 7

---

## Quick "I want to..." reference

| Goal | Best page |
|---|---|
| Memorize one cram sheet for the morning | [[cross-cuts/distractor-pairs]] |
| Know what's testable | [[coverage.md]] |
| Find a specific concept | [[index.md]] (Ctrl-F by term) |
| Refresh a whole module | [[modules/01-about-ob]] through [[modules/12-happiness-wrap-up]] |
| Drill MCQs | [[practice/cumulative-mixed-session-2]] first; module sets after |
| See what's been built | [[log.md]] |
| Re-read schema (if curious) | [[../README]] at vault root |
| Synthesis questions | the 4 [[cross-cuts/cultural-differences]]/[[cross-cuts/system-1-system-2]]/[[cross-cuts/decision-making-biases]]/[[cross-cuts/fairness-and-justice]] |

---

## What success looks like (per the schema)

By exam time:
- ✅ [[coverage.md]] all green at confidence ≥ medium *(127/127 ✅, 1 medium honestly flagged)*
- ✅ Every cross-cut page exists *(5/5)*
- ✅ Practice folder shows ≥3 drill sessions per module *(20 sets across 12 modules + 4 cross-cuts + 2 cumulative — minimum 1 per module, multiple for the heaviest)*
- ✅ Log shows arc from ingest → lint → drill *(see [[log.md]])*

The wiki has done its job. The remaining variable is you, plus sleep.

Good luck.
