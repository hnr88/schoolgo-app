import { CheckCircle2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function ChecklistRowsBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell eyebrow='Checklist' title='Decision checklist' description='Use this block for documents, enrolment readiness, safety, or arrival planning.'>
      <div className='divide-y divide-divider rounded-lg border border-border bg-card shadow-1'>
        {page.checklist.map((item) => (
          <Link key={item.label} href={item.href ?? '#'} className='flex gap-4 p-5 no-underline hover:bg-muted'>
            <CheckCircle2 className='mt-1 h-5 w-5 shrink-0 text-babu-700' aria-hidden='true' />
            <span>
              <span className='block font-semibold text-ink-900'>{item.label}</span>
              <span className='mt-1 block text-sm leading-6 text-foggy'>{item.detail}</span>
            </span>
          </Link>
        ))}
      </div>
    </BlockShell>
  );
}
