import { Quote } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { SectionContainer } from '@/modules/design-system';

export async function SchoolsTestimonial() {
  const t = await getTranslations('SchoolsTestimonial');
  return (
    <section className='bg-muted py-16 md:py-20'>
      <SectionContainer className='flex flex-col items-center gap-8 text-center'>
          <Quote className='h-10 w-10 text-primary' strokeWidth={1.5} aria-hidden='true' />
          <blockquote className='max-w-3xl font-display text-2xl font-medium leading-relaxed tracking-tight text-ink-900 md:text-4xl'>
          &ldquo;{t('quote')}&rdquo;
        </blockquote>
        <cite className='not-italic text-body-sm text-foggy'>{t('attribution')}</cite>
      </SectionContainer>
    </section>
  );
}
