import { MapPin, Star, ClipboardCheck } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import type { School } from '@/modules/school-search/types/school.types';

const CURRICULUM_COLORS: Record<string, string> = {
  VCE: 'bg-primary-container text-on-primary-container',
  HSC: 'bg-secondary-container text-on-secondary-container',
  IB: 'bg-surface-container-high text-on-surface',
  QCE: 'bg-surface-variant text-on-surface',
  WACE: 'bg-surface-container text-on-surface',
  SACE: 'bg-surface-container text-on-surface',
};

interface SchoolCardProps {
  school: School;
}

export async function SchoolCard({ school }: SchoolCardProps) {
  const t = await getTranslations('SchoolSearch.card');
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
      className='block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl'
    >
      <article className='bg-surface-container-lowest rounded-2xl p-4 shadow-sm group hover:shadow-md transition-shadow cursor-pointer border border-outline-variant/20 hover:border-primary-container'>
        <div className='w-full h-32 rounded-xl overflow-hidden bg-surface-container-high mb-3 flex items-center justify-center relative'>
          <div
            className='absolute inset-0 bg-gradient-to-br from-surface-container to-surface-container-high'
            aria-hidden='true'
          />
          <span
            className='relative text-4xl font-black text-on-surface-variant/20 select-none'
            aria-hidden='true'
          >
            {school.name.charAt(0)}
          </span>
        </div>

        <div className='flex flex-col gap-1'>
          <h3 className='text-sm font-bold tracking-tight text-on-surface group-hover:text-primary transition-colors line-clamp-1'>
            {school.name}
          </h3>
          <p className='text-caption text-on-surface-variant flex items-center gap-1'>
            <MapPin className='w-3 h-3 shrink-0' aria-hidden='true' />
            {school.suburb}, {school.state}
          </p>

          <div className='flex items-center justify-between pt-2 mt-1 border-t border-outline-variant/10'>
            <span className='text-sm font-black text-primary'>
              {currencyFormatter.format(school.tuitionAud)}{' '}
              <span className='text-caption text-on-surface-variant font-normal'>
                {t('currency')}
              </span>
            </span>
            <div className='flex gap-1 items-center'>
              <span
                className={cn(
                  'text-caption-xs font-bold uppercase px-1.5 py-0.5 rounded',
                  CURRICULUM_COLORS[school.curriculum] ??
                    'bg-surface-container text-on-surface',
                )}
              >
                {school.curriculum}
              </span>
              <span
                className='w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-primary'
                aria-hidden='true'
              >
                {school.isTopRated ? (
                  <Star className='w-3 h-3 fill-current' />
                ) : (
                  <ClipboardCheck className='w-3 h-3' />
                )}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
