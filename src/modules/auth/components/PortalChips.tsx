'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { Portal } from '@/lib/portal-url';
import { USER_TYPES } from '@/modules/auth/constants/portal.constants';
import type { PortalChipsProps } from '@/modules/auth/types/component.types';

export function PortalChips({ value, onSelect }: PortalChipsProps) {
  const t = useTranslations('Auth');

  return (
    <div className='flex flex-col gap-2'>
      <span className='text-sm font-semibold text-ink-900'>{t('choosePortal')}</span>
      <div className='grid grid-cols-3 gap-2' role='radiogroup' aria-label={t('choosePortal')}>
        {USER_TYPES.map(({ type, icon: Icon }) => {
          const isActive = value === type;
          return (
            <button
              key={type}
              type='button'
              role='radio'
              aria-checked={isActive}
              onClick={() => onSelect(type)}
              className={cn(
                'flex flex-col items-center gap-2 rounded-lg border px-3 py-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
                isActive
                  ? 'border-ring bg-muted/60 text-ink-900'
                  : 'border-input bg-background text-foggy hover:text-ink-900',
              )}
            >
              <Icon className='h-5 w-5' aria-hidden='true' />
              {t(`portalChip.${type}`)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
