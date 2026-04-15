import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { SchoolCard } from '@/modules/school-search/components/SchoolCard';
import { MOCK_SCHOOLS } from '@/modules/school-search/constants/school.constants';

export async function SchoolResultsPanel() {
  const t = await getTranslations('SchoolSearch.results');

  return (
    <div className='absolute top-4 right-4 bottom-4 w-results-panel bg-surface-container-highest rounded-3xl border border-outline-variant/20 shadow-2xl flex flex-col overflow-hidden'>
      <div className='p-4 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-highest'>
        <h2 className='text-xs font-bold uppercase tracking-wider text-on-surface-variant'>
          {t('title')}
        </h2>
        <span className='text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg'>
          {t('count', { count: MOCK_SCHOOLS.length })}
        </span>
      </div>

      <div className='flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar'>
        {MOCK_SCHOOLS.map((school) => (
          <SchoolCard key={school.id} school={school} />
        ))}
      </div>

      <div className='p-4 bg-surface-container-lowest/50 border-t border-outline-variant/20 text-center'>
        <Button
          type='button'
          variant='link'
          className='text-xs font-bold text-primary hover:underline'
        >
          {t('viewAll')}
        </Button>
      </div>
    </div>
  );
}
