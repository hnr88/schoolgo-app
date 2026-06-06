'use client';

import { useTranslations } from 'next-intl';
import { useFormField } from '@/components/ui/form';

type ParentApplicationsMessageKey = Parameters<
  ReturnType<typeof useTranslations<'ParentApplications'>>
>[0];

export function ParentApplicationFormMessage() {
  const t = useTranslations('ParentApplications');
  const { error, formMessageId } = useFormField();

  if (!error?.message) {
    return null;
  }

  return (
    <p id={formMessageId} className='text-sm font-medium text-destructive'>
      {t(error.message as ParentApplicationsMessageKey)}
    </p>
  );
}
