import type { Control } from 'react-hook-form';
import type { CreateApplicationFormValues } from '@/modules/applications/schemas/create-application.schema';

export interface CreatedApplication {
  id: number;
  documentId: string;
  status: string;
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

export interface CreateApplicationFormProps {
  students: StudentOption[];
  isLoadingStudents: boolean;
  presetSchool: SchoolOption | null;
  isSubmitting: boolean;
  onSubmit: (values: CreateApplicationFormValues) => void;
}

export interface StudentPickerFieldProps {
  control: Control<CreateApplicationFormValues>;
  students: StudentOption[];
  isLoading: boolean;
}

export interface SchoolPickerFieldProps {
  control: Control<CreateApplicationFormValues>;
  presetSchool: SchoolOption | null;
}

export interface ApplicationTargetFieldsProps {
  control: Control<CreateApplicationFormValues>;
}
