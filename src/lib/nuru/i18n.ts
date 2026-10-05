/**
 * UI translation dictionaries for the site chrome and key pages.
 *
 * Today the commons ships English and Kiswahili. Because the project is open
 * source, anyone can contribute a translation for their own language:
 *
 *   1. Add the language code to `UiLang`.
 *   2. Add a complete entry to `UI_STRINGS` below (every key is required -
 *      TypeScript will point at anything missing).
 *   3. Open a pull request. No other code changes are needed; the language
 *      switcher in the header picks up new languages automatically.
 *
 * Keep strings short and warm. Health terms follow the glossary used by the
 * analysis rules (see aiRules.ts) so the interface and the classifiers agree.
 */

export const UI_LANGS = ['en', 'sw'] as const;
export type UiLang = (typeof UI_LANGS)[number];

export const UI_LANG_NAMES: Record<UiLang, string> = {
  en: 'English',
  sw: 'Kiswahili',
};

const en = {
  'nav.questions': 'Questions',
  'nav.library': 'Library',
  'nav.research': 'Research',
  'nav.coverage': 'Coverage',
  'nav.events': 'Events',
  'nav.about': 'About',
  'nav.ask': 'Ask a question',
  'header.tagline': 'Women’s Health Commons · Africa',
  'header.menu': 'Open menu',

  'hero.badge': 'Private by design · Free & open · Community owned',
  'hero.title': 'What were you never taught about your body?',
  'hero.titleHighlights': 'never,taught',
  'hero.subtitle':
    'Ask sensitive health questions privately. Explore community stories and clinical responses, clearly labelled, never mixed up.',
  'hero.ask': 'Ask a question',
  'hero.explore': 'Explore the library',
  'hero.reassure1': 'No email, phone or ID required',
  'hero.reassure2': 'Your identity stays yours',
  'hero.reassure3': 'Open for anyone to build on',

  'home.exampleKicker': 'An example thread',
  'home.exampleTitle': 'One question, three kinds of answers',
  'home.readThread': 'Read the full thread',
  'home.layersNote':
    'Stories stay stories. Clinical answers stay clinical. Evidence stays sourced.',
  'home.howItWorks': 'How it works',
  'home.areasKicker': 'The five areas',
  'home.areasTitle': 'Every stage of a woman’s life, covered',
  'home.areasBody':
    'Menstrual health, sexual health, healthy ageing, postpartum and mental health, each with its own shelf in the library, and its own safe corner of the commons.',
  'home.coverageCount': 'community question counts',
  'home.coverageSub': 'Counted together, never individually. A map of knowledge gaps.',
  'home.coverageCta': 'See the Blind Spot dashboard',
  'home.trendingKicker': 'Most discussed',
  'home.trendingTitle': 'This month’s most asked-about topics',
  'home.trendingCta': 'See the full ranking',
  'home.trendingNote':
    'Counted in large anonymous groups only. A ranking can never point back to one woman or one question.',
  'home.ctaTitle': 'Ask the question you’ve been carrying.',
  'home.ctaBody':
    'Explore questions with English or Kiswahili analysis and clearly labelled responses.',
  'home.ctaAsk': 'Ask a question',
  'home.ctaBrowse': 'See what women are asking',

  'footer.tagline':
    'An open, privacy-first women’s health commons for Africa. Anonymous questions, real stories and reviewed evidence, clearly separated, always.',
  'footer.emergency':
    'Educational only, never a substitute for personal medical care. In an emergency call 999 / 112 (Kenya).',
  'footer.exploreTitle': 'Explore',
  'footer.ask': 'Ask a question',
  'footer.questions': 'Community questions',
  'footer.library': 'Knowledge library',
  'footer.events': 'Events',
  'footer.coverage': 'Research coverage',
  'footer.about': 'How it works',
  'footer.openTitle': 'Open by design',
  'footer.open1': 'Open documentation for developers',
  'footer.open2': 'Articles exportable as Markdown',
  'footer.open3': 'Built for Hack4Freedom',
  'footer.translate': 'Help translate the commons into your language',
  'footer.copyright': 'NuruWomen, a digital public good for women’s health.',

  'common.askQuestion': 'Ask a question',
  'common.askAnonymously': 'Ask anonymously',
  'common.language': 'Language',
} as const;

export type UiKey = keyof typeof en;

const sw: Record<UiKey, string> = {
  'nav.questions': 'Maswali',
  'nav.library': 'Maktaba',
  'nav.research': 'Utafiti',
  'nav.coverage': 'Data',
  'nav.events': 'Matukio',
  'nav.about': 'Kuhusu',
  'nav.ask': 'Uliza swali',
  'header.tagline': 'Afya ya Wanawake · Afrika',
  'header.menu': 'Fungua menyu',

  'hero.badge': 'Faragha kwanza · Bure na wazi · Miliki ya jamii',
  'hero.title': 'Ni nini ambacho hukufundishwa kuhusu mwili wako?',
  'hero.titleHighlights': 'hukufundishwa',
  'hero.subtitle':
    'Uliza maswali nyeti ya afya kwa faragha. Soma hadithi za jamii na majibu ya kliniki, yametengwa wazi, hayachanganyiki.',
  'hero.ask': 'Uliza swali',
  'hero.explore': 'Chunguza maktaba',
  'hero.reassure1': 'Hahitajiki barua pepe, simu wala kitambulisho',
  'hero.reassure2': 'Utambulisho wako unabaki wako',
  'hero.reassure3': 'Wazi kwa yeyote kujenga juu yake',

  'home.exampleKicker': 'Mfano wa mjadala',
  'home.exampleTitle': 'Swali moja, majibu ya aina tatu',
  'home.readThread': 'Soma mjadala wote',
  'home.layersNote':
    'Hadithi hubaki hadithi. Majibu ya kliniki hubaki ya kliniki. Ushahidi hubaki na vyanzo vyake.',
  'home.howItWorks': 'Jinsi inavyofanya kazi',
  'home.areasKicker': 'Maeneo matano',
  'home.areasTitle': 'Kila hatua ya maisha ya mwanamke, imefikiwa',
  'home.areasBody':
    'Afya ya hedhi, afya ya kingono, kuzeeka kwa afya, baada ya kujifungua na afya ya akili, kila eneo lina rafu yake katika maktaba, na kona yake salama katika jukwaa.',
  'home.coverageCount': 'maswali ya jamii yaliyohesabiwa',
  'home.coverageSub': 'Tunahesabu pamoja, kamwe si mmoja mmoja, ramani ya mapengo ya elimu.',
  'home.coverageCta': 'Tazama dashibodi ya mapengo',
  'home.trendingKicker': 'Yanayojadiliwa zaidi',
  'home.trendingTitle': 'Mada zinazoulizwa zaidi mwezi huu',
  'home.trendingCta': 'Tazama orodha kamili',
  'home.trendingNote':
    'Tunahesabu katika makundi makubwa ya faragha pekee. Orodha haiwezi kumdokezea mwanamke yeyote.',
  'home.ctaTitle': 'Uliza lile swali ulilobeba moyoni.',
  'home.ctaBody':
    'Uliza kwa Kiingereza au Kiswahili, uchanganuzi na majibu yaliyotengwa wazi.',
  'home.ctaAsk': 'Uliza swali',
  'home.ctaBrowse': 'Tazama wanawake wanauliza nini',

  'footer.tagline':
    'Jukwaa wazi la afya ya wanawake linaloweka faragha kwanza. Maswali ya faragha, hadithi za kweli na ushahidi uliopitishwa, vimetengwa wazi, kila wakati.',
  'footer.emergency':
    'Elimu tu, si badala ya huduma ya kibinafsi ya afya. Kwa dharura piga 999 / 112 (Kenya).',
  'footer.exploreTitle': 'Chunguza',
  'footer.ask': 'Uliza swali',
  'footer.questions': 'Maswali ya jamii',
  'footer.library': 'Maktaba ya elimu',
  'footer.events': 'Matukio',
  'footer.coverage': 'Ramani ya data',
  'footer.about': 'Jinsi inavyofanya kazi',
  'footer.openTitle': 'Wazi kwa kubuni',
  'footer.open1': 'Nyaraka wazi kwa watengenezaji',
  'footer.open2': 'Makala yanayoweza kuhamishwa kama Markdown',
  'footer.open3': 'Imejengwa kwa Hack4Freedom',
  'footer.translate': 'Saidia kutafsiri jukwaa kwa lugha yako',
  'footer.copyright': 'NuruWomen, rasilimali ya kidijitali ya umma kwa afya ya wanawake.',

  'common.askQuestion': 'Uliza swali',
  'common.askAnonymously': 'Uliza kwa faragha',
  'common.language': 'Lugha',
};

export const UI_STRINGS: Record<UiLang, Record<UiKey, string>> = { en, sw };
