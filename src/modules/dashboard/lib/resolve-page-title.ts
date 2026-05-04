import { ROUTE_TITLE_MAP } from '../constants/ui.constants';

export function resolvePageTitle(pathname: string): string {
  for (const [route, key] of Object.entries(ROUTE_TITLE_MAP)) {
    if (pathname.includes(route) && route !== '/dashboard') return key;
  }
  if (pathname.endsWith('/dashboard')) return 'dashboard';
  return 'dashboard';
}
