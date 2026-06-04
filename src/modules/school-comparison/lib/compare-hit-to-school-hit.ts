import type { CompareSchoolHit } from '@/modules/school-search/types/compare-schools.types';
import type { SchoolHit } from '@/modules/school-comparison/types/comparison.types';

function deriveHighestTuition(hit: CompareSchoolHit): number | null {
  if (hit.tuitionByLevel.length === 0) return null;
  return hit.tuitionByLevel.reduce(
    (max, level) => Math.max(max, level.annualAmountAud),
    hit.tuitionByLevel[0].annualAmountAud,
  );
}

function hasBoarding(hit: CompareSchoolHit): boolean {
  return hit.accommodation === 'boarding' || hit.accommodation === 'both';
}

/**
 * Adapts a compare-endpoint hit to the {@link SchoolHit} shape the comparison
 * table consumes. Fields the compare endpoint does not provide are left null so
 * the table renders the empty placeholder rather than incorrect data.
 */
export function compareHitToSchoolHit(hit: CompareSchoolHit): SchoolHit {
  return {
    documentId: hit.id,
    id: hit.id,
    name: hit.name,
    slug: '',
    state: hit.state,
    suburb: hit.suburb,
    postcode: '',
    lat: hit.lat,
    lng: hit.lng,
    coverImageUrl: hit.coverImageUrl,
    schoolType: '',
    sector: hit.sector,
    gender: '',
    logoUrl: hit.logoUrl,
    lowestAnnualTuition: hit.annualTuitionFrom,
    highestAnnualTuition: deriveHighestTuition(hit),
    scholarshipAvailable: false,
    boardingAvailable: hasBoarding(hit),
    hasActiveApplicationTemplate: false,
    hasOpenCapacity: false,
    totalEnrolment: hit.schoolSize,
    internationalStudentPercentage: hit.internationalStudentPct,
    religiousAffiliation: hit.religiousAffiliation,
    curriculumOffered: hit.curriculumCodes.length
      ? hit.curriculumCodes.join(', ')
      : null,
    levelsOffered: null,
    yearLevelBands: [],
    capacityBands: [],
    _geo: { lat: hit.lat, lng: hit.lng },
  };
}
