import type { ComponentType, SVGProps } from 'react';
import { Database, Lock, School, ShieldCheck } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { SectionContainer } from '@/modules/design-system';

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
    <section className='border-y border-border bg-muted py-10 md:py-12'>
      <SectionContainer className='flex flex-col gap-6'>
        <div className='grid grid-cols-2 gap-6 md:grid-cols-4'>
          {ITEMS.map(({ key, icon: Icon }) => (
            <div key={key} className='flex items-center gap-3'>
              <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-pill bg-babu-50 text-babu-700'>
                <Icon className='h-5 w-5' strokeWidth={1.75} aria-hidden='true' />
              </span>
              <div className='flex flex-col'>
                <span className='text-body-sm font-semibold text-ink-900'>
                  {t(`items.${key}.label`)}
                </span>
                <span className='text-caption text-foggy'>{t(`items.${key}.sublabel`)}</span>
              </div>
            </div>
          ))}
        </div>
        <p className='text-caption text-foggy'>{t('attribution')}</p>
      </SectionContainer>
    </section>
  );
}
