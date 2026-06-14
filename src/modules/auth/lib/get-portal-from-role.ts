import { UserRole } from '@/modules/auth/types/auth.types';
import type { Portal } from '@/lib/portal-url';

export function getPortalFromRole(role: UserRole): Portal {
  switch (role) {
    case UserRole.AGENT:
      return 'agent';
    case UserRole.SCHOOL_ADMIN:
    case UserRole.SCHOOL_EMPLOYEE:
    case UserRole.SCHOOL_GOVERNMENT:
    case UserRole.SUPER_ADMIN:
    case UserRole.ADMIN:
      return 'school';
    case UserRole.PARENT:
    case UserRole.STUDENT:
    default:
      return 'parent';
  }
}
