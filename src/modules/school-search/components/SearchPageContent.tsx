import { MarketingHeader } from '@/modules/marketing-layout';
import { SpecFilterSidebar } from '@/modules/school-search/components/SpecFilterSidebar';
import { SpecResultsPanel } from '@/modules/school-search/components/SpecResultsPanel';
import type { SearchPageContentProps } from '@/modules/school-search/types/component.types';

export async function SearchPageContent({ activePortal, title }: SearchPageContentProps) {
  return (
    <>
      <h1 className='sr-only'>{title}</h1>
      <MarketingHeader activePortal={activePortal} fullWidth />

      <main className='flex w-full bg-muted pt-14 md:pt-18'>
        <SpecFilterSidebar activePortal={activePortal} />
        <section className='flex flex-1 flex-col gap-4 overflow-hidden p-6 h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4.5rem)]'>
          <SpecResultsPanel />
        </section>
      </main>
    </>
  );
}
