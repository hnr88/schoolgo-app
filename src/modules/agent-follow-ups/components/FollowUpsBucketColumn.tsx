'use client';

import { useTranslations } from 'next-intl';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SurfaceCard } from '@/modules/core';
import { FollowUpItemCard } from '@/modules/agent-follow-ups/components/FollowUpItemCard';
import type { FollowUpItem, FollowUpVariant } from '@/modules/agent-follow-ups/types/agent-follow-ups.types';

interface FollowUpsBucketColumnProps {
  icon: LucideIcon;
  titleKey: 'staleTitle' | 'draftsTitle' | 'offersTitle';
  emptyKey: 'staleEmpty' | 'draftsEmpty' | 'offersEmpty';
  count: number;
  items: FollowUpItem[];
  variant: FollowUpVariant;
}

export function FollowUpsBucketColumn({
  icon: Icon,
  titleKey,
  emptyKey,
  count,
  items,
  variant,
}: FollowUpsBucketColumnProps) {
  const t = useTranslations('AgentFollowUps');

  return (
    <SurfaceCard padding='sm' className='flex flex-col gap-3'>
      <div className='flex items-center justify-between gap-2'>
        <div className='flex items-center gap-2'>
          <Icon className='h-4 w-4 text-muted-foreground' />
          <h2 className='text-sm font-semibold text-foreground'>{t(titleKey)}</h2>
        </div>
        <Badge variant='secondary'>{count}</Badge>
      </div>
      {items.length === 0 ? (
        <p className='py-6 text-center text-xs text-muted-foreground'>{t(emptyKey)}</p>
      ) : (
        <div className='flex flex-col gap-2'>
          {items.map((item) => (
            <FollowUpItemCard key={item.documentId} item={item} variant={variant} />
          ))}
        </div>
      )}
    </SurfaceCard>
  );
}
