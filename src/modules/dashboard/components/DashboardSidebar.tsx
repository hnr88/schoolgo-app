'use client';

import Image from 'next/image';
import { usePathname } from '@/i18n/navigation';
import { PanelLeftClose, PanelLeftOpen, Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { useSidebarStore } from '@/modules/dashboard/stores/use-sidebar-store';
import { getUserInitials } from '@/modules/dashboard/lib/get-user-initials';
import { FOCUS_RING } from '@/modules/core';
import { cn } from '@/lib/utils';
import { PORTAL_NAV } from '../constants/ui.constants';
import { SidebarNavLinks } from './SidebarNavLinks';

export function DashboardSidebar() {
  const t = useTranslations('Dashboard');
  const pathname = usePathname();
  const userType = useAuthStore((s) => s.userType);
  const user = useAuthStore((s) => s.user);

  const portal = userType ?? 'agent';
  const { home } = PORTAL_NAV[portal];
  const settingsHref = portal === 'parent' ? '/parent/settings' : '/dashboard/settings';
  const displayName = user?.displayName ?? '';
  const initials = getUserInitials(displayName);

  const isSearchRoute = pathname.includes('/dashboard/search');
  const collapsed = useSidebarStore((s) => s.collapsed);
  const setCollapsed = useSidebarStore((s) => s.setCollapsed);
  // user override persists across nav + reload; otherwise auto-collapse on the search route
  const isCollapsed = collapsed ?? isSearchRoute;

  return (
    <aside
      className={cn(
        'sidebar-shell m-3 hidden flex-col overflow-hidden rounded-3xl shadow-4 transition-all duration-300 ease-out-quart lg:flex',
        isCollapsed ? 'w-16' : 'w-64',
      )}
    >
      <div
        className={cn(
          'flex shrink-0 overflow-hidden',
          isCollapsed
            ? 'flex-col items-center justify-center gap-3 py-4'
            : 'h-16 items-center justify-between px-4',
        )}
      >
        <Link href={home} className='flex shrink-0 items-center gap-2'>
          <Image
            src='/logos/app-icon-512.png'
            alt='SchoolGo'
            width={36}
            height={36}
            className='h-9 w-9 shrink-0'
          />
          {!isCollapsed && (
            <Image
              src='/logos/logo-white-text.png'
              alt=''
              width={608}
              height={130}
              className='h-6 w-auto'
            />
          )}
        </Link>
        <button
          type='button'
          aria-label={t(isCollapsed ? 'expandSidebar' : 'collapseSidebar')}
          onClick={() => setCollapsed(!isCollapsed)}
          className={cn(
            'flex shrink-0 items-center justify-center rounded-md p-2 text-foggy transition-colors hover:bg-card hover:text-ink-900',
            FOCUS_RING,
          )}
        >
          {isCollapsed ? (
            <PanelLeftOpen className='h-5 w-5' strokeWidth={1.75} />
          ) : (
            <PanelLeftClose className='h-5 w-5' strokeWidth={1.75} />
          )}
        </button>
      </div>

      <SidebarNavLinks isCollapsed={isCollapsed} />

      {displayName && (
        <div className={cn('mt-auto p-3', isCollapsed && 'px-2')}>
          <Link
            href={settingsHref}
            title={isCollapsed ? displayName : undefined}
            className={cn(
              'group flex min-h-11 items-center gap-3 rounded-md border border-border bg-card no-underline shadow-2 transition-[box-shadow,background-color] duration-200 ease-out-quart hover:shadow-3',
              FOCUS_RING,
              isCollapsed ? 'justify-center p-2' : 'p-2',
            )}
          >
            <Avatar className='h-9 w-9 shrink-0'>
              <AvatarFallback className='bg-rausch-50 text-xs font-bold text-primary-strong'>
                {initials}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <>
                <span className='min-w-0 flex-1 truncate text-sm font-semibold text-ink-900'>
                  {displayName}
                </span>
                <Settings
                  className='h-4 w-4 shrink-0 text-foggy transition-colors group-hover:text-ink-900'
                  strokeWidth={1.75}
                  aria-hidden='true'
                />
              </>
            )}
          </Link>
        </div>
      )}
    </aside>
  );
}
