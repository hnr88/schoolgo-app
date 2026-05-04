'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { UserTypeSelectorProps } from '@/modules/auth/types/component.types';
import { USER_TYPES } from '../constants/portal.constants';

export function UserTypeSelector({ value, onChange }: UserTypeSelectorProps) {
  const t = useTranslations('Auth');

  return (
    <div className='grid grid-cols-3 gap-3'>
      {USER_TYPES.map(({ type, icon: Icon }) => (
        <button
          key={type}
          type='button'
          onClick={() => onChange(type)}
          className={cn(
            'flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-4 text-sm font-medium transition-all',
            value === type
              ? 'border-primary bg-primary/5 text-primary'
              : 'border-border bg-card text-foggy hover:border-primary/40 hover:text-ink-900',
          )}
        >
          <Icon className='h-6 w-6' strokeWidth={1.5} />
          <span>{t(`userTypes.${type}`)}</span>
        </button>
      ))}
    </div>
  );
}
