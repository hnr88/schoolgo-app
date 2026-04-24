import type { User, UserRole } from '@/modules/auth/types/auth.types';

export function mapStrapiUser(raw: Record<string, unknown>): User {
  const role = raw.role;
  let resolvedRole: UserRole;

  if (typeof role === 'object' && role !== null && 'type' in role) {
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
