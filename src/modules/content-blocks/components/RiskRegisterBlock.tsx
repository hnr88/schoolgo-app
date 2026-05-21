import Image from 'next/image';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

const severity = ['High', 'Medium', 'Medium'] as const;

export function RiskRegisterBlock({ page, relatedPages = [] }: ContentBlockProps) {
  const risks = page.checklist.slice(0, 3);

  return (
    <BlockShell
      eyebrow='Risk register'
      title='Decision risks and mitigations'
      description='A reusable register for complex pages where families, agents, or schools need to see risk controls.'
      tone='muted'
    >
      <div className='grid gap-5 lg:grid-cols-3'>
        {risks.map((risk, index) => {
          const imagePage = relatedPages[index] ?? page;
          return (
          <article key={risk.label} className='overflow-hidden rounded-lg border border-border bg-card shadow-1'>
            <div className='relative aspect-video bg-muted'>
              <Image src={imagePage.image} alt='' fill sizes='(max-width: 1024px) 100vw, 33vw' className='object-cover' aria-hidden='true' />
              <div className='absolute inset-0 bg-ink-900/20' />
            </div>
            <div className='p-6'>
              <div className='flex items-start justify-between gap-4'>
                <AlertTriangle className='h-6 w-6 text-rausch-700' aria-hidden='true' />
                <span className='text-xs font-semibold uppercase text-rausch-700'>
                  {severity[index]}
                </span>
              </div>
              <h3 className='mt-5 text-lg font-semibold text-ink-900'>{risk.label}</h3>
              <p className='mt-2 text-sm leading-6 text-foggy'>{risk.detail}</p>
              <div className='mt-5 rounded-lg bg-muted p-4'>
                <p className='flex items-center gap-2 text-sm font-semibold text-hof'>
                  <CheckCircle2 className='h-4 w-4 text-rausch-700' aria-hidden='true' />
                  Mitigation
                </p>
                <p className='mt-2 text-sm leading-6 text-foggy'>
                  Assign an owner, capture evidence, and link the next action before the decision gate.
                </p>
              </div>
              {risk.href ? (
                <Link href={risk.href} className='mt-5 inline-flex text-sm font-semibold text-rausch-700'>
                  Review linked control
                </Link>
              ) : null}
            </div>
          </article>
          );
        })}
      </div>
    </BlockShell>
  );
}
