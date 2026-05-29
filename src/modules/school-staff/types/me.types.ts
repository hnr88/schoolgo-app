import type { SchoolStaffPermissionLevel } from '@/modules/school-staff/types/school-staff.types';

export interface SchoolStaffMe {
  documentId: string;
  permissionLevel: SchoolStaffPermissionLevel;
  school: {
    documentId: string;
    name: string;
  };
}
