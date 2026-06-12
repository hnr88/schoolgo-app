'use client';

import { useTranslations } from 'next-intl';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Portal } from '@/lib/portal-url';
import { Link } from '@/i18n/navigation';
import { CompareBar } from '@/modules/school-search/components/CompareBar';
import { MapView } from '@/modules/school-search/components/MapView';
import { SpecFilterSidebar } from '@/modules/school-search/components/SpecFilterSidebar';
import { SpecResultsPanel } from '@/modules/school-search/components/SpecResultsPanel';
import { SearchTopBar } from '@/modules/school-search/components/topbar/SearchTopBar';
import type { SearchCapability } from '@/modules/unified-search/types/unified-search.types';

interface SchoolsSearchPaneProps {
  activePortal: Portal;
  capability: SearchCapability;
  className?: string;
}

function SchoolsTeaserSlot() {
  const t = useTranslations('UnifiedSearch.teaser');

  return (
    <div className="flex flex-col items-center gap-3 rounded-lg bg-card px-6 py-6 text-center shadow-2">
      <Lock className="size-5 text-primary" aria-hidden="true" />
      <p className="text-body-sm font-semibold text-ink-900">{t('title')}</p>
      <p className="text-body-sm text-foggy">{t('description')}</p>
      <Link
        href="/sign-in"
        className={cn(
          'inline-flex items-center rounded-pill bg-primary px-6 py-2.5 text-body-sm font-medium text-on-primary',
          'transition ease-out-quart hover:bg-primary-strong active:scale-95 motion-reduce:transition-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        )}
      >
        {t('cta')}
      </Link>
    </div>
  );
}

export function SchoolsSearchPane({ activePortal, capability, className }: SchoolsSearchPaneProps) {
  const showMap = capability.canMap;
  const isCapped = capability.resultCap != null;

  return (
    <div className={cn('flex w-full', className)}>
      <SpecFilterSidebar capability={capability} alwaysOn />

      <section className="flex min-w-0 flex-1 flex-col gap-3 p-3 md:p-4">
        <SearchTopBar />

        <div
          className={cn(
            'min-h-0 flex-1',
            showMap && 'lg:grid lg:grid-cols-[1fr_minmax(0,40%)] lg:gap-4',
          )}
        >
          <SpecResultsPanel
            activePortal={activePortal}
            capability={capability}
            alwaysOn
            teaserSlot={isCapped ? <SchoolsTeaserSlot /> : undefined}
          />

          {showMap && (
            <div className="hidden lg:sticky lg:top-[var(--header-height)] lg:block lg:h-content-viewport">
              <MapView activePortal={activePortal} />
            </div>
          )}
        </div>
      </section>

      <CompareBar isAdvanced={capability.isAdvanced} comparePath={`/${activePortal}/compare`} />
    </div>
  );
}
