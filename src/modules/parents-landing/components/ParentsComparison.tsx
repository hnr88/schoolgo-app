import { Fragment } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { loadSchools } from '@/lib/schools';
import { formatFeeAud, parseFeeAud } from '@/lib/schools/format-fee';
import { SectionContainer } from '@/modules/design-system';
import type { SchoolRecord } from '@/lib/schools/types';
import { COMPARISON_IMAGES, MIN_SCORES, RATINGS, SCHOLARSHIPS_MAP, TESTS_MAP } from '../constants/comparison.constants';
import { boardingBedsForSchool, pickComparisonSet } from '../lib/comparison';

export async function ParentsComparison() {
  const t = await getTranslations('ParentsComparison');
  const schools = await loadSchools();
  const set = pickComparisonSet(schools);

  if (set.length === 0) return null;

  const rows: Array<{
    key: string;
    value: (
      s: SchoolRecord,
      i: number,
    ) => { text: string; highlight?: boolean; muted?: boolean };
  }> = [
    {
      key: 'fee',
      value: (s) => ({
        text: formatFeeAud(parseFeeAud(s.annualFeeAud)) ?? t('notPublished'),
      }),
    },
    {
      key: 'stateSector',
      value: (s) => ({
        text: `${s.state} · ${s.sector || t('notPublished')}`,
      }),
    },
    {
      key: 'curriculum',
      value: (_s, i) => ({
        text: ['VCE', 'HSC', 'IB'][i] ?? t('notPublished'),
      }),
    },
    {
      key: 'boarding',
      value: (s) => {
        const val = s.boardingAvailable?.toLowerCase();
        if (val === 'yes' || val?.includes('yes')) {
          return {
            text: `Yes · ${boardingBedsForSchool(s)} beds`,
            highlight: true,
          };
        }
        return { text: t('dayOnly'), muted: true };
      },
    },
    {
      key: 'tests',
      value: (s) => ({ text: TESTS_MAP[s.state] ?? 'AEAS' }),
    },
    {
      key: 'minScore',
      value: (s) => ({ text: MIN_SCORES[s.state] ?? '70' }),
    },
    {
      key: 'scholarships',
      value: (s) => {
        const val = SCHOLARSHIPS_MAP[s.state];
        if (val) return { text: val, highlight: true };
        return { text: t('noneIntl'), muted: true };
      },
    },
    {
      key: 'intakes',
      value: (s) => ({
        text: s.intakePeriods || 'Feb · Jul',
      }),
    },
  ];

  return (
    <section id='compare' className='py-20 md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <div className='flex flex-col gap-3'>
          <span className='text-xs font-semibold uppercase tracking-widest text-primary'>
            {t('eyebrow')}
          </span>
          <h2 className='max-w-2xl font-display text-4xl font-bold leading-display tracking-tight text-ink-900 md:text-5xl'>
            {t('heading')}{' '}
            <em className='not-italic text-ink-900'>{t('headingAccent')}</em>
          </h2>
        </div>

        {/* Desktop: classic column layout */}
        <div className='hidden rounded-2xl shadow-4 lg:block'>
          <div className='overflow-hidden rounded-2xl border border-border bg-card'>
            <table className='w-full'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='w-48 border-b border-divider bg-card px-8 pb-6 pt-8 text-left align-bottom'
                  >
                    <span className='text-xs font-semibold uppercase tracking-widest text-foggy'>
                      {t('shortlistLabel', { count: set.length })}
                    </span>
                  </th>
                  {set.map((s, i) => (
                    <th
                      key={s.slug}
                      scope='col'
                      className='min-w-52 border-b border-divider px-6 pb-6 pt-8 text-left align-top'
                    >
                      <div className='flex flex-col gap-3'>
                        <div className='relative h-40 w-full overflow-hidden rounded-xl border border-border bg-muted'>
                          <Image
                            src={COMPARISON_IMAGES[i] ?? COMPARISON_IMAGES[0]}
                            alt=''
                            fill
                            sizes='200px'
                            className='object-cover'
                            aria-hidden='true'
                          />
                        </div>
                        <div className='flex flex-col gap-0.5'>
                          <span className='line-clamp-1 text-sm font-semibold text-ink-900'>{s.name}</span>
                          <span className='flex items-center gap-1 text-xs text-foggy'>
                            {s.suburb}, {s.state} ·{' '}
                            <Star className='inline h-3 w-3 fill-ink-900 text-ink-900' aria-hidden='true' />
                            {RATINGS[i]}
                          </span>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.key} className='border-t border-divider transition-colors hover:bg-muted/50'>
                    <th scope='row' className='bg-muted/40 px-8 py-5 text-left text-xs font-medium text-foggy'>
                      {t(`columns.${row.key}`)}
                    </th>
                    {set.map((s, i) => {
                      const cell = row.value(s, i);
                      return (
                        <td
                          key={s.slug}
                          className={`px-6 py-5 text-sm tabular-nums ${cell.highlight ? 'font-medium text-primary' : cell.muted ? 'text-foggy' : 'font-medium text-ink-900'}`}
                        >
                          {cell.text}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile: row-label layout */}
        <div className='rounded-2xl shadow-4 lg:hidden'>
          <div className='overflow-hidden rounded-2xl border border-border bg-card'>
            <table className='w-full'>
              <caption className='px-4 pb-4 pt-6 text-left text-xs font-semibold uppercase tracking-widest text-foggy'>
                {t('shortlistLabel', { count: set.length })}
              </caption>
              <thead>
                <tr>
                  {set.map((s, i) => (
                    <th key={s.slug} scope='col' className='border-b border-divider px-3 pb-4 text-left align-top'>
                      <div className='flex flex-col gap-2'>
                        <div className='relative h-20 w-full overflow-hidden rounded-xl border border-border bg-muted'>
                          <Image
                            src={COMPARISON_IMAGES[i] ?? COMPARISON_IMAGES[0]}
                            alt=''
                            fill
                            sizes='33vw'
                            className='object-cover'
                            aria-hidden='true'
                          />
                        </div>
                        <div className='flex flex-col gap-0.5'>
                          <span className='line-clamp-1 text-xs font-semibold text-ink-900'>{s.name}</span>
                          <span className='flex items-center gap-1 text-xs text-foggy'>
                            {s.suburb}, {s.state} ·{' '}
                            <Star className='inline h-3 w-3 fill-ink-900 text-ink-900' aria-hidden='true' />
                            {RATINGS[i]}
                          </span>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <Fragment key={row.key}>
                    <tr>
                      <th
                        colSpan={set.length}
                        scope='colgroup'
                        className='border-t-2 border-divider px-4 pb-1 pt-4 text-center text-xs font-semibold uppercase tracking-wider text-foggy'
                      >
                        {t(`columns.${row.key}`)}
                      </th>
                    </tr>
                    <tr>
                      {set.map((s, i) => {
                        const cell = row.value(s, i);
                        return (
                          <td
                            key={s.slug}
                            className={`relative px-3 pb-3 pt-1 text-xs tabular-nums after:absolute after:bottom-1 after:right-0 after:top-1 after:w-px after:bg-divider last:after:hidden ${cell.highlight ? 'font-medium text-primary' : cell.muted ? 'text-foggy' : 'font-medium text-ink-900'}`}
                          >
                            {cell.text}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
