import type { ComponentType, SVGProps } from 'react';
import { FileSearch, Inbox, MessagesSquare, ShieldCheck } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Eyebrow, SectionContainer } from '@/modules/design-system';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const ITEMS: Array<{ key: 'email' | 'status' | 'trust' | 'requirements'; icon: IconComponent }> = [
  { key: 'email', icon: Inbox },
  { key: 'status', icon: MessagesSquare },
  { key: 'trust', icon: ShieldCheck },
  { key: 'requirements', icon: FileSearch },
];

export async function AgentsPainPoints() {
  const t = await getTranslations('AgentsPainPoints');
  return (
    <section className='bg-muted py-20 md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <div className='flex max-w-3xl flex-col gap-3'>
          <Eyebrow tone='brand'>{t('eyebrow')}</Eyebrow>
          <h2 className='font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-ink-900 md:text-5xl'>
            {t('heading')}
          </h2>
          <p className='text-body text-foggy md:text-lg'>{t('subheading')}</p>
        </div>

        <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
          {ITEMS.map(({ key, icon: Icon }) => (
            <article
              key={key}
              className='flex flex-col gap-3 rounded-lg border border-border bg-card p-6 shadow-2'
            >
              <span className='flex h-11 w-11 items-center justify-center rounded-pill bg-rausch-50 text-primary'>
                <Icon className='h-5 w-5' strokeWidth={1.75} aria-hidden='true' />
              </span>
              <h3 className='text-h4 font-semibold text-ink-900'>
                {t(`items.${key}.question`)}
              </h3>
              <p className='text-body-sm text-foggy'>{t(`items.${key}.answer`)}</p>
            </article>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
