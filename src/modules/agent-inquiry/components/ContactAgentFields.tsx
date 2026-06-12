'use client';

import { useTranslations } from 'next-intl';
import type { UseFormReturn } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  CHILD_AGE_MAX,
  CHILD_AGE_MIN,
} from '@/modules/agent-inquiry/constants/agent-inquiry.constants';
import type { ContactAgentFormValues } from '@/modules/agent-inquiry/schemas/contact-agent.schema';

interface ContactAgentFieldsProps {
  form: UseFormReturn<ContactAgentFormValues>;
}

export function ContactAgentFields({ form }: ContactAgentFieldsProps) {
  const t = useTranslations('ContactAgent');

  return (
    <>
      <FormField
        control={form.control}
        name='parentName'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('nameLabel')}</FormLabel>
            <FormControl>
              <Input placeholder={t('namePlaceholder')} autoComplete='name' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className='grid gap-4 sm:grid-cols-2'>
        <FormField
          control={form.control}
          name='parentEmail'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('emailLabel')}</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder={t('emailPlaceholder')}
                  autoComplete='email'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='parentPhone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('phoneLabel')}</FormLabel>
              <FormControl>
                <Input
                  type='tel'
                  placeholder={t('phonePlaceholder')}
                  autoComplete='tel'
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name='childAge'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('childAgeLabel')}</FormLabel>
            <FormControl>
              <Input
                type='number'
                min={CHILD_AGE_MIN}
                max={CHILD_AGE_MAX}
                step='1'
                placeholder={t('childAgePlaceholder')}
                value={field.value ?? ''}
                onChange={(e) =>
                  field.onChange(e.target.value === '' ? undefined : e.target.valueAsNumber)
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='message'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('messageLabel')}</FormLabel>
            <FormControl>
              <Textarea rows={4} placeholder={t('messagePlaceholder')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
