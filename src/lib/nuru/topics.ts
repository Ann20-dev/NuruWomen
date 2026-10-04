/**
 * Two-level taxonomy:
 *  - Areas: the lifecycle structure of the knowledge library.
 *  - Topics: granular, classifiable subjects used for tags, filtering,
 *    blind-spot statistics and evidence cards.
 */

export interface Area {
  slug: string;
  name: string;
  swahili?: string;
  description: string;
}

export interface Topic {
  slug: string;
  name: string;
  area: string;
  keywords: string[];
  blurb: string;
}

export const AREAS: Area[] = [
  { slug: 'growing-up', name: 'Growing up', swahili: 'Kukua', description: 'Puberty, first periods and body development.' },
  { slug: 'menstrual-health', name: 'Menstrual health', swahili: 'Afya ya hedhi', description: 'Cycles, pain, heavy bleeding and irregular periods.' },
  { slug: 'hormones', name: 'Hormones', swahili: 'Homoni', description: 'Estrogen, progesterone, thyroid and hormonal change.' },
  { slug: 'conditions', name: 'Conditions', swahili: 'Magonjwa', description: 'PCOS, endometriosis, fibroids, PID and more.' },
  { slug: 'sexual-health', name: 'Sexual health', swahili: 'Afya ya kingono', description: 'Consent, STIs, contraception and painful sex.' },
  { slug: 'fertility', name: 'Fertility', swahili: 'Uzazi', description: 'Ovulation, infertility and preconception care.' },
  { slug: 'pregnancy', name: 'Pregnancy', swahili: 'Ujauzito', description: 'Pregnancy health and warning signs.' },
  { slug: 'postpartum', name: 'Postpartum', swahili: 'Baada ya kujifungua', description: 'Recovery, breastfeeding and mental health after birth.' },
  { slug: 'cancer-prevention', name: 'Cancer prevention', swahili: 'Kinga ya saratani', description: 'Breast awareness, HPV and cervical screening.' },
  { slug: 'mental-health', name: 'Mental health', swahili: 'Afya ya akili', description: 'PMS/PMDD, pregnancy, postpartum and menopause wellbeing.' },
  { slug: 'pelvic-health', name: 'Pelvic health', swahili: 'Afya ya nyonga', description: 'Pelvic floor, prolapse and urinary symptoms.' },
  { slug: 'perimenopause', name: 'Perimenopause', swahili: 'Kabla ya kukoma hedhi', description: 'The hormonal transition before menopause.' },
  { slug: 'menopause', name: 'Menopause', swahili: 'Kukoma hedhi', description: 'Symptoms, bone and cardiovascular health.' },
  { slug: 'healthy-ageing', name: 'Healthy ageing', swahili: 'Kuzeeka kwa afya', description: 'Long-term health across a woman’s life.' },
];

export const TOPICS: Topic[] = [
  {
    slug: 'irregular-periods',
    name: 'Irregular periods',
    area: 'menstrual-health',
    keywords: ['irregular period', 'late period', 'missed period', 'cycle', 'period is late', 'periods are irregular', 'skipped period'],
    blurb: 'Cycles that arrive early, late, or unpredictably — and what patterns matter.',
  },
  {
    slug: 'severe-period-pain',
    name: 'Severe period pain',
    area: 'menstrual-health',
    keywords: ['period pain', 'cramps', 'severe pain', 'painful period', 'dysmenorrhea', 'pain during my period', 'period cramps'],
    blurb: 'When period pain crosses the line from common to worth investigating.',
  },
  {
    slug: 'heavy-bleeding',
    name: 'Heavy bleeding',
    area: 'menstrual-health',
    keywords: ['heavy bleeding', 'heavy period', 'flooding', 'soaking', 'clots', 'bleeding a lot', 'prolonged bleeding', 'bleeding for weeks'],
    blurb: 'How much bleeding is too much, and the causes clinicians look for.',
  },
  {
    slug: 'pcos',
    name: 'PCOS',
    area: 'conditions',
    keywords: ['pcos', 'polycystic', 'cysts on ovaries', 'facial hair', 'hirsutism', 'acne and irregular'],
    blurb: 'Polycystic ovary syndrome — hormones, cycles, skin and fertility.',
  },
  {
    slug: 'endometriosis',
    name: 'Endometriosis',
    area: 'conditions',
    keywords: ['endometriosis', 'endo', 'pain that stops me', 'painful periods and sex'],
    blurb: 'A condition where tissue like the womb lining grows elsewhere — often dismissed for years.',
  },
  {
    slug: 'fibroids',
    name: 'Fibroids',
    area: 'conditions',
    keywords: ['fibroid', 'fibroids', 'swollen stomach', 'bulky uterus'],
    blurb: 'Non-cancerous growths of the womb — very common, rarely explained.',
  },
  {
    slug: 'painful-sex',
    name: 'Pain during sex',
    area: 'sexual-health',
    keywords: ['pain during sex', 'painful sex', 'hurts when', 'pain during intercourse', 'dyspareunia', 'sex is painful'],
    blurb: 'Pain with sex is common and treatable — it is never something to simply endure.',
  },
  {
    slug: 'contraception',
    name: 'Contraception',
    area: 'sexual-health',
    keywords: ['contraceptive', 'family planning', 'birth control', 'the pill', 'implant', 'injection', 'iud', 'coil', 'depo', 'side effects of'],
    blurb: 'Choosing a method, and making sense of side effects.',
  },
  {
    slug: 'stis',
    name: 'STIs & infections',
    area: 'sexual-health',
    keywords: ['sti', 'std', 'discharge', 'itching', 'burning when', 'uti', 'infection', 'smell'],
    blurb: 'Discharge, itching, UTIs and sexually transmitted infections.',
  },
  {
    slug: 'fertility',
    name: 'Fertility & trying to conceive',
    area: 'fertility',
    keywords: ['pregnant', 'conceive', 'fertile', 'ovulation', 'trying for a baby', 'infertility', 'cant get pregnant', "can't get pregnant"],
    blurb: 'Understanding ovulation and when difficulty conceiving deserves assessment.',
  },
  {
    slug: 'pregnancy-warning-signs',
    name: 'Pregnancy warning signs',
    area: 'pregnancy',
    keywords: ['pregnant and', 'weeks pregnant', 'bleeding while pregnant', 'pregnancy', 'reduced movement', 'baby stopped moving'],
    blurb: 'The symptoms in pregnancy that should never wait.',
  },
  {
    slug: 'postpartum-anxiety',
    name: 'Postpartum mental health',
    area: 'postpartum',
    keywords: ['postpartum', 'after giving birth', 'after birth', 'since i had my baby', 'new baby', 'baby blues', 'postnatal'],
    blurb: 'Anxiety and low mood after childbirth — common, real and treatable.',
  },
  {
    slug: 'cervical-screening',
    name: 'Cervical screening',
    area: 'cancer-prevention',
    keywords: ['cervical', 'pap smear', 'hpv', 'screening', 'smear test', 'cervix'],
    blurb: 'HPV, screening intervals and why cervical cancer is preventable.',
  },
  {
    slug: 'breast-health',
    name: 'Breast health',
    area: 'cancer-prevention',
    keywords: ['breast', 'lump', 'nipple'],
    blurb: 'Knowing what is normal for you, and what changes need checking.',
  },
  {
    slug: 'perimenopause',
    name: 'Perimenopause',
    area: 'perimenopause',
    keywords: ['perimenopause', 'periods have started changing', 'hot flush', 'hot flash', 'night sweats', "can't sleep", '43', '44', '45', '46', '47', '48', 'brain fog'],
    blurb: 'The years before periods stop — when symptoms start but answers rarely come.',
  },
  {
    slug: 'menopause',
    name: 'Menopause',
    area: 'menopause',
    keywords: ['menopause', 'periods stopped', 'vaginal dryness', 'joint pain'],
    blurb: 'Life after the final period — symptoms, bones, heart and options.',
  },
  {
    slug: 'pms-pmdd',
    name: 'PMS & PMDD',
    area: 'mental-health',
    keywords: ['pms', 'pmdd', 'mood before my period', 'angry before my period', 'crying before my period'],
    blurb: 'When premenstrual mood changes disrupt life.',
  },
  {
    slug: 'pelvic-floor',
    name: 'Pelvic floor',
    area: 'pelvic-health',
    keywords: ['leaking urine', 'leak when', 'pelvic floor', 'prolapse', 'heaviness down there'],
    blurb: 'Leaking, heaviness and prolapse — common after birth, never “just normal”.',
  },
];

export function getArea(slug: string): Area | undefined {
  return AREAS.find((a) => a.slug === slug);
}

export function getTopic(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}

export function topicsForArea(areaSlug: string): Topic[] {
  return TOPICS.filter((t) => t.area === areaSlug);
}
