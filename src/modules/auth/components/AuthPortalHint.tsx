'use client';

import { Compass } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { portalUrl } from '@/lib/portal-url';
import { PORTAL_DOT, PORTAL_TABS } from '@/modules/auth/constants/portal.constants';
import type { AuthPortalHintProps } from '@/modules/auth/types/component.types';

export function AuthPortalHint({ activePortal }: AuthPortalHintProps) {
  const t = useTranslations('MarketingHeader');
  const tAuth = useTranslations('Auth');
  const locale = useLocale();

  return (
    <nav aria-label='Portal' className='flex w-full items-center'>
      <span className='flex items-center gap-1 border-r border-divider pr-3 text-caption text-quill'>
        <Compass className='h-2.5 w-2.5' />
        {tAuth('portalSwitch.backTo')}
      </span>
      <div className='flex flex-1 items-center'>
        {PORTAL_TABS.map(({ key, portal }) => {
          const isActive = portal === activePortal;
          return (
            <a
              key={key}
              href={portalUrl(portal, locale)}
              aria-current={isActive ? 'page' : undefined}
              className='flex flex-1 items-center justify-center gap-1 py-1 text-caption font-medium text-ink-900 no-underline opacity-50 transition-opacity hover:opacity-100'
            >
              {isActive && (
                <span className={`h-1 w-1 rounded-full ${PORTAL_DOT[portal]}`} />
              )}
              {t(`audiences.${key}`)}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
