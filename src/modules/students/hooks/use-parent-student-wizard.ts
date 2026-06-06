'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useRouter } from '@/i18n/navigation';
import type { UploadedMedia } from '@/modules/forms';
import {
  PARENT_WIZARD_STEP_IDS,
  STEP_FIELDS,
  createParentStudentSchema,
  type ParentStudentFormValues,
  type ParentWizardStepId,
} from '@/modules/students/schemas/parent-student.schema';
import { useCreateParentStudent } from '@/modules/students/queries/use-create-parent-student.mutation';
import { useUpdateParentStudent } from '@/modules/students/queries/use-update-parent-student.mutation';

const DEFAULT_VALUES: ParentStudentFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  dateOfBirth: '',
  gender: undefined,
  nationality: '',
  passportNumber: '',
  currentSchool: '',
  currentYearLevel: '',
  targetEntryYear: '',
  targetEntryTerm: '',
  parentGuardianName: '',
  parentGuardianEmail: '',
  parentGuardianPhone: '',
  parentGuardianWechat: '',
  preferredContactChannel: 'whatsapp',
  photo: undefined,
  voiceIntro: undefined,
};

export function useParentStudentWizard(options?: {
  documentId?: string;
  initialValues?: ParentStudentFormValues;
  existingPhoto?: UploadedMedia | null;
  existingVoiceIntro?: UploadedMedia | null;
}) {
  const t = useTranslations('StudentWizard');
  const tSchema = useTranslations('StudentWizardSchema');
  const router = useRouter();
  const createStudent = useCreateParentStudent();
  const updateStudent = useUpdateParentStudent(options?.documentId ?? '');
  const isEditing = Boolean(options?.documentId);

  const [photo, setPhoto] = useState<UploadedMedia | null>(options?.existingPhoto ?? null);
  const [voiceIntro, setVoiceIntro] = useState<UploadedMedia | null>(
    options?.existingVoiceIntro ?? null,
  );

  const form = useForm<ParentStudentFormValues>({
    resolver: zodResolver(createParentStudentSchema(tSchema)),
    defaultValues: options?.initialValues ?? DEFAULT_VALUES,
    mode: 'onBlur',
  });

  function handlePhotoChange(media: UploadedMedia | null) {
    setPhoto(media);
    if (media) {
      form.setValue('photo', media.id, { shouldValidate: true, shouldDirty: true });
    } else {
      form.setValue('photo', isEditing ? null : undefined, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }

  function handleVoiceIntroChange(media: UploadedMedia | null) {
    setVoiceIntro(media);
    if (media) {
      form.setValue('voiceIntro', media.id, { shouldValidate: true, shouldDirty: true });
    } else {
      form.setValue('voiceIntro', isEditing ? null : undefined, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }

  const canAdvance = async (stepIndex: number) => {
    const fields = STEP_FIELDS[PARENT_WIZARD_STEP_IDS[stepIndex] as ParentWizardStepId];
    const ok = await form.trigger(fields);
    if (!ok) {
      const firstInvalid = fields.find((field) => form.getFieldState(field).invalid);
      if (firstInvalid) form.setFocus(firstInvalid);
    }
    return ok;
  };

  async function submit(values: ParentStudentFormValues) {
    if (options?.documentId) {
      try {
        await updateStudent.mutateAsync(values);
        toast.success(t('updateSuccess'));
        router.push(`/parent/students/${options.documentId}`);
      } catch {
        toast.error(t('updateError'));
      }
      return;
    }

    try {
      const student = await createStudent.mutateAsync(values);
      toast.success(t('createSuccess'));
      router.push(`/parent/students/${student.documentId}`);
    } catch {
      toast.error(t('createError'));
    }
  }

  return {
    form,
    photo,
    voiceIntro,
    handlePhotoChange,
    handleVoiceIntroChange,
    canAdvance,
    onFinish: form.handleSubmit(submit),
    isSubmitting: createStudent.isPending || updateStudent.isPending,
    isEditing,
  };
}
