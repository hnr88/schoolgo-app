'use client';

import { useTranslations } from 'next-intl';
import { Lock } from 'lucide-react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import type { Portal } from '@/lib/portal-url';
import { Link } from '@/i18n/navigation';
import { CompareBar } from '@/modules/school-search/components/CompareBar';
import { SpecFilterSidebar } from '@/modules/school-search/components/SpecFilterSidebar';
import { SpecResultsPanel } from '@/modules/school-search/components/SpecResultsPanel';
import { SearchTopBar } from '@/modules/school-search/components/topbar/SearchTopBar';
import { useSearchFiltersStore } from '@/modules/unified-search/stores/use-search-filters-store';
import type { SearchCapability } from '@/modules/unified-search/types/unified-search.types';

// MapView statically imports leaflet-value hooks (useGeocodeSearch/useMapResultFocus),
// so it must NOT be in the SSR bundle (leaflet references `window`). Load it client-only.
const MapView = dynamic(
  () => import('@/modules/school-search/components/MapView').then((m) => m.MapView),
  { ssr: false },
);

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
          'inline-flex items-center rounded-pill bg-primary px-6 py-3 text-body font-semibold text-on-primary',
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
  const filtersOpen = useSearchFiltersStore((s) => s.open);

  return (
    <div className={cn('flex min-h-0 w-full flex-1', className)}>
      <SpecFilterSidebar capability={capability} alwaysOn open={filtersOpen} />

      <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-2 p-2 md:p-3">
        <SearchTopBar />

        <div
          className={cn(
            'flex min-h-0 flex-1 flex-col',
            showMap &&
              'lg:grid lg:grid-rows-1 lg:gap-3 lg:grid-cols-[minmax(0,1fr)_17rem] 3xl:grid-cols-[minmax(0,1fr)_40%]',
          )}
        >
          {showMap && (
            <div className="hidden min-h-0 lg:block lg:h-full">
              <MapView activePortal={activePortal} />
            </div>
          )}

          <SpecResultsPanel
            activePortal={activePortal}
            capability={capability}
            alwaysOn
            teaserSlot={isCapped ? <SchoolsTeaserSlot /> : undefined}
          />
        </div>
      </section>

      <CompareBar isAdvanced={capability.isAdvanced} comparePath={`/${activePortal}/compare`} />
    </div>
  );
}
