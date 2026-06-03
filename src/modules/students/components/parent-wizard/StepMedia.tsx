'use client';

import { useTranslations } from 'next-intl';
import { MediaUpload } from '@/modules/forms';
import type { MediaUploadMessages } from '@/modules/forms';
import {
  PARENT_PHOTO_MAX_MB,
  PARENT_VOICE_INTRO_MAX_MB,
} from '@/modules/students/constants/parent-wizard.constants';
import type { ParentStepMediaProps } from '@/modules/students/types/parent-wizard.types';

export function StepMedia({
  photo,
  voiceIntro,
  onPhotoChange,
  onVoiceIntroChange,
}: ParentStepMediaProps) {
  const t = useTranslations('StudentWizard');

  function buildMessages(label: string, size: number): MediaUploadMessages {
    return {
      invalidType: t('mediaInvalidType', { label }),
      tooLarge: t('mediaTooLarge', { label, size }),
      uploadFailed: t('mediaUploadFailed', { label }),
      remove: t('removeMedia'),
    };
  }

  return (
    <div className='flex flex-col gap-6'>
      <p className='text-sm text-muted-foreground'>{t('mediaHint')}</p>
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
        <div className='flex flex-col gap-2 rounded-lg border border-border bg-card/40 p-4'>
          <MediaUpload
            accept='image'
            value={photo}
            onChange={onPhotoChange}
            label={t('fieldPhoto')}
            messages={buildMessages(t('fieldPhoto'), PARENT_PHOTO_MAX_MB)}
            maxSizeMb={PARENT_PHOTO_MAX_MB}
          />
          <p className='text-xs text-muted-foreground'>
            {t('mediaPhotoHint', { size: PARENT_PHOTO_MAX_MB })}
          </p>
        </div>
        <div className='flex flex-col gap-2 rounded-lg border border-border bg-card/40 p-4'>
          <MediaUpload
            accept='audio'
            value={voiceIntro}
            onChange={onVoiceIntroChange}
            label={t('fieldVoiceIntro')}
            messages={buildMessages(t('fieldVoiceIntro'), PARENT_VOICE_INTRO_MAX_MB)}
            maxSizeMb={PARENT_VOICE_INTRO_MAX_MB}
          />
          <p className='text-xs text-muted-foreground'>
            {t('mediaVoiceHint', { size: PARENT_VOICE_INTRO_MAX_MB })}
          </p>
        </div>
      </div>
    </div>
  );
}
