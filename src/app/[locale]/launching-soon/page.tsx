import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Rocket } from 'lucide-react';

export default async function LaunchingSoonPage() {
  const t = await getTranslations('LaunchingSoon');

  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6'>
      <div className='pointer-events-none absolute inset-0' aria-hidden='true'>
        <div className='absolute inset-0 bg-gradient-to-br from-rausch-50/40 via-white to-babu-50/20' />
        <div className='absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full bg-rausch-200 opacity-20 blur-[160px]' />
        <div className='absolute -left-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-babu-100 opacity-25 blur-[140px]' />
        <svg className='absolute inset-0 h-full w-full opacity-[0.04]'>
          <defs>
            <pattern id='ls-dots' width='32' height='32' patternUnits='userSpaceOnUse'>
              <circle cx='2' cy='2' r='1' fill='currentColor' />
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#ls-dots)' />
        </svg>
      </div>

      <div className='relative flex max-w-lg flex-col items-center text-center'>
        <Image
          src='/logos/logo-red.png'
          alt='SchoolGo'
          width={160}
          height={36}
          className='mb-10 h-9 w-auto'
          priority
        />

        <div className='mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-rausch-50'>
          <Rocket className='h-10 w-10 text-rausch-500' />
        </div>

        <h1 className='font-display text-3xl font-bold text-ink-900 sm:text-4xl'>
          {t('title')}
        </h1>
        <p className='mt-3 text-base leading-relaxed text-foggy'>
          {t('subtitle')}
        </p>

        <p className='mt-8 text-sm text-quill'>
          {t('stayTuned')}
        </p>
      </div>
    </div>
  );
}
