'use client';

import type { MouseEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Check, GitCompare } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { SchoolCard as DsSchoolCard } from '@/modules/design-system';
import { ApplicationStatusBadge } from '@/modules/applications';
import type { Portal } from '@/lib/portal-url';
import { COMPARE_MAX_ADVANCED } from '@/modules/school-search/constants/filter-options.constants';
import { useApplicationStatusBySchool } from '@/modules/school-search/hooks/useApplicationStatusBySchool';
import { useBookmarkToggle } from '@/modules/school-search/hooks/useBookmarkToggle';
import { SavedBadge } from '@/modules/school-search/components/cards/SavedBadge';
import { asApplicationStatus } from '@/modules/school-search/lib/school-hit-guards';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

const formatFee = (amount: number | null) => {
  if (amount == null) return null;
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
    notation: 'compact',
  }).format(amount);
};

export function ParentSearchSchoolCard({
  school,
  activePortal,
}: {
  school: SchoolHit;
  activePortal: Portal;
}) {
  const t = useTranslations('ParentSearch');
  const tcard = useTranslations('SchoolSearch.card');
  const tc = useTranslations('Common');
  const router = useRouter();
  const { isBookmarked, isPending, toggle } = useBookmarkToggle(school);
  const application = useApplicationStatusBySchool(school.documentId);
  const compareList = useSchoolSearchStore((s) => s.compareList);
  const toggleCompare = useSchoolSearchStore((s) => s.toggleCompare);
  const isInCompare = compareList.includes(school.documentId);
  const statusToShow = asApplicationStatus(school.myApplicationStatus) ?? application?.status;
  const showSavedBadge = school.isBookmarked === true;

  const handleCompare = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(school.documentId, COMPARE_MAX_ADVANCED);
  };

  const handlePrimary = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (application) {
      router.push(`/parent/applications/${application.documentId}`);
    } else {
      router.push(`/parent/applications/new?school=${school.documentId}`);
    }
  };

  return (
    <DsSchoolCard
      href={`/${activePortal}/schools/${school.slug}`}
      logoUrl={school.logoUrl ?? undefined}
      name={school.name}
      location={`${school.suburb}, ${school.state}`}
      curriculum={school.curriculumOffered ?? undefined}
      fee={formatFee(school.lowestAnnualTuition) ?? undefined}
      feeSuffix={tcard('currency')}
      topRatedLabel={undefined}
      cricosLabel={tc('cricosVerified')}
      shortlistAddLabel={tc('addToShortlist')}
      shortlistRemoveLabel={tc('removeFromShortlist')}
      shortlisted={isBookmarked}
      onShortlistToggle={toggle}
      shortlistDisabled={isPending}
      statusSlot={
        statusToShow || showSavedBadge ? (
          <div className='flex flex-wrap items-center gap-1.5'>
            {showSavedBadge && <SavedBadge />}
            {statusToShow && <ApplicationStatusBadge status={statusToShow} />}
          </div>
        ) : undefined
      }
      actionSlot={
        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={handleCompare}
            aria-pressed={isInCompare}
            aria-label={t('compareAria', { school: school.name })}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-pill border border-border px-3 py-1.5 text-caption font-semibold transition-colors',
              isInCompare && 'border-primary bg-primary text-primary-foreground',
            )}
          >
            {isInCompare ? (
              <Check className='h-3.5 w-3.5' aria-hidden='true' />
            ) : (
              <GitCompare className='h-3.5 w-3.5' aria-hidden='true' />
            )}
            {t('compareAdd')}
          </button>
          <button
            type='button'
            onClick={handlePrimary}
            aria-label={application ? undefined : t('applyAria', { school: school.name })}
            className='flex-1 rounded-pill bg-primary px-4 py-1.5 text-caption font-semibold text-primary-foreground transition-colors hover:bg-primary/90'
          >
            {application ? t('viewApplication') : t('apply')}
          </button>
        </div>
      }
    />
  );
}
