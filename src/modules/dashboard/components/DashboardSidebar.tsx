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
        'hidden h-full flex-col border-r border-background/10 bg-babu-700 transition-all duration-300 ease-out-quart lg:flex',
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
        <Link href={home} className='flex shrink-0 items-center'>
          <Image
            src='/logos/logo-white.png'
            alt='SchoolGo'
            width={140}
            height={30}
            className='h-10 w-auto'
          />
        </Link>
        <button
          type='button'
          aria-label={t(isCollapsed ? 'expandSidebar' : 'collapseSidebar')}
          onClick={() => setCollapsed(!isCollapsed)}
          className='flex shrink-0 items-center justify-center rounded-lg p-2 text-background/70 transition-colors hover:bg-background/10 hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/50'
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
              'group flex items-center gap-3 rounded-xl border border-background/15 bg-background/10 no-underline transition-[background-color] duration-200 ease-out-quart hover:bg-background/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/50',
              isCollapsed ? 'justify-center p-1.5' : 'p-2',
            )}
          >
            <Avatar className='h-9 w-9 shrink-0'>
              <AvatarFallback className='bg-background/20 text-xs font-bold text-background'>
                {initials}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <>
                <span className='min-w-0 flex-1 truncate text-sm font-semibold text-background'>
                  {displayName}
                </span>
                <Settings
                  className='h-4 w-4 shrink-0 text-background/70 transition-colors group-hover:text-background'
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
