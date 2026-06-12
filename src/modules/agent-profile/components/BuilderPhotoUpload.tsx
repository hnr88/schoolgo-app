'use client';

import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { MediaUpload, type UploadedMedia } from '@/modules/forms';

interface BuilderPhotoUploadProps {
  existingPhotoUrl: string | null;
  existingCoverUrl: string | null;
  photo: UploadedMedia | null;
  cover: UploadedMedia | null;
  onPhotoChange: (media: UploadedMedia | null) => void;
  onCoverChange: (media: UploadedMedia | null) => void;
  onSave: () => void;
  canSave: boolean;
  disabled: boolean;
}

/**
 * Profile photo + cover upload for the builder header (Task 098). Each slot
 * uploads via `/api/upload` (MediaUpload). The current photo falls back to the
 * stored `profilePhotoUrl` (the seedable external avatar) when no media relation
 * is set. Saving persists `profilePhoto` (id) + `coverPhotoUrl` together.
 */
export function BuilderPhotoUpload({
  existingPhotoUrl,
  existingCoverUrl,
  photo,
  cover,
  onPhotoChange,
  onCoverChange,
  onSave,
  canSave,
  disabled,
}: BuilderPhotoUploadProps) {
  const t = useTranslations('AgentProfileBuilder');
  const messages = {
    invalidType: t('mediaInvalidType'),
    tooLarge: t('mediaTooLarge'),
    uploadFailed: t('mediaUploadFailed'),
    remove: t('mediaRemove'),
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <div className='flex flex-col gap-2'>
          <MediaUpload
            accept='image'
            label={t('photoProfileLabel')}
            value={photo}
            onChange={onPhotoChange}
            messages={messages}
            disabled={disabled}
          />
          {!photo && existingPhotoUrl && (
            <div className='flex items-center gap-2'>
              <Image
                src={existingPhotoUrl}
                alt={t('photoCurrentAlt')}
                width={40}
                height={40}
                className='size-10 rounded-full object-cover'
              />
              <span className='text-xs text-muted-foreground'>{t('photoCurrentHint')}</span>
            </div>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <MediaUpload
            accept='image'
            label={t('photoCoverLabel')}
            value={cover}
            onChange={onCoverChange}
            messages={messages}
            disabled={disabled}
          />
          {!cover && existingCoverUrl && (
            <span className='text-xs text-muted-foreground'>{t('photoCurrentHint')}</span>
          )}
        </div>
      </div>
      <Button
        type='button'
        variant='outline'
        size='sm'
        onClick={onSave}
        disabled={disabled || !canSave}
        aria-busy={disabled}
        className='self-start'
      >
        {disabled && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
        {t('photoSave')}
      </Button>
    </div>
  );
}
