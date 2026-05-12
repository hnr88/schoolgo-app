'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/modules/auth/stores/use-auth-store';
import { cn } from '@/lib/utils';
import { AcademicFilterGroup } from '@/modules/school-search/components/filters/AcademicFilterGroup';
import { EnglishTestFilterGroup } from '@/modules/school-search/components/filters/EnglishTestFilterGroup';
import { EnrolmentFilterGroup } from '@/modules/school-search/components/filters/EnrolmentFilterGroup';
import { LocationFilterGroup } from '@/modules/school-search/components/filters/LocationFilterGroup';
import { SchoolProfileFilterGroup } from '@/modules/school-search/components/filters/SchoolProfileFilterGroup';

interface SpecFilterSidebarProps {
  className?: string;
}

export function SpecFilterSidebar({ className }: SpecFilterSidebarProps) {
  const t = useTranslations('SchoolSearch.spec');
  const searchParams = useSearchParams();
  const isPreview = searchParams.get('preview') === 'spec';
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const isAdvanced = isHydrated && isAuthenticated;

  if (!isPreview) return null;

  return (
    <aside
      className={cn(
        'hidden shrink-0 lg:sticky lg:top-18 lg:block lg:h-[calc(100vh-4.5rem)] lg:w-[22rem] lg:py-6 lg:pl-3',
        className,
      )}
      data-testid="spec-filter-sidebar"
    >
      <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-primary/40 bg-card shadow-2">
        <div className="shrink-0 border-b border-divider bg-primary/5 px-4 py-2.5">
          <span className="text-caption font-semibold uppercase text-primary">
            {t('previewBadge')} · {isAdvanced ? 'Advanced' : 'Basic'}
          </span>
          <h2 className="text-sm font-semibold text-ink-900">{t('previewTitle')}</h2>
        </div>

        <div className="no-scrollbar min-h-0 flex-1 divide-y divide-divider overflow-y-auto px-4">
          <LocationFilterGroup />
          <SchoolProfileFilterGroup />
          <EnrolmentFilterGroup isAdvanced={isAdvanced} />
          <AcademicFilterGroup isAdvanced={isAdvanced} />
          <EnglishTestFilterGroup isAdvanced={isAdvanced} />
        </div>
      </div>
    </aside>
  );
}
