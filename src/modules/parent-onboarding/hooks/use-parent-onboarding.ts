'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@/i18n/navigation';
import { profileSchema, toProfileDefaults, useUpdateProfile } from '@/modules/parent-settings';
import type { ParentMe, ProfileValues } from '@/modules/parent-settings';
import {
  ONBOARDING_STEP_IDS,
  STEP_FIELDS,
} from '@/modules/parent-onboarding/constants/parent-onboarding.constants';

export function useParentOnboarding(me: ParentMe) {
  const router = useRouter();
  const updateProfile = useUpdateProfile();

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    mode: 'onBlur',
    defaultValues: toProfileDefaults(me),
  });

  const canAdvance = async (stepIndex: number) => {
    const fields = STEP_FIELDS[ONBOARDING_STEP_IDS[stepIndex]];
    const ok = await form.trigger(fields);
    if (!ok) {
      const firstInvalid = fields.find((field) => form.getFieldState(field).invalid);
      if (firstInvalid) form.setFocus(firstInvalid);
    }
    return ok;
  };

  async function submit(values: ProfileValues) {
    try {
      await updateProfile.mutateAsync(values);
      router.replace('/parent/dashboard');
    } catch {
      // Save failures are surfaced by the shared useUpdateProfile onError toast.
    }
  }

  return {
    form,
    canAdvance,
    onFinish: form.handleSubmit(submit),
    isSubmitting: updateProfile.isPending,
  };
}
