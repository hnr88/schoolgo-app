'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Search,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, labelKey: 'dashboard', agentOnly: false },
  { href: '/dashboard/students', icon: Users, labelKey: 'students', agentOnly: true },
  { href: '/dashboard/applications', icon: FileText, labelKey: 'applications', agentOnly: true },
  { href: '/dashboard/pipeline', icon: BarChart3, labelKey: 'pipeline', agentOnly: true },
  { href: '/dashboard/search', icon: Search, labelKey: 'searchSchools', agentOnly: true },
  { href: '/dashboard/messages', icon: MessageSquare, labelKey: 'messages', agentOnly: true },
] as const;

export function DashboardSidebar() {
  const t = useTranslations('Dashboard');
  const pathname = usePathname();
  const userType = useAuthStore((s) => s.userType);

  const isSearchRoute = pathname.includes('/dashboard/search');
  const [manualCollapse, setManualCollapse] = useState<boolean | null>(null);
  const isCollapsed = manualCollapse ?? isSearchRoute;

  useEffect(() => {
    setManualCollapse(null);
  }, [pathname]);

  return (
    <aside
      className={cn(
        'flex h-full flex-col bg-card transition-[width] duration-200',
        isCollapsed ? 'w-16' : 'w-64',
      )}
    >
      <div className={cn('flex h-16 items-center overflow-hidden', isCollapsed ? 'justify-center px-2' : 'px-5')}>
        <Link href='/dashboard' className='flex shrink-0 items-center'>
          <Image
            src='/logos/logo-red.png'
            alt='SchoolGo'
            width={140}
            height={30}
            className='h-10 w-auto'
          />
        </Link>
      </div>

      <nav className={cn('flex flex-1 flex-col gap-1.5 py-4', isCollapsed ? 'px-2' : 'px-3')}>
        {NAV_ITEMS.filter((item) => !item.agentOnly || userType === 'agent').map(({ href, icon: Icon, labelKey }) => {
          const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              title={isCollapsed ? t(`nav.${labelKey}`) : undefined}
              className={cn(
                'flex items-center gap-3 rounded-xl text-sm font-medium transition-colors',
                isCollapsed ? 'justify-center p-3' : 'px-4 py-3',
                isActive
                  ? 'bg-primary text-on-primary shadow-brand'
                  : 'text-foggy hover:bg-rausch-50 hover:text-primary',
              )}
            >
              <Icon className='h-5 w-5 shrink-0' strokeWidth={isActive ? 2 : 1.5} />
              {!isCollapsed && t(`nav.${labelKey}`)}
            </Link>
          );
        })}
      </nav>

      <div className={cn('py-3', isCollapsed ? 'px-2' : 'px-3')}>
        <button
          type='button'
          onClick={() => setManualCollapse((prev) => !(prev ?? isSearchRoute))}
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
