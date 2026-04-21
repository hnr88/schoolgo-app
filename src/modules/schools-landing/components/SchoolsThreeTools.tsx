import type { ComponentType, SVGProps } from 'react';
import { FileText, Inbox, IdCard } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Eyebrow, SectionContainer } from '@/modules/design-system';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const TOOLS: Array<{ key: 'profile' | 'applications' | 'inbox'; icon: IconComponent }> = [
  { key: 'profile', icon: IdCard },
  { key: 'applications', icon: FileText },
  { key: 'inbox', icon: Inbox },
];

export async function SchoolsThreeTools() {
  const t = await getTranslations('SchoolsThreeTools');
  return (
    <section id='how-it-works' className='py-20 md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <div className='flex max-w-3xl flex-col gap-3'>
          <Eyebrow tone='brand'>{t('eyebrow')}</Eyebrow>
          <h2 className='font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-ink-900 md:text-5xl'>
            {t('heading')}
          </h2>
          <p className='text-body text-foggy md:text-lg'>{t('subheading')}</p>
        </div>

        <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
          {TOOLS.map(({ key, icon: Icon }) => (
            <article
              key={key}
              className='flex flex-col gap-4 rounded-lg border border-border bg-card p-6 shadow-2 md:p-8'
            >
              <span className='flex h-12 w-12 items-center justify-center rounded-pill bg-rausch-50 text-primary'>
                <Icon className='h-5 w-5' strokeWidth={1.75} aria-hidden='true' />
              </span>
              <h3 className='text-h3 font-semibold text-ink-900'>{t(`tools.${key}.title`)}</h3>
              <p className='text-body-sm text-foggy'>{t(`tools.${key}.description`)}</p>
            </article>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
