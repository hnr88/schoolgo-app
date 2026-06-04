'use client';

import { ChevronDown } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { portalUrl, type Portal } from '@/lib/portal-url';
import { getPortalDashboardPath } from '@/modules/auth/lib/get-portal-dashboard-path';
import { PORTAL_DOT, PORTAL_TABS } from '@/modules/auth/constants/portal.constants';
import { cn } from '@/lib/utils';
import type { PortalSwitcherProps } from '@/modules/dashboard/types/dashboard.types';

export function PortalSwitcher({ activePortal }: PortalSwitcherProps) {
  const t = useTranslations('MarketingHeader');
  const locale = useLocale();

  function getPortalHref(portal: Portal) {
    const base = portalUrl(portal, locale);
    const dashboardPath = getPortalDashboardPath(portal);
    return dashboardPath ? `${base}${dashboardPath}` : base;
  }

  const activeTab = PORTAL_TABS.find((tab) => tab.portal === activePortal);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className='flex items-center gap-1.5 rounded-pill border border-border bg-card px-2.5 py-1 text-xs font-semibold text-ink-900 shadow-1 transition-colors hover:border-divider hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
      >
        <span className={cn('h-1.5 w-1.5 rounded-full', PORTAL_DOT[activePortal])} />
        {activeTab ? t(`audiences.${activeTab.key}`) : activePortal}
        <ChevronDown className='h-3 w-3 text-foggy' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='min-w-36'>
        {PORTAL_TABS.map((tab) => (
          <DropdownMenuItem
            key={tab.portal}
            className='cursor-pointer'
            render={<a href={getPortalHref(tab.portal)} />}
          >
            <span className={cn('h-1.5 w-1.5 rounded-full', PORTAL_DOT[tab.portal])} />
            {t(`audiences.${tab.key}`)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
