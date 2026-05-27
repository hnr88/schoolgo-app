import type { ParentSortField } from '@/modules/students/types/parent-component.types';

export const PARENT_SORT_FIELD_TO_API: Record<ParentSortField, string> = {
  name: 'firstName',
  nationality: 'nationality',
  currentYearLevel: 'currentYearLevel',
  targetEntryYear: 'targetEntryYear',
};
