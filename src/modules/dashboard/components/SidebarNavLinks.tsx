'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { FOCUS_RING } from '@/modules/core';
import { cn } from '@/lib/utils';
import type { NavGroup } from '@/modules/dashboard/types/dashboard.types';
import { PORTAL_NAV } from '../constants/ui.constants';

interface SidebarNavLinksProps {
  isCollapsed?: boolean;
  onNavigate?: () => void;
}

export function SidebarNavLinks({ isCollapsed = false, onNavigate }: SidebarNavLinksProps) {
  const t = useTranslations('Dashboard');
  const tParent = useTranslations('ParentNav');
  const pathname = usePathname();
  const userType = useAuthStore((s) => s.userType);

  const portal = userType ?? 'agent';
  const { home, items, groups } = PORTAL_NAV[portal];
  const navLabel =
    portal === 'parent'
      ? (key: string) => tParent(key)
      : (key: string) => t(`nav.${key}`);

  const sections: NavGroup[] = groups ?? [{ labelKey: '', items: items ?? [] }];

  return (
    <nav className={cn('sidebar-scroll flex flex-1 flex-col gap-6 overflow-y-auto py-4', isCollapsed ? 'px-2' : 'px-3')}>
      {sections.map((section, sectionIndex) => (
        <div key={section.labelKey || sectionIndex} className='flex flex-col gap-1'>
          {section.labelKey && !isCollapsed && (
            <p className='px-3 pb-1 text-caption font-semibold uppercase tracking-wider text-foggy'>
              {t(`nav.${section.labelKey}`)}
            </p>
          )}
          {section.labelKey && isCollapsed && sectionIndex > 0 && (
            <div className='mx-auto h-px w-6 bg-divider' aria-hidden='true' />
          )}
          {section.items.map(({ href, icon: Icon, labelKey }) => {
            const isActive =
              href === home
                ? pathname === href || pathname === '/dashboard'
                : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                onClick={onNavigate}
                title={isCollapsed ? navLabel(labelKey) : undefined}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'group relative flex min-h-11 items-center gap-3 rounded-md text-sm transition-[transform,background-color,box-shadow,color] duration-200 ease-out-quart',
                  FOCUS_RING,
                  isCollapsed ? 'justify-center p-2' : 'px-3 py-2',
                  isActive
                    ? 'bg-card font-semibold text-ink-900 shadow-2'
                    : 'font-medium text-hof hover:bg-card hover:text-ink-900',
                )}
              >
                <Icon
                  className={cn(
                    'h-5 w-5 shrink-0 transition-colors',
                    isActive ? 'text-primary' : 'text-foggy group-hover:text-ink-900',
                  )}
                  strokeWidth={1.75}
                />
                {!isCollapsed && navLabel(labelKey)}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
