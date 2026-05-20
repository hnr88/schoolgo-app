import { ArrowRight, SearchCheck, ShieldCheck } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { StatusBadge } from '@/modules/design-system';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function AnswerPanelBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell
      id='answer'
      eyebrow='Direct answer'
      title='What this page answers'
      description={page.aiSummary.intent}
      tone='featured'
    >
      <div className='grid gap-5 lg:grid-cols-5'>
        <article className='rounded-xl border border-border bg-card p-6 shadow-2 lg:col-span-3'>
          <div className='flex flex-wrap gap-2'>
            {page.aiSummary.entities.slice(0, 5).map((entity) => (
              <StatusBadge key={entity} tone='muted'>
                {entity}
              </StatusBadge>
            ))}
          </div>
          <p className='mt-5 text-xl font-semibold leading-relaxed text-ink-900'>
            {page.aiSummary.answer}
          </p>
          <div className='mt-6 grid gap-3 md:grid-cols-3'>
            {page.aiSummary.followUps.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='group rounded-lg border border-border bg-muted p-4 text-sm font-semibold text-ink-900 no-underline transition-colors hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rausch-700'
              >
                <span className='flex items-center justify-between gap-3'>
                  {link.label}
                  <ArrowRight className='h-4 w-4 text-rausch-700 group-hover:translate-x-1' aria-hidden='true' />
                </span>
              </Link>
            ))}
          </div>
        </article>
        <aside className='rounded-xl border border-border bg-card p-5 shadow-1 lg:col-span-2'>
          <div className='flex items-center gap-2'>
            <SearchCheck className='h-5 w-5 text-rausch-700' aria-hidden='true' />
            <h3 className='text-base font-semibold text-ink-900'>Proof and crawl signals</h3>
          </div>
          <div className='mt-4 divide-y divide-divider'>
            {page.proofPoints.map((point) => (
              <details key={point.label} className='group py-3'>
                <summary className='flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-ink-900'>
                  <span>{point.label}</span>
                  <StatusBadge tone={point.confidence === 'High' ? 'trust' : 'muted'}>
                    {point.confidence}
                  </StatusBadge>
                </summary>
                <p className='mt-2 text-sm leading-6 text-hof'>{point.detail}</p>
              </details>
            ))}
          </div>
          <div className='mt-4 flex items-center gap-2 rounded-lg bg-babu-50 p-3 text-sm font-semibold text-babu-700'>
            <ShieldCheck className='h-4 w-4' aria-hidden='true' />
            JSON-LD mirrors the visible summary, links, proof list, and any visible FAQ or step blocks.
          </div>
        </aside>
      </div>
    </BlockShell>
  );
}
