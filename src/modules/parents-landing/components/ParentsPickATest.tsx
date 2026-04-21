import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Chip, Eyebrow, SectionContainer } from '@/modules/design-system';

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

        <div className='flex flex-wrap gap-2'>
          {TESTS.map((key, i) => (
            <Chip key={key} selected={i === 0}>
              {t(`tests.${key}`)}
            </Chip>
          ))}
        </div>

        <div className='overflow-hidden rounded-lg border border-border bg-card shadow-2'>
          <table className='w-full text-body-sm'>
            <thead>
              <tr className='text-left'>
                {['School', 'Accepts', 'Minimum score', 'Last verified'].map((h) => (
                  <th
                    key={h}
                    scope='col'
                    className='px-5 py-3 text-label font-semibold uppercase text-foggy'
                    style={{ letterSpacing: '0.08em' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { school: 'Scotch College Melbourne', accepts: 'AEAS', score: '70 (average)', date: 'Apr 2026' },
                { school: 'Sydney Grammar School', accepts: 'AEAS', score: '65 (average)', date: 'Apr 2026' },
                { school: 'Brisbane Grammar School', accepts: 'AEAS', score: '68 (average)', date: 'Apr 2026' },
                { school: 'Christ Church Grammar School', accepts: 'AEAS', score: '70 (average)', date: 'Apr 2026' },
              ].map((row) => (
                <tr key={row.school} className='border-t border-divider'>
                  <td className='px-5 py-4 font-medium text-ink-900'>{row.school}</td>
                  <td className='px-5 py-4 text-foreground'>{row.accepts}</td>
                  <td className='px-5 py-4 text-foreground'>{row.score}</td>
                  <td className='px-5 py-4 text-foggy'>{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
