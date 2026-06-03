import type { User, UserRole } from '@/modules/auth/types/auth.types';

// users-permissions /users/me does not populate `role` by default, but the user
// record carries a `userType` field (agent | parent | school). Map it to the
// app's UserRole so portal resolution works without a populated role relation.
const USER_TYPE_TO_ROLE: Record<string, UserRole> = {
  agent: 'agent' as UserRole,
  parent: 'parent' as UserRole,
  school: 'school-admin' as UserRole,
};

export function mapStrapiUser(raw: Record<string, unknown>): User {
  const role = raw.role;
  const userType = raw.userType;
  let resolvedRole: UserRole;

  // userType (agent|parent|school) is the authoritative PORTAL signal. The Strapi
  // `role` relation is the users-permissions role (e.g. "authenticated") and is NOT
  // the portal role, so it must NOT win over userType — doing so makes portal access
  // checks fail and bounce the user in a redirect loop.
  if (typeof userType === 'string' && userType in USER_TYPE_TO_ROLE) {
    resolvedRole = USER_TYPE_TO_ROLE[userType];
  } else if (typeof role === 'object' && role !== null && 'type' in role) {
    resolvedRole = (role as { type: string }).type as UserRole;
  } else if (typeof role === 'string') {
    resolvedRole = role as UserRole;
  } else {
    resolvedRole = 'parent' as UserRole;
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
