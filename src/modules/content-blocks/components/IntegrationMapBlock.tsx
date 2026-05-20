import { Database, PlugZap } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

const systems = ['School search', 'Profile data', 'Application evidence', 'Messages', 'Reporting'] as const;

export function IntegrationMapBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell
      eyebrow='Integration map'
      title='Connected systems and content handoffs'
      description='A systems block for enterprise pages that explain how content, workflow, and data move together.'
    >
      <div className='rounded-lg border border-border bg-card p-5 shadow-2'>
        <div className='grid gap-4 lg:grid-cols-5'>
          {systems.map((system, index) => (
            <div key={system} className='rounded-lg bg-muted p-4'>
              <div className='flex items-center gap-2'>
                {index === 0 ? (
                  <PlugZap className='h-5 w-5 text-primary' aria-hidden='true' />
                ) : (
                  <Database className='h-5 w-5 text-primary' aria-hidden='true' />
                )}
                <h3 className='text-sm font-semibold text-ink-900'>{system}</h3>
              </div>
              <p className='mt-3 text-sm leading-6 text-foggy'>
                {page.resources[index % page.resources.length].description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-5 flex flex-wrap gap-3'>
        {page.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className='rounded-pill border border-border px-4 py-2 text-sm font-semibold text-hof no-underline'
          >
            {link.label}
          </Link>
        ))}
      </div>
    </BlockShell>
  );
}
