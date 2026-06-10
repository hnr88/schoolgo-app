import { ONBOARDING_ROLE_TITLE_STORAGE_KEY } from '@/modules/school-onboarding/constants/school-onboarding.constants';

export function readStoredRoleTitle(): string {
  if (typeof window === 'undefined') return '';
  return window.sessionStorage.getItem(ONBOARDING_ROLE_TITLE_STORAGE_KEY) ?? '';
}
