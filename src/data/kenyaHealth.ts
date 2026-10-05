/**
 * Kenya women's health indicators - real data fetched from the WHO Global
 * Health Observatory (GHO) API on 2026-10-03, the same source and indicator
 * family as the data scientist's coverage notebook (docs/source-contributions/
 * nuru-data.ipynb). Latest available year per indicator is shown with it.
 *
 * The deprecated `fpsmo`, `anc4` and `csection` codes used by the notebook now
 * return empty datasets; the live successor codes are used instead.
 */

export interface KenyaIndicator {
  id: string;
  label: string;
  value: number;
  unit: '%' | 'per-100k' | 'years';
  year: number;
  topic: string;
  source: string;
  indicatorCode: string;
  note?: string;
}

/** Percentage indicators - rendered as the bar chart. */
export const KENYA_BARS: KenyaIndicator[] = [
  {
    id: 'family-planning',
    label: 'Family planning need satisfied (modern methods)',
    value: 81.7,
    unit: '%',
    year: 2023,
    topic: 'Sexual health',
    source: 'WHO GHO, modelled estimate',
    indicatorCode: 'FAMILYPLANNINGUNPDUHC',
  },
  {
    id: 'anc4',
    label: 'Antenatal care: at least four visits',
    value: 66.0,
    unit: '%',
    year: 2022,
    topic: 'Postpartum',
    source: 'WHO GHO (WHS4_154)',
    indicatorCode: 'WHS4_154',
  },
  {
    id: 'condom-use',
    label: 'Condom use at higher-risk sex, women 15–49',
    value: 32.0,
    unit: '%',
    year: 2013,
    topic: 'Sexual health',
    source: 'WHO GHO (MDG_0000000015)',
    indicatorCode: 'MDG_0000000015',
    note: 'No newer survey published yet',
  },
  {
    id: 'caesarean',
    label: 'Births by caesarean section',
    value: 8.7,
    unit: '%',
    year: 2009,
    topic: 'Postpartum',
    source: 'WHO GHO (WHS4_115)',
    indicatorCode: 'WHS4_115',
    note: 'Below the 10–15% level the WHO considers adequate',
  },
];

/** Non-percentage indicators - rendered as stat tiles. */
export const KENYA_STATS: KenyaIndicator[] = [
  {
    id: 'mmr',
    label: 'Maternal mortality ratio',
    value: 379,
    unit: 'per-100k',
    year: 2023,
    topic: 'Postpartum',
    source: 'WHO GHO (MDG_0000000026), uncertainty interval 267–547',
    indicatorCode: 'MDG_0000000026',
  },
  {
    id: 'hale',
    label: 'Healthy life expectancy at birth, women',
    value: 60.7,
    unit: 'years',
    year: 2023,
    topic: 'Healthy ageing',
    source: 'WHO GHO (WHOSIS_000002), interval 55.7–65.6',
    indicatorCode: 'WHOSIS_000002',
  },
  {
    id: 'suicide',
    label: 'Age-standardized suicide rate, women',
    value: 4.6,
    unit: 'per-100k',
    year: 2021,
    topic: 'Mental health',
    source: 'WHO GHO (MH_12), interval 3.2–6.8',
    indicatorCode: 'MH_12',
  },
];

export const KENYA_DATA_PROVENANCE =
  'World Health Organization Global Health Observatory, values retrieved 3 Oct 2026. Menstrual health has no WHO indicator. See the coverage methodology below.';
