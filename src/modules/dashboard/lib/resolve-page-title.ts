import { ROUTE_TITLE_MAP, PORTAL_NAV } from '../constants/ui.constants';

// Parent portal uses /parent/* routes whose labels live in the ParentNav namespace.
// Match the longest href prefix first so /parent/saved-schools wins over shorter ones
// and /parent/applications/{id} resolves to "applications".
const PARENT_TITLE_ENTRIES = (PORTAL_NAV.parent.items ?? [])
  .map((item) => [item.href as string, item.labelKey] as const)
  .sort((a, b) => b[0].length - a[0].length);

export interface ResolvedPageTitle {
  /** translation key */
  key: string;
  /** namespace the key lives in */
  namespace: 'Dashboard.nav' | 'ParentNav';
}

export function resolvePageTitleEntry(pathname: string): ResolvedPageTitle {
  if (pathname.includes('/parent/')) {
    for (const [href, key] of PARENT_TITLE_ENTRIES) {
      if (pathname.includes(href)) return { key, namespace: 'ParentNav' };
    }
    return { key: 'dashboard', namespace: 'ParentNav' };
  }

  for (const [route, key] of Object.entries(ROUTE_TITLE_MAP)) {
    if (pathname.includes(route) && route !== '/dashboard') {
      return { key, namespace: 'Dashboard.nav' };
    }
  }
  return { key: 'dashboard', namespace: 'Dashboard.nav' };
}

/** Back-compat: returns just the title key (Dashboard.nav for non-parent). */
export function resolvePageTitle(pathname: string): string {
  return resolvePageTitleEntry(pathname).key;
}
