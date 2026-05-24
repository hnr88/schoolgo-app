import { getTranslations } from 'next-intl/server';
import { SectionContainer } from '@/modules/design-system';
import { getComparisonSchoolsWithPhotos } from '@/modules/parents-landing/lib/comparison';
import { buildComparisonRows } from '@/modules/parents-landing/lib/comparison-rows';
import { ComparisonSchoolCards } from '@/modules/parents-landing/components/ComparisonSchoolCards';
import { ComparisonDesktopTable } from '@/modules/parents-landing/components/ComparisonDesktopTable';
import { ComparisonMobileTable } from '@/modules/parents-landing/components/ComparisonMobileTable';

export async function ParentsComparison() {
  const [t, tc, schools] = await Promise.all([
    getTranslations('ParentsComparison'),
    getTranslations('Common'),
    getComparisonSchoolsWithPhotos(),
  ]);

  if (schools.length === 0) return null;

  const rows = buildComparisonRows(t);

  return (
    <section id='compare' className='py-16 md:py-20'>
      <SectionContainer className='flex flex-col gap-10'>
        <div className='flex flex-col gap-4'>
          <span className='text-xs font-semibold uppercase tracking-widest text-primary'>
            {t('eyebrow')}
          </span>
          <h2 className='max-w-2xl font-display text-4xl font-bold leading-display tracking-tight text-ink-900 md:text-5xl'>
            {t('heading')}{' '}
            <em className='not-italic text-ink-900'>{t('headingAccent')}</em>
          </h2>
        </div>

        <ComparisonSchoolCards schools={schools} tc={tc} />

        <p className='text-sm text-foggy'>
          {t('shortlistLabel', { count: schools.length })}
        </p>

        <ComparisonDesktopTable schools={schools} rows={rows} t={t} />
        <ComparisonMobileTable schools={schools} rows={rows} t={t} />
      </SectionContainer>
    </section>
  );
}
