import { CircleDot, KanbanSquare } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

const columns = ['New', 'Evidence review', 'Decision', 'Follow-up'] as const;

export function WorkflowBoardBlock({ page }: ContentBlockProps) {
  const cards = page.actionPaths;

  return (
    <BlockShell
      eyebrow='Workflow'
      title='Pipeline board for operational pages'
      description='A compact workflow board for admissions, agent, school, and event operations.'
    >
      <div className='grid gap-4 lg:grid-cols-4'>
        {columns.map((column, index) => {
          const card = cards[index];
          const decision = page.decisionPoints[index % page.decisionPoints.length];
          return (
            <section key={column} className='rounded-lg border border-border bg-card p-4 shadow-1 transition-transform duration-300 hover:-translate-y-1 hover:shadow-3'>
              <div className='flex items-center gap-2 border-b border-border pb-3'>
                <KanbanSquare className='h-5 w-5 text-rausch-700' aria-hidden='true' />
                <h3 className='text-sm font-semibold uppercase text-ink-900'>{column}</h3>
              </div>
              {card ? (
                <Link
                  href={card.href ?? '/search'}
                  className='mt-4 block rounded-lg bg-muted p-4 no-underline hover:bg-background'
                >
                  <p className='flex flex-wrap items-center gap-2 text-sm font-semibold text-hof'>
                    <CircleDot className='h-4 w-4 text-rausch-700' aria-hidden='true' />
                    {card.label}
                  </p>
                  <p className='mt-1 text-xs font-semibold uppercase text-foggy'>{card.priority}</p>
                  <p className='mt-2 text-sm leading-6 text-foggy'>{card.description}</p>
                  <p className='mt-3 rounded-lg bg-card p-3 text-xs leading-5 text-foggy'>
                    {decision.owner}: {decision.evidence}
                  </p>
                </Link>
              ) : null}
            </section>
          );
        })}
      </div>
    </BlockShell>
  );
}
