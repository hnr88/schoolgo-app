import { describe, expect, it } from 'vitest';
import { getPortalFromRole } from '@/modules/auth/lib/get-portal-from-role';
import { UserRole } from '@/modules/auth/types/auth.types';

describe('getPortalFromRole', () => {
  it('maps AGENT to the agent portal', () => {
    expect(getPortalFromRole(UserRole.AGENT)).toBe('agent');
  });

  it('maps SCHOOL_ADMIN and SUPER_ADMIN to the school portal', () => {
    expect(getPortalFromRole(UserRole.SCHOOL_ADMIN)).toBe('school');
    expect(getPortalFromRole(UserRole.SUPER_ADMIN)).toBe('school');
  });

  it('maps PARENT to the parent portal', () => {
    expect(getPortalFromRole(UserRole.PARENT)).toBe('parent');
  });

  it('falls back to the parent portal for an unknown role', () => {
    expect(getPortalFromRole('something-else' as UserRole)).toBe('parent');
  });
});
