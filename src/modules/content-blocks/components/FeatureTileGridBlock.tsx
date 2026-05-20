import { BadgeCheck } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function FeatureTileGridBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell eyebrow='Features' title='Reusable feature tiles' description='This block works for services, support areas, tools, benefits, and program highlights.'>
      <div className='grid gap-5 md:grid-cols-3'>
        {page.features.map((feature) => (
          <Link key={feature.title} href={feature.href ?? '#'} className='rounded-lg border border-border bg-card p-6 no-underline shadow-1 hover:shadow-3'>
            <BadgeCheck className='h-5 w-5 text-primary' aria-hidden='true' />
            <span className='mt-5 block text-lg font-semibold text-ink-900'>{feature.title}</span>
            <span className='mt-2 block text-sm leading-6 text-foggy'>{feature.description}</span>
          </Link>
        ))}
      </div>
    </BlockShell>
  );
}
