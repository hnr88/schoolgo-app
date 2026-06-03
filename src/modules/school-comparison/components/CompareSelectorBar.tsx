'use client';

import { useTranslations } from 'next-intl';
import { Check, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SchoolHit } from '@/modules/school-comparison/types/comparison.types';

interface CompareSelectorBarProps {
  savedSchools: SchoolHit[];
  isSelected: (id: string) => boolean;
  isAtCapacity: boolean;
  onToggle: (id: string) => void;
  schoolKey: (school: SchoolHit) => string;
}

export function CompareSelectorBar({
  savedSchools,
  isSelected,
  isAtCapacity,
  onToggle,
  schoolKey,
}: CompareSelectorBarProps) {
  const t = useTranslations('SchoolComparison');

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-baseline justify-between gap-3'>
        <p className='text-body-sm font-semibold text-ink-900'>{t('selectorTitle')}</p>
        {isAtCapacity ? (
          <p className='text-xs text-foggy'>{t('limitHint')}</p>
        ) : null}
      </div>
      <ul className='flex flex-wrap gap-2'>
        {savedSchools.map((school) => {
          const id = schoolKey(school);
          const selected = isSelected(id);
          const disabled = !selected && isAtCapacity;
          return (
            <li key={id}>
              <button
                type='button'
                onClick={() => onToggle(id)}
                disabled={disabled}
                aria-pressed={selected}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-pill border px-3 py-1.5 text-body-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                  selected
                    ? 'border-primary bg-primary text-on-primary hover:bg-rausch-600'
                    : 'border-border bg-card text-ink-900 hover:border-primary hover:text-primary',
                )}
              >
                {selected ? (
                  <Check className='h-4 w-4' aria-hidden='true' />
                ) : (
                  <Plus className='h-4 w-4' aria-hidden='true' />
                )}
                <span className='max-w-48 truncate'>{school.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
