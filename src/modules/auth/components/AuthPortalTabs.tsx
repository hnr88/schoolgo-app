'use client';

import { useLocale, useTranslations } from 'next-intl';
import { portalUrl } from '@/lib/portal-url';
import { cn } from '@/lib/utils';
import { PORTAL_TABS } from '@/modules/auth/constants/portal.constants';
import type { AuthPortalTabsProps } from '@/modules/auth/types/component.types';

export function AuthPortalTabs({ activePortal }: AuthPortalTabsProps) {
  const t = useTranslations('MarketingHeader');
  const locale = useLocale();

  return (
    <nav
      aria-label="Portal"
      className="flex items-center gap-1 rounded-pill bg-muted p-1 shadow-1"
    >
      {PORTAL_TABS.map(({ key, portal }) => {
        const isActive = portal === activePortal;
        return (
          <a
            key={key}
            href={portalUrl(portal, locale)}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'rounded-pill px-4 py-1.5 text-body-sm font-semibold no-underline transition-colors md:px-5 md:py-2',
              isActive
                ? 'bg-card text-ink-900 shadow-2'
                : 'text-foggy hover:text-ink-900',
            )}
          >
            {t(`audiences.${key}`)}
          </a>
        );
      })}
    </nav>
  );
}
