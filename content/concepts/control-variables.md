---
title: "Control Variables"
term: Control Variables
module: Empirical Approaches to OB
study_guide: [M1, Final]
sources: ["03 - OAM 330 - Empirical Approaches to OB - Jan 20 2026.pptx"]
confidence: high
---

## Definition
A **control variable** is a variable you measure in order to **rule it out** as an alternative explanation for a relationship between the variables you actually care about.

Mechanism (slide 16): statistical tools (specifically **multiple regression**) let you exclude a control variable's influence from the relationship. "You **add** them to the model in order to **remove** their influence."

## Why it matters
For non-experimental designs, **control variables are critical** for ruling out alternative explanations — particularly the [[concepts/alternative-explanations-correlation|"third variable" alternative]]. "Otherwise, be skeptical."

In a true [[concepts/rcts-experiments|RCT]], [[concepts/random-assignment]] does this work for you automatically. Without random assignment, you must measure and statistically control for each suspected confound.

## Key distinctions
- **Control variable vs. independent variable** — IV is the predictor you care about; the control is one you measure only to rule it out.
- **Control variable vs. control group** — completely different. A control *group* is the no-treatment condition in an experiment; a control *variable* is a measured covariate in a regression.
- **Control variable vs. random assignment** — both serve the same goal (rule out third variables), but random assignment handles all confounds at once (including unmeasured ones), while controls only handle the specific variables you thought to measure.

## Example(s)
*From slides 18–19:* Reading-to-kids ↔ kids-reading-for-fun. Possible confounds to measure as controls:
- Kids' reading skills
- Parents' enjoyment of reading
- Number of books in the home
- Free time in kids' day
- Distance to nearest library
- Parental income

After controlling: "Kids whose parents read to them spend more time reading on their own, and this is **NOT because of** the # of books in the home."

## Notes on application
- Definition: a measured variable used to **rule out** alternative explanations.
- Tool: **multiple regression**.
- Add to model → remove influence.
- Trap: confusing control variable (covariate) with control group (no-treatment condition).
- Trap: assuming controls eliminate ALL confounds — they only eliminate the ones you measured.
