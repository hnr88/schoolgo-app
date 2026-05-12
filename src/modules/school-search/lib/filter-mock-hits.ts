import { MOCK_SCHOOL_HITS } from '@/modules/school-search/lib/mock-search-response';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';
import type { TypedSearchRequestInput } from '@/modules/school-search/schemas/search-request.schema';
import type {
  Accommodation,
  ReligiousAffiliation,
  Sector,
} from '@/modules/school-search/types/filter.types';
import type { AustralianState } from '@/modules/school-search/types/school.types';

export interface MockSearchEnvelope {
  hits: SchoolHit[];
  total: number;
  page: number;
  pageSize: number;
}

function isAustralianState(value: string): value is AustralianState {
  return ['VIC', 'NSW', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT'].includes(value);
}

function isSector(value: string): value is Sector {
  return ['government', 'non-government', 'catholic'].includes(value);
}

function isAccommodation(value: string): value is Accommodation {
  return ['boarding', 'homestay', 'both', 'none'].includes(value);
}

function isReligiousAffiliation(value: string): value is ReligiousAffiliation {
  return [
    'non-denominational', 'anglican', 'baptist', 'lutheran', 'uniting-church',
    'presbyterian', 'islamic', 'jewish', 'buddhist', 'coptic-orthodox',
    'greek-orthodox', 'seventh-day-adventist', 'quaker', 'interdenominational-christian',
  ].includes(value);
}

export function filterMockHits(
  hits: SchoolHit[],
  request: TypedSearchRequestInput,
): MockSearchEnvelope {
  const page = request.page ?? 1;
  const pageSize = request.pageSize ?? 20;

  let filtered = hits.slice();

  if (request.q && request.q.trim().length > 0) {
    const needle = request.q.trim().toLowerCase();
    filtered = filtered.filter(
      (h) =>
        h.name.toLowerCase().includes(needle) ||
        h.suburb.toLowerCase().includes(needle),
    );
  }

  if (request.states && request.states.length > 0) {
    const statesSet = new Set<AustralianState>(request.states);
    filtered = filtered.filter(
      (h) => isAustralianState(h.state) && statesSet.has(h.state),
    );
  }

  if (request.sectors && request.sectors.length > 0) {
    const sectorsSet = new Set<Sector>(request.sectors);
    filtered = filtered.filter(
      (h) => isSector(h.sector) && sectorsSet.has(h.sector),
    );
  }

  if (request.accommodation && request.accommodation.length > 0) {
    const accomSet = new Set<Accommodation>(request.accommodation);
    filtered = filtered.filter(
      (h) =>
        h.accommodation !== undefined &&
        isAccommodation(h.accommodation) &&
        accomSet.has(h.accommodation),
    );
  }

  if (request.religiousAffiliations && request.religiousAffiliations.length > 0) {
    const religSet = new Set<ReligiousAffiliation>(request.religiousAffiliations);
    filtered = filtered.filter((h) => {
      if (!h.religiousAffiliation) return false;
      return (
        isReligiousAffiliation(h.religiousAffiliation) &&
        religSet.has(h.religiousAffiliation)
      );
    });
  }

  if (request.feeMin !== undefined || request.feeMax !== undefined) {
    const feeMin = request.feeMin ?? 0;
    const feeMax = request.feeMax ?? Infinity;
    filtered = filtered.filter((h) => {
      const fee = h.annualTuitionFrom ?? 0;
      return fee >= feeMin && fee <= feeMax;
    });
  }

  if (request.atarAvailable === true) {
    filtered = filtered.filter((h) => h.atarAvailable === true);
  }

  if (request.englishLanguageSupport === true) {
    filtered = filtered.filter((h) => h.englishLanguageSupport === true);
  }

  if (request.entryYearLevels && request.entryYearLevels.length > 0) {
    const wantsPrimary =
      request.entryYearLevels.some((l) => ['gr4', 'gr5', 'gr6'].includes(l));
    const wantsSecondary =
      request.entryYearLevels.some((l) =>
        ['yr7', 'yr8', 'yr9', 'yr10', 'yr11', 'yr12'].includes(l),
      );
    filtered = filtered.filter((h) => {
      const bands: string[] = h.yearLevelBands ?? [];
      return (
        (wantsPrimary && bands.includes('primary')) ||
        (wantsSecondary && bands.includes('secondary'))
      );
    });
  }

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  return { hits: paged, total, page, pageSize };
}

export function filterDefaultMockHits(
  request: TypedSearchRequestInput,
): MockSearchEnvelope {
  return filterMockHits(MOCK_SCHOOL_HITS, request);
}
