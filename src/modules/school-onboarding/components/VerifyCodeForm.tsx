'use client';

import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
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
import { useSendVerificationCode } from '@/modules/school-onboarding/queries/use-send-verification-code.mutation';
import { useVerifyCode } from '@/modules/school-onboarding/queries/use-verify-code.mutation';
import { extractErrorMessage } from '@/modules/school-onboarding/lib/extract-error-message';
import { verifySchema } from '@/modules/school-onboarding/schemas/verify.schema';
import type { VerifyValues } from '@/modules/school-onboarding/types/school-onboarding.types';

interface VerifyCodeFormProps {
  onVerified: () => void;
  onBackToSearch: () => void;
}

export function VerifyCodeForm({ onVerified, onBackToSearch }: VerifyCodeFormProps) {
  const t = useTranslations('SchoolOnboarding');
  const sendCode = useSendVerificationCode();
  const verifyCode = useVerifyCode();
  const sentOnceRef = useRef(false);

  const form = useForm<VerifyValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: { code: '' },
  });

  useEffect(() => {
    if (sentOnceRef.current) return;
    sentOnceRef.current = true;
    sendCode.mutate(undefined, {
      onError: (err) => toast.error(extractErrorMessage(err, t('errorGeneric'))),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (values: VerifyValues) => {
    verifyCode.mutate(values.code, {
      onSuccess: () => {
        toast.success(t('verifySuccess'));
        onVerified();
      },
      onError: (err) => toast.error(extractErrorMessage(err, t('errorVerify'))),
    });
  };

  const handleResend = () => {
    sendCode.mutate(undefined, {
      onSuccess: () => toast.success(t('codeSentTo')),
      onError: (err) => toast.error(extractErrorMessage(err, t('errorGeneric'))),
    });
  };

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-1'>
        <h2 className='font-display text-xl font-bold text-ink-900'>{t('pendingTitle')}</h2>
        <p className='text-sm text-muted-foreground'>{t('pendingSubtitle')}</p>
        <p className='text-sm text-muted-foreground'>{t('codeSentTo')}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-4' noValidate>
          <FormField
            control={form.control}
            name='code'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('codeLabel')}</FormLabel>
                <FormControl>
                  <Input
                    inputMode='numeric'
                    autoComplete='one-time-code'
                    maxLength={6}
                    placeholder={t('codePlaceholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            disabled={verifyCode.isPending}
            aria-busy={verifyCode.isPending}
            className='self-start'
          >
            {verifyCode.isPending && (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />
            )}
            {verifyCode.isPending ? t('verifying') : t('verifyButton')}
          </Button>
        </form>
      </Form>

      <div className='flex items-center gap-4'>
        <Button
          type='button'
          variant='ghost'
          disabled={sendCode.isPending}
          onClick={handleResend}
        >
          {t('resendCode')}
        </Button>
        <Button type='button' variant='link' onClick={onBackToSearch}>
          {t('backToSearch')}
        </Button>
      </div>
    </div>
  );
}
