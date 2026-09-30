# Translation: what this folder does and what people must do

The runtime provides **editorial assistance**, not automatic medical translation. `services/translation.py` checks visible number differences, a small set of English/Swahili negation cues and whether the translation references the current source version. It also returns matching draft glossary entries. It cannot prove equivalence, understand all grammar or correct mistranslations.

All Swahili examples, notices and cards in the ZIP are unreviewed drafts for synthetic testing. Do not label them clinically approved or professionally translated.

## Review sequence

1. A content author and clinical reviewer agree the English source and its version.
2. A fluent translator writes natural Kenyan Swahili using a shared terminology guide.
3. A second language reviewer checks meaning and comprehension.
4. A qualified bilingual clinical reviewer checks medical meaning, negation, uncertainty, urgency and numbers.
5. Potential adult readers test whether they can explain the message and next step in their own words.
6. The backend saves approvers, exact content digest/version, date and validity. No approval is inferred from a clean automated check.
7. Changing the English source marks translations for re-review. The current helper rejects mismatched source versions.

For user questions, keep the original text inside the controlled application and show any translation draft to the author or moderator. Do not translate or publish a personal story automatically. Urgent notices need pre-approved bilingual text; never improvise a health notice with an unreviewed generative model.

## Later language-model integration

A later translator adapter may generate drafts in an editorial workspace after the team evaluates its Swahili quality and privacy terms. It is not included or required by this package. Keep human publication authority and compare against an independently reviewed benchmark. Never send raw private questions to a model provider by default.

## Five-topic terminology

The glossary now includes healthy aging, postpartum, sexual health, mental health, abortion, miscarriage, emotional support and consent. These are draft suggestions, not an approved terminology standard. Abortion and miscarriage wording needs contextual review; the checker always flags English pregnancy-ending terminology for a qualified language/clinical reviewer. A clean numeric or negation check is not proof of equivalent meaning.

A requested Swahili edition never silently falls back to English. If there is no approved Swahili card, display the missing-content state and let the user explicitly choose another language. The Python language guess is experimental; the user's selected response language controls retrieval.
