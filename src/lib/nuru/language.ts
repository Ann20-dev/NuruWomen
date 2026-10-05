/**
 * Lightweight Kiswahili detection for question text. Cue-based, same spirit
 * as the bilingual routing rules - used to preselect the analysis language.
 * The writer can always override it manually.
 */
const SWAHILI_CUES = new Set([
  'hedhi', 'afya', 'wasiwasi', 'huzuni', 'mimba', 'mjamzito', 'ujauzito',
  'maumivu', 'mtoto', 'kunyonyesha', 'akili', 'msongo', 'naitwa', 'ninaishi',
  'ninaumwa', 'ninahisi', 'kingono', 'ngono', 'uzazi', 'utoaji', 'kutoa',
  'kujifungua', 'miezi', 'nyingi', 'damu', 'kilimo', 'meno', 'titi',
  'kizunguzungu', 'kichefuchefu', 'kuhara', 'homa', 'mkewe', 'mke',
]);

export function detectKiswahili(text: string): 'sw' | 'en' {
  const words = text.toLowerCase().match(/[\p{L}]+/gu) ?? [];
  if (words.length < 3) return 'en';
  let hits = 0;
  for (const word of words) if (SWAHILI_CUES.has(word)) hits++;
  return hits >= 2 && hits / words.length >= 0.04 ? 'sw' : 'en';
}
