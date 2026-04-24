import type { Portal } from '@/lib/portal-url';
import { UserRole } from '@/modules/auth/types/auth.types';

export const PORTAL_ALLOWED_ROLES: Record<Portal, Set<UserRole>> = {
  parent: new Set([UserRole.PARENT]),
  agent: new Set([UserRole.AGENT]),
  school: new Set([UserRole.SCHOOL_ADMIN, UserRole.SUPER_ADMIN]),
};
