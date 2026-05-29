import type { SchoolStaffMember } from '@/modules/school-staff/types/school-staff.types';

export interface StaffTableProps {
  members: SchoolStaffMember[];
  currentStaffDocumentId: string | null;
  isAdmin: boolean;
  pendingActionId: string | null;
  onPromote: (documentId: string) => void;
  onDeactivate: (member: SchoolStaffMember) => void;
}
