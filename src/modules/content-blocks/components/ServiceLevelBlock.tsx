import { Clock3 } from 'lucide-react';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

const serviceLevels = [
  ['Initial response', '1 business day', 'Family success'],
  ['Evidence review', '3 business days', 'Admissions ops'],
  ['Partner escalation', '2 business days', 'School partner'],
  ['Decision follow-up', '5 business days', 'Relationship lead'],
] as const;

export function ServiceLevelBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell
      eyebrow='Service levels'
      title='Operational standards and escalation paths'
      description='A table block for enterprise content that needs service promises, accountability, and escalation context.'
    >
      <div className='overflow-hidden rounded-lg border border-border bg-card shadow-2'>
        {serviceLevels.map(([standard, target, owner], index) => {
          const stakeholder = page.stakeholders[index % page.stakeholders.length];
          return (
          <div key={standard} className='grid gap-4 border-b border-border p-5 transition-colors last:border-b-0 hover:bg-muted md:grid-cols-4 md:items-center'>
            <div className='flex items-center gap-3 md:col-span-2'>
              <Clock3 className='h-5 w-5 text-rausch-700' aria-hidden='true' />
              <div>
                <p className='font-semibold text-ink-900'>{standard}</p>
                <p className='mt-1 text-sm text-foggy'>{stakeholder.goal}</p>
              </div>
            </div>
            <span className='text-sm font-semibold text-rausch-700'>
              {target}
            </span>
            <span className='space-y-1 text-sm font-semibold text-hof'>
              <span className='block'>{owner}</span>
              <span className='block text-xs font-semibold uppercase text-foggy'>{stakeholder.metric}</span>
            </span>
          </div>
          );
        })}
      </div>
    </BlockShell>
  );
}
