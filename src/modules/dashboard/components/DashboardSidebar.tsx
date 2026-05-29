'use client';

import { useState } from 'react';
import Image from 'next/image';
import { usePathname } from '@/i18n/navigation';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { cn } from '@/lib/utils';
import { PORTAL_NAV } from '../constants/ui.constants';
import { SidebarNavLinks } from './SidebarNavLinks';

export function DashboardSidebar() {
  const t = useTranslations('Dashboard');
  const pathname = usePathname();
  const userType = useAuthStore((s) => s.userType);

  const portal = userType ?? 'agent';
  const { home } = PORTAL_NAV[portal];

  const isSearchRoute = pathname.includes('/dashboard/search');
  const [manualCollapse, setManualCollapse] = useState<{
    pathname: string;
    value: boolean;
  } | null>(null);
  const manualCollapseValue =
    manualCollapse?.pathname === pathname ? manualCollapse.value : null;
  const isCollapsed = manualCollapseValue ?? isSearchRoute;

  return (
    <aside
      className={cn(
        'hidden h-full flex-col bg-card transition-all duration-300 lg:flex',
        isCollapsed ? 'w-16' : 'w-64',
      )}
    >
      <div className={cn('flex h-16 items-center overflow-hidden', isCollapsed ? 'justify-center px-2' : 'px-5')}>
        <Link href={home} className='flex shrink-0 items-center'>
          <Image
            src='/logos/logo-red.png'
            alt='SchoolGo'
            width={140}
            height={30}
            className='h-10 w-auto'
          />
        </Link>
      </div>

      <SidebarNavLinks isCollapsed={isCollapsed} />

      <div className={cn('py-3', isCollapsed ? 'px-2' : 'px-3')}>
        <button
          type='button'
          aria-label={t(isCollapsed ? 'expandSidebar' : 'collapseSidebar')}
          onClick={() =>
            setManualCollapse({
              pathname,
              value: !(manualCollapseValue ?? isSearchRoute),
            })
          }
          className={cn(
            'flex w-full items-center gap-3 rounded-xl text-sm font-medium text-foggy transition-colors hover:bg-muted hover:text-ink-900',
            isCollapsed ? 'justify-center p-3' : 'px-4 py-3',
          )}
        >
          {isCollapsed ? (
            <PanelLeftOpen className='h-5 w-5 shrink-0' strokeWidth={1.5} />
          ) : (
            <PanelLeftClose className='h-5 w-5 shrink-0' strokeWidth={1.5} />
          )}
        </button>
      </div>
    </aside>
  );
}
