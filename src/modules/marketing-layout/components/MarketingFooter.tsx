import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { portalUrl } from '@/lib/portal-url';
import { SectionContainer } from '@/modules/design-system';
import type { MarketingFooterProps } from '@/modules/marketing-layout/types/footer.types';
import { COLUMNS, LANGUAGES } from '../constants/footer.constants';

export async function MarketingFooter({ activePortal }: MarketingFooterProps) {
  const [t, locale] = await Promise.all([
    getTranslations('MarketingFooter'),
    getLocale(),
  ]);
  const year = new Date().getFullYear();

  return (
    <footer className='bg-ink-900 text-white/80'>
      <SectionContainer size='wide' className='pt-16 pb-8 md:pt-20 md:pb-8'>
        <div className='flex flex-col justify-between gap-12 md:flex-row'>
          <div className='flex max-w-xs shrink-0 flex-col gap-5'>
            <a
              href={portalUrl(activePortal, locale)}
              className='inline-flex items-center gap-2.5'
              aria-label='SchoolGo home'
            >
              <Image
                src='/logos/logo-white.png'
                alt='SchoolGo'
                width={180}
                height={40}
                className='h-10 w-auto'
              />
            </a>
            <p className='text-sm leading-relaxed text-white/60'>{t('tagline')}</p>
            <p className='text-xs text-white/40'>{t('attribution')}</p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.key} className='flex flex-col gap-4'>
              <p className='text-xs font-semibold uppercase tracking-widest text-white/50'>
                {t(`columns.${col.key}.title`)}
              </p>
              <ul className='flex flex-col gap-2.5'>
                {col.links.map((l) => (
                  <li key={l.key}>
                    <a
                      href={`${portalUrl(col.portal, locale)}${l.path === '/' ? '' : l.path}`}
                      className='text-sm text-white/70 no-underline transition-colors hover:text-white'
                    >
                      {t(`columns.${col.key}.links.${l.key}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className='flex flex-col gap-4'>
            <p className='text-xs font-semibold uppercase tracking-widest text-white/50'>
              {t('language')}
            </p>
            <ul className='flex flex-col gap-2.5'>
              {LANGUAGES.filter((l) =>
                routing.locales.includes(l.code as (typeof routing.locales)[number]),
              ).map((lang) => (
                <li key={lang.code}>
                  <Link
                    href='/'
                    locale={lang.code as (typeof routing.locales)[number]}
                    className='inline-flex items-center gap-2 text-sm text-white/70 no-underline transition-colors hover:text-white'
                  >
                    <Image
                      src={`/flags/${lang.code}.svg`}
                      alt=''
                      width={20}
                      height={14}
                      className='h-3.5 w-5 rounded-sm'
                      aria-hidden='true'
                    />
                    {lang.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='mt-14 flex justify-center border-t border-white/10 pt-8'>
          <p className='text-sm text-white/60' style={{ fontFamily: 'system-ui, sans-serif' }}>
            {t('copyright', { year })}
          </p>
        </div>
      </SectionContainer>
    </footer>
  );
}
