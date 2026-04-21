import { Quote } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { SectionContainer } from '@/modules/design-system';

export async function AgentsTestimonial() {
  const t = await getTranslations('AgentsTestimonial');
  return (
    <section className='py-20 md:py-28'>
      <SectionContainer className='flex flex-col items-center gap-6 text-center'>
        <Quote className='h-10 w-10 text-primary' strokeWidth={1.25} aria-hidden='true' />
        <blockquote className='max-w-3xl font-display text-2xl font-medium leading-[1.35] tracking-[-0.01em] text-ink-900 md:text-4xl'>
          &ldquo;{t('quote')}&rdquo;
        </blockquote>
        <cite className='not-italic text-body-sm text-foggy'>— {t('attribution')}</cite>
      </SectionContainer>
    </section>
  );
}
