import type { Article } from '@/lib/nuru/types';

/**
 * The seed knowledge library. In production these are NIP-23 long-form
 * events (kind 30023) published by the commons and labelled with clinical
 * review attestations (NIP-32). Content is educational, not diagnostic.
 */
export const ARTICLES: Article[] = [
  {
    slug: 'your-cycle-explained',
    title: 'Your menstrual cycle, explained properly',
    summary:
      'Most of us were taught to count days, not to understand hormones. Here is what is actually happening across your cycle — and why it explains your energy, mood and body.',
    area: 'menstrual-health',
    topics: ['irregular-periods'],
    minutes: 6,
    reviewer: 'Clinical review panel',
    reviewerRole: 'Clinically reviewed',
    reviewedAt: 'January 2026',
    sources: [
      { label: 'NHS — Periods and fertility in the menstrual cycle', url: 'https://www.nhs.uk/conditions/periods/fertility-in-the-menstrual-cycle/' },
      { label: 'WHO — Sexual and reproductive health', url: 'https://www.who.int/health-topics/sexual-and-reproductive-health' },
    ],
    sections: [
      {
        paragraphs: [
          'A menstrual cycle is counted from the first day of one period to the first day of the next. Anywhere between 21 and 35 days can be normal — what matters most is what is normal for you, and whether that pattern changes.',
          'The cycle is driven by four main hormones working in two halves. Understanding them turns “random” symptoms into a pattern you can read.',
        ],
      },
      {
        heading: 'The first half: building up',
        paragraphs: [
          'During your period and the days after, estrogen rises as eggs mature in the ovaries. Many women feel energy and concentration improve through this phase. The womb lining thickens, preparing for a possible pregnancy.',
          'Ovulation — the release of an egg — happens roughly 14 days before the next period (not necessarily on day 14 of your cycle; that only holds for a 28-day cycle).',
        ],
      },
      {
        heading: 'The second half: winding down',
        paragraphs: [
          'After ovulation, progesterone takes the lead. Body temperature rises slightly, appetite can increase, and breasts may feel tender. If there is no pregnancy, both hormones fall — and that fall triggers both the period and, for many women, premenstrual symptoms.',
          'Mood changes, bloating, cramps and fatigue in the days before a period are hormonal events, not weakness or imagination.',
        ],
      },
      {
        heading: 'What is worth tracking',
        list: [
          'Cycle length and how much it varies',
          'Heaviness of bleeding and any clots',
          'Pain: where, when, and whether it stops your normal activities',
          'Mood, sleep and energy patterns',
        ],
      },
      {
        paragraphs: [
          'A simple record of three cycles tells a clinician more than memory ever can — and it tells you what your own normal looks like, which is the foundation of every other topic in this library.',
        ],
      },
    ],
  },
  {
    slug: 'severe-period-pain-when-to-worry',
    title: 'Severe period pain: when is it no longer “normal”?',
    summary:
      'Cramps are common. Pain that removes you from your own life is a symptom. Learn the difference, and what to say to a clinician who waves it away.',
    area: 'menstrual-health',
    topics: ['severe-period-pain', 'endometriosis'],
    minutes: 7,
    reviewer: 'Clinical review panel',
    reviewerRole: 'Clinically reviewed',
    reviewedAt: 'January 2026',
    sources: [
      { label: 'WHO — Endometriosis', url: 'https://www.who.int/news-room/fact-sheets/detail/endometriosis' },
      { label: 'NHS — Period pain', url: 'https://www.nhs.uk/conditions/period-pain/' },
    ],
    sections: [
      {
        paragraphs: [
          'Many Kenyan women grow up hearing that painful periods are simply part of being a woman — something to bear quietly with a hot water bottle. Mild to moderate cramping in the first day or two is indeed common. But there is a clear line where pain stops being a background inconvenience and becomes a symptom that deserves investigation.',
        ],
      },
      {
        heading: 'The line that matters',
        paragraphs: [
          'Ask yourself one question: does this pain stop me from living? If you regularly miss school, work, church or caring for your family; if you plan your month around dread; if ordinary painkillers barely touch it — that is significant pain, whatever anyone tells you.',
        ],
        list: [
          'Pain severe enough to stop daily activities most months',
          'Pain getting progressively worse over the years',
          'Pain during sex, or pain opening your bowels on your period',
          'Pain that continues outside your period',
          'Very heavy bleeding together with the pain',
        ],
      },
      {
        heading: 'What could be behind it',
        paragraphs: [
          'Some severe pain is “primary” — driven by prostaglandins, starting young, often easing with age. But progressive, life-stopping pain raises the question of endometriosis or adenomyosis: conditions where womb-lining-type tissue grows where it should not. Endometriosis affects roughly 1 in 10 women and famously takes years to diagnose — not because it is rare, but because the pain is normalized.',
          'Fibroids and pelvic infections can cause similar pictures. The point is not to self-diagnose; it is to know that causes exist and can be looked for.',
        ],
      },
      {
        heading: 'If you are dismissed',
        paragraphs: [
          'Bring a written record of two or three cycles: pain scores, what you could not do, what relief you tried. Ask directly: “Could this be endometriosis? What investigations are appropriate?” If one clinician will not engage, seeking a second opinion is your right, not a betrayal.',
        ],
      },
    ],
  },
  {
    slug: 'pcos-explained',
    title: 'PCOS explained — beyond “just lose weight”',
    summary:
      'Polycystic ovary syndrome affects cycles, skin, weight, fertility and mood. It is manageable, and a real care plan has more than one sentence in it.',
    area: 'conditions',
    topics: ['pcos', 'irregular-periods', 'fertility'],
    minutes: 8,
    reviewer: 'Clinical review panel',
    reviewerRole: 'Clinically reviewed',
    reviewedAt: 'January 2026',
    sources: [
      { label: 'WHO — Polycystic ovary syndrome', url: 'https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome' },
      { label: 'International PCOS Guideline 2023', url: 'https://www.monash.edu/medicine/mchri/pcos/guideline' },
    ],
    sections: [
      {
        paragraphs: [
          'PCOS is a hormonal condition in which the ovaries produce higher levels of androgens, disrupting the rhythm of ovulation. Periods become irregular or disappear; acne and excess hair can appear; the “cysts” are actually many small follicles visible on ultrasound, not dangerous growths.',
          'It is one of the most common conditions in women of reproductive age worldwide — and one of the least explained.',
        ],
      },
      {
        heading: 'Why “just lose weight” is not a plan',
        paragraphs: [
          'Many women with PCOS have insulin resistance: the body manages blood sugar less efficiently, which drives both weight gain and androgen production. Weight loss can genuinely help some women — but it is hard precisely because of the condition, and thin women get PCOS too. A useful plan addresses your actual symptoms.',
        ],
        list: [
          'Cycle protection: if periods disappear for months, the womb lining needs protection (usually with hormones)',
          'Skin and hair: from skincare to anti-androgen medicines',
          'Metabolic health: screening for insulin resistance and diabetes',
          'Fertility: PCOS is a leading cause of ovulation problems — and one of the most treatable',
          'Mental health: anxiety and low mood are significantly more common with PCOS',
        ],
      },
      {
        heading: 'What good care looks like',
        paragraphs: [
          'Diagnosis usually combines your history, blood tests and sometimes ultrasound — no single test rules it in or out. Management should be built around your priorities: regulating cycles, managing skin and hair, preparing for pregnancy, or protecting long-term health. You are allowed to set the agenda.',
        ],
      },
    ],
  },
  {
    slug: 'endometriosis-the-long-diagnosis',
    title: 'Endometriosis: why does diagnosis take so long?',
    summary:
      'On average, endometriosis takes years to diagnose. Understanding why — and what the community’s shared experience reveals — can shorten your own road.',
    area: 'conditions',
    topics: ['endometriosis', 'severe-period-pain'],
    minutes: 7,
    reviewer: 'Clinical review panel',
    reviewerRole: 'Clinically reviewed',
    reviewedAt: 'January 2026',
    sources: [
      { label: 'WHO — Endometriosis', url: 'https://www.who.int/news-room/fact-sheets/detail/endometriosis' },
      { label: 'RCOG — Endometriosis patient information', url: 'https://www.rcog.org.uk/for-the-public/browse-all-patient-information-leaflets/endometriosis-patient-information-leaflet/' },
    ],
    sections: [
      {
        paragraphs: [
          'Endometriosis occurs when tissue similar to the womb lining grows outside the womb — on ovaries, tubes, the pelvis, sometimes further. Each month that tissue bleeds with nowhere to go, causing inflammation, scarring and pain. It affects roughly one in ten women, yet diagnosis commonly takes seven years or more.',
        ],
      },
      {
        heading: 'Why the delay?',
        list: [
          'Normalization: generations of women told that agony is “just periods”',
          'Symptom overlap with IBS, infections and “stress”',
          'Ultrasound can miss endometriosis — a normal scan does not rule it out',
          'The only definitive test is laparoscopy (keyhole surgery), which not every facility offers',
        ],
      },
      {
        heading: 'What the community’s experience adds',
        paragraphs: [
          'Clinically, a symptom may be described as “uncommon”. But when hundreds of women describe the same pattern — pain from their teens, dismissal, relief at finally being believed — that is not proof of a diagnosis. It is something else valuable: evidence of where the health system is failing to listen. That is what this commons exists to record.',
        ],
      },
      {
        heading: 'Moving your own case forward',
        paragraphs: [
          'Document your symptoms across cycles. Say the word “endometriosis” out loud and ask whether it should be considered. If pain is your main symptom and it is life-limiting, you are entitled to a gynaecology review. Treatment ranges from hormonal management to surgery, and fertility considerations shape the choice — so raise your plans explicitly.',
        ],
      },
    ],
  },
  {
    slug: 'fibroids-kenyan-women',
    title: 'Fibroids: what every Kenyan woman should know',
    summary:
      'Fibroids are so common among African women that they are almost a family inheritance. Most need no treatment — and “you have fibroids” is not automatically “you need surgery”.',
    area: 'conditions',
    topics: ['fibroids', 'heavy-bleeding'],
    minutes: 7,
    reviewer: 'Clinical review panel',
    reviewerRole: 'Clinically reviewed',
    reviewedAt: 'January 2026',
    sources: [
      { label: 'NHS — Fibroids', url: 'https://www.nhs.uk/conditions/fibroids/' },
      { label: 'Mayo Clinic — Uterine fibroids', url: 'https://www.mayoclinic.org/diseases-conditions/uterine-fibroids/symptoms-causes/syc-20354288' },
    ],
    sections: [
      {
        paragraphs: [
          'Fibroids are non-cancerous growths of the womb’s muscle. By age 40, the majority of women — and an even larger share of women of African descent — have at least one. Most will never know, because most fibroids cause no symptoms at all.',
        ],
      },
      {
        heading: 'When fibroids matter',
        list: [
          'Heavy or prolonged periods, sometimes leading to anaemia',
          'Pressure: frequent urination, constipation, a swollen lower abdomen',
          'Pain, including pain during sex',
          'In some women, difficulty conceiving or pregnancy complications — but many women with fibroids conceive and deliver normally',
        ],
      },
      {
        heading: 'The surgery question',
        paragraphs: [
          'Being told you have fibroids is not the same as needing an operation. The decision should weigh your symptoms, your age, and your plans for children. Options include medicines that control bleeding or shrink fibroids, myomectomy (removing fibroids, preserving the womb), uterine artery embolization, and — only when symptoms and circumstances truly justify it — hysterectomy.',
          'If surgery is proposed without a symptom-based reason, ask what the surgery is for. A second opinion is reasonable and common.',
        ],
      },
      {
        heading: 'If your mother had them',
        paragraphs: [
          'Fibroids run in families. If your mother or sisters had them, mention it at your next check-up, and treat heavy or changing bleeding as a reason for review rather than something to absorb silently.',
        ],
      },
    ],
  },
  {
    slug: 'contraception-side-effects',
    title: 'Contraception: making sense of side effects',
    summary:
      'Stopped periods on the injection, mood changes on the pill, irregular bleeding on the implant — what is expected, what is not, and when to switch rather than suffer.',
    area: 'sexual-health',
    topics: ['contraception'],
    minutes: 6,
    reviewer: 'Clinical review panel',
    reviewerRole: 'Clinically reviewed',
    reviewedAt: 'January 2026',
    sources: [
      { label: 'WHO — Family planning / contraception', url: 'https://www.who.int/news-room/fact-sheets/detail/family-planning-contraception' },
      { label: 'NHS — Contraception guide', url: 'https://www.nhs.uk/contraception/' },
    ],
    sections: [
      {
        paragraphs: [
          'Every contraceptive method trades benefits against side effects, and every body responds differently. The goal of family planning care is not to endure a method you hate — it is to find the one that fits your body and your life. Switching methods is normal, not failure.',
        ],
      },
      {
        heading: 'What is usually expected',
        list: [
          'Injectable (e.g. Depo): periods often become irregular, then stop — this is expected and not harmful. Fertility can take some months to return after stopping',
          'Implant: irregular spotting is common, especially in the first months; some women’s periods stop',
          'Hormonal IUD: lighter periods or none; cramping at insertion',
          'Combined pill: nausea, breast tenderness or mood changes in the first months often settle',
          'Copper IUD: hormone-free, but periods can become heavier',
        ],
      },
      {
        heading: 'What is not something to ignore',
        list: [
          'Severe headaches with visual changes on a combined pill — seek review promptly',
          'Leg swelling or chest pain — rare but urgent',
          'Bleeding after sex or persistent pain — needs examination, whatever your method',
          'Mood changes that are significantly affecting your life',
        ],
      },
      {
        heading: 'You are allowed to change your mind',
        paragraphs: [
          'If a method is making your life worse, go back and say so plainly. Ask what alternatives exist at your facility, and remember condoms remain the only method that also protects against STIs — dual protection is worth considering.',
        ],
      },
    ],
  },
  {
    slug: 'cervical-screening-guide',
    title: 'Cervical screening: the test that prevents cancer',
    summary:
      'Cervical cancer kills thousands of Kenyan women each year — yet it is one of the most preventable cancers. Here is what screening involves and how often you actually need it.',
    area: 'cancer-prevention',
    topics: ['cervical-screening'],
    minutes: 6,
    reviewer: 'Clinical review panel',
    reviewerRole: 'Clinically reviewed',
    reviewedAt: 'January 2026',
    sources: [
      { label: 'WHO — Cervical cancer', url: 'https://www.who.int/news-room/fact-sheets/detail/cervical-cancer' },
      { label: 'Kenya Ministry of Health', url: 'https://www.health.go.ke/' },
    ],
    sections: [
      {
        paragraphs: [
          'Cervical cancer is the second most common cancer among Kenyan women, causing thousands of deaths each year. Almost all of it is caused by long-term infection with HPV, a virus so common that most sexually active people will encounter it. Screening finds precancerous changes years before they become cancer — when they can still be treated easily.',
        ],
      },
      {
        heading: 'What screening looks like in Kenya',
        list: [
          'HPV DNA testing: the most sensitive option, increasingly available',
          'Pap smear: cells from the cervix examined for changes',
          'VIA/VILI: visual inspection with acetic acid, widely available at primary facilities with same-visit treatment of small lesions',
        ],
      },
      {
        heading: 'How often?',
        paragraphs: [
          'Kenyan guidelines recommend routine screening from age 25, with the interval depending on the test: roughly every 3–5 years after a negative HPV or Pap result, and more frequently for women living with HIV. The exact schedule you are given may differ between facilities because test types differ — that is why you hear conflicting answers. What is never right is never screening at all.',
          'And remember: HPV vaccination protects girls (and boys) before exposure — ask about it for the 10–14 year olds in your life.',
        ],
      },
      {
        heading: 'Symptoms that should never wait for a screening date',
        list: [
          'Bleeding after sex or between periods',
          'Persistent foul-smelling discharge',
          'New, persistent pelvic pain',
        ],
      },
    ],
  },
  {
    slug: 'perimenopause-transition',
    title: 'Perimenopause: the transition nobody explains',
    summary:
      'Sleep collapses, anxiety appears from nowhere, cycles shift — years before periods stop. This is perimenopause, and most women meet it without ever having heard the word.',
    area: 'perimenopause',
    topics: ['perimenopause', 'pms-pmdd'],
    minutes: 8,
    reviewer: 'Clinical review panel',
    reviewerRole: 'Clinically reviewed',
    reviewedAt: 'January 2026',
    sources: [
      { label: 'NHS — Menopause', url: 'https://www.nhs.uk/conditions/menopause/' },
      { label: 'WHO — Menopause', url: 'https://www.who.int/news-room/fact-sheets/detail/menopause' },
    ],
    sections: [
      {
        paragraphs: [
          'Menopause itself is one day: twelve months after your final period. Perimenopause is everything before that — a transition that typically begins in the early-to-mid 40s (sometimes late 30s) and can last four to eight years. Hormones do not decline smoothly; they swing, which is why this phase can feel so chaotic.',
        ],
      },
      {
        heading: 'The symptoms nobody connects',
        list: [
          'Cycles becoming shorter, longer, heavier or unpredictable',
          'Sleep breaking down — often the first and most exhausting sign',
          'New anxiety, irritability or low mood, sometimes in women with no history of it',
          'Hot flushes and night sweats (not everyone gets these)',
          'Brain fog, joint aches, dry skin, lower libido',
        ],
        paragraphs: [
          'Because periods are still happening, many women — and some clinicians — do not connect these dots. Being told “you are just stressed” at 43 is a nearly universal story. Stress may be real; it may also not be the whole explanation.',
        ],
      },
      {
        heading: 'What actually helps',
        paragraphs: [
          'Treatment is individual: for some women, lifestyle adjustments and targeted support are enough; for others, menopause hormone therapy (MHT/HRT) is safe, effective and life-changing — the decision depends on your symptoms, age and history, and it is a conversation you are entitled to have. Protecting sleep, bones and heart health starts in this window, not after it.',
        ],
      },
      {
        heading: 'What needs checking, not assuming',
        list: [
          'Very heavy or prolonged bleeding — common in perimenopause but worth assessing',
          'Bleeding after sex, or any bleeding a year after your last period',
          'Anxiety or low mood that feels unmanageable — treatable in its own right',
        ],
      },
    ],
  },
  {
    slug: 'postpartum-anxiety-guide',
    title: 'More than baby blues: postpartum anxiety and depression',
    summary:
      'Feeling constantly on edge after birth, unable to sleep even when the baby sleeps, is not weakness — it is one of the most common complications of childbirth, and it is treatable.',
    area: 'postpartum',
    topics: ['postpartum-anxiety'],
    minutes: 7,
    reviewer: 'Clinical review panel',
    reviewerRole: 'Clinically reviewed',
    reviewedAt: 'January 2026',
    sources: [
      { label: 'WHO — Maternal mental health', url: 'https://www.who.int/teams/mental-health-and-substance-use/promotion-prevention/maternal-mental-health' },
      { label: 'NHS — Postnatal depression', url: 'https://www.nhs.uk/conditions/post-natal-depression/' },
    ],
    sections: [
      {
        paragraphs: [
          'The “baby blues” — tearfulness and overwhelm in the first days after birth — affect most new mothers and pass within about two weeks. What does not pass is different: postpartum anxiety and depression are medical conditions affecting roughly one in seven mothers, and they can begin any time in the first year.',
        ],
      },
      {
        heading: 'What it can look like',
        list: [
          'Constant worry that something terrible will happen to the baby',
          'A racing heart, restlessness, or being unable to sleep even when the baby sleeps',
          'Persistent sadness, numbness, guilt, or feeling like a bad mother',
          'Withdrawing from people, or feeling nothing where you expected joy',
        ],
      },
      {
        heading: 'Why it stays hidden',
        paragraphs: [
          'New mothers are expected to glow. Admitting struggle feels like admitting failure — so women say “I am fine” while falling apart. Postpartum conditions are not caused by anything you did; they arise from hormonal shifts, sleep loss, birth experiences and circumstances, and they respond to treatment. Many treatments, including key medicines, are compatible with breastfeeding.',
        ],
      },
      {
        heading: 'When it is urgent',
        paragraphs: [
          'Thoughts of harming yourself or the baby, or losing touch with reality (confusion, paranoia, hearing things), are emergencies — go to a hospital or call 999/112 immediately. For everything else: tell your midwife, your clinic, or someone you trust today. Kenya Red Cross runs a psychosocial support line on 1199. Asking for help is part of taking care of your baby.',
        ],
      },
    ],
  },
  {
    slug: 'painful-sex-not-normal',
    title: 'Painful sex is common — it is not normal',
    summary:
      'Pain during sex is one of the most searched and least discussed women’s health symptoms. It has causes, and causes have treatments.',
    area: 'sexual-health',
    topics: ['painful-sex', 'endometriosis'],
    minutes: 6,
    reviewer: 'Clinical review panel',
    reviewerRole: 'Clinically reviewed',
    reviewedAt: 'January 2026',
    sources: [
      { label: 'NHS — Pain during sex', url: 'https://www.nhs.uk/conditions/pain-during-sex/' },
      { label: 'WHO — Sexual health', url: 'https://www.who.int/health-topics/sexual-health' },
    ],
    sections: [
      {
        paragraphs: [
          'Many women believe pain with sex is simply part of womanhood — something to be silent about, or to endure for a partner. Medically, pain is information. It points to causes that can almost always be found, and most can be treated.',
        ],
      },
      {
        heading: 'What the pain can mean',
        list: [
          'Pain at entry: dryness (breastfeeding, perimenopause, some pills), skin conditions, infections, or pelvic floor muscles tensing',
          'Deep pain: endometriosis, adenomyosis, ovarian cysts, pelvic infection, or fibroids',
          'Pain with discharge or fever: infection — very treatable, but it needs testing',
          'Pain that began after childbirth: healing scar tissue or pelvic floor changes',
        ],
      },
      {
        heading: 'The cycle of guarding',
        paragraphs: [
          'When pain is expected, the body braces — and bracing itself creates more pain. This is why “just relax” fails, and why proper assessment matters: breaking the cycle means treating the original cause and, often, retraining the pelvic floor with a physiotherapist.',
        ],
      },
      {
        paragraphs: [
          'Bring it up plainly: “I experience pain during sex and I want to find the cause.” A respectful clinician will take it from there. If pain follows an assault, or you feel unsafe, specialist support exists — Kenya’s GBV helpline is 1195, and medical care within 72 hours can protect against HIV and pregnancy.',
        ],
      },
    ],
  },
  {
    slug: 'trying-to-conceive-when-to-seek-help',
    title: 'Trying to conceive: when waiting becomes a reason to seek help',
    summary:
      'How long is normal, what a first fertility work-up involves, and why it should start with both partners — not just the woman.',
    area: 'fertility',
    topics: ['fertility', 'pcos'],
    minutes: 6,
    reviewer: 'Clinical review panel',
    reviewerRole: 'Clinically reviewed',
    reviewedAt: 'January 2026',
    sources: [
      { label: 'WHO — Infertility', url: 'https://www.who.int/news-room/fact-sheets/detail/infertility' },
      { label: 'NHS — Infertility', url: 'https://www.nhs.uk/conditions/infertility/' },
    ],
    sections: [
      {
        paragraphs: [
          'Most couples conceive within a year of regular unprotected sex. Clinically, infertility is defined as no pregnancy after 12 months of trying — or after 6 months if the woman is 35 or older. Those are the points where assessment is recommended, not personal milestones you failed.',
        ],
      },
      {
        heading: 'Infertility is not a women’s condition',
        paragraphs: [
          'In roughly half of couples struggling to conceive, a male factor contributes. Yet culturally the burden — and the blame — falls on women. A proper work-up starts with both partners: a semen analysis is simple, inexpensive, and should be among the first tests, not the last.',
        ],
      },
      {
        heading: 'What a first assessment covers',
        list: [
          'History: cycles, previous pregnancies, infections, surgeries',
          'Ovulation: cycle tracking and hormone blood tests',
          'Tubes and womb: ultrasound, and sometimes a tubal patency test',
          'Semen analysis for the partner',
          'Screening for contributors like PCOS, thyroid disorders and untreated infections',
        ],
      },
      {
        paragraphs: [
          'Many causes are treatable — ovulation problems especially. Whatever the outcome, you are entitled to clear information, both partners assessed, and care that does not begin and end with blame.',
        ],
      },
    ],
  },
];

export function articleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function articlesForArea(area: string): Article[] {
  return ARTICLES.filter((a) => a.area === area);
}

export function articlesForTopic(topic: string): Article[] {
  return ARTICLES.filter((a) => a.topics.includes(topic));
}
