import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Search } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations('Errors');

  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6'>
      <div className='pointer-events-none absolute inset-0' aria-hidden='true'>
        <div className='absolute inset-0 bg-gradient-to-br from-babu-50/40 via-white to-rausch-50/20' />
        <div className='absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full bg-babu-200 opacity-20 blur-[160px]' />
        <div className='absolute -left-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-rausch-100 opacity-25 blur-[140px]' />
        <svg className='absolute inset-0 h-full w-full opacity-[0.04]'>
          <defs>
            <pattern id='nf-dots' width='32' height='32' patternUnits='userSpaceOnUse'>
              <circle cx='2' cy='2' r='1' fill='currentColor' />
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#nf-dots)' />
        </svg>
      </div>

      <div className='relative flex max-w-lg flex-col items-center text-center'>
        <Link href='/' className='mb-10' aria-label='SchoolGo home'>
          <Image
            src='/logos/logo-red.png'
            alt='SchoolGo'
            width={160}
            height={36}
            className='h-9 w-auto'
          />
        </Link>

        <p className='mb-4 font-display text-8xl font-bold tracking-tight text-babu-500/20 sm:text-9xl'>
          {t('notFoundCode')}
        </p>

        <h1 className='font-display text-3xl font-bold text-ink-900 sm:text-4xl'>
          {t('notFound')}
        </h1>
        <p className='mt-3 text-base leading-relaxed text-foggy'>
          {t('notFoundSubtitle')}
        </p>

        <div className='mt-10 flex flex-col gap-3 sm:flex-row'>
          <Link
            href='/'
            className={buttonVariants({ className: 'h-auto rounded-xl px-8 py-3 text-sm font-semibold shadow-brand' })}
          >
            {t('goHome')}
          </Link>
          <Link
            href='/search'
            className={buttonVariants({ variant: 'outline', className: 'h-auto rounded-xl px-8 py-3 text-sm font-semibold' })}
          >
            <Search className='mr-2 h-4 w-4' />
            {t('searchInstead')}
          </Link>
        </div>
      </div>
    </div>
  );
}
