import type { Portal } from '@/lib/portal-url';
import type { RegisterValues } from '@/modules/auth/schemas/register.schema';

export function getRegisterDefaultValues(portal: Portal): RegisterValues {
  const base = { username: '', email: '', password: '' };

  if (portal === 'agent') {
    return { ...base, agencyName: '', countryOfOperation: '', phone: '' };
  }

  if (portal === 'school') {
    return { ...base, roleTitle: '' };
  }

  return base;
}
