import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MarketingFooter, MarketingHeader } from '@/modules/marketing-layout';
import {
  FilterSidebar,
  SearchBar,
  FilterChips,
  MapView,
  SchoolResultsPanel,
} from '@/modules/school-search';

export default async function SearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Metadata');

  return (
    <>
      <h1 className='sr-only'>{t('title')}</h1>
      <MarketingHeader />

      <main className='pt-16 md:pt-20 flex max-w-wide mx-auto w-full'>
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

      <MarketingFooter />
    </>
  );
}
