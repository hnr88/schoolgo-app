import { GitBranch, LockKeyhole, Stamp } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { StatusBadge } from '@/modules/design-system';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

const gates = [
  { label: 'Eligibility', icon: LockKeyhole },
  { label: 'Evidence', icon: GitBranch },
  { label: 'Decision', icon: Stamp },
] as const;

export function ApprovalFlowBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell
      eyebrow='Approval flow'
      title='Decision gates with evidence requirements'
      description='A heavier process block for admissions, compliance, pricing, and policy pages.'
      tone='muted'
    >
      <div className='grid gap-5 lg:grid-cols-3'>
        {gates.map((gate, index) => {
          const item = page.timeline[index];
          const Icon = gate.icon;
          return (
            <article key={gate.label} className='rounded-lg border border-border bg-card p-6 shadow-1 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-3'>
              <div className='flex items-center justify-between'>
                <Icon className='h-6 w-6 text-primary' aria-hidden='true' />
                <StatusBadge tone={index === 0 ? 'brand' : 'trust'}>Gate {index + 1}</StatusBadge>
              </div>
              <h3 className='mt-5 text-lg font-semibold text-ink-900'>{gate.label}</h3>
              <p className='mt-2 text-sm leading-6 text-foggy'>{item.description}</p>
              <div className='mt-4 rounded-lg bg-muted p-4'>
                <p className='text-sm font-semibold text-hof'>Required evidence</p>
                <p className='mt-1 text-sm leading-6 text-foggy'>
                  {page.decisionPoints[index]?.evidence ?? `${page.facts[index]?.label}: ${page.facts[index]?.value}`}
                </p>
              </div>
              {item.href ? (
                <Link href={item.href} className='mt-5 inline-flex text-sm font-semibold text-primary'>
                  Open gate detail
                </Link>
              ) : null}
            </article>
          );
        })}
      </div>
    </BlockShell>
  );
}
