# Team steps to complete the demo

1. **AI/ML engineer: test and hand over.** Extract the ZIP, follow `TEST_AND_INSTALL.md`, run the Python and Node checks, and run the 13-case five-topic demo. Share the whole package, not only `app/`. Share no API keys. Explain that all included educational cards are unreviewed placeholders.

2. **Data scientist + AI/ML engineer: agree labels.** Review `taxonomy.json`, the five stable identifiers, abortion as a subtopic and the handling of overlaps. Confirm how a moderator chooses the primary analytics category. Build an independent English/Kiswahili/mixed-language evaluation set. The supplied model scores are development results only.

3. **Full-stack/integration role: prepare a branch.** Keep the team's current app and create an integration branch. Preview `apply_shakespeare.py` against it. Apply only if the baseline checks pass. It installs six utility files. If a teammate has changed a target, merge with that owner manually. Place the complete `ai/` folder at the agreed server location. Do not copy the entire corrections folder over the app.

4. **Backend engineer + AI/ML engineer: connect the API.** Start the Python service locally with a server-side key. Implement `/api/ai/nuru/analyze` and `/api/ai/translation-check` as described in `TEAM_HANDOFF.md`. Forward only permitted fields to the private API and preserve the v2 response. Test success, missing credentials, invalid input, timeout and unavailable service. Never put the service key in Vite/browser code.

5. **Frontend + UI/UX roles: connect the form.** Use the five labels from `DEMO_TOPICS`, a visible English/Kiswahili selector, and `createLatestAnalyzer`. Show suggested categories and separate subtopics, title/body redaction previews, concern notices and human-review reasons. Clear stale results/confirmation after every edit. Show demo cards as demo and the absence of approved content honestly. Existing detailed slugs are separate from the five main categories.

6. **Content/clinical and language-review responsibilities: replace fixtures.** Assign these responsibilities within the team and obtain qualified external review where needed. Provide sourced educational cards, correct English and natural Kenyan Kiswahili, then approve exact versions through the trusted backend. Test comprehension. Do not grant a reviewed badge from an AI result or self-declared Nostr tag.

7. **Cybersecurity + backend roles: verify publication and privacy.** Check private submission controls, consent, logging, reviewer authorisation and the treatment of sensitive text. The supplied utilities do not change the existing Nostr publisher. Confirm that personal health text is not sent to public relays by the demo flow. Automatic redaction is not guaranteed anonymity.

8. **Data scientist + frontend roles: finish the dashboard.** Replace or visibly label sample counts and trends. Use only consented, trusted synthetic metadata for the demo. The service suppresses cells below 25 and small complementary breakdowns. Fix the existing chart formatter type error in `BlindSpotsPage.tsx` and run the whole app test command again.

9. **Full-stack/integration role: prepare hosting.** Deploy only after local integration passes. For Render, agree where the frontend, application backend and Python service run. Configure the same-origin API routing required by the supplied client, server-only secrets and health checks. Installing an `ai` folder in a static website does not start Python. This package does not deploy anything.

10. **Voice/backend + AI/ML roles: add voice separately if still required.** Start with reviewed English/Kiswahili recordings and keypad choices, or first verify the chosen speech provider's support. The current AI folder accepts text, not audio. Test any transcript workflow privately; never assume caller recordings are anonymous. Voice must not delay acceptance of the text demo.

11. **All roles: run the final fictional walkthrough.** Demonstrate one question per category in both languages, postpartum/mental-health overlap, abortion without an automatic mental-health label, abortion with an explicit support request, unknown topics, a privacy finding, a matched concern, a stale translation, unavailable AI and no approved answer. Check that edits invalidate old results. Verify the full app gate passes and that demo labels stay visible.

12. **Integration/QA role: record acceptance and share.** Record the merged commit, test results, remaining limitations and content review status. The demo is complete when UI and backend communicate, all five topics work, both requested languages are handled, publication controls are enforced and the whole app gate passes. A real-user launch requires additional clinical, language, security and data-governance work beyond this synthetic demo.
