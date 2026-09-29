const ADJECTIVES = [
  'Brave', 'Gentle', 'Quiet', 'Bright', 'Steady', 'Kind', 'Bold', 'Calm',
  'Warm', 'Patient', 'Strong', 'Honest', 'Hopeful', 'Curious', 'Graceful', 'Resilient',
];

const NOUNS = [
  'Acacia', 'Baobab', 'Protea', 'Marula', 'Flame', 'Jacaranda', 'Nandi', 'Zebra',
  'Sunbird', 'Kingfisher', 'Moringa', 'Hibiscus', 'Safari', 'Savanna', 'Mvua', 'Mwangaza',
];

/** Deterministic friendly pseudonym derived from a pubkey. */
export function genUserName(pubkey: string): string {
  let h = 0;
  for (let i = 0; i < pubkey.length; i++) {
    h = (Math.imul(h, 31) + pubkey.charCodeAt(i)) | 0;
  }
  const a = ADJECTIVES[Math.abs(h) % ADJECTIVES.length];
  const n = NOUNS[Math.abs(h >> 8) % NOUNS.length];
  return `${a} ${n}`;
}
