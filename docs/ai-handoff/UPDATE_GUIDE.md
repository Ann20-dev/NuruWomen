# Five-topic update: what changed and why

## Website review

Reviewed 30 September 2026: the live Nuru Commons home, Ask, Library and Blind Spots pages, alongside the supplied Shakespeare export. Browser review was read-only. The ZIP is the code baseline; the live site may have changes that are not in that export.

| Observed feature | Your AI contribution | Work for the owning role |
|---|---|---|
| Ask shows 18 detailed topic buttons | Five-category catalog, bilingual cue matching, overlap handling and versioned API output | Frontend displays five top-level choices and separate optional subtopics; it must import the new utility |
| Library uses 14 lifecycle areas | Explicit mapping to the five demo categories, exact-language retrieval and empty-approved-content signals | Frontend scopes demo filters; editors review content; backend supplies trusted approvals |
| Reviewed badges and named clinical samples appear on the site | AI never grants clinical authority; fixtures now have no invented source or approval claims | Backend/security validate reviewer authority; frontend labels fixtures visibly |
| Blind Spots shows 8,289 questions and trend figures | Metadata-only synthetic aggregates; minimum group size now 25 to match displayed policy | Data scientist defines fixed release policy; frontend labels hard-coded counts as demo or removes them |
| Some category headings contain Kiswahili; no language selector was visible on reviewed pages | English/Kiswahili category labels, explicit requested language, version-linked translation checks | Frontend builds language selector/localized interface; language/clinical reviewers approve text |
| Ask describes public Nostr publication after privacy checks | Redaction suggestions, human review flags and publication disabled in AI responses | Backend/security implement the agreed submission policy; frontend removes unsupported anonymity promises |

## Changes made in your folder

1. Replaced the old four broad model classes with the five agreed identifiers. Rebuilt 120 synthetic training examples and 60 evaluation examples across English, Kiswahili and mixed text. These are development fixtures, not an independent benchmark.
2. Added explicit multi-label routing separate from the statistical model. The UI should use `routing.category_ids` for reviewable demo suggestions; `classification` is the independent baseline for evaluation. Model disagreement does not authorise a clinical label.
3. Added abortion as a subtopic. Emotional/support wording can add mental health. Miscarriage wording is not automatically called abortion. The tool flags ambiguous pregnancy-loss terms for review.
4. Kept the old detailed Shakespeare slugs as compatibility suggestions. They are not the five category identifiers. Removed urinary-infection terms from the STI matcher; an infection is not automatically sexually transmitted. Removed nonspecific hot-flush/night-sweat cues from the perimenopause detail matcher.
5. Restricted card retrieval to the selected category and requested language. An abortion query retrieves only an abortion fixture. Outside-scope or ambiguous-loss routing withholds retrieval. Overlapping categories are returned together, but retrieval currently uses the first category in catalog order. The UI must not imply comprehensive answers across every overlap.
6. Replaced the evidence examples with six bilingual placeholder pairs, covering all five categories plus abortion. They contain no medical recommendations, external source assertions or fabricated reviewers. Approved results are empty until qualified editors provide real approved material.
7. Added a review summary: detected identifiers, potential urgency, scope ambiguity, pregnancy-loss wording and no approved content in the requested language. These are workflow reasons, not a medical risk score.
8. Expanded the glossary and flagged abortion/miscarriage terminology for human translation review. Existing number, negation and source-version checks remain.
9. Set the synthetic aggregate threshold to 25, with complementary suppression. The dashboard is not wired to this calculation, and thresholding alone does not establish privacy.
10. Updated the browser parser to `nuru-ai-v2`, added `demoTopics.ts`, regenerated shared rules, and made the installer support the previous 0.2 overlay without overwriting unknown edits.

## Correct integration order

1. **AI/ML engineer:** run local checks and share this complete folder with the version and verification report.
2. **Data scientist + AI/ML engineer:** approve the annotation definitions and separate model-vs-rule evaluations. Choose how moderators handle overlapping and out-of-scope questions. Collect a new independently reviewed evaluation set.
3. **Backend engineer + AI/ML engineer:** implement the two application proxy routes in the handoff. Keep credentials server-side and test exact v2 responses. The catalog can be imported from generated TypeScript or fetched server-side from authenticated `GET /v1/nuru/topics`.
4. **Frontend engineer + AI/ML engineer:** use the five-category catalog, language selection, redaction previews, review reasons and approved/draft separation. Invalidate results after every edit. Keep the old granular tags separate.
5. **Clinical/content and language-review roles:** supply reviewed educational content and Kenyan Kiswahili editions; approve exact versions, sources and meaning. AI cannot perform their approvals.
6. **Security + backend roles:** verify consent, private submission handling, logs, access controls, reviewer authority and public-relay behavior.
7. **Integration/QA role with the team:** run the whole app gate and a fictional end-to-end demo, including unavailable AI, stale results and no approved answer. Fix the pre-existing dashboard type error in its owner's branch.

These are responsibilities, not a requirement for additional people. A team member can hold more than one role.

## Hosting and voice boundary

This update adds no deployment or voice calls. The React/Vite frontend and Python API are separate processes. The backend owns the server-to-server key. On Render or another host, the supplied relative `/api/ai/*` URLs require a same-origin proxy; separate service domains alone will not make them work. The integration role should configure routing and deployment after local acceptance.

Africa's Talking can be added later by the voice/backend role. Review language support and account configuration before choosing speech generation/recognition. A first voice demo can use reviewer-approved English/Kiswahili recordings and keypad choices. This AI folder can label a supplied transcript but does not record, transcribe or synthesise audio. Transcripts need the same privacy/review controls; do not publish callers' health stories to public relays.
