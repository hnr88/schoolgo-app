'use client';

import { useTranslations } from 'next-intl';
import { useFormField } from '@/components/ui/form';

type ProfileMessageKey = Parameters<ReturnType<typeof useTranslations<'AgentProfile'>>>[0];

export function AgentProfileFormMessage() {
  const t = useTranslations('AgentProfile');
  const { error, formMessageId } = useFormField();

  if (!error?.message) {
    return null;
  }

  return (
    <p id={formMessageId} className='text-sm font-medium text-destructive'>
      {t(error.message as ProfileMessageKey)}
    </p>
  );
}
