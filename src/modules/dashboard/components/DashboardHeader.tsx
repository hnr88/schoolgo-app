'use client';

import { usePathname } from '@/i18n/navigation';
import { Settings, User, LogOut, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { useLogoutRedirect } from '@/modules/auth';
import { NotificationBell } from '@/modules/notifications';
import {
  CommandPalette,
  CommandPaletteTrigger,
  useCommandPaletteHotkey,
} from '@/modules/command-palette';
import { SearchBar } from '@/modules/school-search/components/SearchBar';
import { ParentChildSwitcher } from '@/modules/dashboard/parent/components/ParentChildSwitcher';
import { DashboardMobileNav } from './DashboardMobileNav';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FOCUS_RING } from '@/modules/core';
import { resolvePageTitleEntry } from '../lib/resolve-page-title';

export function DashboardHeader() {
  const t = useTranslations('Dashboard');
  const tParentNav = useTranslations('ParentNav');
  const pathname = usePathname();
  const router = useRouter();
  const { user, userType } = useAuthStore();
  const { handleLogout } = useLogoutRedirect();

  useCommandPaletteHotkey();

  const isParent = userType === 'parent';
  const titleEntry = resolvePageTitleEntry(pathname);
  const pageTitle =
    titleEntry.namespace === 'ParentNav'
      ? tParentNav(titleEntry.key)
      : t(`nav.${titleEntry.key}`);
  const settingsHref = isParent ? '/parent/settings' : '/dashboard/settings';
  const isSearchPage = pathname.includes('/dashboard/search') || pathname.includes('/parent/search');
  const firstName = user?.displayName?.split(' ')[0] || t('greeting.fallbackName');

  const initials = user?.displayName
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() ?? '';

  return (
    <header className='relative z-10 shrink-0 bg-card shadow-1'>
      <CommandPalette />
      <div className={cn('flex min-h-18 items-center gap-4', isSearchPage ? 'px-4' : 'px-6')}>
        <DashboardMobileNav />
        <h1
          className={cn(
            'shrink-0 truncate font-display text-section-h2 font-semibold tracking-tight text-ink-900',
            isSearchPage && 'w-80',
          )}
        >
          {pageTitle}
        </h1>

        {isSearchPage && (
          <div className='flex-1'>
            <SearchBar className='px-4 py-1.5 shadow-none' />
          </div>
        )}

        <div className={cn('flex items-center gap-2', isSearchPage ? 'shrink-0' : 'ml-auto')}>
          {userType === 'parent' && <ParentChildSwitcher />}
          <CommandPaletteTrigger />
          {(userType === 'parent' || userType === 'agent') && <NotificationBell />}
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                'group flex h-11 items-center gap-2 rounded-pill bg-muted py-1 pl-1 pr-3 text-sm font-medium text-ink-900 outline-none transition-[color,box-shadow,background-color] duration-200 ease-out-quart hover:bg-rausch-50 hover:shadow-1',
                FOCUS_RING,
              )}
            >
              <Avatar className='size-8'>
                <AvatarFallback className='bg-primary/10 text-xs font-bold text-primary-strong'>
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className='hidden text-sm font-semibold text-ink-900 sm:block'>
                {firstName}
              </span>
              <ChevronDown
                className='h-4 w-4 text-foggy transition-transform duration-200 ease-out-quart group-data-popup-open:rotate-180'
                strokeWidth={1.75}
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end' sideOffset={10} className='w-60 bg-card shadow-3'>
              {user?.displayName && (
                <div className='flex items-center gap-3 px-2 py-3'>
                  <Avatar className='size-9'>
                    <AvatarFallback className='bg-primary/10 text-xs font-bold text-primary-strong'>
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className='min-w-0'>
                    <p className='truncate text-sm font-semibold text-ink-900'>
                      {user.displayName}
                    </p>
                    {user.email && (
                      <p className='truncate text-caption text-foggy'>{user.email}</p>
                    )}
                  </div>
                </div>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push(settingsHref)}>
                <Settings className='h-4 w-4' strokeWidth={1.75} />
                {t('nav.settings')}
              </DropdownMenuItem>
              {!isParent && (
                <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
                  <User className='h-4 w-4' strokeWidth={1.75} />
                  {t('nav.profile')}
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className='h-4 w-4' strokeWidth={1.75} />
                {t('nav.logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
