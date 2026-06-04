import { Music } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReadOnlyImagePreviewProps {
  url: string;
  alt: string;
  className?: string;
}

interface ReadOnlyAudioPreviewProps {
  url: string;
  label: string;
  className?: string;
}

export function ReadOnlyImagePreview({ url, alt, className }: ReadOnlyImagePreviewProps) {
  return (
    <div
      className={cn(
        'relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted',
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt={alt} className='size-full object-cover' />
    </div>
  );
}

export function ReadOnlyAudioPreview({ url, label, className }: ReadOnlyAudioPreviewProps) {
  return (
    <div className={cn('flex flex-col gap-3 rounded-lg border border-border bg-muted p-3', className)}>
      <span className='flex min-w-0 items-center gap-2 text-sm font-medium'>
        <Music className='size-4 shrink-0 text-muted-foreground' aria-hidden='true' />
        <span className='truncate'>{label}</span>
      </span>
      <audio controls src={url} className='w-full'>
        {label}
      </audio>
    </div>
  );
}
