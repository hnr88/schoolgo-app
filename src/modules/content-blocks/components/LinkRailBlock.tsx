import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function LinkRailBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell id='links' eyebrow='Links' title='A compact link rail' description='Use this when a section must route users to pages, anchors, tools, or category hubs.' tone='muted'>
      <div className='grid gap-4 md:grid-cols-3'>
        {page.links.map((link) => (
          <Link key={link.href} href={link.href} className='group flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-5 text-sm font-semibold text-ink-900 no-underline shadow-1 hover:shadow-3'>
            {link.label}
            <ArrowRight className='h-4 w-4 text-primary group-hover:translate-x-1' aria-hidden='true' />
          </Link>
        ))}
      </div>
    </BlockShell>
  );
}
