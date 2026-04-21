import type { ComponentType, SVGProps } from 'react';
import { Database, Lock, School, ShieldCheck } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { SectionContainer, SectionHeader } from '@/modules/design-system';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const ITEMS: Array<{ key: 'cricos' | 'datagov' | 'acara' | 'esos'; icon: IconComponent }> = [
  { key: 'cricos', icon: ShieldCheck },
  { key: 'datagov', icon: Database },
  { key: 'acara', icon: School },
  { key: 'esos', icon: Lock },
];

export async function ParentsTrustBar() {
  const t = await getTranslations('ParentsTrustBar');
  return (
    <section className='bg-ink-900 py-20 md:py-28'>
      <SectionContainer className='flex flex-col gap-12'>
        <div className='grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16'>
          <SectionHeader
            theme='dark'
            eyebrow={t('eyebrow')}
            eyebrowTone='trust'
            heading={t('heading')}
            subheading={t('subheading')}
          />

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {ITEMS.map(({ key, icon: Icon }) => (
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

        <p className='border-t border-background/10 pt-6 text-caption text-background/30'>
          {t('attribution')}
        </p>
      </SectionContainer>
    </section>
  );
}
