'use client';

import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { RepeatableMediaField } from '@/modules/agent-profile/components/RepeatableMediaField';
import type { UploadedMedia } from '@/modules/forms';

interface MultiMediaFieldProps {
  label: string;
  items: UploadedMedia[];
  onChange: (items: UploadedMedia[]) => void;
  disabled?: boolean;
}

/**
 * Multiple-media field for editors whose component holds `multiple media`
 * (e.g. success-story photo/video gallery). Renders one upload slot per item
 * plus an empty "add" slot; uploading the empty slot appends, removing drops it.
 */
export function MultiMediaField({ label, items, onChange, disabled }: MultiMediaFieldProps) {
  const t = useTranslations('AgentProfileBuilder');

  const replaceAt = (index: number, media: UploadedMedia | null) => {
    if (media === null) {
      onChange(items.filter((_, i) => i !== index));
      return;
    }
    onChange(items.map((item, i) => (i === index ? media : item)));
  };

  const append = (media: UploadedMedia | null) => {
    if (media === null) return;
    onChange([...items, media]);
  };

  return (
    <div className='flex flex-col gap-2'>
      <span className='text-xs text-muted-foreground'>{label}</span>
      <div className='flex flex-col gap-2'>
        {items.map((media, index) => (
          <div key={media.id} className='flex items-start gap-2'>
            <div className='flex-1'>
              <RepeatableMediaField
                label={t('mediaSlotLabel', { number: index + 1 })}
                value={media}
                onChange={(next) => replaceAt(index, next)}
                disabled={disabled}
              />
            </div>
            <Button
              type='button'
              variant='ghost'
              size='icon-sm'
              aria-label={t('mediaRemove')}
              disabled={disabled}
              onClick={() => replaceAt(index, null)}
              className='text-destructive hover:text-destructive'
            >
              <X aria-hidden='true' />
            </Button>
          </div>
        ))}
        <RepeatableMediaField
          label={t('mediaAddSlotLabel')}
          value={null}
          onChange={append}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
