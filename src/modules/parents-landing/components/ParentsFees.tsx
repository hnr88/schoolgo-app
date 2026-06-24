import { Check } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { CtaLink, SectionContainer, SectionHeader } from '@/modules/design-system';
import { FEES_INCLUDED_KEYS } from '../constants/fees.constants';

export async function ParentsFees() {
  const t = await getTranslations('ParentsFees');

  return (
    <section id='fees' className='bg-muted py-16 md:py-20'>
      <SectionContainer className='flex flex-col gap-10'>
        <SectionHeader
          className='max-w-2xl'
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subheading={t('body')}
        />

        <ul className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          {FEES_INCLUDED_KEYS.map((key) => (
            <li
              key={key}
              className='flex items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-1'
            >
              <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-rausch-50 text-primary'>
                <Check className='h-4 w-4' strokeWidth={2} aria-hidden='true' />
              </span>
              <span className='text-body-sm text-ink-900'>{t(`items.${key}`)}</span>
            </li>
          ))}
        </ul>

        <div className='flex flex-wrap gap-3'>
          <CtaLink href='/guides/school-fees' size='lg' arrow>
            {t('cta')}
          </CtaLink>
        </div>
      </SectionContainer>
    </section>
  );
}
