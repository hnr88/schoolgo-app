import { MarketingHeader } from '@/modules/marketing-layout';
import { CompareBar } from '@/modules/school-search/components/CompareBar';
import { FilterChips } from '@/modules/school-search/components/FilterChips';
import { FilterSidebar } from '@/modules/school-search/components/FilterSidebar';
import { MapView } from '@/modules/school-search/components/MapView';
import { SchoolResultsPanel } from '@/modules/school-search/components/SchoolResultsPanel';
import { SearchAuthGate } from '@/modules/school-search/components/SearchAuthGate';
import { SearchBar } from '@/modules/school-search/components/SearchBar';
import { SearchLayout } from '@/modules/school-search/components/SearchLayout';
import { SearchLoginPrompt } from '@/modules/school-search/components/SearchLoginPrompt';
import { SpecFilterSidebar } from '@/modules/school-search/components/SpecFilterSidebar';
import { SpecPreviewGate } from '@/modules/school-search/components/SpecPreviewGate';
import { SpecResultsPanel } from '@/modules/school-search/components/SpecResultsPanel';
import { SearchTopBar } from '@/modules/school-search/components/topbar/SearchTopBar';
import type { SearchPageContentProps } from '@/modules/school-search/types/component.types';

export async function SearchPageContent({
  activePortal,
  title,
  guestAccess = false,
  specOnly = false,
}: SearchPageContentProps) {
  if (specOnly) {
    return (
      <>
        <h1 className='sr-only'>{title}</h1>
        <MarketingHeader activePortal={activePortal} fullWidth />
        <main className='flex w-full bg-muted pt-14 md:pt-18'>
          <SpecFilterSidebar alwaysOn />
          <section className='flex h-content-viewport flex-1 flex-col gap-3 overflow-hidden p-3 md:p-4'>
            <SearchTopBar />
            <div className='relative min-h-0 flex-1'>
              <MapView activePortal={activePortal} />
              <SpecResultsPanel activePortal={activePortal} alwaysOn floating />
            </div>
          </section>
        </main>
        <CompareBar />
      </>
    );
  }

  return (
    <>
      <h1 className='sr-only'>{title}</h1>
      <MarketingHeader activePortal={activePortal} fullWidth />

      <SearchLayout guestAccess={guestAccess}>
        {guestAccess ? (
          <FilterSidebar />
        ) : (
          <SearchAuthGate>
            <FilterSidebar />
          </SearchAuthGate>
        )}
        <SpecFilterSidebar />

        <section className='flex h-content-viewport flex-1 flex-col gap-4 overflow-hidden p-6'>
          <SpecPreviewGate
            activePortal={activePortal}
            fallback={
              <>
                <div className='flex shrink-0 items-center gap-4'>
                  <SearchBar className='w-1/2 shrink-0' />
                  {guestAccess ? (
                    <FilterChips className='w-1/2 min-w-0' />
                  ) : (
                    <SearchAuthGate>
                      <FilterChips className='w-1/2 min-w-0' />
                    </SearchAuthGate>
                  )}
                </div>

                <div className='relative min-h-0 flex-1'>
                  <MapView activePortal={activePortal} />
                  {guestAccess ? (
                    <SchoolResultsPanel activePortal={activePortal} />
                  ) : (
                    <>
                      <SearchAuthGate>
                        <SchoolResultsPanel activePortal={activePortal} />
                      </SearchAuthGate>
                      <SearchLoginPrompt />
                    </>
                  )}
                </div>
              </>
            }
          />
        </section>
      </SearchLayout>
    </>
  );
}
