'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Search,
  MessageSquare,
  Settings,
  User,
  LogOut,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { PortalSwitcher } from '@/modules/dashboard/components/PortalSwitcher';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, labelKey: 'dashboard' },
  { href: '/dashboard/students', icon: Users, labelKey: 'students' },
  { href: '/dashboard/applications', icon: FileText, labelKey: 'applications' },
  { href: '/dashboard/pipeline', icon: BarChart3, labelKey: 'pipeline' },
  { href: '/search', icon: Search, labelKey: 'searchSchools' },
  { href: '/dashboard/messages', icon: MessageSquare, labelKey: 'messages' },
] as const;

const BOTTOM_ITEMS = [
  { href: '/dashboard/settings', icon: Settings, labelKey: 'settings' },
  { href: '/dashboard/profile', icon: User, labelKey: 'profile' },
] as const;

export function DashboardSidebar() {
  const t = useTranslations('Dashboard');
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  function handleLogout() {
    logout();
    router.push('/sign-in');
  }

  return (
    <aside className='flex h-full w-64 flex-col border-r border-border bg-card'>
      <div className='flex h-16 items-center gap-3 border-b border-border px-6'>
        <Link href='/dashboard' className='flex items-center gap-2'>
          <Image
            src='/logos/logo-red.png'
            alt='SchoolGo'
            width={140}
            height={30}
            className='h-8 w-auto'
          />
        </Link>
        <PortalSwitcher activePortal='agent' />
      </div>

      <nav className='flex flex-1 flex-col gap-1 px-3 py-4'>
        {NAV_ITEMS.map(({ href, icon: Icon, labelKey }) => {
          const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-foggy hover:bg-muted hover:text-ink-900',
              )}
            >
              <Icon className='h-5 w-5' strokeWidth={1.5} />
              {t(`nav.${labelKey}`)}
            </Link>
          );
        })}
      </nav>

      <div className='border-t border-border px-3 py-4'>
        {BOTTOM_ITEMS.map(({ href, icon: Icon, labelKey }) => (
          <Link
            key={href}
            href={href}
            className='flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foggy transition-colors hover:bg-muted hover:text-ink-900'
          >
            <Icon className='h-5 w-5' strokeWidth={1.5} />
            {t(`nav.${labelKey}`)}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className='flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foggy transition-colors hover:bg-muted hover:text-ink-900'
        >
          <LogOut className='h-5 w-5' strokeWidth={1.5} />
          {t('nav.logout')}
        </button>

        {user && (
          <div className='mt-4 rounded-lg bg-muted px-3 py-3'>
            <p className='text-sm font-medium text-ink-900'>{user.displayName}</p>
            <p className='text-xs text-foggy'>{user.email}</p>
          </div>
        )}
      </div>
    </aside>
  );
}
