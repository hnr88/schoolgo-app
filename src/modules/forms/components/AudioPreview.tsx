'use client';

import { useEffect } from 'react';
import { Music, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AudioPreviewProps } from '@/modules/forms/types/media.types';

function isObjectUrl(url: string): boolean {
  return url.startsWith('blob:');
}

export function AudioPreview({
  media,
  onRemove,
  removeLabel,
  disabled = false,
}: AudioPreviewProps) {
  useEffect(() => {
    if (!isObjectUrl(media.url)) return;
    return () => URL.revokeObjectURL(media.url);
  }, [media.url]);

  return (
    <div className='flex flex-col gap-3 rounded-lg border border-border bg-muted p-3'>
      <div className='flex items-center justify-between gap-2'>
        <span className='flex min-w-0 items-center gap-2 text-sm font-medium'>
          <Music className='size-4 shrink-0 text-muted-foreground' aria-hidden='true' />
          <span className='truncate'>{media.name}</span>
        </span>
        <Button
          type='button'
          variant='destructive'
          size='icon-sm'
          disabled={disabled}
          onClick={onRemove}
          aria-label={removeLabel}
        >
          <X aria-hidden='true' />
        </Button>
      </div>
      <audio controls src={media.url} className='w-full'>
        {media.name}
      </audio>
    </div>
  );
}
