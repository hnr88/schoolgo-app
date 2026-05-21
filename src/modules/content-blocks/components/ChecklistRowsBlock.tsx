import { CheckCircle2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function ChecklistRowsBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell eyebrow='Checklist' title='Decision checklist' description='Use this block for documents, enrolment readiness, safety, or arrival planning.'>
      <div className='divide-y divide-divider rounded-lg border border-border bg-card shadow-1'>
        {page.checklist.map((item, index) => (
          <Link key={item.label} href={item.href ?? '/resources'} className='group flex gap-4 p-5 no-underline transition-colors hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rausch-700'>
            <CheckCircle2 className='mt-1 h-5 w-5 shrink-0 text-babu-700' aria-hidden='true' />
            <span>
              <span className='flex flex-wrap items-center gap-2'>
                <span className='font-semibold text-ink-900'>{item.label}</span>
                <span className='text-xs font-semibold uppercase text-foggy'>{page.proofPoints[index]?.confidence ?? 'Ready'}</span>
              </span>
              <span className='mt-1 block text-sm leading-6 text-hof'>{item.detail}</span>
              {page.proofPoints[index] ? (
                <span className='mt-3 block rounded-lg bg-muted p-3 text-xs leading-5 text-foggy group-hover:bg-background'>
                  {page.proofPoints[index].detail}
                </span>
              ) : null}
            </span>
          </Link>
        ))}
      </div>
    </BlockShell>
  );
}
