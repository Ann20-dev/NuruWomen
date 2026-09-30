# Changes in 0.3.0

See `UPDATE_GUIDE.md` for the current five-topic changes and website findings. The API response is now `nuru-ai-v2`; update Python service and browser client together. Old broad labels are rejected by the aggregate request schema. There is no automatic migration of stored records.

## Historical 0.2 release notes

# Changes from the reviewed packages

## Python 0.1.0 → 0.2.0

- Added strict `NuruRequest`, `/v1/nuru/analyze`, `services/nuru.py`, versioned `data/nuru_taxonomy.json`, English/Swahili request examples and a saved synthetic response.
- Retained the original six processing endpoints and the four-topic ML baseline; no 18-class model training claim is made.
- Added Swahili fainting and bounded violence/pregnancy/postpartum example rules. Added optional all-pattern requirements for contextual alerts.
- Limited explicit prompted-name spans so selected health-clause words are not swallowed.
- Added rule export and bridge demonstration scripts, plus regression tests for the reviewed bugs and request boundaries.
- Updated real-HTTP smoke coverage to include the bridge.
- Removed the earlier Laravel-specific example and generic whole-team folder plan from this delivery. This handoff does not assume the app's backend framework.

## Shakespeare helpers

The old classifier matched substrings anywhere, including `sti` inside `question` and `45` inside numbers. The replacement uses Unicode-aware word boundaries, explicit bilingual phrases and no numeric topic clues. Clinical condition tags require explicit terminology rather than vague symptoms. Existing UI names such as “Severe period pain” are preserved because `topics.ts` is owned by the team; a match does not grade symptom severity.

The privacy replacement removes the ambiguous `mimi ni` name cue, uses exact offsets instead of global replacement, handles overlapping findings, and rejects invalid positioned findings. The frontend still needs snapshot confirmation/invalidation. Free-standing names, unusual identifiers, indirect locations and stories can still be missed. This is not anonymisation.

The safety replacement avoids `rape` matching `grapes`, removes `weeks` as a pregnancy cue, and adds selected Swahili examples through the same JSON used by Python. It replaces unverified detailed timing/hotline claims with an explicitly unreviewed generic notice. Negation, history and quotations can still trigger; not all urgent wording is covered.

The new client uses same-origin backend paths and has no API credential fields. It validates the response projection, separates draft/approved cards, times out, supports cancellation and discards results invalidated by an edit. Nothing is auto-saved or published.

## Deliberately outside this patch

The public question/reply publishing hooks, privacy panel claims, safety panel footer, reviewer registry/trust checks, fake/live analytics labels, language selector, clinical badges and full page wiring are documented for their owners in `TEAM_HANDOFF.md`. These unresolved issues matter before a real-user deployment. This package cannot fix them without changing the other engineers' files.
