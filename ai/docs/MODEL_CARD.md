# Model card: synthetic-five-topic-v3

## Intended use

Demonstrate internal topic routing for adult-focused women's health education in the Hack4Freedom prototype. This is a small classical machine-learning model, not an LLM, diagnostic system or clinical triage model.

## Model and data

- Word unigram/bigram TF-IDF, with a small bilingual list of common question scaffolding removed.
- Multiclass logistic regression, C=4, balanced classes, maximum 1000 iterations, random seed 7.
- Fits on 120 authored synthetic examples at startup. No serialized pickle is loaded.
- Five routing topics. A low decision margin or no known vocabulary returns `uncertain`.
- `decision_score` and `decision_margin` are uncalibrated model outputs. They are not disease probabilities.
- Optional secondary candidates are a display heuristic; the dataset's labels and evaluation are primary-topic only. Multi-label performance has not been validated.
- All examples and language editions are unreviewed synthetic drafts.

## Performance evidence

Read `../reports/EVALUATION.md`. The 60-row evaluation set was authored for development (including retained menstrual examples) and is not a blind final benchmark. It is held out from fitting, not independent of the author. Its 20 examples per language are too small and too narrowly authored for broad generalisation claims. No population or demographic fairness claims are supported.

## Known limits

- Code switching, Sheng, euphemisms, spelling differences and unfamiliar health concerns can be misunderstood.
- The language guess is a simple word-count heuristic and is separate from the classifier.
- Shared terms can produce a confident-looking incorrect topic. Out-of-domain rejection is incomplete.
- Postpartum, menstrual, sexual and mental-health concerns can overlap. This model has only primary labels; use the separate explicit multi-label suggestions for reviewable demo navigation.
- Privacy patterns do not recognise all names or identifying narratives. Redaction may remove useful context or miss obfuscation.
- Safety rules are unreviewed examples with false positives and false negatives. Their absence cannot provide clearance.
- Retrieval is keyword/topic ranking over a local file. It does not assess the truth of user claims or generate a clinical answer.
- Translation assistance only checks a few surface features. No flags does not imply an accurate translation.

## Human decisions

Users confirm redactions. Moderators decide community visibility. Qualified reviewers approve medical education and translated meaning. Backend permissions enforce review authority. The integration engineer verifies Nostr signatures and publishes approved public content. This service never authorises publication.

## Change process

Version the taxonomy and source data, add reviewed development cases, obtain a new independent evaluation set, compare per-language errors and abstentions, and review integration changes. Keep a record of any evaluation set used in tuning. Security and clinical review are separate gates from passing software tests.

This release uses 24 training examples and 12 evaluation examples per category, each evenly split across English, Swahili and mixed text. Metrics from older four-class releases are not comparable. `routing` is a separate explicit cue system; the classifier scores must not be presented as its validated confidence.
