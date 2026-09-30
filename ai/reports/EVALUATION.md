# Synthetic evaluation results

2026-09-30T06:50:07.248798+00:00

| Language | Held-out examples | Primary-topic accuracy |
|---|---:|---:|
| en | 20 | 85.0% |
| sw | 20 | 95.0% |
| mixed | 20 | 90.0% |

120 training examples; 60 held-out examples. All translations/paraphrases in a family remain in one split.

These numbers describe this small synthetic set only. They are not clinical accuracy or evidence of production readiness. This set was inspected while revising the baseline, so a new blind test set is needed.

## Observed mismatches

- menstrual_health-12-en: expected menstrual_health, predicted healthy_aging
- menstrual_health-13-en: expected menstrual_health, predicted uncertain
- sexual_health-eval-3-en: expected sexual_health, predicted uncertain
- menstrual_health-12-sw: expected menstrual_health, predicted healthy_aging
- menstrual_health-12-mixed: expected menstrual_health, predicted healthy_aging
- sexual_health-eval-3-mixed: expected sexual_health, predicted uncertain

## Limitations

- Small author-created synthetic benchmark with unreviewed translations.
- No independent clinical validation, demographic fairness evidence or calibrated probabilities.
- This evaluation set was inspected during baseline development; it is held out from fitting, not a blind final benchmark. Collect a new independently reviewed test set before pilot claims.
- Five routing categories only; out-of-domain rejection is limited.
- Privacy and safety unit tests are separate and do not establish population-level recall.
