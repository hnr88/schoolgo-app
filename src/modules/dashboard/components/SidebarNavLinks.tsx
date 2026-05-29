'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
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
    <nav className={cn('flex flex-1 flex-col gap-6 overflow-y-auto py-4', isCollapsed ? 'px-2' : 'px-3')}>
      {sections.map((section, sectionIndex) => (
        <div key={section.labelKey || sectionIndex} className='flex flex-col gap-1'>
          {section.labelKey && !isCollapsed && (
            <p className='px-4 pb-1 text-caption font-semibold uppercase tracking-wide text-foggy'>
              {t(`nav.${section.labelKey}`)}
            </p>
          )}
          {section.labelKey && isCollapsed && sectionIndex > 0 && (
            <div className='mx-auto h-px w-6 bg-divider' aria-hidden='true' />
          )}
          {section.items.map(({ href, icon: Icon, labelKey }) => {
            const isActive = pathname === href || (href !== home && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={onNavigate}
                title={isCollapsed ? navLabel(labelKey) : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-xl text-sm font-medium transition-colors',
                  isCollapsed ? 'justify-center p-3' : 'px-4 py-3',
                  isActive
                    ? 'bg-primary text-on-primary shadow-2'
                    : 'text-foggy hover:bg-rausch-50 hover:text-primary-strong',
                )}
              >
                <Icon className='h-5 w-5 shrink-0' strokeWidth={isActive ? 2 : 1.5} />
                {!isCollapsed && navLabel(labelKey)}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
