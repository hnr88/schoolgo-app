'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { CameraOff, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProctoringCapture } from '@/modules/test-runner/hooks/useProctoringCapture';

interface ProctoringCaptureProps {
  sessionDocumentId: string | undefined;
  isActive: boolean;
}

export function ProctoringCapture({ sessionDocumentId, isActive }: ProctoringCaptureProps) {
  const t = useTranslations('TestRunner.proctoring');
  const { permission, stream, deniedMessage, requestCamera } = useProctoringCapture({
    sessionDocumentId,
    isActive,
  });
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const node = videoRef.current;
    if (node && node.srcObject !== stream) {
      node.srcObject = stream;
    }
  }, [stream]);

  if (!isActive) return null;

  return (
    <section
      aria-label={t('regionLabel')}
      className='flex w-full max-w-xl flex-col gap-3 rounded-lg border border-border bg-card p-4'
    >
      <div className='flex items-center gap-2 text-sm font-medium text-ink-900'>
        <Video className='size-4' aria-hidden='true' />
        {t('title')}
      </div>

      {permission === 'granted' ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          aria-label={t('previewLabel')}
          className='aspect-video w-full rounded-md bg-muted object-cover'
        />
      ) : permission === 'denied' ? (
        <div className='flex flex-col gap-2 rounded-md bg-muted p-3 text-sm text-muted-foreground'>
          <span className='flex items-center gap-2 font-medium text-ink-900'>
            <CameraOff className='size-4' aria-hidden='true' />
            {t('deniedTitle')}
          </span>
          <p>{t('deniedDescription')}</p>
          {deniedMessage ? <p className='text-xs'>{deniedMessage}</p> : null}
          <Button type='button' variant='outline' size='sm' className='self-start' onClick={requestCamera}>
            {t('retry')}
          </Button>
        </div>
      ) : (
        <div className='flex flex-col gap-2 text-sm text-muted-foreground'>
          <p>{t('consent')}</p>
          <Button
            type='button'
            size='sm'
            className='self-start'
            disabled={permission === 'requesting'}
            onClick={requestCamera}
          >
            {permission === 'requesting' ? t('requesting') : t('enableCamera')}
          </Button>
        </div>
      )}
    </section>
  );
}
