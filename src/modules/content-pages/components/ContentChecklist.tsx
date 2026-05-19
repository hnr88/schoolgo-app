import { CheckCircle2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SectionContainer, SectionHeader } from '@/modules/design-system';
import type { ContentChecklistItem } from '@/modules/content-pages/types/content-pages.types';

export function ContentChecklist({ items }: { items: ContentChecklistItem[] }) {
  return (
    <section id='checklist' className='bg-background py-16 md:py-24'>
      <SectionContainer>
        <SectionHeader
          eyebrow='Checklist'
          heading='What to confirm before the next conversation'
          subheading='Checklist blocks are reusable across admissions, fees, safety, onboarding, and partner pages.'
        />
        <div className='mt-8 divide-y divide-divider rounded-lg border border-border bg-card shadow-1'>
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href ?? '#'}
              className='flex gap-4 p-5 no-underline hover:bg-muted'
            >
              <CheckCircle2 className='h-5 w-5 text-babu-700' aria-hidden='true' />
              <span>
                <span className='block font-semibold text-ink-900'>{item.label}</span>
                <span className='mt-1 block text-sm leading-6 text-foggy'>{item.detail}</span>
              </span>
            </Link>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
