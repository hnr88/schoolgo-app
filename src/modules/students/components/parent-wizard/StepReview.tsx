'use client';

import { useTranslations } from 'next-intl';
import { ImagePreview, AudioPreview } from '@/modules/forms';
import { ReviewRow } from '@/modules/students/components/parent-wizard/ReviewRow';
import type { ParentStepReviewProps } from '@/modules/students/types/parent-wizard.types';

export function StepReview({ values, photo, voiceIntro }: ParentStepReviewProps) {
  const t = useTranslations('StudentWizard');
  const dash = t('emptyValue');

  return (
    <div className='flex flex-col gap-6'>
      <section className='flex flex-col gap-3'>
        <h3 className='text-sm font-semibold text-ink-900'>{t('stepPersonal')}</h3>
        <dl className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <ReviewRow label={t('fieldFirstName')} value={values.firstName || dash} />
          <ReviewRow label={t('fieldLastName')} value={values.lastName || dash} />
          <ReviewRow label={t('fieldEmail')} value={values.email || dash} />
          <ReviewRow label={t('fieldDob')} value={values.dateOfBirth || dash} />
          <ReviewRow label={t('fieldGender')} value={values.gender ? t(`gender_${values.gender}`) : dash} />
          <ReviewRow label={t('fieldNationality')} value={values.nationality || dash} />
        </dl>
      </section>

      <section className='flex flex-col gap-3'>
        <h3 className='text-sm font-semibold text-ink-900'>{t('stepEducation')}</h3>
        <dl className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <ReviewRow label={t('fieldCurrentSchool')} value={values.currentSchool || dash} />
          <ReviewRow label={t('fieldCurrentYear')} value={values.currentYearLevel || dash} />
          <ReviewRow label={t('fieldTargetYear')} value={values.targetEntryYear || dash} />
          <ReviewRow label={t('fieldTargetTerm')} value={values.targetEntryTerm || dash} />
        </dl>
      </section>

      <section className='flex flex-col gap-3'>
        <h3 className='text-sm font-semibold text-ink-900'>{t('stepGuardian')}</h3>
        <dl className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <ReviewRow label={t('fieldParentName')} value={values.parentGuardianName || dash} />
          <ReviewRow label={t('fieldParentPhone')} value={values.parentGuardianPhone || dash} />
          <ReviewRow label={t('fieldParentEmail')} value={values.parentGuardianEmail || dash} />
          <ReviewRow label={t('fieldParentWechat')} value={values.parentGuardianWechat || dash} />
          <ReviewRow label={t('fieldContactChannel')} value={t(`channel_${values.preferredContactChannel}`)} />
        </dl>
      </section>

      <section className='flex flex-col gap-3'>
        <h3 className='text-sm font-semibold text-ink-900'>{t('stepMedia')}</h3>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {photo ? (
            <ImagePreview
              media={photo}
              alt={t('fieldPhoto')}
              onRemove={() => undefined}
              removeLabel={t('removeMedia')}
              disabled
            />
          ) : (
            <ReviewRow label={t('fieldPhoto')} value={dash} />
          )}
          {voiceIntro ? (
            <AudioPreview
              media={voiceIntro}
              onRemove={() => undefined}
              removeLabel={t('removeMedia')}
              disabled
            />
          ) : (
            <ReviewRow label={t('fieldVoiceIntro')} value={dash} />
          )}
        </div>
      </section>
    </div>
  );
}
