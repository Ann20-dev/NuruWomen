import { seedId } from '@/lib/nuru/ids';
import type { HealthEvent } from '@/lib/nuru/types';

const now = Math.floor(Date.now() / 1000);
const HOUR = 3600;
const DAY = 24 * HOUR;

const at = (daysAhead: number, hourEAT: number) => {
  // Anchor to the given hour East Africa Time (UTC+3) so times render
  // sensibly wherever the visitor is. Supports half hours (18.5 = 6:30pm).
  const d = new Date((now + daysAhead * DAY) * 1000);
  d.setUTCHours(0, 0, 0, 0);
  return Math.floor(d.getTime() / 1000) + Math.round((hourEAT - 3) * HOUR);
};

/**
 * Bundled community events. Live events published to relays as NIP-52
 * calendar events tagged `nuru-commons` merge over these (see useNuruEvents).
 * Dates are relative to first load so the calendar is never empty or stale.
 */
export const SEED_EVENTS: HealthEvent[] = [
  {
    id: seedId('ev-cervical-screening-kibera'),
    title: 'Free cervical screening & HPV vaccination camp',
    summary:
      'Walk-in screening with visual inspection (VIA) and HPV testing, plus vaccination for eligible girls and young women. Nurses explain every step before anything happens — no question is too small.',
    startsAt: at(6, 9),
    endsAt: at(6, 15),
    location: 'Nairobi · Kibera, DOOR Hall',
    isOnline: false,
    type: 'screening',
    organizer: 'NuruWomen Clinical Panel & AMREF Health Africa',
    cost: 'Free',
    languages: ['English', 'Kiswahili'],
    topics: ['cervical-screening'],
    isSeed: true,
  },
  {
    id: seedId('ev-menopause-webinar'),
    title: 'Perimenopause explained: the changes nobody mentions',
    summary:
      'A live webinar with a gynaecologist and two women sharing lived experience. Sleep, anxiety, changing cycles, treatment options — followed by an anonymous Q&A where no name is ever shown.',
    startsAt: at(12, 18),
    endsAt: at(12, 19.5),
    location: 'Online (Zoom)',
    isOnline: true,
    type: 'webinar',
    organizer: 'Kenya Obstetrical and Gynaecological Society',
    cost: 'Free',
    languages: ['English', 'Kiswahili'],
    topics: ['perimenopause', 'menopause'],
    link: 'https://zoom.us',
    isSeed: true,
  },
  {
    id: seedId('ev-postpartum-circle-kisumu'),
    title: 'Postpartum support circle — tea, truth-telling and rest',
    summary:
      'A gentle, facilitated circle for mothers in the first year after birth. Baby welcome. A registered midwife and a counsellor hold the space; sharing is always optional.',
    startsAt: at(16, 10),
    endsAt: at(16, 12),
    location: 'Kisumu · Milimani, Community Library',
    isOnline: false,
    type: 'community',
    organizer: 'NuruWomen Community · Kisumu',
    cost: 'Free',
    languages: ['Kiswahili', 'Dholuo'],
    topics: ['postpartum-anxiety'],
    isSeed: true,
  },
  {
    id: seedId('ev-endo-dialogue'),
    title: 'Endometriosis: seven years to a diagnosis — an open dialogue',
    summary:
      'Women with endometriosis, a laparoscopic surgeon and a pain specialist discuss why diagnosis takes so long and what to say in a consultation when pain is dismissed. Anonymous questions collected in advance.',
    startsAt: at(23, 17),
    endsAt: at(23, 19),
    location: 'Online (YouTube Live)',
    isOnline: true,
    type: 'webinar',
    organizer: 'Endo Sisters East Africa',
    cost: 'Free',
    languages: ['English'],
    topics: ['endometriosis', 'severe-period-pain'],
    link: 'https://youtube.com',
    isSeed: true,
  },
  {
    id: seedId('ev-menstrual-workshop-nakuru'),
    title: 'Training: menstrual health champions for schools',
    summary:
      'A practical one-day training for teachers, community health promoters and youth mentors: cycle basics, pain red flags, period-friendly toilets, and how to answer the questions girls actually ask.',
    startsAt: at(30, 8.5),
    endsAt: at(30, 16),
    location: 'Nakuru · County Hall, Room 4',
    isOnline: false,
    type: 'training',
    organizer: 'ZanaAfrica Foundation & Ministry of Health CHPs',
    cost: 'Free (lunch provided)',
    languages: ['English', 'Kiswahili'],
    topics: ['irregular-periods', 'severe-period-pain'],
    isSeed: true,
  },
  {
    id: seedId('ev-fibroids-qa'),
    title: 'Ask a gynaecologist: fibroids, fertility and fear of surgery',
    summary:
      'An open online Q&A. Two gynaecologists answer the community’s most-asked fibroid questions — from watchful waiting to myomectomy — with plain-language explanations and no pressure.',
    startsAt: at(37, 18),
    endsAt: at(37, 19.5),
    location: 'Online (Zoom)',
    isOnline: true,
    type: 'webinar',
    organizer: 'Nairobi Women’s Hospital',
    cost: 'Free',
    languages: ['English', 'Kiswahili'],
    topics: ['fibroids', 'fertility'],
    link: 'https://zoom.us',
    isSeed: true,
  },
  {
    id: seedId('ev-breast-health-mombasa'),
    title: 'Breast health workshop: know what is normal for you',
    summary:
      'A hands-on workshop on breast awareness (not a substitute for screening): what changes matter, how screening works at public hospitals, and how to support a sister through a lump scare.',
    startsAt: at(44, 10),
    endsAt: at(44, 13),
    location: 'Mombasa · Tudor, COTU Hall',
    isOnline: false,
    type: 'training',
    organizer: 'Kenya Cancer Association · Coast Chapter',
    cost: 'Free',
    languages: ['Kiswahili'],
    topics: ['breast-health'],
    isSeed: true,
  },
  {
    id: seedId('ev-pmdd-peer-circle'),
    title: 'PMS & PMDD peer circle — when the week before is the hardest',
    summary:
      'A small, moderated online circle for anyone whose premenstrual mood changes disrupt their life. Cameras optional. A psychologist joins for the final thirty minutes.',
    startsAt: at(51, 19),
    endsAt: at(51, 20.5),
    location: 'Online (private link on registration)',
    isOnline: true,
    type: 'community',
    organizer: 'NuruWomen Community · Mental Health',
    cost: 'Free',
    languages: ['English', 'Kiswahili'],
    topics: ['pms-pmdd'],
    isSeed: true,
  },
  {
    id: seedId('ev-contraception-popup'),
    title: 'Contraception choices pop-up — methods, myths and side effects',
    summary:
      'Drop-in sessions with reproductive health nurses: compare methods honestly, ask about side effects without judgement, and leave with clear next steps. Free implants and pills while stocks last.',
    startsAt: at(58, 9),
    endsAt: at(58, 14),
    location: 'Nairobi · Eastleigh, Youth Centre',
    isOnline: false,
    type: 'screening',
    organizer: 'LVCT Health',
    cost: 'Free',
    languages: ['Kiswahili', 'Somali'],
    topics: ['contraception'],
    isSeed: true,
  },
  {
    id: seedId('ev-pcos-walk-eldoret'),
    title: 'PCOS awareness walk & nutrition fair',
    summary:
      'A relaxed 5km walk followed by stalls from dietitians, gynaecologists and women living with PCOS. Come for the walk, stay for the honest conversations about weight, hormones and fertility.',
    startsAt: at(65, 7.5),
    endsAt: at(65, 12),
    location: 'Eldoret · Town Square',
    isOnline: false,
    type: 'awareness',
    organizer: 'PCOS Foundation Kenya',
    cost: 'Free',
    languages: ['English', 'Kiswahili', 'Kalenjin'],
    topics: ['pcos'],
    isSeed: true,
  },
  {
    id: seedId('ev-painful-sex-webinar'),
    title: 'Pain during sex is common, treatable and not your fault',
    summary:
      'A pelvic-health physiotherapist and a sexual-health nurse explain the most common causes of pain with sex — infections, dryness, pelvic floor tension — and the treatments that actually help.',
    startsAt: at(72, 18),
    endsAt: at(72, 19.5),
    location: 'Online (Zoom)',
    isOnline: true,
    type: 'webinar',
    organizer: 'NuruWomen Clinical Panel',
    cost: 'Free',
    languages: ['English'],
    topics: ['painful-sex', 'pelvic-floor'],
    link: 'https://zoom.us',
    isSeed: true,
  },
  {
    id: seedId('ev-fertility-dialogue-nairobi'),
    title: 'Trying to conceive: a couples’ dialogue on testing and timelines',
    summary:
      'Why both partners matter from day one, which tests come first at public facilities, and how to protect a relationship through a long wait. Facilitated by a fertility nurse and a counsellor.',
    startsAt: at(79, 14),
    endsAt: at(79, 17),
    location: 'Nairobi · Westlands, Aga Khan Hall',
    isOnline: false,
    type: 'community',
    organizer: 'Fertility Kenya',
    cost: 'Free',
    languages: ['English', 'Kiswahili'],
    topics: ['fertility'],
    isSeed: true,
  },
];

export const EVENT_TYPE_LABELS: Record<HealthEvent['type'], string> = {
  screening: 'Screening & clinics',
  webinar: 'Webinar',
  community: 'Community circle',
  training: 'Training',
  awareness: 'Awareness event',
};
