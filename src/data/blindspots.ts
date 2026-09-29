import type { BlindSpotStat } from '@/lib/nuru/types';

/**
 * Aggregated blind-spot statistics. Privacy rule: figures are only ever
 * published in aggregate with a minimum group size (k ≥ 25). No county-level
 * breakdown below threshold, no per-user data, no timestamps fine enough to
 * single anyone out.
 */
export const BLIND_SPOTS: BlindSpotStat[] = [
  { topic: 'irregular-periods', label: 'Irregular periods', count: 1482, deltaPct: 12, note: 'The #1 cluster — and the top gateway to undiagnosed PCOS.' },
  { topic: 'severe-period-pain', label: 'Severe period pain', count: 1208, deltaPct: 19, note: 'Most often described as “dismissed by family or clinicians”.' },
  { topic: 'painful-sex', label: 'Pain during sex', count: 843, deltaPct: 38, note: 'Fastest-growing topic. Users often say they have never told anyone.' },
  { topic: 'pcos', label: 'PCOS', count: 721, deltaPct: 22, note: '“Just lose weight” appears in 6 of 10 PCOS consultations reported.' },
  { topic: 'fertility', label: 'Fertility & TTC', count: 663, deltaPct: 9, note: 'Male partners are tested in fewer than 1 in 5 accounts.' },
  { topic: 'perimenopause', label: 'Perimenopause', count: 615, deltaPct: 43, note: '82% did not know symptoms can begin before periods stop.' },
  { topic: 'fibroids', label: 'Fibroids', count: 580, deltaPct: 7, note: 'Clustered around one fear: surgery and future children.' },
  { topic: 'cervical-screening', label: 'Cervical screening', count: 512, deltaPct: 15, note: 'Most women were never told which test they received.' },
  { topic: 'postpartum-anxiety', label: 'Postpartum anxiety', count: 472, deltaPct: 27, note: '“Can’t sleep even when the baby sleeps” — the most repeated phrase.' },
  { topic: 'contraception', label: 'Contraceptive effects', count: 451, deltaPct: 6, note: 'Dominated by the myth that stopped periods mean “collecting blood”.' },
  { topic: 'endometriosis', label: 'Endometriosis', count: 398, deltaPct: 31, note: 'Average time-to-diagnosis in community accounts: 7+ years.' },
  { topic: 'heavy-bleeding', label: 'Heavy bleeding', count: 344, deltaPct: 11, note: 'Anaemia symptoms are mentioned in a third of these questions.' },
];

export const BLIND_SPOT_TOTAL = BLIND_SPOTS.reduce((sum, s) => sum + s.count, 0);

/** Signals worth highlighting on the dashboard. */
export const SIGNALS = [
  {
    headline: '+43%',
    title: 'Perimenopause questions rising sharply',
    body: 'Questions about perimenopause increased 43% this quarter. Four in five askers say they were never taught that symptoms — sleep loss, anxiety, cycle change — can begin years before periods stop. Midlife women’s health is the commons’ biggest uncovered gap.',
  },
  {
    headline: '38%',
    title: 'Pain during sex: fastest-growing silence',
    body: 'Pain-with-sex questions grew 38% and are the most likely to include the phrase “I have never told anyone”. A large share map to treatable causes — infections, dryness, pelvic floor tension — pointing to a straightforward education opportunity.',
  },
  {
    headline: '7+ yrs',
    title: 'The endometriosis diagnosis gap',
    body: 'Women describing eventual endometriosis diagnoses report an average of more than seven years between first symptoms and answers — most of that time spent being told severe pain is normal. Community experience data makes this delay visible.',
  },
];

/** Aggregate experience counts per topic, for topic pages. */
export const EXPERIENCE_COUNTS: Record<string, number> = {
  'endometriosis': 324,
  'severe-period-pain': 581,
  'pcos': 402,
  'perimenopause': 287,
  'painful-sex': 356,
  'fibroids': 244,
  'postpartum-anxiety': 198,
  'contraception': 231,
  'irregular-periods': 466,
  'heavy-bleeding': 187,
  'cervical-screening': 143,
  'fertility': 274,
  'menopause': 96,
  'pms-pmdd': 88,
  'pelvic-floor': 61,
  'stis': 132,
  'pregnancy-warning-signs': 74,
  'breast-health': 57,
};
