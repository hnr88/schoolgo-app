export type SchoolStaffPermissionLevel = 'admin' | 'staff';

export type SchoolStaffStatus = 'active' | 'pending_verification' | 'deactivated';

export type SchoolStaffRole = SchoolStaffPermissionLevel;

export interface SchoolStaffMember {
  documentId: string;
  roleTitle: string;
  permissionLevel: SchoolStaffPermissionLevel;
  status: SchoolStaffStatus;
  createdAt: string;
  userDocumentId: string | null;
  fullName: string;
  email: string;
}

export interface SchoolStaffTeamResponse {
  data: SchoolStaffMember[];
  meta: {
    currentStaffDocumentId: string;
  };
}

export interface InviteStaffPayload {
  email: string;
  roleTitle: string;
  permissionLevel: SchoolStaffPermissionLevel;
}
