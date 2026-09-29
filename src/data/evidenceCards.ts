import type { EvidenceCardData } from '@/lib/nuru/types';

/**
 * Clinician-reviewed evidence cards (kind 35113 in production — see NIP.md).
 * Educational only: they explain patterns and red flags, never diagnose.
 */
export const EVIDENCE_CARDS: EvidenceCardData[] = [
  {
    slug: 'severe-menstrual-pain',
    title: 'Severe menstrual pain',
    topic: 'severe-period-pain',
    summary:
      'Period pain is common, but pain that regularly stops you from living your normal life is not something you must simply endure. Severe menstrual pain has identifiable causes — some simple to treat, others (like endometriosis) that deserve investigation. Pain that is getting worse over the years, or that does not respond to ordinary pain relief, is a reason to seek assessment, not a test of endurance.',
    commonCauses: [
      'Primary dysmenorrhoea — cramping caused by prostaglandins, usually starting in the teens and often easing with age or after childbirth',
      'Endometriosis — tissue similar to the womb lining growing outside the womb; a leading cause of severe, progressive pain',
      'Adenomyosis — womb-lining tissue growing into the muscle wall, often causing heavy, painful periods',
      'Fibroids — non-cancerous growths that can increase pain and bleeding',
      'Pelvic inflammatory disease (PID) — infection that can cause ongoing pelvic pain',
    ],
    redFlags: [
      'Pain that stops you from working, studying or doing daily activities most months',
      'Pain that is steadily getting worse over time',
      'Pain during sex, or pain when opening your bowels during your period',
      'Pain not relieved by ordinary over-the-counter painkillers',
      'Severe pain together with very heavy bleeding, fainting, or fever',
    ],
    questionsForClinician: [
      'Could my pain be caused by endometriosis or adenomyosis?',
      'What are my options beyond “just take painkillers”?',
      'Would an ultrasound or further investigations be appropriate for me?',
      'How might this affect my fertility, and should that change my treatment plan?',
    ],
    sources: [
      { label: 'WHO — Endometriosis fact sheet', url: 'https://www.who.int/news-room/fact-sheets/detail/endometriosis' },
      { label: 'NHS — Period pain', url: 'https://www.nhs.uk/conditions/period-pain/' },
      { label: 'RCOG — Endometriosis patient information', url: 'https://www.rcog.org.uk/for-the-public/browse-all-patient-information-leaflets/endometriosis-patient-information-leaflet/' },
    ],
    reviewedAt: 'September 2026',
    reviewer: 'Nuru clinical review panel · Dr. Wanjiku Kamau (OB/GYN)',
  },
  {
    slug: 'perimenopause-basics',
    title: 'Perimenopause',
    topic: 'perimenopause',
    summary:
      'Perimenopause is the transition before menopause, and it can begin in the early-to-mid 40s — sometimes earlier. Hormones begin to fluctuate while periods are still happening, which is why symptoms like changing cycles, poor sleep, anxiety, brain fog and hot flushes can appear years before periods stop. Many women are told they are “just stressed” because nobody explained that this transition exists. It is real, it is hormonal, and it is treatable.',
    commonCauses: [
      'Fluctuating estrogen and progesterone as ovarian function begins to change',
      'Sleep disruption from night sweats, which then amplifies anxiety and low mood',
      'Life-stage stressors (caring, work, ageing parents) compounding hormonal change — but not replacing it',
    ],
    redFlags: [
      'Very heavy bleeding (soaking a pad every hour) or bleeding lasting more than a week',
      'Bleeding after sex, or bleeding between periods that is new for you',
      'Any bleeding more than 12 months after your final period — always get this checked',
      'Anxiety or low mood that feels unmanageable, or thoughts of harming yourself — this deserves care immediately',
    ],
    questionsForClinician: [
      'Could my symptoms be perimenopause rather than stress?',
      'What blood tests, if any, are useful at my age — and which are not?',
      'What are my treatment options, including hormonal and non-hormonal ones?',
      'What should I know about bone and heart health during this transition?',
    ],
    sources: [
      { label: 'NHS — Menopause: symptoms', url: 'https://www.nhs.uk/conditions/menopause/' },
      { label: 'WHO — Menopause fact sheet', url: 'https://www.who.int/news-room/fact-sheets/detail/menopause' },
      { label: 'The Menopause Charity — perimenopause resources', url: 'https://www.themenopausecharity.org/' },
    ],
    reviewedAt: 'September 2026',
    reviewer: 'Nuru clinical review panel · Dr. Wanjiku Kamau (OB/GYN)',
  },
  {
    slug: 'pcos-overview',
    title: 'Understanding PCOS',
    topic: 'pcos',
    summary:
      'Polycystic ovary syndrome (PCOS) is one of the most common hormonal conditions in women of reproductive age. It can show up as irregular or absent periods, acne, excess facial or body hair, and difficulty conceiving — but it looks different in every woman. Being told to “just lose weight” is not a treatment plan. PCOS is managed, not cured, and good management covers cycles, skin, metabolic health, fertility goals and mental wellbeing.',
    commonCauses: [
      'Higher levels of androgens (“male-type” hormones every woman has) disrupting ovulation',
      'Insulin resistance, which can drive weight gain and hormonal imbalance in many — but not all — women with PCOS',
      'Genetic tendency: PCOS often runs in families',
    ],
    redFlags: [
      'Going more than 3 months without a period (when not pregnant) — the womb lining needs protection',
      'Rapidly worsening hair growth, deepening voice, or sudden severe acne — needs prompt review',
      'Very heavy or prolonged bleeding when periods do come',
    ],
    questionsForClinician: [
      'How was my PCOS diagnosed — ultrasound, blood tests, or both?',
      'How do we protect my womb lining if my periods stay irregular?',
      'Should I be screened for insulin resistance or diabetes?',
      'What are my options if I want to conceive — and if I don’t?',
      'Can we make a plan for the symptoms that bother me most, not only my weight?',
    ],
    sources: [
      { label: 'WHO — Polycystic ovary syndrome fact sheet', url: 'https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome' },
      { label: 'NHS — Polycystic ovary syndrome', url: 'https://www.nhs.uk/conditions/polycystic-ovary-syndrome-pcos/' },
      { label: 'International Evidence-based Guideline for PCOS (2023)', url: 'https://www.monash.edu/medicine/mchri/pcos/guideline' },
    ],
    reviewedAt: 'August 2026',
    reviewer: 'Nuru clinical review panel · Dr. Rehema Salim (Family Medicine)',
  },
  {
    slug: 'heavy-menstrual-bleeding',
    title: 'Heavy menstrual bleeding',
    topic: 'heavy-bleeding',
    summary:
      'Heavy periods are often normalized within families — “ours have always been heavy” — but bleeding that soaks through protection, floods, or leaves you exhausted and breathless is not something to normalize. Heavy menstrual bleeding is one of the most treatable women’s health problems, and it is also the leading cause of iron-deficiency anaemia in women. In Kenya, fibroids are an especially common cause.',
    commonCauses: [
      'Fibroids and polyps — growths in or on the womb',
      'Adenomyosis and hormonal imbalance (including PCOS and perimenopause)',
      'Bleeding disorders (e.g. von Willebrand disease) — often missed since adolescence',
      'Thyroid disorders; less commonly, other womb conditions that must be excluded',
      'Sometimes no structural cause is found — treatment is still available',
    ],
    redFlags: [
      'Soaking a pad or tampon every hour for several hours',
      'Passing clots larger than about 2.5 cm (a 10-shilling coin) regularly',
      'Bleeding for more than 7 days, or cycles closer than 21 days',
      'Feeling dizzy, faint, breathless, or looking pale — possible anaemia',
      'Any bleeding after sex or after menopause',
    ],
    questionsForClinician: [
      'Should I have a full blood count to check for anaemia, and iron studies?',
      'Is an ultrasound appropriate to look for fibroids or polyps?',
      'What treatments can reduce the bleeding — tablets, hormonal options, or procedures?',
      'Could a bleeding disorder explain why this started when I was young?',
    ],
    sources: [
      { label: 'NHS — Heavy periods', url: 'https://www.nhs.uk/conditions/heavy-periods/' },
      { label: 'WHO — Anaemia in women', url: 'https://www.who.int/health-topics/anaemia' },
      { label: 'FIGO — Abnormal uterine bleeding resources', url: 'https://www.figo.org/' },
    ],
    reviewedAt: 'September 2026',
    reviewer: 'Nuru clinical review panel · Dr. Wanjiku Kamau (OB/GYN)',
  },
  {
    slug: 'pain-during-sex',
    title: 'Pain during sex',
    topic: 'painful-sex',
    summary:
      'Pain with sex (dyspareunia) is common — and it is never “just in your head” or a duty to endure. It has physical causes that can be found and treated: infections, dryness (including breastfeeding and perimenopause), conditions like endometriosis, pelvic floor muscle tension, and more. Pain is your body’s information, and a respectful clinician will take it seriously.',
    commonCauses: [
      'Infections — STIs, yeast or bacterial infections, pelvic inflammatory disease',
      'Vaginal dryness — breastfeeding, perimenopause/menopause, some contraceptives',
      'Endometriosis or adenomyosis — typically deep pain',
      'Pelvic floor muscle tension or vaginismus — muscles guarding against expected pain',
      'Skin conditions, scar tissue after childbirth, or ovarian cysts',
    ],
    redFlags: [
      'Deep pain that is getting worse over time, or pain with bleeding after sex',
      'Pain together with unusual discharge, fever, or lower abdominal pain (possible infection)',
      'Pain that has made you avoid intimacy or feel afraid — you deserve support, not silence',
      'Any pain after sexual assault — care is available, including within 72 hours for PEP',
    ],
    questionsForClinician: [
      'Could an infection be causing this, and can we test for STIs?',
      'Could this be endometriosis, given my other symptoms?',
      'Would a pelvic floor physiotherapist help in my case?',
      'Are there hormonal or lubrication options that would help?',
    ],
    sources: [
      { label: 'NHS — Pain during sex', url: 'https://www.nhs.uk/conditions/pain-during-sex/' },
      { label: 'WHO — Sexual health', url: 'https://www.who.int/health-topics/sexual-health' },
      { label: 'ISSWSH — women’s sexual health resources', url: 'https://www.isswsh.org/' },
    ],
    reviewedAt: 'September 2026',
    reviewer: 'Nuru clinical review panel · Beatrice Achieng (Reproductive Health Nurse)',
  },
  {
    slug: 'cervical-screening-kenya',
    title: 'Cervical screening in Kenya',
    topic: 'cervical-screening',
    summary:
      'Cervical cancer is the second most common cancer among Kenyan women — and one of the most preventable. Almost all cervical cancer is caused by long-term HPV infection, which screening can detect years before cancer develops. Kenya’s national guideline recommends routine screening for women from age 25 (or earlier for women living with HIV), with the interval depending on the test used and your result. Screening is quick, available at many public facilities, and saves lives.',
    commonCauses: [
      'Persistent HPV (human papillomavirus) infection — a very common virus that most sexually active people acquire',
      'Higher risk with HIV infection, early sexual debut, many births, smoking, and long gaps without screening',
    ],
    redFlags: [
      'Bleeding after sex, between periods, or after menopause',
      'Persistent unusual or foul-smelling discharge',
      'Pelvic pain or pain during sex that is new and persistent',
      'These symptoms do not mean cancer — but they always deserve examination',
    ],
    questionsForClinician: [
      'Which screening test do you offer — VIA/VILI, Pap smear, or HPV DNA testing?',
      'Given my age, HIV status and history, how often should I be screened?',
      'Is the HPV vaccine still useful for me or for my daughters, and at what ages?',
      'If my result is abnormal, what happens next?',
    ],
    sources: [
      { label: 'WHO — Cervical cancer fact sheet', url: 'https://www.who.int/news-room/fact-sheets/detail/cervical-cancer' },
      { label: 'Kenya National Cancer Screening Guidelines (Ministry of Health)', url: 'https://www.health.go.ke/' },
      { label: 'NCCN/WHO — HPV vaccination information', url: 'https://www.who.int/teams/immunization-vaccines-and-biologicals/diseases/human-papillomavirus-(hpv)' },
    ],
    reviewedAt: 'September 2026',
    reviewer: 'Nuru clinical review panel · Dr. Wanjiku Kamau (OB/GYN)',
  },
  {
    slug: 'postpartum-anxiety',
    title: 'Postpartum anxiety & depression',
    topic: 'postpartum-anxiety',
    summary:
      'After childbirth, hormones drop sharply while sleep disappears — and for many women this triggers more than the brief “baby blues”. Postpartum anxiety (constant worry, racing heart, inability to sleep even when the baby sleeps) and postpartum depression (persistent low mood, numbness, guilt) are medical conditions, not personal failures. They are common, they are treatable, and asking for help is good mothering, not weakness.',
    commonCauses: [
      'The sharp hormonal drop after delivery interacting with sleep deprivation',
      'A personal or family history of anxiety or depression',
      'Difficult birth experience, limited support, or feeding struggles',
      'Pressure to appear joyful, which keeps suffering hidden',
    ],
    redFlags: [
      'Thoughts of harming yourself or the baby — seek help immediately (999/112, or go to any hospital)',
      'Feeling unable to care for yourself or the baby',
      'Hearing or seeing things others do not, confusion, or paranoia — a rare emergency called postpartum psychosis',
      'Symptoms lasting more than two weeks, or getting worse',
    ],
    questionsForClinician: [
      'Could this be postpartum anxiety or depression, and how do we assess it?',
      'What treatment options are safe while breastfeeding?',
      'Are there counselling or support groups you can connect me with?',
      'What should my partner and family know so they can support me?',
    ],
    sources: [
      { label: 'WHO — Maternal mental health', url: 'https://www.who.int/teams/mental-health-and-substance-use/promotion-prevention/maternal-mental-health' },
      { label: 'NHS — Postnatal depression', url: 'https://www.nhs.uk/conditions/post-natal-depression/' },
      { label: 'Kenya Red Cross psychosocial support line 1199', url: 'https://www.redcross.or.ke/' },
    ],
    reviewedAt: 'September 2026',
    reviewer: 'Nuru clinical review panel · Faith Njeri (Registered Midwife)',
  },
  {
    slug: 'fibroids-basics',
    title: 'Fibroids',
    topic: 'fibroids',
    summary:
      'Fibroids are non-cancerous growths of the womb and are extremely common in African women — by age 40, most women have at least one, often without knowing it. Many fibroids need no treatment at all. Treatment decisions should be based on your symptoms (bleeding, pressure, pain), your plans for pregnancy, and the fibroids’ size and position — not on fear, and not on automatic surgery.',
    commonCauses: [
      'The exact cause is unknown; they grow in response to estrogen and progesterone',
      'Family history is a strong factor — if your mother had them, your risk is higher',
      'They are more common and often larger in women of African descent',
    ],
    redFlags: [
      'Heavy bleeding causing anaemia (exhaustion, breathlessness, paleness)',
      'A rapidly enlarging abdomen, or sudden severe pain (a fibroid can outgrow its blood supply)',
      'Pressure symptoms: frequent urination, constipation, or a visibly swollen lower abdomen',
      'Difficulty conceiving or recurrent pregnancy loss together with fibroids',
    ],
    questionsForClinician: [
      'Where are my fibroids located, and does that explain my symptoms?',
      'Do I need treatment now, or is monitoring appropriate?',
      'What are all my options — medicines, uterine artery embolization, myomectomy — and how does each affect future pregnancy?',
      'Is surgery being recommended because of my symptoms, or only because fibroids are present?',
    ],
    sources: [
      { label: 'NHS — Fibroids', url: 'https://www.nhs.uk/conditions/fibroids/' },
      { label: 'WHO — Reproductive health resources', url: 'https://www.who.int/health-topics/sexual-and-reproductive-health' },
      { label: 'Mayo Clinic — Uterine fibroids', url: 'https://www.mayoclinic.org/diseases-conditions/uterine-fibroids/symptoms-causes/syc-20354288' },
    ],
    reviewedAt: 'August 2026',
    reviewer: 'Nuru clinical review panel · Dr. Wanjiku Kamau (OB/GYN)',
  },
];

export function evidenceCardBySlug(slug: string): EvidenceCardData | undefined {
  return EVIDENCE_CARDS.find((c) => c.slug === slug);
}

export function evidenceCardsForTopic(topic: string): EvidenceCardData[] {
  return EVIDENCE_CARDS.filter((c) => c.topic === topic);
}
