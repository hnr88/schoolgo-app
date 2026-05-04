'use client';

import { usePathname } from 'next/navigation';
import { Settings, User, LogOut, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { SearchBar } from '@/modules/school-search/components/SearchBar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ROUTE_TITLE_MAP: Record<string, string> = {
  '/dashboard': 'dashboard',
  '/dashboard/students': 'students',
  '/dashboard/applications': 'applications',
  '/dashboard/pipeline': 'pipeline',
  '/dashboard/search': 'searchSchools',
  '/dashboard/messages': 'messages',
  '/dashboard/settings': 'settings',
  '/dashboard/profile': 'profile',
};

function resolvePageTitle(pathname: string): string {
  for (const [route, key] of Object.entries(ROUTE_TITLE_MAP)) {
    if (pathname.includes(route) && route !== '/dashboard') return key;
  }
  if (pathname.endsWith('/dashboard')) return 'dashboard';
  return 'dashboard';
}

function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  return 'evening';
}

export function DashboardHeader() {
  const t = useTranslations('Dashboard');
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const titleKey = resolvePageTitle(pathname);
  const isSearchPage = pathname.includes('/dashboard/search');
  const firstName = user?.displayName?.split(' ')[0] || t('greeting.fallbackName');
  const greeting = t(`greeting.${getTimeOfDay()}`);

  function handleLogout() {
    logout();
    router.push('/sign-in');
  }

  const initials = user?.displayName
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() ?? '';

  return (
    <header className='shrink-0 bg-card'>
      <div className={`flex h-14 items-center gap-4 ${isSearchPage ? 'px-4' : 'px-6'}`}>
        <h1 className={`shrink-0 text-lg font-bold text-ink-900 ${isSearchPage ? 'w-80' : ''}`}>
          {t(`nav.${titleKey}`)}
        </h1>

        {isSearchPage && (
          <div className='flex-1'>
            <SearchBar className='border-border px-4 py-1.5 shadow-none' />
          </div>
        )}

        <div className={isSearchPage ? 'shrink-0' : 'ml-auto'}>
          <DropdownMenu>
            <DropdownMenuTrigger className='flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-sm font-medium text-ink-900 outline-none transition-colors hover:bg-muted'>
              <span className='flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary'>
                {initials}
              </span>
              <span className='hidden text-sm text-ink-900 sm:block'>
                {greeting} <span className='font-bold'>{firstName}</span>
              </span>
              <ChevronDown className='h-4 w-4 text-foggy' strokeWidth={1.5} />
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end' sideOffset={8} className='w-56 bg-card shadow-3'>
              {user?.displayName && (
                <div className='px-2 py-2'>
                  <p className='text-sm font-semibold text-ink-900'>{user.displayName}</p>
                  {user.email && (
                    <p className='text-caption text-foggy'>{user.email}</p>
                  )}
                </div>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
                <Settings className='h-4 w-4' strokeWidth={1.5} />
                {t('nav.settings')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
                <User className='h-4 w-4' strokeWidth={1.5} />
                {t('nav.profile')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className='h-4 w-4' strokeWidth={1.5} />
                {t('nav.logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
