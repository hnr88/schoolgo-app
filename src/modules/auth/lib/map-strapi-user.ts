import { UserRole } from '@/modules/auth/types/auth.types';
import type { User } from '@/modules/auth/types/auth.types';

// users-permissions /users/me does not populate `role` by default, but the user
// record carries a `userType` field (agent | parent | school). Map it to the
// app's UserRole so portal resolution works without a populated role relation.
const USER_TYPE_TO_ROLE: Record<string, UserRole> = {
  agent: UserRole.AGENT,
  parent: UserRole.PARENT,
  school: UserRole.SCHOOL_ADMIN,
};

const KNOWN_PORTAL_ROLES = new Set<string>(Object.values(UserRole));

// Normalise a candidate role string to the app's UserRole convention
// (hyphenated lowercase, e.g. "school_government" | "School Government" ->
// "school-government") and return it only when it is a real portal role.
function normaliseRole(value: string): UserRole | null {
  const normalised = value.trim().toLowerCase().replace(/_/g, '-');
  return KNOWN_PORTAL_ROLES.has(normalised) ? (normalised as UserRole) : null;
}

export function mapStrapiUser(raw: Record<string, unknown>): User {
  const role = raw.role;
  const userType = raw.userType;
  let resolvedRole: UserRole | null = null;

  // Prefer a real users-permissions role.type when it is an actual PORTAL role
  // (e.g. school-government, school-employee, student). The generic
  // users-permissions roles ("authenticated"/"public") are NOT portal roles and
  // must NOT win over userType — doing so makes portal access checks fail and
  // bounce the user in a redirect loop, so they fall through to the userType map.
  if (typeof role === 'object' && role !== null && 'type' in role) {
    const candidate = (role as { type: unknown }).type;
    if (typeof candidate === 'string') {
      resolvedRole = normaliseRole(candidate);
    }
  } else if (typeof role === 'string') {
    resolvedRole = normaliseRole(role);
  }

  // userType (agent|parent|school) is the authoritative PORTAL fallback signal.
  if (resolvedRole === null) {
    if (typeof userType === 'string') {
      const normalisedType = userType.trim().toLowerCase().replace(/_/g, '-');
      resolvedRole =
        USER_TYPE_TO_ROLE[normalisedType] ??
        normaliseRole(normalisedType) ??
        UserRole.PARENT;
    } else {
      resolvedRole = UserRole.PARENT;
    }
  }

  const school = raw.school as
    | { id: string | number; name: string }
    | undefined;

  return {
    id: raw.id as string | number,
    documentId: (raw.documentId as string) || '',
    username: (raw.username as string) || '',
    email: (raw.email as string) || '',
    displayName:
      (raw.displayName as string) ||
      (raw.display_name as string) ||
      (raw.username as string) ||
      '',
    role: resolvedRole,
    school: school ? { id: school.id, name: school.name } : undefined,
    locale: raw.locale as string | undefined,
  };
}
