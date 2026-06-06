'use client';

import { useTranslations } from 'next-intl';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SurfaceCard } from '@/modules/core';
import { BookTestDialog } from '@/modules/test-results/components/BookTestDialog';
import {
  CATALOG_MODE_LABELS,
  CATALOG_SKILL_LABELS,
} from '@/modules/test-results/constants/test-catalog.constants';
import type { TestCatalogCardProps } from '@/modules/test-results/types/component.types';

export function TestCatalogCard({ test }: TestCatalogCardProps) {
  const t = useTranslations('ParentTestCatalog');
  const isPlacement = test.mode === 'placement';

  return (
    <SurfaceCard elevation='interactive' padding='md' className='flex flex-col gap-4'>
      <div className='flex flex-wrap items-start justify-between gap-2'>
        <h2 className='font-display text-lg font-bold text-ink-900'>{test.title}</h2>
        <Badge variant={isPlacement ? 'default' : 'secondary'}>
          {t(CATALOG_MODE_LABELS[test.mode])}
        </Badge>
      </div>

      <div className='flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground'>
        <Badge variant='outline'>{t(CATALOG_SKILL_LABELS[test.skill])}</Badge>
        <span className='inline-flex items-center gap-1.5'>
          <Clock className='h-4 w-4' aria-hidden='true' />
          {t('durationMinutes', { minutes: test.durationMinutes })}
        </span>
      </div>

      {test.description && (
        <p className='text-sm text-muted-foreground'>{test.description}</p>
      )}

      <div className='mt-auto flex justify-end border-t border-border pt-4'>
        <BookTestDialog test={test} />
      </div>
    </SurfaceCard>
  );
}
