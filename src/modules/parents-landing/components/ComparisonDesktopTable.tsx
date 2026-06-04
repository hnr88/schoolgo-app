import { Star } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { RATINGS } from '@/modules/parents-landing/constants/comparison.constants';
import { SchoolPhotoOrLogo } from '@/modules/parents-landing/components/SchoolPhotoOrLogo';
import type { ComparisonDesktopTableProps } from '@/modules/parents-landing/types/parents-comparison.types';

export function ComparisonDesktopTable({ schools, rows, t }: ComparisonDesktopTableProps) {
  return (
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
                  {t('compareLabel')}
                </span>
              </th>
              {schools.map((s, i) => (
                <th
                  key={s.slug}
                  scope='col'
                  className='min-w-52 border-b border-divider px-6 pb-6 pt-8 text-left align-top'
                >
                  <div className='flex flex-col gap-3'>
                    <SchoolPhotoOrLogo
                      logoUrl={s.logoUrl}
                      name={s.name}
                      size='lg'
                    />
                    <div className='flex flex-col gap-0.5'>
                      <Link
                        href={`/parent/schools/${s.slug}`}
                        className='line-clamp-1 text-sm font-semibold text-ink-900 no-underline hover:underline'
                      >
                        {s.name}
                      </Link>
                      <span className='flex items-center gap-1 text-xs text-foggy'>
                        {s.suburb}, {s.state} \u00B7{' '}
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
                {schools.map((s, i) => {
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
  );
}
