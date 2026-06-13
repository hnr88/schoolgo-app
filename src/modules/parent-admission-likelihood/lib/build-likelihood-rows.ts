import type { SchoolHit } from '@/modules/school-search';
import type {
  AdmissionLikelihoodRow,
  LikelihoodBand,
  SchoolLikelihood,
} from '@/modules/parent-admission-likelihood/types/admission-likelihood.types';

const BAND_RANK: Record<LikelihoodBand, number> = { safety: 0, match: 1, reach: 2 };

export function buildLikelihoodRows(
  schools: SchoolHit[],
  results: SchoolLikelihood[] | undefined,
): AdmissionLikelihoodRow[] {
  if (!results) return [];

  const byId = new Map(results.map((result) => [result.schoolDocumentId, result]));

  const rows = schools.map<AdmissionLikelihoodRow>((school) => {
    const result = byId.get(school.documentId);
    if (result && result.found) {
      return { school, status: 'success', likelihood: result };
    }
    return { school, status: 'missing', likelihood: null };
  });

  return rows.sort((a, b) => {
    if (a.status !== 'success') return 1;
    if (b.status !== 'success') return -1;
    const bandDiff = BAND_RANK[a.likelihood.band] - BAND_RANK[b.likelihood.band];
    if (bandDiff !== 0) return bandDiff;
    return b.likelihood.score - a.likelihood.score;
  });
}
