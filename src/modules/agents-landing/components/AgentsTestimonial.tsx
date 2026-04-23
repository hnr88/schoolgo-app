import { Quote } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { SectionContainer } from '@/modules/design-system';

const ITEM_KEYS = ['a', 'b', 'c'] as const;

export async function AgentsTestimonial() {
  const t = await getTranslations('AgentsTestimonial');
  return (
    <section className='py-20 md:py-28'>
      <SectionContainer className='flex flex-col gap-10'>
        <div className='flex flex-col gap-3'>
          <span className='text-xs font-semibold uppercase tracking-widest text-primary'>
            {t('eyebrow')}
          </span>
          <h2 className='font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink-900 md:text-5xl'>
            {t('heading')}
          </h2>
        </div>

        <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
          {ITEM_KEYS.map((key) => (
            <article
              key={key}
              className='flex flex-col gap-4 rounded-2xl border border-border bg-card p-8 shadow-2'
            >
              <Quote className='h-8 w-8 text-primary' strokeWidth={1.25} aria-hidden='true' />
              <blockquote className='flex-1 text-body leading-relaxed text-ink-900'>
                &ldquo;{t(`items.${key}.quote`)}&rdquo;
              </blockquote>
              <footer className='flex flex-col gap-1 border-t border-divider pt-4'>
                <cite className='not-italic text-body-sm font-medium text-ink-900'>
                  {t(`items.${key}.attribution`)}
                </cite>
                <span className='text-xs text-foggy'>
                  {t(`items.${key}.meta`)}
                </span>
              </footer>
            </article>
          ))}
        </div>

        <p className='text-center text-xs text-foggy'>
          {t('disclaimer')}
        </p>
      </SectionContainer>
    </section>
  );
}
