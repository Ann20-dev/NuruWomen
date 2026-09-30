# Data scientist handoff

## Your ownership

The AI/ML engineer owns the deployed runtime. You own the evidence used to judge its performance, the topic definitions, language-specific error analysis and safe interpretation of question aggregates. Do not report classifier metrics as diagnosis accuracy.

## Included datasets

- `data/topic_train.json`: 120 authored synthetic examples across five topics and three language groups.
- `data/topic_test.json`: 60 synthetic examples held out from model fitting, 20 per language group.
- `family_id`: keeps the English, Swahili and mixed-language version of one underlying question together.
- `review_status: unreviewed`: the translations and labels have not been independently validated.
- `data/gap_demo.json`: 48 synthetic metadata records, not questions from women. Forty form a displayable cell; eight form a suppressed cell.

The five-topic release replaces most of the previous four-topic fixtures. Do not compare its scores directly with those old runs. All current fixtures are authored synthetic development data, held out by family from fitting but not independently collected or clinically reviewed. The historical baseline report is retained solely as an archive. Current results are in `reports/EVALUATION.md`.

## Run and inspect

Run `python -m scripts.evaluate` from `ai/`, using your virtual-environment interpreter. Open `reports/EVALUATION.md`, `reports/evaluation.json` and the misclassified example IDs in the test file. Reports include class-level precision/recall/F1, language-level accuracy and abstentions recorded as mismatches. Training metadata includes the SHA-256 of the synthetic training file for reproducibility; no user text is hashed or published.

## What to build next

1. Refine the annotation guide with a clinical adviser. Decide how a mixed question gets a primary topic and secondary topics. Retain an explicit out-of-scope option.
2. Create a new, unseen evaluation set with independently checked Swahili and realistic mixed-language phrasing. Keep translation families and near-duplicates out of different splits.
3. Obtain two independent annotations for consequential labels. Record disagreements and adjudication, without inventing clinician approval.
4. Measure privacy span recall/precision on labelled synthetic identifiers, safety misses and false alarms, top-k card relevance and translation-error detection. Current unit tests only check selected cases.
5. Include indirect language, misspellings, negation, historical symptoms, quoted advice, unknown topics, ambiguous names and adversarial text. Do not assume standard Swahili tests establish Sheng coverage.
6. Publish a dataset card with source, license, intended purpose, composition, limitations and consent restrictions. Real personal questions are not training data by default.

The current topic model fits all training examples when the API starts. No separate model file or model registry is included. For a later trained model, own data-versioning and evaluation gates before the AI engineer changes the deployed version.

## Knowledge Gap Board definition

Unit: eligible question submissions in one fixed monthly dataset, grouped by primary topic and requested language. A pseudonymous user may submit many questions, so this is not a count of unique women.

Missing proportion = submissions without a matching approved card / eligible submissions in that cell. The backend must derive `has_approved_card` from its trusted editorial workflow, not let a browser supply it unchecked. In this synthetic API, caller-supplied metadata demonstrates the computation only.

Cells below 25 are hidden. If a missing/non-missing subcount is between 1 and 24, both complementary subcounts and the percentage are hidden. Exact zero and all-missing cells can be shown when the parent cell meets the threshold. No grand totals or small-cell list are returned.

The bundled 20/40 breakdown is now suppressed under the 25-submission policy, while the parent cell of 40 remains visible. A synthetic 25/50 breakdown demonstrates a displayable 50% split in the tests.

This endpoint is **not safe for repeated public queries over real records**. Differencing attacks, linked datasets, repeated submissions and location inference are not solved. Before a real dashboard, design fixed releases, deduplication, access limits, consent withdrawal and a privacy review. Consider stronger methods with qualified privacy support. Clinical editors must prioritise seriousness and unmet need, not frequency alone.

## New annotation decisions

Use exactly `menstrual_health`, `healthy_aging`, `postpartum`, `sexual_health`, `mental_health` as broad labels. Abortion is a sexual-health subtopic; mental-health/support wording may add a second category without implying illness or causation. Review ambiguous pregnancy-loss phrases rather than inferring intentional abortion. Generic clinic navigation remains unclassified unless a supported health topic is explicit. An out-of-scope question is not discarded, and concern screening is independent of the topic filter.

Measure multi-label precision/recall and out-of-scope abstention separately from the five-class primary-label model. Include neutral educational mentions, negated disclosures, pregnancy-loss terminology, postpartum depression, menopause with emotional concerns, and unfamiliar spellings. Review category associations as navigation choices with content experts. Do not auto-map old stored `hormonal_health` or `care_navigation` records without re-annotation. `perimenopause` as an old broad label maps to `healthy_aging`, but the old detailed slug still exists separately.
