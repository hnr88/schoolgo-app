import { ChevronDown } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { SectionContainer } from '@/modules/design-system';

const FAQ_KEYS = [
  'free',
  'dataSource',
  'englishTests',
  'agentCommission',
  'claimProfile',
  'updateFrequency',
] as const;

export async function ParentsFaq() {
  const t = await getTranslations('ParentsFaq');
  return (
    <section className='bg-muted py-20 md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <h2 className='font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-ink-900 md:text-5xl'>
          {t('heading')}
        </h2>
        <dl className='flex flex-col divide-y divide-border'>
          {FAQ_KEYS.map((key) => (
            <details key={key} className='group py-5 first:pt-0 last:pb-0'>
              <summary className='flex cursor-pointer list-none items-center justify-between gap-4 text-h4 font-semibold text-ink-900 [&::-webkit-details-marker]:hidden'>
                {t(`items.${key}.question`)}
                <ChevronDown
                  className='h-5 w-5 shrink-0 text-foggy transition-transform duration-200 group-open:rotate-180'
                  strokeWidth={2}
                  aria-hidden='true'
                />
              </summary>
              <p className='mt-3 max-w-3xl text-body text-foggy md:text-lg'>
                {t(`items.${key}.answer`)}
              </p>
            </details>
          ))}
        </dl>
      </SectionContainer>
    </section>
  );
}
