import { getTranslations } from 'next-intl/server';
import { SchoolCard } from '@/modules/school-search/components/SchoolCard';
import { MOCK_SCHOOLS } from '@/modules/school-search/constants/school.constants';

export async function SchoolResultsPanel() {
  const t = await getTranslations('SchoolSearch.results');

  return (
    <div className='absolute bottom-4 right-4 top-4 flex w-results-panel flex-col overflow-hidden rounded-lg border border-border bg-card shadow-3'>
      <div className='flex items-center justify-between border-b border-divider bg-card px-4 py-3'>
        <span
          className='text-caption font-semibold uppercase text-foggy'
          style={{ letterSpacing: '0.08em' }}
        >
          {t('title')}
        </span>
        <span className='inline-flex items-center rounded-pill bg-rausch-50 px-2.5 py-1 text-caption font-semibold text-primary'>
          {t('count', { count: MOCK_SCHOOLS.length })}
        </span>
      </div>

      <div className='custom-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto bg-muted p-4'>
        {MOCK_SCHOOLS.map((school) => (
          <SchoolCard key={school.id} school={school} />
        ))}
      </div>

      <div className='border-t border-divider bg-card p-4 text-center'>
        <button
          type='button'
          className='text-body-sm font-semibold text-primary hover:underline'
        >
          {t('viewAll')}
        </button>
      </div>
    </div>
  );
}
