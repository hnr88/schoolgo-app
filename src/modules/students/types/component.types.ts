import type { Control } from 'react-hook-form';
import type { LucideIcon } from 'lucide-react';
import type { StudentFormValues } from '@/modules/students/schemas/student.schema';
import type { Student } from '@/modules/students/types/student.types';

export interface DocumentUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentDocumentId: string;
}

export interface StudentDocumentsTabProps {
  studentDocumentId: string;
}

export interface StudentFormProps {
  defaultValues?: Partial<StudentFormValues>;
  onSubmit: (values: StudentFormValues) => Promise<void>;
  isLoading: boolean;
  submitLabel: string;
  cancelHref: string;
}

export interface StudentListToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
}

export interface StudentProfileProps {
  documentId: string;
}

export type SortField = 'name' | 'nationality' | 'currentYearLevel' | 'targetEntryYear' | 'status';
export type SortDirection = 'asc' | 'desc';

export interface SortIconProps {
  field: SortField;
  activeField: SortField | null;
  direction: SortDirection;
}

export interface StudentTableProps {
  students: Student[];
  isLoading: boolean;
  sortField: SortField | null;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  pageSize: number;
}

export interface UseStudentFormOptions {
  defaultValues?: Partial<StudentFormValues>;
}

export interface StudentFormPersonalSectionProps {
  control: Control<StudentFormValues>;
}

export interface StudentFormEducationSectionProps {
  control: Control<StudentFormValues>;
}

export interface StudentFormParentSectionProps {
  control: Control<StudentFormValues>;
}

export interface StudentFormNotesFieldProps {
  control: Control<StudentFormValues>;
}

export interface StudentFormSummaryProps {
  control: Control<StudentFormValues>;
}

export interface StudentFormSectionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: React.ReactNode;
}

export interface StudentFormActionBarProps {
  isLoading: boolean;
  submitLabel: string;
  cancelHref: string;
}
