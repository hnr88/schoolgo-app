import { MarketingHeader } from '@/modules/marketing-layout';
import { FilterSidebar } from '@/modules/school-search/components/FilterSidebar';
import { SearchBar } from '@/modules/school-search/components/SearchBar';
import { FilterChips } from '@/modules/school-search/components/FilterChips';
import { MapView } from '@/modules/school-search/components/MapView';
import { SchoolResultsPanel } from '@/modules/school-search/components/SchoolResultsPanel';
import { SearchAuthGate } from '@/modules/school-search/components/SearchAuthGate';
import { SearchLayout } from '@/modules/school-search/components/SearchLayout';
import { SearchLoginPrompt } from '@/modules/school-search/components/SearchLoginPrompt';
import type { SearchPageContentProps } from '@/modules/school-search/types/component.types';

export async function SearchPageContent({
  activePortal,
  title,
  guestAccess = false,
}: SearchPageContentProps) {
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

        <section className='flex flex-1 flex-col gap-4 overflow-hidden p-6 h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4.5rem)]'>
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
        </section>
      </SearchLayout>
    </>
  );
}
