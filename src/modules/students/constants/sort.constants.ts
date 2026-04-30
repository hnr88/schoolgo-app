import type { SortField } from '@/modules/students/types/component.types';

export const SORT_FIELD_TO_API: Record<SortField, string> = {
  name: 'firstName',
  nationality: 'nationality',
  currentYearLevel: 'currentYearLevel',
  targetEntryYear: 'targetEntryYear',
  status: 'status',
};
