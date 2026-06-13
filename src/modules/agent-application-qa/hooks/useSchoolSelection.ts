'use client';

import { useCallback, useState } from 'react';
import type { AutocompleteSchoolHit } from '@/modules/school-search/types/autocomplete-schools.types';
import type { ReadinessSchoolOption } from '@/modules/agent-application-qa/types/readiness.types';

function buildLabel(school: AutocompleteSchoolHit): string {
  const suburb = school.suburb ? `, ${school.suburb}` : '';
  const state = school.state ? ` (${school.state})` : '';
  return `${school.name}${suburb}${state}`;
}

// Tracks the human-readable label for each selected school documentId so the
// selected badges and result cards can render names without an extra fetch.
export function useSchoolSelection() {
  const [labels, setLabels] = useState<Record<string, string>>({});

  const toggle = useCallback((current: string[], school: AutocompleteSchoolHit): string[] => {
    if (current.includes(school.id)) {
      return current.filter((id) => id !== school.id);
    }
    setLabels((prev) => ({ ...prev, [school.id]: buildLabel(school) }));
    return [...current, school.id];
  }, []);

  const remove = useCallback(
    (current: string[], documentId: string): string[] =>
      current.filter((id) => id !== documentId),
    [],
  );

  const selected = useCallback(
    (ids: string[]): ReadinessSchoolOption[] =>
      ids.map((id) => ({ documentId: id, label: labels[id] ?? id })),
    [labels],
  );

  const labelFor = useCallback(
    (documentId: string): string => labels[documentId] ?? documentId,
    [labels],
  );

  return { toggle, remove, selected, labelFor };
}
