import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function KeyFactRowsBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell id='proof' eyebrow='Key facts' title='Details at a glance' description='Rows are useful when users need quick scanning before deeper content.'>
      <dl className='divide-y divide-divider rounded-lg border border-border bg-card shadow-1'>
        {page.facts.map((fact) => (
          <div key={fact.label} className='grid gap-2 p-5 md:grid-cols-3'>
            <dt className='text-sm font-semibold text-foggy'>{fact.label}</dt>
            <dd className='md:col-span-2 font-semibold text-ink-900'>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </BlockShell>
  );
}
