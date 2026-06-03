'use client';

import { useRef } from 'react';
import { ImagePlus, Loader2, Mic, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ImagePreview } from '@/modules/forms/components/ImagePreview';
import { AudioPreview } from '@/modules/forms/components/AudioPreview';
import { useMediaUpload } from '@/modules/forms/hooks/use-media-upload.mutation';
import {
  getDefaultMaxSizeMb,
  isAllowedType,
  isWithinSize,
} from '@/modules/forms/lib/validate-media';
import type { MediaUploadProps } from '@/modules/forms/types/media.types';

export function MediaUpload({
  accept,
  value,
  onChange,
  label,
  messages,
  maxSizeMb,
  disabled = false,
  className,
}: MediaUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending, progress } = useMediaUpload();
  const sizeCap = maxSizeMb ?? getDefaultMaxSizeMb(accept);
  const isBusy = disabled || isPending;
  const isImage = accept === 'image' || value?.mime.startsWith('image/');

  function handleSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (!isAllowedType(file, accept)) {
      toast.error(messages.invalidType);
      return;
    }
    if (!isWithinSize(file, sizeCap)) {
      toast.error(messages.tooLarge);
      return;
    }

    mutate(file, {
      onSuccess: (media) => onChange(media),
      onError: () => toast.error(messages.uploadFailed),
    });
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label>{label}</Label>

      {value ? (
        isImage ? (
          <ImagePreview
            media={value}
            alt={label}
            onRemove={() => onChange(null)}
            removeLabel={messages.remove}
            disabled={isBusy}
          />
        ) : (
          <AudioPreview
            media={value}
            onRemove={() => onChange(null)}
            removeLabel={messages.remove}
            disabled={isBusy}
          />
        )
      ) : (
        <Button
          type='button'
          variant='outline'
          disabled={isBusy}
          onClick={() => inputRef.current?.click()}
          className='h-auto flex-col gap-2 border-dashed py-8 text-muted-foreground transition-colors duration-200 ease-out-quart hover:border-primary/60 hover:bg-primary/5 hover:text-foreground'
        >
          <span className='flex size-11 items-center justify-center rounded-full bg-muted text-foreground'>
            {isPending ? (
              <Loader2 className='size-5 animate-spin' aria-hidden='true' />
            ) : isImage ? (
              <ImagePlus className='size-5' aria-hidden='true' />
            ) : (
              <Mic className='size-5' aria-hidden='true' />
            )}
          </span>
          <span className='flex items-center gap-1.5 text-sm font-medium'>
            <Upload className='size-4' aria-hidden='true' />
            {isPending ? `${progress}%` : label}
          </span>
        </Button>
      )}

      {isPending && (
        <div className='h-1 w-full overflow-hidden rounded-full bg-muted'>
          <div
            className='h-full origin-left rounded-full bg-primary transition-transform'
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
      )}

      <input
        ref={inputRef}
        type='file'
        accept={`${accept}/*`}
        disabled={isBusy}
        onChange={handleSelect}
        className='hidden'
      />
    </div>
  );
}
