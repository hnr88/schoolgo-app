'use client';

import { useTranslations } from 'next-intl';
import { useFormField } from '@/components/ui/form';

type BuilderMessageKey = Parameters<ReturnType<typeof useTranslations<'AgentProfileBuilder'>>>[0];

/**
 * Validation message for builder forms — resolves the field error's message
 * (a zod-schema i18n key) under the `AgentProfileBuilder` namespace. Mirrors
 * `AgentProfileFormMessage` but for the builder's namespace.
 */
export function BuilderFormMessage() {
  const t = useTranslations('AgentProfileBuilder');
  const { error, formMessageId } = useFormField();

  if (!error?.message) {
    return null;
  }

  return (
    <p id={formMessageId} className='text-sm font-medium text-destructive'>
      {t(error.message as BuilderMessageKey)}
    </p>
  );
}
