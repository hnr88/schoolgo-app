export type SchoolStaffRole = 'admin' | 'staff';

export type SchoolStaffStatus = 'active' | 'invited' | 'inactive';

export interface SchoolStaffMember {
  documentId: string;
  fullName: string;
  email: string;
  role: SchoolStaffRole;
  status: SchoolStaffStatus;
}

export interface InviteStaffPayload {
  email: string;
  role: SchoolStaffRole;
}
