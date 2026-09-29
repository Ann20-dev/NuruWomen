/**
 * Deterministic fake hex identifiers for bundled seed content.
 * Seed events are local teaching data; any real replies users publish
 * to them are fetched from relays by `#e` filter like any other event.
 */

function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Deterministic 64-char hex id derived from a seed string. */
export function seedId(seed: string): string {
  let state = hashString(seed) || 1;
  let out = '';
  while (out.length < 64) {
    // xorshift32
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    state >>>= 0;
    out += state.toString(16).padStart(8, '0');
  }
  return out.slice(0, 64);
}

/** Deterministic pubkey-looking hex for demo personas. */
export function seedPubkey(seed: string): string {
  return seedId(`pk:${seed}`);
}
