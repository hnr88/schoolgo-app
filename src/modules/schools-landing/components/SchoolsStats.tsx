import { getTranslations } from 'next-intl/server';
import { SectionContainer, SectionHeader } from '@/modules/design-system';
import { loadSchools, computeSchoolStats, formatFeeAud } from '@/lib/schools';

export async function SchoolsStats() {
  const t = await getTranslations('SchoolsStats');
  const schools = await loadSchools();
  const stats = computeSchoolStats(schools);

  const items = [
    {
      key: 'schools',
      value: `${stats.totalSchools}+`,
    },
    {
      key: 'states',
      value: String(stats.statesCount),
    },
    {
      key: 'sectors',
      value: String(stats.sectors.length),
    },
    {
      key: 'feeRange',
      value:
        stats.feeRange.minAud !== null && stats.feeRange.maxAud !== null
          ? `${formatFeeAud(stats.feeRange.minAud, true)} – ${formatFeeAud(stats.feeRange.maxAud, true)}`
          : 'N/A',
    },
  ];

  return (
    <section className='bg-ink-900 py-12 text-background md:py-16'>
      <SectionContainer className='flex flex-col gap-10'>
        <SectionHeader
          theme='dark'
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subheading={t('subheading')}
        />

        <dl className='grid grid-cols-2 gap-x-8 gap-y-8 border-t border-background/15 pt-10 md:grid-cols-4'>
          {items.map(({ key, value }) => (
            <div key={key} className='flex flex-col gap-2'>
              <dd className='font-display text-4xl font-extrabold tracking-[-0.025em] text-background md:text-6xl'>
                {value}
              </dd>
              <dt className='text-body-sm text-background/70'>{t(`items.${key}.label`)}</dt>
            </div>
          ))}
        </dl>
      </SectionContainer>
    </section>
  );
}
