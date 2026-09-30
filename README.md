I’ve completed and locally tested the AI assistance service for NuruWomen. It supports our five demo topics:
menstrual health, healthy aging, postpartum, sexual health and mental health.


My contribution includes:
- Topic labeling: suggests relevant categories in English and Kiswahili. A question can have more than one category, such as postpartum and mental health.
- Abortion subtopic: sits under sexual health. Mental health is added when the question explicitly discusses emotions or support.
- Privacy checks: flags some identifying details and suggests redactions for the user to review.
- Concern flags: detects selected potentially urgent phrases. It does not diagnose or confirm that someone is safe.
- Library retrieval: finds relevant content by topic and requested language, with checks for review status and version.
- Translation checks: checks supplied translation drafts for issues such as changed numbers, possible negation differences and outdated source versions. It does not automatically translate or approve medical content.
- Knowledge-gap analytics: calculates which topic and language groups lack approved answers, using consented demonstration metadata.


I also added six integration helpers for the website, test cases and setup documentation. The package passed 106 Python tests, 37 browser utility checks and 13 fictional demo cases on my computer.
The AI service works locally, but the website still needs to be connected to it. The library currently uses demonstration placeholders, and the analytics are not yet feeding the live dashboard.

Please review my branch and the team handoff. Let’s connect one fictional question from the website to the API first, display its categories and review results, and then test all five topics in both languages. After that, we can connect approved library content and the knowledge-gap dashboard.
