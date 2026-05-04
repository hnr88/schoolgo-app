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
