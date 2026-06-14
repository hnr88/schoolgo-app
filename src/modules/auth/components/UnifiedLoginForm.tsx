'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  createUnifiedLoginSchema,
  type UnifiedLoginValues,
} from '@/modules/auth/schemas/unified-login.schema';
import { useLogin } from '@/modules/auth/hooks/useLogin';
import { useUnifiedLogin } from '@/modules/auth/hooks/useUnifiedLogin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PortalChips } from '@/modules/auth/components/PortalChips';
import type { UnifiedLoginFormProps } from '@/modules/auth/types/component.types';
import { PORTAL_LINK_COLOR } from '../constants/portal.constants';
import {
  AUTH_ERROR_SUMMARY_CLASS,
  AUTH_INPUT_CLASS,
  AUTH_LABEL_CLASS,
  AUTH_PASSWORD_INPUT_CLASS,
  AUTH_PASSWORD_TOGGLE_CLASS,
  AUTH_SUBMIT_CLASS,
} from '../constants/auth-field.constants';

export function UnifiedLoginForm({ currentPortal }: UnifiedLoginFormProps) {
  const t = useTranslations('Auth');
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const schema = useMemo(() => createUnifiedLoginSchema(t), [t]);

  const form = useForm<UnifiedLoginValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const {
    step,
    resolvedPortal,
    showPortalChips,
    isIdentifying,
    advanceToPassword,
    selectPortal,
    backToEmail,
    redirectForCrossPortal,
  } = useUnifiedLogin({ currentPortal });

  const { handleLogin } = useLogin({ portal: resolvedPortal, setError: form.setError });
  const { isSubmitting } = form.formState;
  const rootError = form.formState.errors.root?.message;

  // Resume the flow when the user was redirected to this portal's /sign-in with
  // a pre-resolved email (cross-portal handoff).
  const prefilled = useRef(false);
  useEffect(() => {
    const email = searchParams.get('email');
    if (email && !prefilled.current) {
      prefilled.current = true;
      form.setValue('email', email);
      void advanceToPassword(email);
    }
  }, [searchParams, form, advanceToPassword]);

  const handleEmailContinue = async () => {
    const valid = await form.trigger('email');
    if (!valid) return;
    await advanceToPassword(form.getValues('email'));
  };

  const onSubmit = async (values: UnifiedLoginValues) => {
    if (redirectForCrossPortal(resolvedPortal, values.email)) return;
    await handleLogin({ identifier: values.email, password: values.password });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6' noValidate>
        {rootError && (
          <div role='alert' aria-live='assertive' className={AUTH_ERROR_SUMMARY_CLASS}>
            {rootError}
          </div>
        )}

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className={AUTH_LABEL_CLASS}>{t('emailLabel')}</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  autoComplete='email'
                  placeholder={t('emailPlaceholder')}
                  className={AUTH_INPUT_CLASS}
                  readOnly={step === 'password'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {step === 'email' ? (
          <Button
            type='button'
            onClick={handleEmailContinue}
            disabled={isIdentifying}
            aria-busy={isIdentifying}
            className={AUTH_SUBMIT_CLASS}
          >
            {isIdentifying && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
            {t('continueButton')}
          </Button>
        ) : (
          <>
            {showPortalChips && <PortalChips value={resolvedPortal} onSelect={selectPortal} />}

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={AUTH_LABEL_CLASS}>{t('passwordLabel')}</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        autoComplete='current-password'
                        placeholder={t('passwordPlaceholder')}
                        className={AUTH_PASSWORD_INPUT_CLASS}
                        autoFocus
                        {...field}
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className={AUTH_PASSWORD_TOGGLE_CLASS}
                        aria-label={showPassword ? t('hidePassword') : t('showPassword')}
                        aria-pressed={showPassword}
                      >
                        {showPassword ? (
                          <EyeOff className='h-5 w-5' aria-hidden='true' />
                        ) : (
                          <Eye className='h-5 w-5' aria-hidden='true' />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex items-center justify-between'>
              <button
                type='button'
                onClick={backToEmail}
                className='text-sm font-medium text-foggy underline-offset-4 transition-colors hover:text-ink-900 hover:underline'
              >
                {t('changeEmail')}
              </button>
              <Link
                href='/forgot-password'
                className={`text-sm font-medium underline-offset-4 transition-colors hover:underline ${PORTAL_LINK_COLOR[resolvedPortal]}`}
              >
                {t('forgotPasswordLink')}
              </Link>
            </div>

            <Button
              type='submit'
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className={AUTH_SUBMIT_CLASS}
            >
              {isSubmitting && (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />
              )}
              {t('signInButton')}
            </Button>
          </>
        )}
      </form>
    </Form>
  );
}
