import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { TrustBadge } from '@/modules/design-system';
import type { School } from '@/modules/school-search/types/school.types';

interface SchoolCardProps {
  school: School;
}

export async function SchoolCard({ school }: SchoolCardProps) {
  const t = await getTranslations('SchoolSearch.card');
  const tc = await getTranslations('Common');
  const currencyFormatter = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
    notation: 'compact',
  });

  return (
    <Link
      href={`/schools/${school.id}`}
      aria-label={t('viewDetails', { name: school.name })}
      className='block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
    >
      <article className='group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-2 transition-shadow hover:shadow-3'>
        <div className='relative aspect-[4/3] w-full overflow-hidden bg-muted'>
          <Image
            src={`https://picsum.photos/seed/school-${school.id}/480/360`}
            alt=''
            fill
            sizes='(max-width: 768px) 100vw, 280px'
            className='object-cover'
            aria-hidden='true'
          />
          {school.isTopRated && (
            <span className='absolute left-3 top-3 inline-flex items-center gap-1 rounded-pill bg-arches-500 px-2.5 py-1 text-caption font-semibold text-on-primary shadow-brand'>
              <Star className='h-3 w-3 fill-current' strokeWidth={0} aria-hidden='true' />
              {t('topRated')}
            </span>
          )}
        </div>

        <div className='flex flex-col gap-2 p-4'>
          <h3 className='line-clamp-1 text-body-sm font-semibold text-ink-900 transition-colors group-hover:text-primary'>
            {school.name}
          </h3>
          <p className='flex items-center gap-1 text-caption text-foggy'>
            <MapPin className='h-3 w-3 shrink-0' strokeWidth={1.75} aria-hidden='true' />
            {school.suburb}, {school.state}
          </p>
          <div className='mt-2 flex items-center justify-between border-t border-divider pt-3'>
            <TrustBadge variant='cricos' label={tc('cricosVerified')} />
            <span className='text-body-sm font-semibold text-ink-900'>
              {currencyFormatter.format(school.tuitionAud)}
              <span className='ml-1 text-caption font-normal text-foggy'>{t('currency')}</span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
