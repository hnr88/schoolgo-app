import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { AuthCloseButton } from '@/modules/auth/components/AuthCloseButton';
import type { AuthPageShellProps } from '@/modules/auth/types/component.types';
import { PORTAL_NAV, PORTAL_THEME } from '../constants/portal.constants';

export async function AuthPageShell({ portal, children }: AuthPageShellProps) {
  const [t, locale] = await Promise.all([
    getTranslations('Auth'),
    getLocale(),
  ]);
  const theme = PORTAL_THEME[portal];
  const landingPath = `/${locale}/${portal}`;
  const navItems = PORTAL_NAV[portal];

  return (
    <main className='flex min-h-screen bg-muted/50 lg:p-8'>
      <div
        className={`flex min-h-0 w-full flex-col overflow-hidden lg:flex-row lg:rounded-4xl lg:shadow-xl ${theme.gradient}`}
      >
        <div className='relative flex w-full flex-col lg:w-[45%]'>
          <div
            className='pointer-events-none absolute inset-0 overflow-hidden'
            aria-hidden='true'
          >
            <svg className='absolute inset-0 h-full w-full opacity-[0.04]'>
              <defs>
                <pattern
                  id='auth-grid'
                  width='20'
                  height='20'
                  patternUnits='userSpaceOnUse'
                >
                  <circle cx='10' cy='10' r='0.6' fill='currentColor' />
                </pattern>
              </defs>
              <rect width='100%' height='100%' fill='url(#auth-grid)' />
            </svg>
          </div>

          <div className='relative flex items-center justify-between px-6 pt-8 lg:px-16 xl:px-24'>
            <nav className='flex items-center gap-6'>
              {navItems.map((item) => (
                <a
                  key={item.hash}
                  href={`${landingPath}${item.hash}`}
                  className='text-sm font-medium text-foggy transition-colors hover:text-ink-900'
                >
                  {t(`nav.${portal}.${item.labelKey}`)}
                </a>
              ))}
            </nav>
            <AuthCloseButton className='lg:hidden' />
          </div>

          <div className='relative flex flex-1 flex-col justify-center px-6 py-8 lg:px-16 xl:px-24'>
            <div className='mx-auto w-full max-w-md'>{children}</div>
          </div>
        </div>

        <div className='relative hidden lg:flex lg:w-[55%] lg:p-12'>
          <svg className='absolute h-0 w-0' aria-hidden='true' focusable='false'>
            <defs>
              <clipPath id='auth-image-cutout' clipPathUnits='objectBoundingBox'>
                <path d='M 0.032 0 H 0.878 C 0.896 0 0.91 0.018 0.91 0.04 V 0.048 Q 0.91 0.092 0.95 0.092 H 0.968 Q 1 0.092 1 0.13 V 0.96 Q 1 1 0.968 1 H 0.032 Q 0 1 0 0.96 V 0.04 Q 0 0 0.032 0 Z' />
              </clipPath>
              <clipPath id='auth-image-cutout-below-1450' clipPathUnits='objectBoundingBox'>
                <path d='M 0.032 0 H 0.848 C 0.866 0 0.88 0.018 0.88 0.04 V 0.048 Q 0.88 0.092 0.92 0.092 H 0.938 Q 1 0.092 1 0.13 V 0.96 Q 1 1 0.968 1 H 0.032 Q 0 1 0 0.96 V 0.04 Q 0 0 0.032 0 Z' />
              </clipPath>
              <clipPath id='auth-image-cutout-below-1220' clipPathUnits='objectBoundingBox'>
                <path d='M 0.032 0 H 0.828 C 0.846 0 0.86 0.018 0.86 0.04 V 0.048 Q 0.86 0.092 0.9 0.092 H 0.918 Q 1 0.092 1 0.13 V 0.96 Q 1 1 0.968 1 H 0.032 Q 0 1 0 0.96 V 0.04 Q 0 0 0.032 0 Z' />
              </clipPath>
            </defs>
          </svg>

          <div className='relative h-full w-full drop-shadow-2xl'>
            <AuthCloseButton className='absolute right-3 top-1 z-20' />
            <div className='relative h-full w-full overflow-hidden [clip-path:url(#auth-image-cutout)] [-webkit-clip-path:url(#auth-image-cutout)] max-[1449px]:[clip-path:url(#auth-image-cutout-below-1450)] max-[1449px]:[-webkit-clip-path:url(#auth-image-cutout-below-1450)] max-[1220px]:[clip-path:url(#auth-image-cutout-below-1220)] max-[1220px]:[-webkit-clip-path:url(#auth-image-cutout-below-1220)]'>
              <Image
                src={theme.image}
                alt=''
                fill
                className='object-cover'
                priority
                sizes='55vw'
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${theme.overlayGradient} mix-blend-multiply`}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent' />
              <div className='absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/30 to-transparent' />

              <div className='absolute bottom-8 left-8 right-8'>
                <div className='flex gap-4'>
                  {theme.stats.map((stat) => (
                    <div
                      key={stat.labelKey}
                      className='rounded-2xl bg-white/15 px-5 py-3.5 backdrop-blur-md'
                    >
                      <p className='text-2xl font-bold text-white'>{t(stat.valueKey)}</p>
                      <p className='text-sm text-white/70'>{t(stat.labelKey)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
