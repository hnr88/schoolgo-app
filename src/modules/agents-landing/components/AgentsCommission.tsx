import type { ComponentType, SVGProps } from 'react';
import { FileSearch, Handshake, PiggyBank } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { SectionContainer, SectionHeader } from '@/modules/design-system';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const BULLETS: Array<{ key: 'zero' | 'direct' | 'audit'; icon: IconComponent }> = [
  { key: 'zero', icon: PiggyBank },
  { key: 'direct', icon: Handshake },
  { key: 'audit', icon: FileSearch },
];

export async function AgentsCommission() {
  const t = await getTranslations('AgentsCommission');
  return (
    <section className='bg-ink-900 py-20 text-background md:py-28'>
      <SectionContainer className='grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16'>
        <div className='flex flex-col gap-6 md:col-span-6'>
          <SectionHeader
            theme='dark'
            eyebrow={t('eyebrow')}
            heading={t('heading')}
            subheading={t('subheading')}
          />
          <ul className='mt-4 flex flex-col gap-4'>
            {BULLETS.map(({ key, icon: Icon }) => (
              <li key={key} className='flex gap-4'>
                <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-background/10 text-background'>
                  <Icon className='h-5 w-5' strokeWidth={1.75} aria-hidden='true' />
                </span>
                <div className='flex flex-col gap-1'>
                  <h3 className='text-h4 font-semibold text-background'>
                    {t(`bullets.${key}.title`)}
                  </h3>
                  <p className='text-body-sm text-background/70'>
                    {t(`bullets.${key}.description`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className='md:col-span-6'>
          <div className='rounded-2xl border border-background/10 bg-background/5 p-8 shadow-3 md:p-10'>
            <p className='font-display text-6xl font-extrabold tracking-[-0.025em] text-background md:text-7xl'>
              {t('statValue')}
            </p>
            <p className='mt-3 max-w-xs text-body-sm text-background/70'>{t('statLabel')}</p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
