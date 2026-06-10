'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { createRegisterSchema, type RegisterValues } from '@/modules/auth/schemas/register.schema';
import { useRegister } from '@/modules/auth/hooks/useRegister';
import { BaseSignUpFields } from '@/modules/auth/components/BaseSignUpFields';
import { AgentSignUpFields } from '@/modules/auth/components/AgentSignUpFields';
import { SchoolSignUpExtras } from '@/modules/auth/components/SchoolSignUpExtras';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import type { RegisterFormProps } from '@/modules/auth/types/component.types';
import { getRegisterDefaultValues } from '@/modules/auth/lib/get-register-default-values';
import { AUTH_ERROR_SUMMARY_CLASS, AUTH_SUBMIT_CLASS } from '../constants/auth-field.constants';

export function RegisterForm({ userType }: RegisterFormProps) {
  const t = useTranslations('Auth');
  const schema = useMemo(() => createRegisterSchema(t, userType), [t, userType]);
  const isSchool = userType === 'school';

  const form = useForm<RegisterValues>({
    resolver: zodResolver(schema),
    defaultValues: getRegisterDefaultValues(userType),
  });

  const { handleRegister } = useRegister({ portal: userType, setError: form.setError });
  const { isSubmitting } = form.formState;
  const rootError = form.formState.errors.root?.message;
  const password = form.watch('password');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegister)} className='flex flex-col gap-6' noValidate>
        {rootError && (
          <div role='alert' aria-live='assertive' className={AUTH_ERROR_SUMMARY_CLASS}>
            {rootError}
          </div>
        )}

        <BaseSignUpFields control={form.control} password={password} isSchool={isSchool} />

        {userType === 'agent' && <AgentSignUpFields control={form.control} />}
        {isSchool && <SchoolSignUpExtras control={form.control} />}

        <Button
          type='submit'
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className={AUTH_SUBMIT_CLASS}
        >
          {isSubmitting && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
          {t('signUpButton')}
        </Button>
      </form>
    </Form>
  );
}
