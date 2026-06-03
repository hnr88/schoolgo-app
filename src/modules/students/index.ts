export { StudentListPage } from '@/modules/students/components/StudentListPage';
export { StudentProfile } from '@/modules/students/components/StudentProfile';
export { ParentStudentListPage } from '@/modules/students/components/ParentStudentListPage';
export { ParentStudentProfile } from '@/modules/students/components/ParentStudentProfile';
export { ParentStudentAvatar } from '@/modules/students/components/ParentStudentAvatar';
export { CreateStudentPage } from '@/modules/students/components/CreateStudentPage';
export { AgentEditStudentPage } from '@/modules/students/components/AgentEditStudentPage';
export { ParentStudentWizard } from '@/modules/students/components/parent-wizard/ParentStudentWizard';
export { EditStudentPage } from '@/modules/students/components/EditStudentPage';
export { StudentForm } from '@/modules/students/components/StudentForm';
export { StudentDocumentsTab } from '@/modules/students/components/StudentDocumentsTab';
export { DocumentUploadDialog } from '@/modules/students/components/DocumentUploadDialog';
export { useParentStudents } from '@/modules/students/queries/use-parent-students.query';
export { useActiveChildStore } from '@/modules/students/stores/use-active-child-store';
export type { Student } from '@/modules/students/types/student.types';
export type {
  ParentStudent,
  ParentStudentsResponse,
} from '@/modules/students/types/parent-student.types';
export type { StudentDocument, DocumentType, DocumentStatus } from '@/modules/students/types/document.types';
export type { UseStudentFormOptions, StudentFormPersonalSectionProps, StudentFormEducationSectionProps, StudentFormParentSectionProps, StudentFormNotesFieldProps, StudentFormSubmitButtonProps } from '@/modules/students/types/component.types';
