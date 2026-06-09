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
export { AgentRepresentationPanel } from '@/modules/students/components/AgentRepresentationPanel';
export { ShareWithAgentDialog } from '@/modules/students/components/ShareWithAgentDialog';
export { RevokeShareButton } from '@/modules/students/components/RevokeShareButton';
export { DocumentUploadDialog } from '@/modules/students/components/DocumentUploadDialog';
export { useParentStudents } from '@/modules/students/queries/use-parent-students.query';
export { useStudents } from '@/modules/students/queries/use-students.query';
export { useAgentShares } from '@/modules/students/queries/use-agent-shares.query';
export { useShareWithAgent } from '@/modules/students/queries/use-share-with-agent.mutation';
export { useRevokeShare } from '@/modules/students/queries/use-revoke-share.mutation';
export { isAgentShareConflict } from '@/modules/students/lib/agent-share-error';
export { useActiveChildStore } from '@/modules/students/stores/use-active-child-store';
export { PARENT_STUDENTS_MAX_PAGE_SIZE } from '@/modules/students/constants/parent-students.constants';
export type { Student } from '@/modules/students/types/student.types';
export type {
  ParentStudent,
  ParentStudentsResponse,
} from '@/modules/students/types/parent-student.types';
export type { StudentDocument, DocumentType, DocumentStatus } from '@/modules/students/types/document.types';
export type {
  StudentAgentShare,
  StudentAgentSharesResponse,
  StudentAgentShareResponse,
  AgentShareAgent,
  AgentShareStatus,
  AgentQeacValidationStatus,
  ShareWithAgentInput,
} from '@/modules/students/types/agent-share.types';
export type { UseStudentFormOptions, StudentFormPersonalSectionProps, StudentFormEducationSectionProps, StudentFormParentSectionProps, StudentFormNotesFieldProps } from '@/modules/students/types/component.types';
