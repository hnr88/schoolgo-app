import Image from 'next/image';
import { Star } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { loadSchools } from '@/lib/schools';
import { formatFeeAud, parseFeeAud } from '@/lib/schools/format-fee';
import { SectionContainer } from '@/modules/design-system';
import type { SchoolRecord } from '@/lib/schools/types';

function pickComparisonSet(schools: SchoolRecord[]) {
  const candidates = schools
    .filter(
      (s) =>
        s.sector === 'Independent' &&
        s.icseaScore !== null &&
        parseFeeAud(s.annualFeeAud),
    )
    .sort((a, b) => (b.icseaScore as number) - (a.icseaScore as number));
  const picked: SchoolRecord[] = [];
  const seenStates = new Set<string>();
  for (const s of candidates) {
    if (seenStates.has(s.state)) continue;
    seenStates.add(s.state);
    picked.push(s);
    if (picked.length === 3) break;
  }
  return picked;
}

const RATINGS = ['4.9', '4.8', '4.9'];

const TESTS_MAP: Record<string, string> = {
  VIC: 'AEAS, IELTS, Cambridge',
  NSW: 'AEAS, iDAT, IELTS, TOEFL',
  QLD: 'All 7 tests',
  SA: 'AEAS, IELTS',
  WA: 'AEAS, IELTS, PTE',
  TAS: 'AEAS',
  ACT: 'AEAS, IELTS',
  NT: 'AEAS',
};

const MIN_SCORES: Record<string, string> = {
  VIC: '70',
  NSW: '75',
  QLD: '68',
  SA: '70',
  WA: '72',
  TAS: '65',
  ACT: '70',
  NT: '65',
};

const SCHOLARSHIPS_MAP: Record<string, string | null> = {
  VIC: 'Academic · Music',
  NSW: null,
  QLD: 'Round Square',
  SA: 'Academic',
  WA: 'Academic · Sport',
  TAS: null,
  ACT: 'Academic',
  NT: null,
};

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
            text: `Yes · ${280 + Math.floor(Math.random() * 60)} beds`,
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
    <section className='py-20 md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <div className='flex flex-col gap-3'>
          <span className='text-xs font-semibold uppercase tracking-widest text-primary'>
            {t('eyebrow')}
          </span>
          <h2 className='max-w-2xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink-900 md:text-5xl'>
            {t('heading')}{' '}
            <em className='not-italic text-ink-900'>{t('headingAccent')}</em>
          </h2>
        </div>

        <div className='rounded-2xl shadow-4'>
          <div className='overflow-hidden rounded-2xl border border-border bg-card'>
            <div className='overflow-x-auto'>
              <table className='w-full min-w-[800px]'>
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
                        className='min-w-[13rem] border-b border-divider px-6 pb-6 pt-8 text-left align-top'
                      >
                        <div className='flex flex-col gap-3'>
                          <div className='relative h-40 w-full overflow-hidden rounded-xl border border-border bg-muted'>
                            <Image
                              src={`https://picsum.photos/seed/${s.slug}/480/360`}
                              alt=''
                              fill
                              sizes='200px'
                              className='object-cover'
                              aria-hidden='true'
                            />
                          </div>
                          <div className='flex flex-col gap-0.5'>
                            <span className='text-sm font-semibold text-ink-900'>
                              {s.name}
                            </span>
                            <span className='flex items-center gap-1 text-xs text-foggy'>
                              {s.suburb}, {s.state} ·{' '}
                              <Star
                                className='inline h-3 w-3 fill-ink-900 text-ink-900'
                                aria-hidden='true'
                              />
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
                      <th
                        scope='row'
                        className='bg-muted/40 px-8 py-5 text-left text-xs font-medium text-foggy'
                      >
                        {t(`columns.${row.key}`)}
                      </th>
                      {set.map((s, i) => {
                        const cell = row.value(s, i);
                        return (
                          <td
                            key={s.slug}
                            className={`px-6 py-5 text-sm ${cell.highlight ? 'font-medium text-primary' : cell.muted ? 'text-foggy' : 'font-medium text-ink-900'}`}
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
        </div>
      </SectionContainer>
    </section>
  );
}
