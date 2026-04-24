import { getTranslations } from 'next-intl/server';
import { MarketingFooter, MarketingHeader } from '@/modules/marketing-layout';
import type { Portal } from '@/lib/portal-url';
import { FilterSidebar } from '@/modules/school-search/components/FilterSidebar';
import { SearchBar } from '@/modules/school-search/components/SearchBar';
import { FilterChips } from '@/modules/school-search/components/FilterChips';
import { MapView } from '@/modules/school-search/components/MapView';
import { SchoolResultsPanel } from '@/modules/school-search/components/SchoolResultsPanel';

interface SearchPageContentProps {
  activePortal: Portal;
}

export async function SearchPageContent({ activePortal }: SearchPageContentProps) {
  const t = await getTranslations('Metadata');

  return (
    <>
      <h1 className='sr-only'>{t('title')}</h1>
      <MarketingHeader activePortal={activePortal} />

      <main className='flex w-full pt-16 md:pt-20'>
        <FilterSidebar />

        <section className='flex-1 p-6 flex flex-col gap-4 overflow-hidden h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]'>
          <div className='flex flex-col gap-4 shrink-0'>
            <SearchBar />
            <FilterChips />
          </div>

          <div className='relative flex-1 min-h-0'>
            <MapView />
            <SchoolResultsPanel />
          </div>
        </section>
      </main>

      <MarketingFooter activePortal={activePortal} />
    </>
  );
}
