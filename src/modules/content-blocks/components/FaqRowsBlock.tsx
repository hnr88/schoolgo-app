import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function FaqRowsBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell eyebrow='FAQ' title='Questions and answers' description='Use this block for policy, support, fees, admissions, and onboarding content.'>
      <div className='divide-y divide-divider rounded-lg border border-border bg-card shadow-1'>
        {page.faqs.map((item) => (
          <details key={item.question} className='p-5'>
            <summary className='cursor-pointer list-none text-base font-semibold text-ink-900'>{item.question}</summary>
            <p className='mt-3 text-sm leading-6 text-foggy'>{item.answer}</p>
          </details>
        ))}
      </div>
    </BlockShell>
  );
}
