import { Fragment } from 'react';
import { Star } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { RATINGS } from '@/modules/parents-landing/constants/comparison.constants';
import { SchoolPhotoOrLogo } from '@/modules/parents-landing/components/SchoolPhotoOrLogo';
import type { ComparisonMobileTableProps } from '@/modules/parents-landing/types/parents-comparison.types';

export function ComparisonMobileTable({ schools, rows, t }: ComparisonMobileTableProps) {
  return (
    <div className='lg:hidden'>
      <div className='overflow-hidden rounded-lg bg-card shadow-2'>
        <table className='w-full'>
          <caption className='px-4 pb-4 pt-6 text-left text-xs font-semibold uppercase tracking-widest text-foggy'>
            {t('compareLabel')}
          </caption>
          <thead>
            <tr>
              {schools.map((s, i) => (
                <th key={s.slug} scope='col' className='border-b border-divider px-3 pb-4 text-left align-top'>
                  <div className='flex flex-col gap-2'>
                    <SchoolPhotoOrLogo
                      logoUrl={s.logoUrl}
                      name={s.name}
                      size='sm'
                    />
                    <div className='flex flex-col gap-0.5'>
                      <Link
                        href={`/parent/schools/${s.slug}`}
                        className='line-clamp-1 text-xs font-semibold text-ink-900 no-underline hover:underline'
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
              <Fragment key={row.key}>
                <tr>
                  <th
                    colSpan={schools.length}
                    scope='colgroup'
                    className='border-t-2 border-divider px-4 pb-1 pt-4 text-center text-xs font-semibold uppercase tracking-wider text-foggy'
                  >
                    {t(`columns.${row.key}`)}
                  </th>
                </tr>
                <tr>
                  {schools.map((s, i) => {
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
  );
}
