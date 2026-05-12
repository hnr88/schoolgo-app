import type { SortOption } from '@/modules/school-search/types/filter.types';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

export function sortHits(hits: readonly SchoolHit[], sortBy: SortOption): SchoolHit[] {
  const arr = [...hits];
  switch (sortBy) {
    case 'name-asc':
      return arr.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return arr.sort((a, b) => b.name.localeCompare(a.name));
    case 'tuition-asc':
      return arr.sort(
        (a, b) => (a.annualTuitionFrom ?? Infinity) - (b.annualTuitionFrom ?? Infinity),
      );
    case 'tuition-desc':
      return arr.sort(
        (a, b) => (b.annualTuitionFrom ?? -Infinity) - (a.annualTuitionFrom ?? -Infinity),
      );
    case 'state':
      return arr.sort((a, b) => a.state.localeCompare(b.state));
    case 'enrolment-status': {
      const rank: Record<string, number> = { open: 0, limited: 1, waitlist: 2, closed: 3 };
      return arr.sort((a, b) => (rank[a.enrolmentStatus ?? ''] ?? 9) - (rank[b.enrolmentStatus ?? ''] ?? 9));
    }
    default:
      return arr;
  }
}
