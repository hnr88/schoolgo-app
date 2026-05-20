import { ClipboardCheck, FileText } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { StatusBadge } from '@/modules/design-system';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function EvidencePackBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell
      eyebrow='Evidence pack'
      title='Documents, proof points, and readiness'
      description='A reusable block for pages that need a structured evidence checklist with action links.'
      tone='muted'
    >
      <div className='grid gap-4 lg:grid-cols-2'>
        {page.checklist.map((item, index) => {
          const proof = page.proofPoints[index];
          return (
          <Link
            key={item.label}
            href={item.href ?? '/search'}
            className='group flex gap-4 rounded-lg border border-border bg-card p-5 no-underline shadow-1 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-3'
          >
            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rausch-50 text-rausch-700'>
              {index === 0 ? (
                <ClipboardCheck className='h-5 w-5' aria-hidden='true' />
              ) : (
                <FileText className='h-5 w-5' aria-hidden='true' />
              )}
            </div>
            <span>
              <span className='flex flex-wrap items-center gap-2'>
                <span className='font-semibold text-ink-900'>{item.label}</span>
                {proof ? <StatusBadge tone='trust'>{proof.confidence}</StatusBadge> : null}
              </span>
              <span className='mt-1 block text-sm leading-6 text-foggy'>{item.detail}</span>
              {proof ? <span className='mt-2 block text-xs leading-5 text-foggy'>{proof.detail}</span> : null}
              <span className='mt-3 inline-block text-sm font-semibold text-rausch-700'>Review evidence</span>
            </span>
          </Link>
          );
        })}
      </div>
    </BlockShell>
  );
}
