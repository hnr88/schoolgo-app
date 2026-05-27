'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ImagePreviewProps } from '@/modules/forms/types/media.types';

function isObjectUrl(url: string): boolean {
  return url.startsWith('blob:');
}

export function ImagePreview({
  media,
  alt,
  onRemove,
  removeLabel,
  disabled = false,
}: ImagePreviewProps) {
  useEffect(() => {
    if (!isObjectUrl(media.url)) return;
    return () => URL.revokeObjectURL(media.url);
  }, [media.url]);

  return (
    <div className='relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={media.url}
        alt={alt}
        className='size-full object-cover'
      />
      <Button
        type='button'
        variant='destructive'
        size='icon-sm'
        disabled={disabled}
        onClick={onRemove}
        aria-label={removeLabel}
        className={cn('absolute top-2 right-2')}
      >
        <X aria-hidden='true' />
      </Button>
    </div>
  );
}
