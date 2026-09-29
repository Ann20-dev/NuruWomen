/**
 * Red-flag safety engine. Pattern-matches symptoms and situations that
 * should never wait for a community answer, and returns calm, concrete
 * guidance. This never diagnoses — it routes to urgent care.
 */

export interface SafetyFlag {
  id: string;
  title: string;
  guidance: string;
  resource?: string;
}

interface Rule {
  id: string;
  title: string;
  guidance: string;
  resource?: string;
  any: RegExp[];
  all?: RegExp[]; // every pattern must match
}

const R = (s: string) => new RegExp(s, 'i');

const RULES: Rule[] = [
  {
    id: 'mental-health-crisis',
    title: 'You may be in emotional crisis',
    guidance:
      'Thoughts of harming yourself deserve immediate, caring support — not a forum reply. Please reach out now: you are not alone and this feeling can be treated.',
    resource: 'Kenya Red Cross psychosocial support: 1199 · Befrienders Kenya · Emergency 999 / 112',
    any: [R('suicid'), R('kill my\\s?self'), R('end my life'), R('self[- ]harm'), R('want to die'), R("can't go on"), R('cannot go on')],
  },
  {
    id: 'violence-assault',
    title: 'If you have experienced violence or assault',
    guidance:
      'What happened is not your fault. If this was recent, medical care within 72 hours can prevent HIV (PEP) and pregnancy, and you can be examined without reporting to police first.',
    resource: 'Kenya national GBV helpline: 1195 (free) · Nairobi Women’s Hospital Gender Violence Recovery Centre',
    any: [R('raped'), R('rape'), R('forced me'), R('forced himself'), R('assaulted'), R('beat me'), R('beats me'), R('defile')],
  },
  {
    id: 'pregnancy-danger',
    title: 'Possible pregnancy danger sign',
    guidance:
      'Bleeding, severe headache, blurred vision, swelling, or reduced baby movement in pregnancy can be serious. Please go to a maternity unit or hospital today — do not wait for replies here.',
    resource: 'Emergency 999 / 112 · nearest maternity or county hospital',
    any: [R('pregnant'), R('weeks'), R('ujauzito'), R('mimba')],
    all: [R('bleed|severe headache|blurred|vision|swelling|swollen face|not moving|stopped moving|reduced movement|severe (stomach|abdominal) pain')],
  },
  {
    id: 'ectopic-risk',
    title: 'Possible ectopic pregnancy warning',
    guidance:
      'A missed period with one-sided lower abdominal pain, dizziness or shoulder-tip pain can indicate an ectopic pregnancy, which is an emergency. Seek hospital care immediately.',
    resource: 'Emergency 999 / 112',
    any: [R('missed (my )?period'), R('period is late'), R('positive test')],
    all: [R('one[- ]sided|one side|shoulder|dizzy|dizziness|faint|sharp pain')],
  },
  {
    id: 'heavy-bleeding-urgent',
    title: 'Bleeding that may be unsafe',
    guidance:
      'Soaking a pad every hour, passing very large clots, or bleeding with dizziness or fainting needs same-day medical assessment. Please go to a health facility now.',
    any: [R('soak(ing)? (a |through )?(pad|pads) (every|each) hour'), R('flooding'), R('clots (the size of|bigger|larger)'), R('bleeding (and|with) (i feel |)dizzy'), R('faint')],
  },
  {
    id: 'severe-acute-pain',
    title: 'Severe sudden pain',
    guidance:
      'Sudden, unbearable or “worst ever” pain — especially with fever, vomiting or collapse — should be assessed urgently in person.',
    any: [R('worst pain'), R('unbearable pain'), R('collapsed'), R('passed out'), R('excruciating')],
  },
  {
    id: 'postpartum-danger',
    title: 'Postpartum warning sign',
    guidance:
      'Heavy bleeding, foul-smelling discharge, fever, chest pain or trouble breathing in the weeks after birth can signal serious complications. Seek care today.',
    any: [R('after (giving )?birth'), R('postpartum'), R('weeks ago i had (a |my )?baby'), R('since delivery')],
    all: [R('bleed|fever|smell|discharge|chest pain|breath|leg (pain|swell)')],
  },
];

export function scanSafety(text: string): SafetyFlag[] {
  const flags: SafetyFlag[] = [];
  for (const rule of RULES) {
    const anyMatch = rule.any.some((re) => re.test(text));
    const allMatch = !rule.all || rule.all.every((re) => re.test(text));
    if (anyMatch && allMatch) {
      flags.push({ id: rule.id, title: rule.title, guidance: rule.guidance, resource: rule.resource });
    }
  }
  return flags;
}
