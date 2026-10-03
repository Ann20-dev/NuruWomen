import { seedPubkey } from '@/lib/nuru/ids';
import type { Clinician } from '@/lib/nuru/types';

/**
 * Verified-clinician registry. In production this list is a NIP-51
 * follow set (kind 30000, d=nuru-verified-clinicians) published by the
 * commons authority key after manual verification against professional
 * registers (KMPDC, Nursing Council of Kenya, PPB).
 */
export const CLINICIANS: Clinician[] = [
  {
    name: 'Dr. Wanjiku Kamau',
    pubkey: seedPubkey('dr-wanjiku-kamau'),
    role: 'Obstetrician & Gynaecologist',
    specialty: 'Obstetrics & Gynaecology',
    org: 'Clinical volunteer · Nairobi',
    verifiedSince: 'July 2026',
  },
  {
    name: 'Beatrice Achieng',
    pubkey: seedPubkey('beatrice-achieng'),
    role: 'Reproductive Health Nurse',
    specialty: 'Reproductive & Sexual Health',
    org: 'Clinical volunteer · Kisumu',
    verifiedSince: 'July 2026',
  },
  {
    name: 'Dr. Rehema Salim',
    pubkey: seedPubkey('dr-rehema-salim'),
    role: 'Family Medicine Physician',
    specialty: 'Family Medicine',
    org: 'Clinical volunteer · Mombasa',
    verifiedSince: 'August 2026',
  },
  {
    name: 'Faith Njeri',
    pubkey: seedPubkey('faith-njeri'),
    role: 'Registered Midwife',
    specialty: 'Midwifery & Postpartum Care',
    org: 'Clinical volunteer · Eldoret',
    verifiedSince: 'August 2026',
  },
  {
    name: 'Grace Moraa',
    pubkey: seedPubkey('grace-moraa'),
    role: 'Community Health Promoter',
    specialty: 'Community Health Navigation',
    org: 'Ministry of Health CHP · Nakuru',
    verifiedSince: 'September 2026',
  },
];

// Seed personas must never grant authority to a live event.
export const CLINICIAN_PUBKEYS = new Set<string>();

export function clinicianForPubkey(pubkey: string): Clinician | undefined {
  return CLINICIAN_PUBKEYS.has(pubkey) ? CLINICIANS.find((c) => c.pubkey === pubkey) : undefined;
}
