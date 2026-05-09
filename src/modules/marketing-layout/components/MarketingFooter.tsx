import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { portalUrl } from '@/lib/portal-url';
import { SectionContainer } from '@/modules/design-system';
import type { MarketingFooterProps } from '@/modules/marketing-layout/types/footer.types';
import { FOOTER_COLUMNS_BY_PORTAL, LANGUAGES } from '../constants/footer.constants';
import { AUDIENCES } from '../constants/sub-header.constants';

export async function MarketingFooter({ activePortal }: MarketingFooterProps) {
  const [t, locale] = await Promise.all([
    getTranslations('MarketingFooter'),
    getLocale(),
  ]);
  const year = new Date().getFullYear();
  const footerColumns = FOOTER_COLUMNS_BY_PORTAL[activePortal];

  return (
    <footer className='bg-ink-900 text-white/80'>
      <SectionContainer size='wide' className='pb-8 pt-14 md:pb-8 md:pt-20'>
        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:flex lg:gap-12'>
          <div className='flex max-w-sm flex-col items-center gap-5 text-center sm:col-span-2 sm:items-start sm:text-left lg:w-60 lg:shrink-0'>
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

          {footerColumns.map((col, index) => (
            <div key={index} className='flex min-w-0 flex-col items-center gap-3 text-center sm:items-start sm:text-left lg:flex-1'>
              <ul className='flex flex-col items-center gap-2.5 sm:items-start'>
                {col.links.map((l) => (
                  <li key={`${l.path}-${'label' in l ? l.label : l.linkKey}`}>
                    <a
                      href={`${portalUrl(col.portal ?? activePortal, locale)}${l.path === '/' ? '' : l.path}`}
                      className='text-sm leading-snug text-white/70 no-underline transition-colors hover:text-white'
                    >
                      {'label' in l ? l.label : t(`columns.${l.columnKey}.links.${l.linkKey}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className='flex min-w-0 flex-col items-center gap-4 text-center sm:items-start sm:text-left lg:w-48 lg:shrink-0'>
            <p className='text-xs font-semibold uppercase tracking-widest text-white/50'>
              {t('language')}
            </p>
            <ul className='grid grid-cols-1 justify-items-center gap-2.5 sm:justify-items-start'>
              {LANGUAGES.filter((l) =>
                routing.locales.includes(l.code as (typeof routing.locales)[number]),
              ).map((lang) => (
                <li key={lang.code}>
                  <Link
                    href='/'
                    locale={lang.code as (typeof routing.locales)[number]}
                    className='inline-flex max-w-full items-center gap-2 text-sm leading-snug text-white/70 no-underline transition-colors hover:text-white'
                  >
                    <Image
                      src={`/flags/${lang.code}.svg`}
                      alt=''
                      width={20}
                      height={14}
                      className='h-3.5 w-5 shrink-0 rounded-sm'
                      aria-hidden='true'
                    />
                    <span className='min-w-0'>{lang.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='mx-auto mt-12 flex max-w-xl flex-col items-center gap-3 border-t border-white/10 pt-7 text-center'>
          <p className='text-xs font-semibold uppercase tracking-widest text-white/50'>
            {t('portals')}
          </p>
          <nav
            aria-label='Portals'
            className='flex flex-wrap items-center justify-center gap-2'
          >
            {AUDIENCES.map((a) => {
              const isActive = a.portal === activePortal;
              return (
                <a
                  key={a.key}
                  href={portalUrl(a.portal, locale)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`rounded-pill border px-3 py-1 text-sm leading-none no-underline transition-colors ${
                    isActive
                      ? 'border-white/25 bg-white/10 font-semibold text-white'
                      : 'border-white/10 text-white/60 hover:border-white/25 hover:text-white/85'
                  }`}
                >
                  {t(`portalLabels.${a.key}`)}
                </a>
              );
            })}
          </nav>
        </div>

        <div className='mt-8 flex justify-center'>
          <p className='font-sans text-sm text-white/60'>
            {t('copyright', { year })}
          </p>
        </div>
      </SectionContainer>
    </footer>
  );
}
