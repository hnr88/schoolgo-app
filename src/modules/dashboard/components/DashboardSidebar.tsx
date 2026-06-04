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
        'hidden h-full flex-col border-r border-divider bg-card transition-all duration-300 lg:flex',
        isCollapsed ? 'w-16' : 'w-64',
      )}
    >
      <div
        className={cn(
          'flex shrink-0 overflow-hidden border-b border-divider',
          isCollapsed
            ? 'flex-col items-center justify-center gap-3 py-4'
            : 'h-16 items-center justify-between px-5',
        )}
      >
        <Link href={home} className='flex shrink-0 items-center'>
          <Image
            src='/logos/logo-red.png'
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
          className='flex shrink-0 items-center justify-center rounded-lg p-2 text-foggy transition-colors hover:bg-muted hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        >
          {isCollapsed ? (
            <PanelLeftOpen className='h-5 w-5' strokeWidth={1.5} />
          ) : (
            <PanelLeftClose className='h-5 w-5' strokeWidth={1.5} />
          )}
        </button>
      </div>

      <SidebarNavLinks isCollapsed={isCollapsed} />

      {displayName && (
        <div className={cn('mt-auto border-t border-divider py-3', isCollapsed ? 'px-2' : 'px-3')}>
          <Link
            href={settingsHref}
            title={isCollapsed ? displayName : undefined}
            className={cn(
              'flex items-center gap-3 rounded-lg no-underline transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              isCollapsed ? 'justify-center p-1.5' : 'px-2 py-2',
            )}
          >
            <Avatar className='h-8 w-8 shrink-0'>
              <AvatarFallback className='bg-primary/10 text-xs font-bold text-primary-strong'>
                {initials}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <>
                <span className='min-w-0 flex-1 truncate text-sm font-semibold text-ink-900'>
                  {displayName}
                </span>
                <Settings
                  className='h-4 w-4 shrink-0 text-foggy'
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
