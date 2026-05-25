import { UserRole } from '@/modules/auth/types/auth.types';
import type { Portal } from '@/lib/portal-url';

export function getPortalFromRole(role: UserRole): Portal {
  switch (role) {
    case UserRole.AGENT:
      return 'agent';
    case UserRole.SCHOOL_ADMIN:
    case UserRole.SUPER_ADMIN:
      return 'school';
    case UserRole.PARENT:
    default:
      return 'parent';
  }
}
