'use client';

import { useTranslations } from 'next-intl';
import type { Portal } from '@/lib/portal-url';
import { cn } from '@/lib/utils';
import { SpecSchoolCard } from '@/modules/school-search/components/cards/SpecSchoolCard';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

interface SpecResultsListProps {
  hits: readonly SchoolHit[];
  isAdvanced: boolean;
  activePortal: Portal;
  className?: string;
  emptyClassName?: string;
}

export function SpecResultsList({
  hits,
  isAdvanced,
  activePortal,
  className,
  emptyClassName,
}: SpecResultsListProps) {
  const t = useTranslations('SchoolSearch');

  if (hits.length === 0) {
    return (
      <p className={cn('py-12 text-center text-sm text-muted-foreground', emptyClassName)}>
        {t('results.empty')}
      </p>
    );
  }

  return (
    <div className={className}>
      {hits.map((hit, index) => (
        <SpecSchoolCard
          key={hit.documentId}
          hit={hit}
          isAdvanced={isAdvanced}
          activePortal={activePortal}
          priority={index < 3}
        />
      ))}
    </div>
  );
}
