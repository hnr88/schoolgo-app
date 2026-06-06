import type { Control } from 'react-hook-form';
import type {
  BulkCreateApplicationFormValues,
  CreateApplicationFormValues,
} from '@/modules/applications/schemas/create-application.schema';

export type { BulkCreateApplicationFormValues } from '@/modules/applications/schemas/create-application.schema';

export interface CreatedApplication {
  id: number;
  documentId: string;
  status: string;
}

export interface BulkCreatedApplication {
  school: string;
  documentId: string;
  status: 'draft';
}

export interface BulkCreateApplicationError {
  school: string;
  reason: string;
}

export interface BulkCreateResult {
  created: BulkCreatedApplication[];
  errors: BulkCreateApplicationError[];
}

export interface SchoolOption {
  documentId: string;
  name: string;
  suburb: string | null;
  state: string | null;
}

export interface StudentOption {
  documentId: string;
  firstName: string;
  lastName: string;
}

export interface SelectedSchool {
  documentId: string;
  label: string;
}

export interface CreateApplicationFormProps {
  students: StudentOption[];
  isLoadingStudents: boolean;
  presetSchool: SchoolOption | null;
  isSubmitting: boolean;
  onSubmit: (values: BulkCreateApplicationFormValues, schoolLabels: Record<string, string>) => void;
}

export interface StudentPickerFieldProps {
  control: Control<BulkCreateApplicationFormValues>;
  students: StudentOption[];
  isLoading: boolean;
}

export interface SchoolPickerFieldProps {
  control: Control<CreateApplicationFormValues>;
  presetSchool: SchoolOption | null;
}

export interface MultiSchoolPickerFieldProps {
  control: Control<BulkCreateApplicationFormValues>;
  selected: (ids: string[]) => SelectedSchool[];
  onToggle: (
    current: string[],
    school: { id: string; name: string; suburb?: string | null; state?: string | null },
  ) => string[];
  onRemove: (current: string[], documentId: string) => string[];
}

export interface SchoolSearchOption {
  id: string;
  name: string;
  suburb?: string | null;
  state?: string | null;
}

export interface SchoolSearchCommandProps {
  query: string;
  onQueryChange: (value: string) => void;
  results: SchoolSearchOption[];
  isFetching: boolean;
  selectedIds: string[];
  isFull: boolean;
  onSelect: (school: SchoolSearchOption) => void;
}

export interface SelectedSchoolBadgesProps {
  schools: SelectedSchool[];
  onRemove: (documentId: string) => void;
}

export interface BulkCreateResultSummaryProps {
  result: BulkCreateResult;
  schoolLabels: Record<string, string>;
}

export interface ApplicationTargetFieldsProps {
  control: Control<BulkCreateApplicationFormValues>;
}
