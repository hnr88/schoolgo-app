import type { Portal } from '@/lib/portal-url';
import { UserRole } from '@/modules/auth/types/auth.types';

// admin and super-admin are allowed in every portal.
const GLOBAL_ROLES = [UserRole.ADMIN, UserRole.SUPER_ADMIN] as const;

export const PORTAL_ALLOWED_ROLES: Record<Portal, Set<UserRole>> = {
  parent: new Set([UserRole.PARENT, UserRole.STUDENT, ...GLOBAL_ROLES]),
  agent: new Set([UserRole.AGENT, ...GLOBAL_ROLES]),
  school: new Set([
    UserRole.SCHOOL_ADMIN,
    UserRole.SCHOOL_EMPLOYEE,
    UserRole.SCHOOL_GOVERNMENT,
    ...GLOBAL_ROLES,
  ]),
};

export const FORGOT_PASSWORD_RESEND_COOLDOWN_SECONDS = 30;
