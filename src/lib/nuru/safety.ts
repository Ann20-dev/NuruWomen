/** Bilingual red-flag alert rules. Empty results never mean a person is safe. */
import { NURU_SAFETY } from './aiRules';
export interface SafetyFlag { id: string; title: string; guidance: string; resource?: string }
interface Rule { id: string; patterns: readonly string[]; all_patterns?: readonly string[] }
export function scanSafety(text: string, language: 'en' | 'sw' = 'en'): SafetyFlag[] {
  const normalized = text.normalize('NFKC').replace(/\p{Cf}/gu, '').toLowerCase();
  const rules: readonly Rule[] = NURU_SAFETY.rules;
  return rules.filter((rule) => rule.patterns.some((p) => new RegExp(p, 'u').test(normalized)) &&
    (rule.all_patterns ?? []).every((p) => new RegExp(p, 'u').test(normalized)))
    .map((rule) => ({
      id: rule.id,
      title: language === 'sw' ? 'Tahadhari: soma hili kwanza' : 'Possible urgent concern — please read first',
      guidance: language === 'sw'
        ? 'Ikiwa uko hatarini au unaumwa sana, tafuta msaada wa haraka katika kituo cha afya. Usisubiri jibu mtandaoni. Mfumo huu hauwezi kutathmini usalama wako.'
        : 'If you may be in immediate danger or seriously unwell, seek urgent help from a local health service. Do not wait for an online reply. These automated rules cannot assess your safety.',
    }));
}
