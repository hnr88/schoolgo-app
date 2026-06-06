'use client';

import { useCallback, useState } from 'react';
import { buildSchoolLabel, presetSchoolLabel } from '@/modules/applications/lib/school-label';
import type {
  SchoolOption,
  SelectedSchool,
} from '@/modules/applications/types/create-application.types';

export function useMultiSchoolSelection(presetSchool: SchoolOption | null) {
  const [labels, setLabels] = useState<Record<string, string>>(() =>
    presetSchool ? { [presetSchool.documentId]: presetSchoolLabel(presetSchool) } : {},
  );

  const toggle = useCallback(
    (
      current: string[],
      school: { id: string; name: string; suburb?: string | null; state?: string | null },
    ): string[] => {
      if (current.includes(school.id)) {
        return current.filter((id) => id !== school.id);
      }
      setLabels((prev) => ({ ...prev, [school.id]: buildSchoolLabel(school) }));
      return [...current, school.id];
    },
    [],
  );

  const remove = useCallback((current: string[], documentId: string): string[] => {
    return current.filter((id) => id !== documentId);
  }, []);

  const selected = useCallback(
    (ids: string[]): SelectedSchool[] =>
      ids.map((id) => ({ documentId: id, label: labels[id] ?? id })),
    [labels],
  );

  const labelMap = useCallback(
    (ids: string[]): Record<string, string> =>
      Object.fromEntries(ids.map((id) => [id, labels[id] ?? id])),
    [labels],
  );

  return { toggle, remove, selected, labelMap };
}
