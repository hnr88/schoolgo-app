'use client';

import { useTranslations } from 'next-intl';
import {
  ReadOnlyAudioPreview,
  ReadOnlyImagePreview,
} from '@/modules/students/components/ReadOnlyMediaPreview';
import { ReviewRow } from '@/modules/students/components/parent-wizard/ReviewRow';
import { ReviewSection } from '@/modules/students/components/parent-wizard/ReviewSection';
import type { ParentStepReviewProps } from '@/modules/students/types/parent-wizard.types';

export function StepReview({ values, photo, voiceIntro, onEdit }: ParentStepReviewProps) {
  const t = useTranslations('StudentWizard');
  const dash = t('emptyValue');

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <h2 className='font-display text-2xl font-semibold tracking-tight text-ink-900 lg:text-3xl'>
          {t('stepReview')}
        </h2>
        <p className='max-w-prose text-base leading-relaxed text-muted-foreground'>
          {t('reviewHint')}
        </p>
      </div>

      <ReviewSection title={t('stepPersonal')} stepIndex={0} onEdit={onEdit}>
        <dl className='grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2'>
          <ReviewRow label={t('fieldFirstName')} value={values.firstName || dash} />
          <ReviewRow label={t('fieldLastName')} value={values.lastName || dash} />
          <ReviewRow label={t('fieldEmail')} value={values.email || dash} />
          <ReviewRow label={t('fieldDob')} value={values.dateOfBirth || dash} />
          <ReviewRow label={t('fieldGender')} value={values.gender ? t(`gender_${values.gender}`) : dash} />
          <ReviewRow label={t('fieldNationality')} value={values.nationality || dash} />
          <ReviewRow label={t('fieldPassport')} value={values.passportNumber || dash} />
        </dl>
      </ReviewSection>

      <ReviewSection title={t('stepEducation')} stepIndex={1} onEdit={onEdit}>
        <dl className='grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2'>
          <ReviewRow label={t('fieldCurrentSchool')} value={values.currentSchool || dash} />
          <ReviewRow label={t('fieldCurrentYear')} value={values.currentYearLevel || dash} />
          <ReviewRow label={t('fieldTargetYear')} value={values.targetEntryYear || dash} />
          <ReviewRow label={t('fieldTargetTerm')} value={values.targetEntryTerm || dash} />
        </dl>
      </ReviewSection>

      <ReviewSection title={t('stepGuardian')} stepIndex={2} onEdit={onEdit}>
        <dl className='grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2'>
          <ReviewRow label={t('fieldParentName')} value={values.parentGuardianName || dash} />
          <ReviewRow label={t('fieldParentPhone')} value={values.parentGuardianPhone || dash} />
          <ReviewRow label={t('fieldParentEmail')} value={values.parentGuardianEmail || dash} />
          <ReviewRow label={t('fieldParentWechat')} value={values.parentGuardianWechat || dash} />
          <ReviewRow label={t('fieldContactChannel')} value={t(`channel_${values.preferredContactChannel}`)} />
        </dl>
      </ReviewSection>

      <ReviewSection title={t('stepMedia')} stepIndex={3} onEdit={onEdit}>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {photo ? (
            <ReadOnlyImagePreview url={photo.url} alt={t('fieldPhoto')} />
          ) : (
            <dl>
              <ReviewRow label={t('fieldPhoto')} value={dash} />
            </dl>
          )}
          {voiceIntro ? (
            <ReadOnlyAudioPreview url={voiceIntro.url} label={voiceIntro.name || t('fieldVoiceIntro')} />
          ) : (
            <dl>
              <ReviewRow label={t('fieldVoiceIntro')} value={dash} />
            </dl>
          )}
        </div>
      </ReviewSection>
    </div>
  );
}
