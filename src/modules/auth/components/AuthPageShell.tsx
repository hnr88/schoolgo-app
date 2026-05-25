import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { AuthPageShellProps } from '@/modules/auth/types/component.types';
import { PORTAL_THEME } from '../constants/portal.constants';

export async function AuthPageShell({ portal, children }: AuthPageShellProps) {
  const t = await getTranslations('Auth');
  const theme = PORTAL_THEME[portal];

  return (
    <div className='relative flex min-h-screen flex-col lg:flex-row'>
      {/* Skip link */}
      <a
        href='#auth-main-content'
        className='absolute left-4 top-4 z-50 -translate-y-20 rounded-lg bg-ink-900 px-4 py-3 text-sm font-semibold text-white transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
      >
        Skip to main content
      </a>

      {/* Left panel */}
      <main
        id='auth-main-content'
        className='relative flex w-full flex-1 flex-col bg-white lg:w-[50%] xl:w-[45%]'
      >
        {/* Header with logo */}
        <header className='flex items-center px-6 py-6 sm:px-10 lg:px-14 lg:py-8'>
          <Link
            href='/'
            aria-label='SchoolGo home'
            className='inline-flex items-center rounded-md transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
          >
            <Image
              src='/logos/logo-red.png'
              alt='SchoolGo'
              width={200}
              height={44}
              className='h-10 w-auto sm:h-11'
              priority
            />
          </Link>
        </header>

        {/* Form */}
        <div className='flex flex-1 items-start justify-center px-6 pb-10 pt-2 sm:px-10 lg:items-center lg:px-14 lg:pb-0 lg:pt-0'>
          <div className='w-full max-w-md'>{children}</div>
        </div>

        {/* Footer */}
        <footer className='px-6 pb-6 text-center text-xs text-foggy sm:px-10 lg:px-14 lg:pb-8 lg:text-left'>
          <p>&copy; {new Date().getFullYear()} SchoolGo Australia</p>
        </footer>
      </main>

      {/* Right panel */}
      <aside
        className='relative hidden overflow-hidden lg:block lg:w-[50%] xl:w-[55%]'
        aria-hidden='true'
      >
        <Image
          src={theme.image}
          alt=''
          fill
          className='object-cover'
          priority
          sizes='(min-width: 1024px) 50vw, 0vw'
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.overlayGradient} opacity-80`} />
        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent' />

        {/* Content overlay */}
        <div className='absolute inset-0 flex flex-col justify-between p-10 xl:p-16'>
          {/* Top tagline */}
          <div className='max-w-sm'>
            <p className='text-xl font-semibold leading-relaxed text-white/90 xl:text-2xl'>
              {t(`${portal}.signInTitle`)}
            </p>
            <p className='mt-2 text-sm text-white/60'>
              {t(`${portal}.signInSubtitle`)}
            </p>
          </div>

          {/* Stats */}
          <div className='flex flex-wrap gap-3'>
            {theme.stats.map((stat) => (
              <div
                key={stat.labelKey}
                className='rounded-xl bg-white/10 px-5 py-3.5 backdrop-blur-md'
              >
                <p className='text-xl font-bold text-white xl:text-2xl'>
                  {t(stat.valueKey)}
                </p>
                <p className='mt-0.5 text-xs font-medium text-white/70 xl:text-sm'>
                  {t(stat.labelKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
