'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  schoolPasswordSchema,
  type SchoolPasswordValues,
} from '@/modules/school-settings/schemas/password.schema';
import { useSchoolChangePassword } from '@/modules/school-settings/queries/use-school-change-password.mutation';
import { SchoolPasswordField } from '@/modules/school-settings/components/SchoolPasswordField';
import { SchoolPasswordStrengthMeter } from '@/modules/school-settings/components/SchoolPasswordStrengthMeter';
import { SchoolSettingsFormError } from '@/modules/school-settings/components/SchoolSettingsFormError';
import { getSchoolServerError } from '@/modules/school-settings/lib/server-error';

export function SchoolPasswordForm() {
  const t = useTranslations('SchoolSettings');
  const [show, setShow] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { mutateAsync, isPending } = useSchoolChangePassword();

  const form = useForm<SchoolPasswordValues>({
    resolver: zodResolver(schoolPasswordSchema),
    defaultValues: { currentPassword: '', password: '', passwordConfirmation: '' },
  });

  const newPassword = form.watch('password');
  const toggle = () => setShow((prev) => !prev);

  const handleSubmit = async (values: SchoolPasswordValues) => {
    setFormError(null);
    try {
      await mutateAsync(values);
      form.reset();
      setShow(false);
    } catch (error) {
      const { status, message } = getSchoolServerError(error);
      if (status === 400 || status === 401) {
        form.setError('currentPassword', {
          type: 'server',
          message: t('currentPasswordInvalid'),
        });
        return;
      }
      setFormError(status === 422 && message ? message : t('passwordError'));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6' noValidate>
        {formError ? <SchoolSettingsFormError message={formError} /> : null}

        <SchoolPasswordField
          control={form.control}
          name='currentPassword'
          label={t('currentPasswordLabel')}
          autoComplete='current-password'
          show={show}
          onToggleShow={toggle}
        />

        <SchoolPasswordField
          control={form.control}
          name='password'
          label={t('newPasswordLabel')}
          autoComplete='new-password'
          show={show}
          onToggleShow={toggle}
        >
          <SchoolPasswordStrengthMeter password={newPassword} />
        </SchoolPasswordField>

        <SchoolPasswordField
          control={form.control}
          name='passwordConfirmation'
          label={t('confirmPasswordLabel')}
          autoComplete='new-password'
          show={show}
          onToggleShow={toggle}
        />

        <Button
          type='submit'
          disabled={isPending || !form.formState.isDirty}
          aria-busy={isPending}
          className='self-start'
        >
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
          {t('changePasswordButton')}
        </Button>
      </form>
    </Form>
  );
}
