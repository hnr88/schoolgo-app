import Image from 'next/image';
import { BadgeCheck } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function FeatureTileGridBlock({ page }: ContentBlockProps) {
  return (
    <BlockShell eyebrow='Features' title='Reusable feature tiles' description='This block works for services, support areas, tools, benefits, and program highlights.'>
      <div className='grid gap-5 md:grid-cols-3'>
        {page.features.map((feature, index) => (
          <Link key={feature.title} href={feature.href ?? '/resources'} className='group overflow-hidden rounded-lg border border-border bg-card no-underline shadow-1 transition-transform duration-300 hover:-translate-y-1 hover:shadow-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rausch-700'>
            {index !== 1 ? (
              <span className='relative block aspect-video bg-muted'>
                <Image src={page.image} alt='' fill sizes='(max-width: 768px) 100vw, 33vw' className='object-cover transition-transform duration-300 group-hover:scale-105' aria-hidden='true' />
                <span className='absolute inset-0 bg-ink-900/10' />
              </span>
            ) : null}
            <span className='block p-6'>
              <BadgeCheck className='h-5 w-5 text-rausch-700' aria-hidden='true' />
              <span className='mt-5 block text-lg font-semibold text-ink-900'>{feature.title}</span>
              <span className='mt-3 block text-sm leading-6 text-hof'>{feature.description}</span>
              <span className='mt-4 block text-xs font-semibold uppercase text-rausch-700'>{page.searchSignals[index]?.value ?? page.eyebrow}</span>
            </span>
          </Link>
        ))}
      </div>
    </BlockShell>
  );
}
