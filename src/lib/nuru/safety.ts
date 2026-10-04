/**
 * Bilingual red-flag alert rules with concrete helplines. Empty results never
 * mean a person is safe. Numbers shown are Kenya-focused (the commons' first
 * home) — contributors should localize per country as translations grow.
 */
import { NURU_SAFETY } from './aiRules';

export interface SafetyFlag { id: string; title: string; guidance: string; resource?: string }
interface Rule { id: string; patterns: readonly string[]; all_patterns?: readonly string[] }

type Lang = 'en' | 'sw';

interface Copy { title: string; guidance: string; resource?: string }

const GENERIC: Record<Lang, Copy> = {
  en: {
    title: 'Possible urgent concern — please read first',
    guidance:
      'If you may be in immediate danger or seriously unwell, seek urgent help from a local health service. Do not wait for an online reply. These automated rules cannot assess your safety.',
    resource: 'Emergency 999 / 112 (Kenya) — or go to the nearest emergency unit now.',
  },
  sw: {
    title: 'Tahadhari: soma hili kwanza',
    guidance:
      'Ikiwa uko hatarini au unaumwa sana, tafuta msaada wa haraka katika kituo cha afya. Usisubiri jibu mtandaoni. Mfumo huu hauwezi kutathmini usalama wako.',
    resource: 'Dharura 999 / 112 (Kenya) — au nenda kituo cha dharura kilicho karibu sasa hivi.',
  },
};

const SPECIFIC: Partial<Record<string, Record<Lang, Copy>>> = {
  self_harm: {
    en: {
      title: 'Please reach out right now — you deserve support',
      guidance:
        'What you wrote suggests you may be thinking about harming yourself. Please contact one of these free, confidential lines before anything else — you can talk to a trained counsellor right now, without giving your name. This system cannot assess your safety, and an online answer is not the help you need first.',
      resource:
        'Kenya Red Cross psychosocial support 1199 (24h, free) · Befrienders Kenya +254 722 178 177 · Emergency 999 / 112',
    },
    sw: {
      title: 'Tafadhali tafuta msaada sasa hivi — unastahili kusikilizwa',
      guidance:
        'Maneno ulyoandika yanaonyesha huenda unafikiria kujidhuru. Tafadhali piga moja ya laini hizi za bure na siri kabla ya kitu kingine — utazungumza na mshauri aliyefunzwa sasa hivi, bila kutaja jina lako. Mfumo huu hauwezi kutathmini usalama wako.',
      resource:
        'Msalaba Mwekundu Kenya 1199 (saa 24, bure) · Befrienders Kenya +254 722 178 177 · Dharura 999 / 112',
    },
  },
  violence_assault: {
    en: {
      title: 'What happened is not your fault — confidential help exists',
      guidance:
        'What you describe sounds like violence or assault. Medical care within 72 hours matters: HIV prevention (PEP) and emergency contraception are time-limited, and a gender violence recovery centre can treat you even if you do not want to report to the police. If you are in danger right now, call the police first.',
      resource:
        'National GBV Hotline 1195 (free, 24h) · Police 999 / 112 · Nairobi Women’s Hospital Gender Violence Recovery Centre (24h)',
    },
    sw: {
      title: 'Yaliyotokea si kosa lako — msaada wa siri upo',
      guidance:
        'Unachokieleza kinaonekana kama unyanyasaji au ubakaji. Huduma ya afya ndani ya saa 72 ni muhimu: kinga ya VVU (PEP) na dawa za dharura za uzazi wa mpango zina muda maalum, na kituo cha kuponya unyanyasaji wa kijinsia (GBVRC) kinaweza kukutibu hata usipotaka kuripoti polisi. Ukiwa hatarini sasa hivi, piga polisi kwanza.',
      resource:
        'Laini ya Kitaifa ya GBV 1195 (bure, saa 24) · Polisi 999 / 112 · Kituo cha GBVRC, Hospitali ya Nairobi Women’s (saa 24)',
    },
  },
  immediate_threat: {
    en: {
      title: 'If you are in danger right now, call for help first',
      guidance:
        'Your safety comes before any question. If someone is threatening you or you are being attacked, call the police now or go to the nearest safe place — a police station, hospital, or a crowded public place. You can come back and ask the community later.',
      resource: 'Police 999 / 112 (Kenya) · National GBV Hotline 1195 (free, 24h)',
    },
    sw: {
      title: 'Ukiwa hatarini sasa hivi, tafuta msaada kwanza',
      guidance:
        'Usalama wako ndio muhimu kabla ya swali lolote. Ikiwa mtu anakutishia au unashambuliwa, piga polisi sasa au nenda mahali salama karibu — kituo cha polisi, hospitali, au mahali penye watu wengi. Unaweza kurudi kuuliza jamii baadaye.',
      resource: 'Polisi 999 / 112 (Kenya) · Laini ya Kitaifa ya GBV 1195 (bure, saa 24)',
    },
  },
  pregnancy_concern: {
    en: {
      title: 'In pregnancy, these symptoms should never wait',
      guidance:
        'Bleeding, severe headache, blurred vision or reduced baby movement in pregnancy can be signs of complications that become dangerous quickly. Please go to the nearest maternity or emergency unit now — do not wait for an online reply.',
      resource: 'Emergency 999 / 112 (Kenya) — ask for the nearest maternity emergency unit.',
    },
    sw: {
      title: 'Ukiwa mjamzito, dalili hizi zinahitaji huduma mara moja',
      guidance:
        'Kutokwa damu, maumivu makali ya kichwa, kuona vibaya au mtoto kupunguza kutenda ukiwa mjamzito kunaweza kuwa ishara ya matatizo yanayohitaji huduma ya haraka. Tafadhali nenda kituo cha uzazi au dharura kilicho karibu sasa hivi — usisubiri jibu mtandaoni.',
      resource: 'Dharura 999 / 112 (Kenya) — uliza kituo cha dharura cha uzazi kilicho karibu.',
    },
  },
  postpartum_concern: {
    en: {
      title: 'After birth, these symptoms are urgent',
      guidance:
        'Heavy bleeding, fever, chest pain or difficulty breathing in the weeks after birth can be signs of complications that need treatment immediately. Please go to an emergency unit now — do not wait to see if it settles.',
      resource: 'Emergency 999 / 112 (Kenya) — or go to the nearest emergency unit now.',
    },
    sw: {
      title: 'Baada ya kujifungua, dalili hizi ni za dharura',
      guidance:
        'Kutokwa damu nyingi, homa, maumivu ya kifua au shida ya kupumua wiki chache baada ya kujifungua kunaweza kuwa ishara ya matatizo yanayohitaji matibabu mara moja. Tafadhali nenda kituo cha dharura sasa hivi.',
      resource: 'Dharura 999 / 112 (Kenya) — au nenda kituo cha dharura kilicho karibu sasa hivi.',
    },
  },
};

export function scanSafety(text: string, language: Lang = 'en'): SafetyFlag[] {
  const normalized = text.normalize('NFKC').replace(/\p{Cf}/gu, '').toLowerCase();
  const rules: readonly Rule[] = NURU_SAFETY.rules;
  return rules
    .filter(
      (rule) =>
        rule.patterns.some((p) => new RegExp(p, 'u').test(normalized)) &&
        (rule.all_patterns ?? []).every((p) => new RegExp(p, 'u').test(normalized)),
    )
    .map((rule) => {
      const copy = SPECIFIC[rule.id]?.[language] ?? GENERIC[language];
      return { id: rule.id, title: copy.title, guidance: copy.guidance, resource: copy.resource };
    });
}
