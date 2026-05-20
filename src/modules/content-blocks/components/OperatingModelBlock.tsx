import Image from 'next/image';
import { ArrowRight, Building2, FileCheck2, MessageSquare, Route } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

const stages = [
  { label: 'Intake', owner: 'Family success', icon: Route },
  { label: 'Evidence', owner: 'Admissions ops', icon: FileCheck2 },
  { label: 'Decision', owner: 'School partner', icon: Building2 },
  { label: 'Follow-up', owner: 'Relationship lead', icon: MessageSquare },
];

export function OperatingModelBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell
      eyebrow='Operating model'
      title='Enterprise operating rhythm'
      description='A reusable operating-model block for pages that need owners, gates, and handoffs.'
      tone='muted'
    >
      <div className='mb-6 grid overflow-hidden rounded-xl border border-border bg-card shadow-2 lg:grid-cols-3'>
        <div className='relative aspect-video bg-muted lg:col-span-2 lg:min-h-80'>
          <Image src={page.image} alt={page.imageAlt} fill sizes='(max-width: 1024px) 100vw, 66vw' className='object-cover' />
          <div className='absolute inset-0 bg-ink-900/20' />
        </div>
        <div className='p-6'>
          <p className='text-sm font-semibold uppercase text-rausch-700'>Operating view</p>
          <h3 className='mt-3 text-2xl font-bold text-ink-900'>{page.title}</h3>
          <p className='mt-3 text-sm leading-6 text-foggy'>{page.subtitle}</p>
          <dl className='mt-6 grid gap-4'>
            {page.metrics.map((metric) => (
              <div key={metric.label} className='rounded-lg bg-muted p-4'>
                <dt className='text-xs font-semibold uppercase text-foggy'>{metric.label}</dt>
                <dd className='mt-1 text-2xl font-bold text-ink-900'>{metric.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className='grid gap-4 lg:grid-cols-4'>
        {stages.map((stage, index) => {
          const item = page.steps[index % page.steps.length];
          const Icon = stage.icon;
          return (
            <article key={stage.label} className='rounded-lg border border-border bg-card p-5 shadow-1'>
              <div className='flex items-center justify-between gap-3'>
                <span className='rounded-pill bg-rausch-50 px-3 py-1 text-xs font-semibold uppercase text-rausch-700'>
                  {stage.label}
                </span>
                <Icon className='h-5 w-5 text-rausch-700' aria-hidden='true' />
              </div>
              <h3 className='mt-5 text-lg font-semibold text-ink-900'>{item.title}</h3>
              <p className='mt-2 text-sm leading-6 text-foggy'>{item.description}</p>
              <dl className='mt-5 space-y-3 text-sm'>
                <div>
                  <dt className='font-semibold text-hof'>Owner</dt>
                  <dd className='text-foggy'>{stage.owner}</dd>
                </div>
                <div>
                  <dt className='font-semibold text-hof'>Control point</dt>
                  <dd className='text-foggy'>Review before the next team takes over.</dd>
                </div>
              </dl>
              {item.href ? (
                <Link
                  href={item.href}
                  className='mt-5 inline-flex items-center gap-2 text-sm font-semibold text-rausch-700 no-underline'
                >
                  Open action
                  <ArrowRight className='h-4 w-4' aria-hidden='true' />
                </Link>
              ) : null}
            </article>
          );
        })}
      </div>
    </BlockShell>
  );
}
