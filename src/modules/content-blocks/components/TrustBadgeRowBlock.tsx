import { BadgeCheck, ShieldCheck, Sparkles } from 'lucide-react';
import { BlockShell } from '@/modules/content-blocks/components/BlockShell';
import type { ContentBlockProps } from '@/modules/content-blocks/types/content-blocks.types';

export function TrustBadgeRowBlock({ page }: ContentBlockProps) {
  const items = [
    { icon: ShieldCheck, label: 'Verified school data' },
    { icon: BadgeCheck, label: `${page.eyebrow} ownership` },
    { icon: Sparkles, label: 'Reviewed content structure' },
  ];
  return (
    <BlockShell eyebrow='Trust' title='Trust markers' description='A small badge row can reinforce data quality, safety, or verified workflows.'>
      <div className='grid gap-4 md:grid-cols-3'>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className='flex items-center gap-3 rounded-lg border border-border bg-card p-5 shadow-1'>
              <span className='flex h-10 w-10 items-center justify-center rounded-lg bg-babu-50 text-babu-700'>
                <Icon className='h-5 w-5' aria-hidden='true' />
              </span>
              <span className='text-sm font-semibold text-ink-900'>{item.label}</span>
            </div>
          );
        })}
      </div>
    </BlockShell>
  );
}
