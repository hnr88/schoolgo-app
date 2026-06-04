'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  passwordSchema,
  type PasswordValues,
} from '@/modules/parent-settings/schemas/password.schema';
import { useChangePassword } from '@/modules/parent-settings/queries/use-change-password.mutation';
import { SettingsPasswordField } from '@/modules/parent-settings/components/SettingsPasswordField';
import { PasswordStrengthMeter } from '@/modules/parent-settings/components/PasswordStrengthMeter';
import { SettingsFormError } from '@/modules/parent-settings/components/SettingsFormError';

export function PasswordForm() {
  const t = useTranslations('ParentSettings');
  const [show, setShow] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { mutateAsync, isPending } = useChangePassword();

  const form = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: '', password: '', passwordConfirmation: '' },
  });

  const newPassword = form.watch('password');
  const toggle = () => setShow((prev) => !prev);

  const handleSubmit = async (values: PasswordValues) => {
    setFormError(null);
    try {
      await mutateAsync(values);
      form.reset();
      setShow(false);
    } catch (error) {
      const status = isAxiosError(error) ? error.response?.status : undefined;
      if (status === 400 || status === 401) {
        form.setError('currentPassword', {
          type: 'server',
          message: 'currentPasswordInvalid',
        });
        return;
      }
      const apiMessage = isAxiosError(error)
        ? (error.response?.data?.error?.message as string | undefined)
        : undefined;
      setFormError(status === 422 && apiMessage ? apiMessage : t('passwordError'));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6' noValidate>
        {formError ? <SettingsFormError message={formError} /> : null}

        <SettingsPasswordField
          control={form.control}
          name='currentPassword'
          label={t('currentPasswordLabel')}
          autoComplete='current-password'
          show={show}
          onToggleShow={toggle}
        />

        <SettingsPasswordField
          control={form.control}
          name='password'
          label={t('newPasswordLabel')}
          autoComplete='new-password'
          show={show}
          onToggleShow={toggle}
        >
          <PasswordStrengthMeter value={newPassword} />
        </SettingsPasswordField>

        <SettingsPasswordField
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
