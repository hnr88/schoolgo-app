'use client';

import { useTranslations } from 'next-intl';
import type { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { RegisterValues } from '@/modules/auth/schemas/register.schema';
import { AUTH_INPUT_CLASS, AUTH_LABEL_CLASS } from '../constants/auth-field.constants';

interface AgentSignUpFieldsProps {
  control: Control<RegisterValues>;
}

export function AgentSignUpFields({ control }: AgentSignUpFieldsProps) {
  const t = useTranslations('Auth');

  return (
    <>
      <FormField
        control={control}
        name='agencyName'
        render={({ field }) => (
          <FormItem>
            <FormLabel className={AUTH_LABEL_CLASS}>{t('agent.agencyNameLabel')}</FormLabel>
            <FormControl>
              <Input
                type='text'
                autoComplete='organization'
                placeholder={t('agent.agencyNamePlaceholder')}
                className={AUTH_INPUT_CLASS}
                {...field}
                value={field.value ?? ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name='countryOfOperation'
        render={({ field }) => (
          <FormItem>
            <FormLabel className={AUTH_LABEL_CLASS}>{t('agent.countryLabel')}</FormLabel>
            <FormControl>
              <Input
                type='text'
                autoComplete='country-name'
                placeholder={t('agent.countryPlaceholder')}
                className={AUTH_INPUT_CLASS}
                {...field}
                value={field.value ?? ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name='phone'
        render={({ field }) => (
          <FormItem>
            <FormLabel className={AUTH_LABEL_CLASS}>{t('agent.phoneLabel')}</FormLabel>
            <FormControl>
              <Input
                type='tel'
                autoComplete='tel'
                placeholder={t('agent.phonePlaceholder')}
                className={AUTH_INPUT_CLASS}
                {...field}
                value={field.value ?? ''}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
