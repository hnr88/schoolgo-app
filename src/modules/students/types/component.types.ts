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

export interface StudentTableProps {
  students: Student[];
  isLoading: boolean;
}
