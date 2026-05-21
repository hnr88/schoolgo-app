import { Link } from '@/i18n/navigation';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function KeyFactRowsBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell id='proof' eyebrow='Key facts' title='Details at a glance' description='Rows are useful when users need quick scanning before deeper content.'>
      <div className='grid gap-5 lg:grid-cols-5'>
        <aside className='rounded-lg border border-border bg-card p-6 shadow-2 lg:col-span-2'>
          <p className='text-xs font-semibold uppercase text-rausch-700'>Summary</p>
          <h3 className='mt-4 text-xl font-semibold text-ink-900'>{page.aiSummary.intent}</h3>
          <p className='mt-3 text-sm leading-6 text-hof'>{page.aiSummary.answer}</p>
          <p className='mt-5 border-t border-divider pt-4 text-sm leading-6 text-hof'>
            {page.aiSummary.entities.join(', ')}
          </p>
        </aside>
        <dl className='divide-y divide-divider rounded-lg border border-border bg-card shadow-1 lg:col-span-3'>
          {page.facts.map((fact) => (
            <div key={fact.label} className='grid gap-2 p-5 transition-colors hover:bg-muted md:grid-cols-3'>
              <dt className='text-sm font-semibold text-foggy'>{fact.label}</dt>
              <dd className='font-semibold text-ink-900 md:col-span-2'>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className='mt-5 flex flex-wrap gap-3'>
        {page.aiSummary.followUps.map((link) => (
          <Link key={link.href} href={link.href} className='rounded-pill border border-border bg-card px-4 py-2 text-sm font-semibold text-hof no-underline transition-colors hover:bg-muted'>
            {link.label}
          </Link>
        ))}
      </div>
    </BlockShell>
  );
}
