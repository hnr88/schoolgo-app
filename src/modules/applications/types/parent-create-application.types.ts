import type { Control } from 'react-hook-form';
import type { ParentCreateApplicationFormValues } from '@/modules/applications/schemas/parent-create-application.schema';
import type {
  SchoolOption,
  StudentOption,
} from '@/modules/applications/types/create-application.types';

export interface ParentCreateApplicationInput {
  student: string;
  school: string;
}

export interface ParentCreateApplicationFormProps {
  students: StudentOption[];
  isLoadingStudents: boolean;
  presetSchool: SchoolOption | null;
  isSubmitting: boolean;
  onSubmit: (values: ParentCreateApplicationFormValues) => void;
}

export interface ParentStudentPickerFieldProps {
  control: Control<ParentCreateApplicationFormValues>;
  students: StudentOption[];
  isLoading: boolean;
}

export interface ParentSchoolPickerFieldProps {
  control: Control<ParentCreateApplicationFormValues>;
  presetSchool: SchoolOption | null;
}
