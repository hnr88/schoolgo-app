'use client';

import { useTranslations } from 'next-intl';
import { ImageIcon, Mic } from 'lucide-react';
import { MediaUpload } from '@/modules/forms';
import type { MediaUploadMessages } from '@/modules/forms';
import {
  PARENT_PHOTO_MAX_MB,
  PARENT_VOICE_INTRO_MAX_MB,
} from '@/modules/students/constants/parent-wizard.constants';
import type { ParentStepMediaProps } from '@/modules/students/types/parent-wizard.types';
import { StepCard } from '@/modules/students/components/parent-wizard/StepCard';

export function StepMedia({
  photo,
  voiceIntro,
  onPhotoChange,
  onVoiceIntroChange,
}: ParentStepMediaProps) {
  const t = useTranslations('StudentWizard');

  function buildMessages(label: string, size: number, removeLabel: string): MediaUploadMessages {
    return {
      invalidType: t('mediaInvalidType', { label }),
      tooLarge: t('mediaTooLarge', { label, size }),
      uploadFailed: t('mediaUploadFailed', { label }),
      remove: removeLabel,
    };
  }

  return (
    <StepCard title={t('stepMedia')} description={t('mediaHint')}>
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8'>
        <section className='flex flex-col gap-5 rounded-2xl bg-muted p-6 lg:p-8'>
          <header className='flex items-start gap-4'>
            <span className='flex size-12 shrink-0 items-center justify-center rounded-2xl bg-muted text-muted-foreground'>
              <ImageIcon className='size-6' aria-hidden='true' />
            </span>
            <div className='flex min-w-0 flex-col gap-1'>
              <h4 className='text-base font-semibold tracking-tight text-ink-900'>
                {t('fieldPhoto')}
              </h4>
              <p className='text-sm leading-relaxed text-muted-foreground'>
                {t('mediaPhotoHint', { size: PARENT_PHOTO_MAX_MB })}
              </p>
            </div>
          </header>
          <MediaUpload
            accept='image'
            value={photo}
            onChange={onPhotoChange}
            label={t('fieldPhoto')}
            messages={buildMessages(t('fieldPhoto'), PARENT_PHOTO_MAX_MB, t('removePhoto'))}
            maxSizeMb={PARENT_PHOTO_MAX_MB}
          />
        </section>
        <section className='flex flex-col gap-5 rounded-2xl bg-muted p-6 lg:p-8'>
          <header className='flex items-start gap-4'>
            <span className='flex size-12 shrink-0 items-center justify-center rounded-2xl bg-muted text-muted-foreground'>
              <Mic className='size-6' aria-hidden='true' />
            </span>
            <div className='flex min-w-0 flex-col gap-1'>
              <h4 className='text-base font-semibold tracking-tight text-ink-900'>
                {t('fieldVoiceIntro')}
              </h4>
              <p className='text-sm leading-relaxed text-muted-foreground'>
                {t('mediaVoiceHint', { size: PARENT_VOICE_INTRO_MAX_MB })}
              </p>
            </div>
          </header>
          <MediaUpload
            accept='audio'
            value={voiceIntro}
            onChange={onVoiceIntroChange}
            label={t('fieldVoiceIntro')}
            messages={buildMessages(t('fieldVoiceIntro'), PARENT_VOICE_INTRO_MAX_MB, t('removeVoiceIntro'))}
            maxSizeMb={PARENT_VOICE_INTRO_MAX_MB}
          />
        </section>
      </div>
    </StepCard>
  );
}
