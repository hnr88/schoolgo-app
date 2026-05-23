import { ChevronDown } from 'lucide-react';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function FaqRowsBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell eyebrow='FAQ' title='Questions and answers' description='Use this block for policy, support, fees, admissions, and onboarding content.' tone='brand'>
      <div className='grid gap-5 lg:grid-cols-3'>
        <aside className='rounded-lg border border-border bg-card p-6 shadow-2 lg:col-span-1'>
          <p className='text-xs font-semibold uppercase text-rausch-700'>Answer support</p>
          <h3 className='mt-4 text-lg font-semibold text-ink-900'>Answer-ready content</h3>
          <p className='mt-2 text-sm leading-6 text-hof'>{page.aiSummary.answer}</p>
        </aside>
        <div className='divide-y divide-divider rounded-lg border border-border bg-card shadow-1 lg:col-span-2'>
        {page.faqs.map((item, index) => (
          <details key={item.question} className='group p-6'>
            <summary className='flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink-900'>
              <span>{item.question}</span>
              <span className='flex items-center gap-2'>
                <span className='text-xs font-semibold uppercase text-foggy'>{page.searchSignals[index]?.value ?? 'FAQ'}</span>
                <ChevronDown className='h-4 w-4 text-foggy transition-transform group-open:rotate-180' aria-hidden='true' />
              </span>
            </summary>
            <p className='mt-3 text-sm leading-6 text-hof'>{item.answer}</p>
          </details>
        ))}
        </div>
      </div>
    </BlockShell>
  );
}
