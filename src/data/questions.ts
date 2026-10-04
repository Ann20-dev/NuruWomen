import { seedId, seedPubkey } from '@/lib/nuru/ids';
import type { SeedQuestion } from '@/lib/nuru/types';

const now = Math.floor(Date.now() / 1000);
const HOUR = 3600;
const DAY = 24 * HOUR;

const persona = (name: string) => ({ authorName: name, authorPubkey: seedPubkey(name) });

/**
 * Seed questions demonstrating the Three-Layer Answer model:
 * lived experience (clay) · clinical response (teal) · evidence card (plum).
 * Real answers published to relays thread onto these via the question id.
 */
export const SEED_QUESTIONS: SeedQuestion[] = [
  {
    id: seedId('q-perimenopause-43'),
    title: 'Could these changes at 43 be hormonal?',
    content:
      "I'm 43 and my periods have started changing — sometimes 24 days, sometimes 40. I can't sleep through the night and I've been anxious for months, which is not like me. My doctor says I'm stressed. Could this be hormonal?",
    topics: ['perimenopause', 'irregular-periods', 'pms-pmdd'],
    ...persona('Zawadi'),
    createdAt: now - 2 * DAY,
    evidenceCard: 'perimenopause-basics',
    signal: {
      similarCount: 624,
      insight: '82% of women asking about perimenopause said they did not know symptoms can begin before periods stop.',
    },
    answers: [
      {
        id: seedId('a-peri-1'),
        type: 'lived-experience',
        ...persona('MamaTato_KE'),
        role: 'Peer Support Volunteer',
        experienceTag: 'Perimenopause',
        text:
          'This was me at 44. Same sleep problems, same anxiety that came from nowhere, and I was also told it was stress. A different doctor finally said the word “perimenopause” and I cried in the office — not from sadness, from relief at having a name for it. What helped me: tracking my symptoms for two cycles so I could show the pattern, and protecting my sleep routine fiercely. You are not imagining this.',
        helpful: 187,
        createdAt: now - 2 * DAY + 3 * HOUR,
      },
      {
        id: seedId('a-peri-2'),
        type: 'lived-experience',
        ...persona('Nyambura'),
        experienceTag: 'Perimenopause',
        text:
          'The sleep thing is so real. Mine started exactly like yours — cycle went from clockwork 28 days to anything between 22 and 45. Night waking was my first symptom, before any hot flushes. I want to add: don’t let anyone make you feel too young for this. My sister’s started at 41.',
        helpful: 94,
        createdAt: now - 2 * DAY + 9 * HOUR,
      },
      {
        id: seedId('a-peri-3'),
        type: 'clinical-response',
        ...persona('Dr. Wanjiku Kamau'),
        role: 'OB/GYN',
        text:
          'What you describe — cycle changes together with new sleep disruption and anxiety in your early-to-mid 40s — is a pattern consistent with perimenopause, the hormonal transition that can begin years before periods stop. It is frequently mistaken for stress alone. Practical next steps: keep a two-to-three cycle symptom diary, and ask your clinician directly whether perimenopause should be considered and what treatment options exist (both hormonal and non-hormonal). One caution: very heavy bleeding, bleeding after sex, or bleeding between periods deserves assessment on its own, whatever the cause. This is general education, not a personal consultation.',
        helpful: 241,
        createdAt: now - 1 * DAY - 2 * HOUR,
      },
    ],
  },
  {
    id: seedId('q-severe-period-pain'),
    title: 'Severe period pain — when should I be worried?',
    content:
      'I get very severe pain during my periods. Everyone tells me this is normal and I should be strong. Some months I cannot even go to work for the first two days. When should I be worried?',
    topics: ['severe-period-pain', 'endometriosis'],
    ...persona('Achieng_O'),
    createdAt: now - 4 * DAY,
    evidenceCard: 'severe-menstrual-pain',
    signal: {
      similarCount: 2140,
      insight: 'Severe period pain is the #1 pain topic in the commons this quarter — and the one most often described as “dismissed by family or clinicians”.',
    },
    answers: [
      {
        id: seedId('a-pain-1'),
        type: 'lived-experience',
        ...persona('Njeri_W'),
        experienceTag: 'Endometriosis',
        text:
          'I was told the same for 9 years. I used to vomit from pain and miss work every month. Last year I was finally diagnosed with endometriosis. I am not saying that is what you have — I am saying that needing to leave work because of pain is a symptom, not a weakness. The turning point for me was writing down my pain days for three months and showing the doctor the pattern.',
        helpful: 312,
        createdAt: now - 4 * DAY + 2 * HOUR,
      },
      {
        id: seedId('a-pain-2'),
        type: 'lived-experience',
        ...persona('Kadzo'),
        experienceTag: 'Adenomyosis',
        text:
          'Same story here except mine was adenomyosis, found at 36 after years of “it’s normal, take brufen”. Please push for answers. The pain that stops your life is information.',
        helpful: 156,
        createdAt: now - 3 * DAY - 5 * HOUR,
      },
      {
        id: seedId('a-pain-3'),
        type: 'clinical-response',
        ...persona('Beatrice Achieng'),
        role: 'Reproductive Health Nurse',
        text:
          'Severe pain that regularly interferes with your normal activities deserves assessment — full stop. Common cramping responds to simple painkillers and does not remove you from work or school. Pain that is progressive, or comes with heavy bleeding, pain during sex, or pain opening your bowels during your period, raises specific possibilities such as endometriosis or adenomyosis that a clinician can evaluate. Until you are seen: start a symptom diary (dates, severity, what you could not do), and know that ordinary doses of anti-inflammatory painkillers work best when started at the very first sign of bleeding — but needing them every month at high doses is itself a reason for review.',
        helpful: 402,
        createdAt: now - 3 * DAY - 1 * HOUR,
      },
    ],
  },
  {
    id: seedId('q-pcos-weight'),
    title: 'Diagnosed with PCOS and told to “just lose weight”',
    content:
      'I was diagnosed with PCOS last month after years of irregular periods and acne. The doctor just said "lose weight" and sent me away. What does PCOS actually mean for me? What should I be doing?',
    topics: ['pcos', 'irregular-periods'],
    ...persona('Wairimu'),
    createdAt: now - 5 * DAY,
    evidenceCard: 'pcos-overview',
    signal: {
      similarCount: 721,
      insight: '“Just lose weight” appears in 6 out of 10 PCOS questions — women consistently report leaving consultations without a management plan.',
    },
    answers: [
      {
        id: seedId('a-pcos-1'),
        type: 'lived-experience',
        ...persona('Rehema_M'),
        experienceTag: 'PCOS',
        text:
          'I got the same one-sentence consultation in 2021. What I’ve learned since: PCOS looks different in every woman, and the “just lose weight” advice ignores that the condition itself makes weight harder. What actually changed things for me was getting my blood sugar tested (I had insulin resistance), protecting my cycles with the pill when they disappeared for months, and treating my skin as a real concern, not vanity. Ask for a plan, not a sentence.',
        helpful: 268,
        createdAt: now - 5 * DAY + 4 * HOUR,
      },
      {
        id: seedId('a-pcos-2'),
        type: 'clinical-response',
        ...persona('Dr. Rehema Salim'),
        role: 'Family Medicine',
        text:
          'PCOS is a hormonal condition affecting ovulation, skin, metabolism and — for some women — fertility. It is managed, not cured, and management should match your priorities. Concretely, at a follow-up visit it is reasonable to discuss: (1) cycle protection — going many months without a period leaves the womb lining unprotected; (2) screening for insulin resistance; (3) the symptoms that bother you most, whether acne, hair growth or cycle regularity, since each has specific treatments; and (4) your fertility plans, because PCOS-related ovulation problems are among the most treatable causes of infertility. If weight is discussed, it should come with support, not blame.',
        helpful: 334,
        createdAt: now - 4 * DAY - 3 * HOUR,
      },
    ],
  },
  {
    id: seedId('q-painful-sex'),
    title: 'Is it normal for sex to be painful?',
    content:
      'I thought the pain would get better with time but it has been over a year now. I feel too embarrassed to tell anyone, even my partner does not fully understand. Is this just how it is for some women?',
    topics: ['painful-sex'],
    ...persona('Anonymous_47'),
    createdAt: now - 3 * DAY,
    evidenceCard: 'pain-during-sex',
    signal: {
      similarCount: 843,
      insight: 'Pain during sex is the fastest-growing question topic this year — up 38% — and the one users most often say they have never told anyone about.',
    },
    answers: [
      {
        id: seedId('a-sex-1'),
        type: 'lived-experience',
        ...persona('Naliaka'),
        experienceTag: 'Vaginismus',
        text:
          'You just described my twenties. I want you to hear what I wish someone told me: pain with sex is common, but it is not “just how it is”, and you did not cause it. Mine turned out to be my pelvic floor muscles guarding — my body bracing for pain it expected. A women’s health physiotherapist changed everything. It took courage to book that appointment and zero courage was wasted.',
        helpful: 221,
        createdAt: now - 3 * DAY + 6 * HOUR,
      },
      {
        id: seedId('a-sex-2'),
        type: 'clinical-response',
        ...persona('Beatrice Achieng'),
        role: 'Reproductive Health Nurse',
        text:
          'Pain with sex has causes, and causes have treatments. The first step is identifying the pattern: pain at entry (which can involve dryness, infection, skin conditions or muscle tension) versus deep pain (which can involve conditions like endometriosis or infection). Because infections are both common and easily treated, testing is a sensible early step — especially with any discharge, itching or lower abdominal pain. You do not have to endure this silently, and a respectful clinician will not be embarrassed even if you feel you are. If cost or privacy is a concern, many county facilities and youth-friendly centres offer confidential sexual health services.',
        helpful: 289,
        createdAt: now - 2 * DAY - 7 * HOUR,
      },
    ],
  },
  {
    id: seedId('q-fibroids-mother'),
    title: 'My mother had fibroids — now my scan shows them too',
    content:
      'My mother had fibroids removed at 45. Now my ultrasound shows I have them too (two, "medium sized"). I am 34 and I still want children. The doctor mentioned surgery. Should I be worried? Should I have surgery?',
    topics: ['fibroids', 'fertility'],
    ...persona('Chebet'),
    createdAt: now - 6 * DAY,
    evidenceCard: 'fibroids-basics',
    signal: {
      similarCount: 580,
      insight: 'Fibroid questions cluster heavily around one fear: “will surgery affect my chances of children?”',
    },
    answers: [
      {
        id: seedId('a-fib-1'),
        type: 'lived-experience',
        ...persona('Moraa_K'),
        experienceTag: 'Fibroids',
        text:
          'Almost your exact story — mother had them, I was diagnosed at 33 with three fibroids, was told surgery. I asked for a second opinion and the second gynaecologist asked a question the first never did: “Are they causing you any symptoms?” They weren’t. We monitored instead. I conceived my daughter the following year with the fibroids still there. I’m not saying avoid surgery — I’m saying the decision should be about YOUR symptoms and YOUR plans, not just their existence.',
        helpful: 198,
        createdAt: now - 6 * DAY + 5 * HOUR,
      },
      {
        id: seedId('a-fib-2'),
        type: 'clinical-response',
        ...persona('Dr. Wanjiku Kamau'),
        role: 'OB/GYN',
        text:
          'Fibroids are extremely common and usually benign; a family history like yours is typical. The important questions are not “are fibroids present” but: where are they, and are they causing problems? Fibroids that distort the womb cavity can affect fertility or pregnancy and may reasonably be removed (myomectomy, which preserves the womb). Fibroids in the wall or outer surface, without symptoms, often need only monitoring. Before any surgery is booked, ask: what symptom or risk is this surgery treating, how does the fibroid location affect my pregnancy plans, and what are the non-surgical options? Seeking a second opinion for exactly this decision is standard practice.',
        helpful: 345,
        createdAt: now - 5 * DAY - 4 * HOUR,
      },
    ],
  },
  {
    id: seedId('q-postpartum-anxiety'),
    title: 'Four months after birth, I feel anxious all the time',
    content:
      "Since I had my baby four months ago I feel anxious all the time. My heart races and I can't sleep even when the baby sleeps. I love my baby but I don't feel like myself. Is this normal?",
    topics: ['postpartum-anxiety'],
    ...persona('NewMama_25'),
    createdAt: now - 1 * DAY,
    evidenceCard: 'postpartum-anxiety',
    signal: {
      similarCount: 472,
      insight: '“Can’t sleep even when the baby sleeps” is the single most repeated phrase in postpartum questions — a classic sign of postpartum anxiety that mothers rarely mention at clinic visits.',
    },
    answers: [
      {
        id: seedId('a-pp-1'),
        type: 'lived-experience',
        ...persona('Wanjiru_M'),
        experienceTag: 'Postpartum anxiety',
        text:
          'That sentence — “can’t sleep even when the baby sleeps” — I said those exact words to my health visitor at five months. I thought I was failing. It turned out to be postpartum anxiety, and talking to someone was the turning point. Mine eased with support, short walks, and later a few counselling sessions. Please tell your midwife or clinic exactly what you wrote here. Write it on your phone and show them if saying it is hard. That’s what I did.',
        helpful: 176,
        createdAt: now - 1 * DAY + 4 * HOUR,
      },
      {
        id: seedId('a-pp-2'),
        type: 'clinical-response',
        ...persona('Faith Njeri'),
        role: 'Registered Midwife',
        text:
          'What you describe goes beyond the “baby blues”, which settle within about two weeks. Constant anxiety, racing heart, and being unable to sleep even when your baby sleeps, months after delivery, fits postpartum anxiety — a common, treatable condition, not a personal failing. Please speak to your midwife or clinic; effective help exists, including options compatible with breastfeeding. If you ever have thoughts of harming yourself or the baby, treat that as an emergency and seek care immediately (any hospital, or call 999/112). The Kenya Red Cross psychosocial line 1199 is also free. You deserve support, and getting it is part of caring for your baby.',
        helpful: 203,
        createdAt: now - 22 * HOUR,
      },
    ],
  },
  {
    id: seedId('q-cervical-screening'),
    title: 'How often should I actually go for cervical screening?',
    content:
      'Different people tell me different things — every year, every three years, only if you have symptoms. I am 29 and I have never been screened. What is the truth?',
    topics: ['cervical-screening'],
    ...persona('Atieno_J'),
    createdAt: now - 7 * DAY,
    evidenceCard: 'cervical-screening-kenya',
    signal: {
      similarCount: 512,
      insight: 'Screening-interval confusion is the top cervical-health question — guidelines differ by test type, and most women were never told which test they received.',
    },
    answers: [
      {
        id: seedId('a-cs-1'),
        type: 'lived-experience',
        ...persona('Damaris'),
        text:
          'I put it off for years out of fear, then went during a free screening camp at our sub-county hospital. It took less than ten minutes and the nurses were kind. Whatever interval you’re told afterwards, going the first time is the hard part — and it’s done.',
        helpful: 143,
        createdAt: now - 7 * DAY + 8 * HOUR,
      },
      {
        id: seedId('a-cs-2'),
        type: 'clinical-response',
        ...persona('Dr. Wanjiku Kamau'),
        role: 'OB/GYN',
        text:
          'The conflicting answers you hear are because the interval depends on the test. Kenyan guidance recommends routine screening from age 25: after a negative HPV DNA test the interval is typically 3–5 years; Pap smear and VIA/VILI are usually repeated more frequently (often 1–3 years depending on the result and programme). Women living with HIV are screened more often. At 29 and never screened, the most important step is simply to start — ask which test you are receiving and when to return. And symptoms like bleeding after sex or persistent unusual discharge should be checked promptly at any age, not saved for a screening visit.',
        helpful: 187,
        createdAt: now - 6 * DAY - 6 * HOUR,
      },
    ],
  },
  {
    id: seedId('q-depo-periods-stopped'),
    title: 'The injection made my periods stop. Is that dangerous?',
    content:
      "I've been on the injection (Depo) for a year and my periods have completely stopped. My aunt says the blood is 'collecting inside' and it's dangerous. I'm scared. Should I stop it?",
    topics: ['contraception'],
    ...persona('Amina_S'),
    createdAt: now - 8 * DAY,
    signal: {
      similarCount: 451,
      insight: 'Contraceptive side-effect questions are dominated by one myth: that stopped periods on Depo mean blood is “collecting”. It is the most repeated misconception in the commons.',
    },
    answers: [
      {
        id: seedId('a-depo-1'),
        type: 'lived-experience',
        ...persona('Halima'),
        text:
          'Three years on Depo, no periods, two healthy babies before and one after I stopped. My periods came back about 8 months after my last injection. The “collecting blood” story scared me too — it’s a myth, but a very convincing one when you hear it from people you trust.',
        helpful: 129,
        createdAt: now - 8 * DAY + 3 * HOUR,
      },
      {
        id: seedId('a-depo-2'),
        type: 'clinical-response',
        ...persona('Beatrice Achieng'),
        role: 'Reproductive Health Nurse',
        text:
          'You can reassure your aunt: no blood is collecting. Depo thins the womb lining and often stops ovulation, so there is simply little or no lining to shed — the absence of bleeding is an expected effect of the hormone, not a backup of blood. It is not harmful. Two things worth knowing: fertility can take some months to return after the last injection, so plan ahead if you want to conceive; and long-term use has considerations for bone health that your provider can review with you. If the change in bleeding worries you or does not suit you, switching methods is always an option — that is what family planning care is for.',
        helpful: 264,
        createdAt: now - 7 * DAY - 5 * HOUR,
      },
    ],
  },
  {
    id: seedId('q-irregular-45-days'),
    title: 'My periods come every 45 days or even two months',
    content:
      'I am 26. My periods have never been "monthly" — they come after 45 days, sometimes two months. I am not pregnant. Should I worry about this for the future? I attached my cycle calendar so you can see the pattern.',
    topics: ['irregular-periods', 'pcos', 'fertility'],
    ...persona('Muthoni'),
    createdAt: now - 9 * DAY,
    image: '/images/cycle-calendar.svg',
    signal: {
      similarCount: 1482,
      insight: 'Irregular periods are the #1 question cluster in the commons — and the top gateway to undiagnosed PCOS.',
    },
    answers: [
      {
        id: seedId('a-irr-1'),
        type: 'lived-experience',
        ...persona('Syombua'),
        experienceTag: 'PCOS',
        text:
          'My “normal” was exactly like yours — 40 to 60 day cycles since I was a teenager. At 28 when we started trying for a baby, tests showed PCOS. I wish I had investigated the pattern years earlier, not to panic, but to know my own body. An ultrasound and some blood tests answered questions I’d carried for a decade.',
        helpful: 118,
        createdAt: now - 9 * DAY + 7 * HOUR,
      },
      {
        id: seedId('a-irr-2'),
        type: 'clinical-response',
        ...persona('Dr. Rehema Salim'),
        role: 'Family Medicine',
        text:
          'Cycles up to about 35 days are within the usual range; regularly going 45 days or more means you are likely ovulating infrequently, and that is worth a conversation with a clinician — not an emergency, but useful information. Common causes include PCOS, thyroid disorders and elevated prolactin, all of which are checkable with simple blood tests. It matters for two reasons: long stretches without periods can leave the womb lining unprotected, and if you plan pregnancy later, knowing your ovulation pattern early helps. Keep a record of your cycle dates — it is the most useful thing you can bring to that appointment.',
        helpful: 231,
        createdAt: now - 8 * DAY - 8 * HOUR,
      },
    ],
  },
  {
    id: seedId('q-ttc-two-years'),
    title: 'Two years of trying to conceive. When do we seek help?',
    content:
      'We have been trying for a baby for two years. Everyone keeps telling me to relax and it will happen. My husband has never been tested. When should we actually seek help, and what happens first?',
    topics: ['fertility'],
    ...persona('Wangari'),
    createdAt: now - 10 * DAY,
    signal: {
      similarCount: 663,
      insight: 'In fertility questions, the woman seeks care alone in most stories — male partners are tested in fewer than 1 in 5 accounts.',
    },
    answers: [
      {
        id: seedId('a-ttc-1'),
        type: 'lived-experience',
        ...persona('Kerubo'),
        text:
          'We waited four years because everyone said relax. When we finally went, the FIRST test they did was my husband’s semen analysis — cheap, simple, done in a day. It turned out the issue was on his side and treatable. Two years is not too early. Go together. Make his testing the non-negotiable first step.',
        helpful: 287,
        createdAt: now - 10 * DAY + 6 * HOUR,
      },
      {
        id: seedId('a-ttc-2'),
        type: 'clinical-response',
        ...persona('Dr. Rehema Salim'),
        role: 'Family Medicine',
        text:
          'The clinical definition is clear: assessment is recommended after 12 months of regular trying (6 months if you are 35 or older), so two years is definitely the time. A first work-up covers both partners — semen analysis is simple and should be early, since male factors contribute in about half of couples. For you, expect questions about your cycles, blood tests for ovulation and hormones, and possibly an ultrasound or tubal test. Many causes are treatable, starting with the commonest ones like ovulation disorders. Go to the appointment together, and treat “just relax” as the unhelpful advice it is.',
        helpful: 246,
        createdAt: now - 9 * DAY - 3 * HOUR,
      },
    ],
  },
];

export function seedQuestionById(id: string): SeedQuestion | undefined {
  return SEED_QUESTIONS.find((q) => q.id === id);
}
