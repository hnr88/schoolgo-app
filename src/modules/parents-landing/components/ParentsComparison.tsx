import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { loadSchools } from '@/lib/schools';
import { formatFeeAud, parseFeeAud } from '@/lib/schools/format-fee';
import { SectionContainer, SectionHeader } from '@/modules/design-system';

function pickComparisonSet(
  schools: Awaited<ReturnType<typeof loadSchools>>,
) {
  const candidates = schools
    .filter((s) => s.sector === 'Independent' && s.icseaScore !== null && parseFeeAud(s.annualFeeAud))
    .sort((a, b) => (b.icseaScore as number) - (a.icseaScore as number));
  const picked: typeof candidates = [];
  const seenStates = new Set<string>();
  for (const s of candidates) {
    if (seenStates.has(s.state)) continue;
    seenStates.add(s.state);
    picked.push(s);
    if (picked.length === 3) break;
  }
  return picked;
}

export async function ParentsComparison() {
  const t = await getTranslations('ParentsComparison');
  const schools = await loadSchools();
  const set = pickComparisonSet(schools);

  if (set.length === 0) return null;

  return (
    <section className='py-20 md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <SectionHeader
          eyebrow={t('eyebrow')}
          heading={
            <>
              {t('heading')}{' '}
              <em className='italic font-medium text-primary'>{t('headingAccent')}</em>
            </>
          }
          subheading={t('subheading')}
        />

        <div className='-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0'>
          <table className='w-full min-w-[720px] overflow-hidden rounded-lg border border-border bg-card shadow-2'>
            <thead>
              <tr className='text-left'>
                <th
                  scope='col'
                  className='sticky left-0 z-[1] w-44 bg-card px-5 py-4 text-label font-semibold uppercase text-foggy'
                  style={{ letterSpacing: '0.08em' }}
                >
                  {t('columns.school')}
                </th>
                {set.map((s) => (
                  <th key={s.slug} scope='col' className='min-w-[14rem] px-5 py-4'>
                    <div className='flex items-center gap-3'>
                      <div className='relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border bg-muted'>
                        <Image
                          src={`https://picsum.photos/seed/${s.slug}/160/160`}
                          alt=''
                          fill
                          sizes='48px'
                          className='object-cover'
                          aria-hidden='true'
                        />
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-body-sm font-semibold text-ink-900'>{s.name}</span>
                        <span className='text-caption text-foggy'>
                          {s.suburb}, {s.state}
                        </span>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='text-body-sm'>
              {[
                { key: 'sector', value: (s: (typeof set)[number]) => s.sector || t('notPublished') },
                {
                  key: 'fee',
                  value: (s: (typeof set)[number]) =>
                    formatFeeAud(parseFeeAud(s.annualFeeAud)) ?? t('notPublished'),
                },
                {
                  key: 'icsea',
                  value: (s: (typeof set)[number]) =>
                    s.icseaScore !== null ? String(s.icseaScore) : t('notPublished'),
                },
                {
                  key: 'tests',
                  value: () => 'AEAS · IELTS · Duolingo',
                },
                {
                  key: 'intakes',
                  value: (s: (typeof set)[number]) => s.intakePeriods || 'January',
                },
              ].map((row) => (
                <tr key={row.key} className='border-t border-divider'>
                  <th
                    scope='row'
                    className='sticky left-0 bg-card px-5 py-4 text-label font-semibold uppercase text-foggy'
                    style={{ letterSpacing: '0.08em' }}
                  >
                    {t(`columns.${row.key}`)}
                  </th>
                  {set.map((s) => (
                    <td key={s.slug} className='px-5 py-4 text-foreground'>
                      {row.value(s)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionContainer>
    </section>
  );
}
