import { MarketingFooter, MarketingHeader } from '@/modules/marketing-layout';
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
}: SearchPageContentProps) {
  return (
    <>
      <h1 className='sr-only'>{title}</h1>
      <MarketingHeader activePortal={activePortal} />

      <SearchLayout>
        <SearchAuthGate>
          <FilterSidebar />
        </SearchAuthGate>

        <section className='flex-1 p-6 flex flex-col gap-4 overflow-hidden h-[calc(100vh-4rem)] md:h-[calc(100vh-7.5rem)]'>
          <div className='flex flex-col gap-4 shrink-0'>
            <SearchBar />
            <SearchAuthGate>
              <FilterChips />
            </SearchAuthGate>
          </div>

          <div className='relative flex-1 min-h-0'>
            <MapView />
            <SearchAuthGate>
              <SchoolResultsPanel />
            </SearchAuthGate>
            <SearchLoginPrompt />
          </div>
        </section>
      </SearchLayout>

      <MarketingFooter activePortal={activePortal} />
    </>
  );
}
