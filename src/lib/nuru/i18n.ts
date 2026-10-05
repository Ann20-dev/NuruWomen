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

/** BCP-47 locale matching each interface language (dates, numbers). */
export function uiLocale(lang: UiLang): string {
  return lang === 'sw' ? 'sw-KE' : 'en-KE';
}

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

  // Knowledge-layer labels (the three-layer system)
  'layer.lived': 'Lived experience',
  'layer.clinical': 'Clinical response',
  'layer.evidence': 'Draft evidence card',
  'layer.livedDisclaimer': 'Personal experience, not medical advice.',
  'layer.clinicalDisclaimer': 'Clinical education, not a personal consultation.',
  'layer.evidenceDisclaimer': 'Clinically reviewed education. Not a personal diagnosis.',

  // Questions page & cards
  'questions.title': 'Community questions',
  'questions.subtitle':
    'Anonymous questions from women across the commons — each answered in three clearly separated layers. New questions appear here as they’re asked.',
  'questions.allTopics': 'All topics',
  'questions.empty':
    'No questions in this topic yet. Be the first to ask — anonymously, in under a minute.',
  'questions.countWord': 'questions',
  'questions.countSingular': 'question',
  'questions.inThisTopic': 'in this topic',
  'questions.sortNote': 'newest first, alongside curated threads',
  'questions.noAnswers': 'No answers yet.',
  'questions.beFirst': 'Be the first to share an experience',
  'questions.fullThread': 'Continue the full thread',
  'card.answer': 'answer',
  'card.answers': 'answers',
  'card.answersFallback': 'Answers',
  'card.showAnswers': 'Show answers',
  'card.hideAnswers': 'Hide answers',

  // Library page
  'library.kicker': 'Knowledge drafts',
  'library.title': 'The knowledge library',
  'library.subtitle':
    'Explore educational articles and the research catalogue, reviewed by the clinical panel. They cannot replace personal medical advice.',
  'library.researchLink': 'Browse the research catalogue (2020 onward)',
  'library.searchPlaceholder': 'Search a symptom, topic or question…',
  'library.clearSearch': 'Clear search',
  'library.all': 'All',
  'library.articleWord': 'articles',
  'library.ofWord': 'of',
  'library.across': 'across',
  'library.stagesWord': 'stages of life',
  'library.empty':
    'Nothing matches that search yet. Try a different word — or ask the community anonymously.',

  // Research catalogue page
  'research.title': 'Research catalogue',
  'research.subtitleBefore': 'clinically reviewed references guiding every topic. Each entry links to the original publication.',
  'research.searchPlaceholder': 'Search a title or journal',
  'research.allTopics': 'All five topics',
  'research.matching': 'matching references',
  'research.openRecord': 'Open source record',
  'research.empty': 'No matching references. Try another topic or search term.',

  // Events page
  'events.kicker': 'Community calendar',
  'events.title': 'Events for women’s health',
  'events.subtitle':
    'Screening camps, honest webinars, support circles and trainings — gathered from clinics, community groups and the commons itself. Most are free, many are in Kiswahili and other African languages.',
  'events.all': 'All events',
  'events.countWord': 'events',
  'events.countSingular': 'event',
  'events.empty': 'No upcoming events of this type right now — check another category, or come back soon.',
  'events.details': 'Details',
  'events.hostTitle': 'Running a women’s health event?',
  'events.hostBody1':
    'This calendar is open. Publish your event as a NIP-52 calendar event tagged',
  'events.hostBody2':
    'from any Nostr client and it appears here automatically — no account, no approval queue. Screenings, circles and trainings are all welcome, in any African language.',
  'events.beforeTitle': 'Before you go',
  'events.beforeBody':
    'Event details come from organisers and may change — confirm times with the organiser. For personal health concerns, a circle or webinar is a good first step, not the last one:',
  'events.beforeLink': 'ask the commons anonymously',
  'events.beforeNote': 'New events appear here as they are published to the commons.',
  'events.type.screening': 'Screening & clinics',
  'events.type.webinar': 'Webinar',
  'events.type.community': 'Community circle',
  'events.type.training': 'Training',
  'events.type.awareness': 'Awareness event',

  // Coverage (blind spots) page
  'coverage.kicker': 'Knowledge Gap Observatory',
  'coverage.title': 'Where the answers are missing',
  'coverage.subtitle':
    'Some health questions are easy to answer with good research. Others barely have any. This map shows how much reliable information exists for each topic, in each country — and where women are still left without answers.',
  'coverage.tableCaption': 'Coverage by topic',
  'coverage.colTopic': 'Topic',
  'coverage.colCountries': 'Countries covered',
  'coverage.colShare': 'Share',
  'coverage.colRecords': 'Data points',
  'coverage.colSource': 'Source',
  'coverage.of': 'of',
  'coverage.sourceProxy': 'Research estimate, ages 15–24',
  'coverage.sourceWho': 'World Health Organization',
  'coverage.kenyaKicker': 'Kenya in focus',
  'coverage.kenyaTitle': 'What the numbers say about Kenyan women',
  'coverage.kenyaSubtitle': 'The latest World Health Organization figures for the topics this commons covers.',
  'coverage.exploreCountry': 'Explore a country',
  'coverage.dataPoints': 'data points',
  'coverage.level0': 'Gap',
  'coverage.level1': 'Some data',
  'coverage.level2': 'Well covered',
  'coverage.howToTitle': 'How to read the map',
  'coverage.howToDark': 'Dark:',
  'coverage.howToDarkBody': 'well covered — several reliable studies found',
  'coverage.howToMid': 'Lighter:',
  'coverage.howToMidBody': 'some data, but thin',
  'coverage.howToPale': 'Pale:',
  'coverage.howToPaleBody': 'a gap — nothing reliable found yet',
  'coverage.howToBody1': 'Behind every cell are real records from the World Health Organization —',
  'coverage.howToBody2':
    'in total. Menstrual health has no global indicator at all, so it relies on research estimates. That absence is exactly the kind of blind spot this page exists to show.',
  'coverage.trendingTitle': 'What the commons asks about most',
  'coverage.trendingBody':
    'A monthly ranking of the topics women ask about — counted only in large aggregates, so a ranking can never point back to one person. Rising topics show where the knowledge gaps are widening fastest.',
  'coverage.whyTitle': 'Why this ranking exists',
  'coverage.whyBody':
    'When a topic climbs month after month, it is rarely a coincidence — it marks a place where clinics, schools and families are not answering the question either. Researchers and health workers use this ranking to decide what to write, translate and teach next. Figures are aggregate only (group sizes well above 25), with no county breakdown below threshold and no way to identify any single asker.',
  'coverage.heatGap': 'Gap: no data',
  'coverage.heatProxy': 'Research estimate',
  'coverage.heatSelect': 'Select a cell for detail',
  'coverage.heatTopicCountry': 'Topic \\ Country',
  'coverage.note0': 'No reliable data found yet for this topic in this country.',
  'coverage.note1': 'Some data exists, but it is thin or out of date.',
  'coverage.note2': 'Good data coverage found.',
  'coverage.sourcePrefix': 'Source:',
  'coverage.sourceProxyDetail': 'published research (Iyanda et al., 2020)',
  'coverage.unitPer100k': 'per 100,000',
  'coverage.unitYears': 'years',
  'coverage.kenyaAria': 'Kenya women’s health indicators in percent',
  'coverage.kenyaSource':
    'Source: World Health Organization, latest available year for each indicator. Menstrual health has no global indicator. One reason it stays a blind spot.',

  // About page
  'about.title': 'About NuruWomen',
  'about.intro':
    'Nuru means light in Kiswahili. The project explores how women in Kenya and across Africa can access clearer health information while keeping community stories, professional education and evidence in separate layers.',
  'about.livedBody': 'Personal stories show the community layer. They are shared experiences, not medical advice.',
  'about.clinicalBody': 'Answers written with clinicians. Live clinician verification is still being built.',
  'about.evidenceBody':
    'Structured educational articles and the research catalogue, reviewed by the clinical panel. They cannot replace personal medical advice.',
  'about.areasTitle': 'Five areas of health',
  'about.areasBody':
    'Menstrual health, sexual health, healthy ageing, postpartum health and mental health. Every question is automatically sorted into these areas; anything unclear is reviewed by a person, not a machine.',
  'about.whatTitle': 'What NuruWomen does',
  'about.what1': 'Checks every question for privacy and safety before it is published.',
  'about.what2': 'Works in English and Kiswahili.',
  'about.what3': 'Publishes questions and answers anonymously — no accounts, ever.',
  'about.what4': 'Links every topic to recent clinical research.',
  'about.what5': 'Maps where reliable women’s health data exists — and where it’s missing — across 53 African countries.',
  'about.what6': 'Gathers upcoming women’s health events — screenings, webinars and circles — on one open calendar.',
  'about.privacyTitle': 'Your privacy',
  'about.privacyBody':
    'Questions are published anonymously — no account, no name, nothing stored that points back to you. Images you attach are stripped of hidden metadata (location, device) before upload. Public posts can’t be taken back, and automatic scans can miss things, so please never share medical records or identifying details. No online service can promise perfect anonymity.',
  'about.cliniciansKicker': 'Verified clinical panel',
  'about.cliniciansTitle': 'Doctors must be verified — here is what that means',
  'about.cliniciansBody':
    'No one can call themselves a clinician on the commons by signing up. Every professional is checked by a person against official registers — the Kenya Medical Practitioners and Dentists Council (KMPDC), the Nursing Council of Kenya, the Pharmacy and Poisons Board, or the equivalent register in their country — before their answers carry the teal clinical label. Self-declared titles, usernames and profile links are never accepted as proof.',
  'about.registerChecked': 'Register checked, verified',
  'about.volunteerCardTitle': 'Are you a health professional?',
  'about.volunteerCardBody':
    'Volunteer an hour a week. After a register check, your answers carry the clinical label and help someone who has waited years to ask.',
  'about.howVerification': 'How verification works:',
  'about.verificationBody':
    'a clinician shares their registration number privately with the review team; the team confirms it against the official register; only then is their public key added to the verified-clinician registry (a NIP-51 list published by the commons authority key). Clients treat the registry — never self-labelling — as the source of the clinical badge.',
  'about.translateKicker': 'Every African language',
  'about.translateTitle': 'Built in English and Kiswahili — ready for your language',
  'about.translateBody1':
    'Today the interface and the analysis rules work in English and Kiswahili. The commons is open source, and translations are one of the most valuable contributions anyone can make: every screen string lives in one dictionary file',
  'about.translateBody2':
    ', and the keyword rules that sort questions live alongside it. Add your language — Yoruba, Hausa, Amharic, Igbo, Shona, isiZulu, French, Arabic — and the language switcher picks it up automatically. No machine translation is used; every language is reviewed by a speaker.',
  'about.translateFork': 'Fork the project, translate the dictionary, open a pull request.',
  'about.buildingTitle': 'What we’re building toward',
  'about.buildingBody':
    'Verified clinician accounts, full Kiswahili review, and careful human moderation — so every answer can one day come from someone whose training we have checked.',
  'about.buildingLink': 'Browse the research',
  'about.buildingAfter': 'that guides us today.',
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

  // Knowledge-layer labels (the three-layer system)
  'layer.lived': 'Uzoefu binafsi',
  'layer.clinical': 'Jibu la kliniki',
  'layer.evidence': 'Kadi ya ushahidi',
  'layer.livedDisclaimer': 'Uzoefu binafsi, si ushauri wa kimatibabu.',
  'layer.clinicalDisclaimer': 'Elimu ya kliniki, si ushauri wa kibinafsi.',
  'layer.evidenceDisclaimer': 'Elimu iliyopitishwa na wataalamu. Si uchunguzi wa kibinafsi.',

  // Questions page & cards
  'questions.title': 'Maswali ya jamii',
  'questions.subtitle':
    'Maswali ya faragha kutoka kwa wanawake katika jukwaa zima — kila swali linajibiwa kwa tabaka tatu zilizotengwa wazi. Maswali mapya yanaonekana hapa yanapoulizwa.',
  'questions.allTopics': 'Mada zote',
  'questions.empty':
    'Bado hakuna maswali katika mada hii. Kuwa wa kwanza kuuliza — kwa faragha, ndani ya dakika moja.',
  'questions.countWord': 'maswali',
  'questions.countSingular': 'swali',
  'questions.inThisTopic': 'katika mada hii',
  'questions.sortNote': 'mapya kwanza, pamoja na mijadala iliyochaguliwa',
  'questions.noAnswers': 'Bado hakuna majibu.',
  'questions.beFirst': 'Kuwa wa kwanza kushiriki uzoefu',
  'questions.fullThread': 'Endelea na mjadala wote',
  'card.answer': 'jibu',
  'card.answers': 'majibu',
  'card.answersFallback': 'Majibu',
  'card.showAnswers': 'Onyesha majibu',
  'card.hideAnswers': 'Ficha majibu',

  // Library page
  'library.kicker': 'Rasimu za elimu',
  'library.title': 'Maktaba ya elimu',
  'library.subtitle':
    'Chunguza makala za elimu na orodha ya utafiti, zilizopitishwa na wataalamu wa kliniki. Hazinaweza kuchukua nafasi ya ushauri wa kibinafsi wa kimatibabu.',
  'library.researchLink': 'Tazama orodha ya utafiti (2020 na kuendelea)',
  'library.searchPlaceholder': 'Tafuta dalili, mada au swali…',
  'library.clearSearch': 'Futa utafutaji',
  'library.all': 'Zote',
  'library.articleWord': 'makala',
  'library.ofWord': 'kati ya',
  'library.across': 'katika',
  'library.stagesWord': 'hatua za maisha',
  'library.empty':
    'Hakuna kinacholingana na utafutaji huo bado. Jaribu neno lingine — au uliza jamii kwa faragha.',

  // Research catalogue page
  'research.title': 'Orodha ya utafiti',
  'research.subtitleBefore': 'marejeleo yaliyopitishwa na wataalamu yanayoongoza kila mada. Kila ingizo lina kiungo cha chanzo asilia.',
  'research.searchPlaceholder': 'Tafuta kichwa au jarida',
  'research.allTopics': 'Mada zote tano',
  'research.matching': 'marejeleo yanayolingana',
  'research.openRecord': 'Fungua rekodi ya chanzo',
  'research.empty': 'Hakuna marejeleo yanayolingana. Jaribu mada au neno lingine la utafutaji.',

  // Events page
  'events.kicker': 'Kalenda ya jamii',
  'events.title': 'Matukio ya afya ya wanawake',
  'events.subtitle':
    'Kambi za uchunguzi, semina mtandaoni zenye uwazi, midahalo ya msaada na mafunzo — yanayokusanywa kutoka kwa kliniki, vikundi vya jamii na jukwaa lenyewe. Mengi ni bure, mengi yapo kwa Kiswahili na lugha nyingine za Kiafrika.',
  'events.all': 'Matukio yote',
  'events.countWord': 'matukio',
  'events.countSingular': 'tukio',
  'events.empty': 'Hakuna matukio yajayo ya aina hii kwa sasa — angalia aina nyingine, au rudi hapa hivi karibuni.',
  'events.details': 'Maelezo',
  'events.hostTitle': 'Unaandaa tukio la afya ya wanawake?',
  'events.hostBody1':
    'Kalenda hii ni wazi. Chapisha tukio lako kama tukio la kalenda la NIP-52 lenye lebo',
  'events.hostBody2':
    'kutoka kwa mteja wowote wa Nostr na litaonekana hapa moja kwa moja — bila akaunti, bila foleni ya idhini. Kambi za uchunguzi, midahalo na mafunzo yote yanakaribishwa, kwa lugha yoyote ya Kiafrika.',
  'events.beforeTitle': 'Kabla hujaondoka',
  'events.beforeBody':
    'Maelezo ya matukio yanatoka kwa waandaaji na yanaweza kubadilika — hakikisha muda na mratibu wa tukio. Kwa masuala ya afya ya kibinafsi, duara au semina ni hatua nzuri ya kwanza, si ya mwisho:',
  'events.beforeLink': 'uliza jukwaa kwa faragha',
  'events.beforeNote': 'Matukio mapya yanaonekana hapa yanapochapishwa katika jukwaa.',
  'events.type.screening': 'Uchunguzi na kliniki',
  'events.type.webinar': 'Semina mtandaoni',
  'events.type.community': 'Duara la jamii',
  'events.type.training': 'Mafunzo',
  'events.type.awareness': 'Tukio la uhamasishaji',

  // Coverage (blind spots) page
  'coverage.kicker': 'Kituo cha kuchunguza mapengo ya elimu',
  'coverage.title': 'Pale majibu yanapokosekana',
  'coverage.subtitle':
    'Baadhi ya maswali ya afya ni rahisi kujibu kwa utafiti mzuri. Mengine karibu hayana utafiti kabisa. Ramani hii inaonyesha kiasi cha taarifa za kuaminika zilizopo kwa kila mada, katika kila nchi — na pale wanawake bado wanapokosa majibu.',
  'coverage.tableCaption': 'Ufunikaji kwa mada',
  'coverage.colTopic': 'Mada',
  'coverage.colCountries': 'Nchi zilizofikiwa',
  'coverage.colShare': 'Asilimia',
  'coverage.colRecords': 'Pointi za data',
  'coverage.colSource': 'Chanzo',
  'coverage.of': 'kati ya',
  'coverage.sourceProxy': 'Kadirio la utafiti, umri 15–24',
  'coverage.sourceWho': 'Shirika la Afya Duniani',
  'coverage.kenyaKicker': 'Kenya kwa karibu',
  'coverage.kenyaTitle': 'Takwimu zinavyosema kuhusu wanawake wa Kenya',
  'coverage.kenyaSubtitle': 'Takwimu za hivi karibuni za Shirika la Afya Duniani kwa mada zinazoshughulikiwa na jukwaa hili.',
  'coverage.exploreCountry': 'Chunguza nchi',
  'coverage.dataPoints': 'pointi za data',
  'coverage.level0': 'Pengo',
  'coverage.level1': 'Data kidogo',
  'coverage.level2': 'Imefunikwa vyema',
  'coverage.howToTitle': 'Jinsi ya kusoma ramani',
  'coverage.howToDark': 'Kiza:',
  'coverage.howToDarkBody': 'imefunikwa vyema — tafiti kadhaa za kuaminika zimepatikana',
  'coverage.howToMid': 'Kiasi:',
  'coverage.howToMidBody': 'data ipo, lakini ni haba',
  'coverage.howToPale': 'Hafifu:',
  'coverage.howToPaleBody': 'pengo — hakuna utafiti wa kuaminika uliopatikana bado',
  'coverage.howToBody1': 'Nyuma ya kila kisanduku kuna rekodi halisi kutoka Shirika la Afya Duniani —',
  'coverage.howToBody2':
    'kwa jumla. Afya ya hedhi haina kipimo cha kimataifa kabisa, kwa hivyo inategemea makadirio ya utafiti. Ukosefu huo ndio hasa aina ya pengo ambalo ukurasa huu umeundwa kulionesha.',
  'coverage.trendingTitle': 'Mada zinazoulizwa zaidi katika jukwaa',
  'coverage.trendingBody':
    'Orodha ya kila mwezi ya mada ambazo wanawake wanauliza — ikihesabiwa katika makundi makubwa tu, ili orodha isiweze kumdokezea mtu yeyote. Mada zinazopanda zinaonyesha pale mapengo ya elimu yanavyokua haraka.',
  'coverage.whyTitle': 'Kwa nini orodha hii ipo',
  'coverage.whyBody':
    'Mada ikikua mwezi baada ya mwezi, mara nyingi si bahati mbaya — ni ishara ya mahali ambapo kliniki, shule na familia pengine hazijajibu swali hilo. Watafiti na wahudumu wa afya hutumia orodha hii kuamua cha kuandika, kutafsiri na kufundisha kifuatacho. Takwimu ni za makundi tu (ukubwa wa makundi zaidi ya 25), bila mgawanyo wa kaunti chini ya kiwango, na bila uwezekano wa kumtambua muulizaji yeyote.',
  'coverage.heatGap': 'Pengo: hakuna data',
  'coverage.heatProxy': 'Kadirio la utafiti',
  'coverage.heatSelect': 'Chagua kisanduku kwa maelezo',
  'coverage.heatTopicCountry': 'Mada \\ Nchi',
  'coverage.note0': 'Hakuna data ya kuaminika iliyopatikana bado kwa mada hii katika nchi hii.',
  'coverage.note1': 'Data kidogo ipo, lakini ni haba au ya zamani.',
  'coverage.note2': 'Ufunikaji mzuri wa data umepatikana.',
  'coverage.sourcePrefix': 'Chanzo:',
  'coverage.sourceProxyDetail': 'utafiti uliochapishwa (Iyanda et al., 2020)',
  'coverage.unitPer100k': 'kwa 100,000',
  'coverage.unitYears': 'miaka',
  'coverage.kenyaAria': 'Vipimo vya afya ya wanawake wa Kenya kwa asilimia',
  'coverage.kenyaSource':
    'Chanzo: Shirika la Afya Duniani, mwaka wa hivi karibuni unaopatikana kwa kila kipimo. Afya ya hedhi haina kipimo cha kimataifa. Ndio sababu mojawapo inayobaki kuwa pengo.',

  // About page
  'about.title': 'Kuhusu NuruWomen',
  'about.intro':
    'Nuru ni neno la Kiswahili linalomaanisha “mwanga”. Mradi huu unachunguza jinsi wanawake nchini Kenya na Afrika nzima wanavyoweza kupata taarifa sahihi za afya — huku hadithi za jamii, elimu ya wataalamu na ushahidi vikibaki katika tabaka tofauti.',
  'about.livedBody': 'Hadithi binafsi zinaonyesha tabaka la jamii. Ni uzoefu ulioshirikiwa, si ushauri wa kimatibabu.',
  'about.clinicalBody': 'Majibu yaliyoandikwa kwa kushirikiana na wataalamu wa kliniki. Uthibitishaji wa moja kwa moja wa wataalamu bado unajengwa.',
  'about.evidenceBody':
    'Makala za elimu zilizopangiliwa na orodha ya utafiti, zilizopitishwa na bodi ya kliniki. Hazinaweza kuchukua nafasi ya ushauri wa kibinafsi wa kimatibabu.',
  'about.areasTitle': 'Maeneo matano ya afya',
  'about.areasBody':
    'Afya ya hedhi, afya ya kingono, kuzeeka kwa afya, afya baada ya kujifungua na afya ya akili. Kila swali hupangwa kiotomatiki katika maeneo haya; lolote lisilo wazi hupitishwa na mtu, si mashine.',
  'about.whatTitle': 'Kazi za NuruWomen',
  'about.what1': 'Huchunguza kila swali kwa faragha na usalama kabla halijachapishwa.',
  'about.what2': 'Hufanya kazi kwa Kiingereza na Kiswahili.',
  'about.what3': 'Huchapisha maswali na majibu kwa faragha — bila akaunti, kamwe.',
  'about.what4': 'Huunganisha kila mada na utafiti wa hivi karibuni wa kliniki.',
  'about.what5': 'Huonyesha ramani ya pale data ya kuaminika ya afya ya wanawake ilipo — na inapokosekana — katika nchi 53 za Afrika.',
  'about.what6': 'Hukusanya matukio yajayo ya afya ya wanawake — uchunguzi, semina na midahalo — katika kalenda moja wazi.',
  'about.privacyTitle': 'Faragha yako',
  'about.privacyBody':
    'Maswali huchapishwa kwa faragha — bila akaunti, bila jina, bila kitu chochote kinachokufahamisha. Picha unazoshikiza huondolewa metadata iliyofichwa (mahali, kifaa) kabla ya kupakiwa. Machapisho ya umma hayawezi kutolewa, na uchunguzi wa kiotomatiki unaweza kukosa mambo, kwa hivyo usishiriki rekodi za matibabu au maelezo ya kibinafsi. Hakuna huduma mtandaoni inayoweza kuahidi faragha kamili.',
  'about.cliniciansKicker': 'Bodi ya wataalamu iliyothibitishwa',
  'about.cliniciansTitle': 'Madaktari lazima wathibitishwe — hivi ndivyo inavyofanya kazi',
  'about.cliniciansBody':
    'Hakuna anayeweza kujiita mtaalamu wa kliniki katika jukwaa kwa kujisajili tu. Kila mtaalamu huchunguzwa na mtu dhidi ya rejista rasmi — Baraza la Madaktari na Wauguzi wa Kenya (KMPDC), Baraza la Uuguzi la Kenya, Bodi ya Dawa na Sumu, au rejista sawa katika nchi yao — kabla majibu yao hayajapewa lebo ya kliniki ya bluu. Vyeo vya kujitangaza, majina ya watumiaji na viungo vya wasifu havikubaliki kama ushahidi.',
  'about.registerChecked': 'Imethibitishwa katika rejista, tangu',
  'about.volunteerCardTitle': 'Je, wewe ni mtaalamu wa afya?',
  'about.volunteerCardBody':
    'Jitolee saa moja kwa wiki. Baada ya ukaguzi wa rejista, majibu yako hubeba lebo ya kliniki na kumsaidia mtu aliyesubiri miaka kuuliza.',
  'about.howVerification': 'Uthibitishaji unavyofanya kazi:',
  'about.verificationBody':
    'mtaalamu wa kliniki hushiriki namba yake ya usajili kwa faragha na timu ya ukaguzi; timu huhakikisha dhidi ya rejista rasmi; ndipo ufunguo wake wa umma unaongezwa kwenye rejista ya wataalamu iliyothibitishwa (orodha ya NIP-51 inayochapishwa na ufunguo rasmi wa jukwaa). Programu huchukua rejista — kamwe si kujitangaza — kama chanzo cha beji ya kliniki.',
  'about.translateKicker': 'Kila lugha ya Kiafrika',
  'about.translateTitle': 'Imejengwa kwa Kiingereza na Kiswahili — tayari kwa lugha yako',
  'about.translateBody1':
    'Leo kiolesura na sheria za uchanganuzi hufanya kazi kwa Kiingereza na Kiswahili. Jukwaa ni chanzo wazi, na tafsiri ni mojawapo ya michango muhimu zaidi: kila neno la skrini liko katika faili moja ya kamusi',
  'about.translateBody2':
    ', na sheria za maneno muhimu zinazopanga maswali zipo kando yake. Ongeza lugha yako — Yoruba, Hausa, Amharic, Igbo, Shona, isiZulu, Kifaransa, Kiarabu — na kibadilisha-lugha huitambua moja kwa moja. Hatumii tafsiri ya mashine; kila lugha hupitishwa na mzungumzaji.',
  'about.translateFork': 'Tengeneza nakala (fork) ya mradi, tafsiri kamusi, kisha fungua pull request.',
  'about.buildingTitle': 'Tunachojenga',
  'about.buildingBody':
    'Akaunti za wataalamu zilizothibitishwa, mapitio kamili ya Kiswahili, na usimamizi wa watu wenye uangalifu — ili siku moja kila jibu litokee kwa mtu ambaye mafunzo yake tumeyakagua.',
  'about.buildingLink': 'Tazama utafiti',
  'about.buildingAfter': 'unaotuongoza leo.',
};

export const UI_STRINGS: Record<UiLang, Record<UiKey, string>> = { en, sw };
