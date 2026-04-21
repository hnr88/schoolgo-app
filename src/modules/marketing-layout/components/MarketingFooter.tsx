import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { SectionContainer } from '@/modules/design-system';

const COLUMNS = [
  {
    key: 'parents' as const,
    links: [
      { key: 'findSchools', href: '/search' },
      { key: 'compare', href: '/search' },
      { key: 'scholarships', href: '/search' },
      { key: 'english', href: '/search' },
    ],
  },
  {
    key: 'agents' as const,
    links: [
      { key: 'overview', href: '/agents' },
      { key: 'qeac', href: '/agents' },
      { key: 'pipeline', href: '/agents' },
      { key: 'login', href: '/agents' },
    ],
  },
  {
    key: 'schools' as const,
    links: [
      { key: 'overview', href: '/schools' },
      { key: 'claim', href: '/schools' },
      { key: 'login', href: '/schools' },
      { key: 'pricing', href: '/schools' },
    ],
  },
  {
    key: 'resources' as const,
    links: [
      { key: 'help', href: '/' },
      { key: 'contact', href: '/' },
      { key: 'privacy', href: '/' },
      { key: 'terms', href: '/' },
    ],
  },
];

const LANGUAGES: Array<{ code: string; label: string }> = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '简体中文' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'ko', label: '한국어' },
  { code: 'ms', label: 'Bahasa Melayu' },
  { code: 'th', label: 'ภาษาไทย' },
];

export async function MarketingFooter() {
  const t = await getTranslations('MarketingFooter');
  const year = new Date().getFullYear();

  return (
    <footer className='border-t border-divider bg-muted'>
      <SectionContainer className='py-16 md:py-20'>
        <div className='grid gap-10 md:grid-cols-12 md:gap-8'>
          <div className='flex flex-col gap-4 md:col-span-4'>
            <Link href='/' className='inline-flex' aria-label='SchoolGo home'>
              <Image
                src='/ds/logos/logo-black.png'
                alt='SchoolGo'
                width={140}
                height={32}
                className='h-8 w-auto'
              />
            </Link>
            <p className='max-w-xs text-body-sm text-foggy'>{t('tagline')}</p>
            <p className='text-caption text-foggy'>{t('attribution')}</p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.key} className='flex flex-col gap-3 md:col-span-2'>
              <p
                className='text-label font-semibold uppercase text-ink-900'
                style={{ letterSpacing: '0.08em' }}
              >
                {t(`columns.${col.key}.title`)}
              </p>
              <ul className='flex flex-col gap-2'>
                {col.links.map((l) => (
                  <li key={l.key}>
                    <Link
                      href={l.href}
                      className='text-body-sm text-foggy no-underline transition-colors hover:text-primary'
                    >
                      {t(`columns.${col.key}.links.${l.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='mt-12 flex flex-col gap-4 border-t border-border pt-8 md:flex-row md:items-center md:justify-between'>
          <div className='flex flex-wrap items-center gap-3'>
            <span
              className='text-label font-semibold uppercase text-foggy'
              style={{ letterSpacing: '0.08em' }}
            >
              {t('language')}
            </span>
            {LANGUAGES.filter((l) =>
              routing.locales.includes(l.code as (typeof routing.locales)[number]),
            ).map((lang) => (
              <Link
                key={lang.code}
                href='/'
                locale={lang.code as (typeof routing.locales)[number]}
                className='inline-flex items-center gap-2 text-body-sm text-foggy no-underline transition-colors hover:text-primary'
              >
                <Image
                  src={`/ds/flags/${lang.code}.svg`}
                  alt=''
                  width={20}
                  height={14}
                  className='h-3.5 w-5 rounded-sm'
                />
                {lang.label}
              </Link>
            ))}
          </div>
          <p className='text-caption text-foggy'>{t('copyright', { year })}</p>
        </div>
      </SectionContainer>
    </footer>
  );
}
