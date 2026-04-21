import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Eyebrow, SectionContainer } from '@/modules/design-system';

const TESTS: Array<'aeas' | 'idat' | 'duolingo' | 'ielts' | 'pte' | 'cambridge' | 'toefl'> = [
  'aeas',
  'idat',
  'duolingo',
  'ielts',
  'pte',
  'cambridge',
  'toefl',
];

export async function ParentsPickATest() {
  const t = await getTranslations('ParentsPickATest');
  return (
    <section className='bg-muted py-20 md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <div className='flex max-w-3xl flex-col gap-3'>
          <Eyebrow tone='brand'>{t('eyebrow')}</Eyebrow>
          <h2 className='font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-ink-900 md:text-5xl'>
            {t('heading')}{' '}
            <em className='italic font-medium text-primary'>{t('headingAccent')}</em>
          </h2>
          <p className='text-body text-foggy md:text-lg'>{t('subheading')}</p>
        </div>

        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7'>
          {TESTS.map((key) => (
            <article
              key={key}
              className='flex flex-col gap-2 rounded-lg border border-border bg-card p-4 shadow-2 transition-shadow hover:shadow-3'
            >
              <h3 className='text-h4 font-semibold text-ink-900'>{t(`tests.${key}.name`)}</h3>
              <p className='text-caption text-foggy leading-snug'>{t(`tests.${key}.fullName`)}</p>
              <p className='mt-auto text-caption font-medium text-primary'>
                {t(`tests.${key}.description`)}
              </p>
            </article>
          ))}
        </div>

        <div>
          <Link
            href='/search'
            className='inline-flex items-center gap-2 rounded-pill bg-primary px-6 py-3 text-sm font-semibold text-on-primary shadow-brand no-underline transition-colors hover:bg-rausch-600'
          >
            {t('cta')}
            <ArrowRight className='h-4 w-4' strokeWidth={2} aria-hidden='true' />
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
}
