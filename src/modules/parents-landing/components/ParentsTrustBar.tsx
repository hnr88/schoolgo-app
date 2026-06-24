import { Check } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { SectionContainer, SectionHeader } from '@/modules/design-system';
import { ABOUT_POINT_KEYS, TRUST_BAR_ITEMS } from '../constants/parents-landing.constants';

export async function ParentsTrustBar() {
  const t = await getTranslations('ParentsTrustBar');
  return (
    <section className='bg-ink-900 py-16 md:py-20'>
      <SectionContainer className='flex flex-col gap-10'>
        <div className='grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-10'>
          <SectionHeader
            theme='dark'
            eyebrow={t('eyebrow')}
            eyebrowTone='trust'
            heading={t('heading')}
            subheading={t('subheading')}
          />

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {TRUST_BAR_ITEMS.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className='flex gap-4 rounded-lg border border-background/10 bg-background/5 p-5'
              >
                <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-pill bg-babu-500/20 text-babu-100'>
                  <Icon className='h-5 w-5' strokeWidth={1.75} aria-hidden='true' />
                </span>
                <div className='flex flex-col gap-1'>
                  <span className='text-body-sm font-semibold text-background'>
                    {t(`items.${key}.label`)}
                  </span>
                  <span className='text-caption leading-relaxed text-background/50'>
                    {t(`items.${key}.description`)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className='border-t border-background/10 pt-6 text-caption text-background/55'>
          {t('attribution')}
        </p>

        <div className='rounded-xl border border-background/10 bg-background/5 p-6 md:p-8'>
          <h3 className='font-display text-h3 font-bold text-background'>{t('about.heading')}</h3>
          <p className='mt-3 text-body text-background/75'>{t('about.intro')}</p>
          <ul className='mt-4 flex flex-col gap-2'>
            {ABOUT_POINT_KEYS.map((key) => (
              <li
                key={key}
                className='flex items-start gap-3 text-body-sm text-background/80'
              >
                <Check
                  className='mt-0.5 h-4 w-4 shrink-0 text-babu-300'
                  strokeWidth={2}
                  aria-hidden='true'
                />
                {t(`about.points.${key}`)}
              </li>
            ))}
          </ul>
          <p className='mt-4 text-body-sm text-background/65'>{t('about.closing')}</p>
        </div>
      </SectionContainer>
    </section>
  );
}
