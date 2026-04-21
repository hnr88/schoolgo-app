import type { SchoolRecord } from '@/lib/schools/types';
import { parseFeeAud } from '@/lib/schools/format-fee';

export interface SchoolStats {
  totalSchools: number;
  statesCount: number;
  sectors: string[];
  feeRange: { minAud: number | null; maxAud: number | null };
}

export function computeSchoolStats(schools: SchoolRecord[]): SchoolStats {
  const states = new Set<string>();
  const sectors = new Set<string>();
  let minFee: number | null = null;
  let maxFee: number | null = null;

  for (const s of schools) {
    if (s.state) states.add(s.state);
    if (s.sector) sectors.add(s.sector);
    const fee = parseFeeAud(s.annualFeeAud);
    if (fee !== null) {
      minFee = minFee === null || fee < minFee ? fee : minFee;
      maxFee = maxFee === null || fee > maxFee ? fee : maxFee;
    }
  }

  return {
    totalSchools: schools.length,
    statesCount: states.size,
    sectors: Array.from(sectors).sort(),
    feeRange: { minAud: minFee, maxAud: maxFee },
  };
}
