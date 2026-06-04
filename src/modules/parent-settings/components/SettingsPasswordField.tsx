'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { Control, FieldPath } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { SettingsFormMessage } from '@/modules/parent-settings/components/SettingsFormMessage';
import type { PasswordValues } from '@/modules/parent-settings/schemas/password.schema';

interface SettingsPasswordFieldProps {
  control: Control<PasswordValues>;
  name: FieldPath<PasswordValues>;
  label: string;
  autoComplete: 'current-password' | 'new-password';
  show: boolean;
  onToggleShow: () => void;
  children?: React.ReactNode;
}

export function SettingsPasswordField({
  control,
  name,
  label,
  autoComplete,
  show,
  onToggleShow,
  children,
}: SettingsPasswordFieldProps) {
  const t = useTranslations('ParentSettings');
  const eyeLabel = show ? t('hidePassword') : t('showPassword');

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className='relative'>
              <Input
                type={show ? 'text' : 'password'}
                autoComplete={autoComplete}
                className='pr-12'
                {...field}
              />
              <button
                type='button'
                onClick={onToggleShow}
                className='absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-foggy transition-colors hover:text-ink-900 focus:outline-none focus:ring-2 focus:ring-primary'
                aria-label={eyeLabel}
                aria-pressed={show}
              >
                {show ? (
                  <EyeOff className='h-5 w-5' aria-hidden='true' />
                ) : (
                  <Eye className='h-5 w-5' aria-hidden='true' />
                )}
              </button>
            </div>
          </FormControl>
          {children}
          <SettingsFormMessage />
        </FormItem>
      )}
    />
  );
}
