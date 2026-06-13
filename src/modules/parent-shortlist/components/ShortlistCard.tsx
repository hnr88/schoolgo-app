'use client';

import { useState } from 'react';
import { useTranslations, useFormatter } from 'next-intl';
import { Plus, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SurfaceCard } from '@/modules/core';
import { MembersStrip } from '@/modules/parent-shortlist/components/MembersStrip';
import { ShortlistItemRow } from '@/modules/parent-shortlist/components/ShortlistItemRow';
import { AddItemDialog } from '@/modules/parent-shortlist/components/AddItemDialog';
import { InviteMemberDialog } from '@/modules/parent-shortlist/components/InviteMemberDialog';
import { useShortlistItemsStore } from '@/modules/parent-shortlist/stores/use-shortlist-items-store';
import type { Shortlist, ShortlistItem } from '@/modules/parent-shortlist/types/shortlist.types';

interface ShortlistCardProps {
  shortlist: Shortlist;
}

const EMPTY_ITEMS: ShortlistItem[] = [];

export function ShortlistCard({ shortlist }: ShortlistCardProps) {
  const t = useTranslations('ParentShortlist');
  const format = useFormatter();
  const [addOpen, setAddOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const items = useShortlistItemsStore((s) => s.itemsByShortlist[shortlist.documentId]) ?? EMPTY_ITEMS;
  const isOwner = shortlist.access === 'owner';

  return (
    <SurfaceCard className='flex flex-col gap-4'>
      <div className='flex flex-wrap items-start justify-between gap-3'>
        <div className='flex flex-col gap-1'>
          <h3 className='font-display text-lg font-bold tracking-tight text-ink-900'>{shortlist.name}</h3>
          <p className='text-xs text-foggy'>
            {t(isOwner ? 'ownerLabel' : 'sharedLabel')} ·{' '}
            {t('createdOn', { date: format.dateTime(new Date(shortlist.createdAt), { dateStyle: 'medium' }) })}
          </p>
        </div>
        <div className='flex shrink-0 items-center gap-2'>
          <Button size='sm' variant='outline' className='gap-1.5' onClick={() => setAddOpen(true)}>
            <Plus className='h-4 w-4' aria-hidden='true' />
            {t('addItemAction')}
          </Button>
          {isOwner && (
            <Button size='sm' variant='outline' className='gap-1.5' onClick={() => setInviteOpen(true)}>
              <UserPlus className='h-4 w-4' aria-hidden='true' />
              {t('inviteAction')}
            </Button>
          )}
        </div>
      </div>

      <MembersStrip members={shortlist.members} />

      {items.length > 0 && (
        <div className='flex flex-col gap-2'>
          {items.map((item) => (
            <ShortlistItemRow key={item.documentId} item={item} />
          ))}
        </div>
      )}

      <AddItemDialog
        shortlistDocumentId={shortlist.documentId}
        open={addOpen}
        onOpenChange={setAddOpen}
      />
      {isOwner && (
        <InviteMemberDialog
          shortlistDocumentId={shortlist.documentId}
          open={inviteOpen}
          onOpenChange={setInviteOpen}
        />
      )}
    </SurfaceCard>
  );
}
