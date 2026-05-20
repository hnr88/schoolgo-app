import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function ProcessStepperBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell id='steps' eyebrow='Steps' title='A simple path forward' description='Choose this block when the page needs sequence and action.'>
      <div className='grid gap-5 md:grid-cols-3'>
        {page.steps.map((step, index) => (
          <Link key={step.title} href={step.href ?? '#'} className='rounded-lg border border-border bg-card p-6 no-underline shadow-1 hover:shadow-3'>
            <span className='flex h-9 w-9 items-center justify-center rounded-pill bg-primary text-sm font-bold text-on-primary'>{index + 1}</span>
            <span className='mt-5 block text-lg font-semibold text-ink-900'>{step.title}</span>
            <span className='mt-2 block text-sm leading-6 text-foggy'>{step.description}</span>
            <span className='mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary'>Continue <ArrowRight className='h-4 w-4' aria-hidden='true' /></span>
          </Link>
        ))}
      </div>
    </BlockShell>
  );
}
