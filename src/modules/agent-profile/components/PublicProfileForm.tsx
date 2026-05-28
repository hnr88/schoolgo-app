'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  publicProfileSchema,
  type PublicProfileValues,
} from '@/modules/agent-profile/schemas/public-profile.schema';
import { useUpdatePublicProfile } from '@/modules/agent-profile/queries/use-update-public-profile.mutation';
import type {
  AgentPublicPreview,
  UpdatePublicProfilePayload,
} from '@/modules/agent-profile/types/agent-profile.types';

interface PublicProfileFormProps {
  preview: AgentPublicPreview;
}

const EDITABLE_FIELDS = [
  'companyName',
  'roleTitle',
  'countryOfOperation',
  'qeacNumber',
  'phone',
  'website',
  'bio',
] as const;

export function PublicProfileForm({ preview }: PublicProfileFormProps) {
  const t = useTranslations('AgentProfile');
  const { mutateAsync, isPending } = useUpdatePublicProfile();

  const form = useForm<PublicProfileValues>({
    resolver: zodResolver(publicProfileSchema),
    defaultValues: {
      companyName: preview.companyName ?? '',
      roleTitle: preview.roleTitle ?? '',
      countryOfOperation: preview.countryOfOperation ?? '',
      qeacNumber: preview.qeacNumber ?? '',
      phone: '',
      website: preview.website ?? '',
      bio: preview.bio ?? '',
    },
  });

  const handleSubmit = async (values: PublicProfileValues) => {
    const dirty = form.formState.dirtyFields;
    const payload: UpdatePublicProfilePayload = {};
    for (const key of EDITABLE_FIELDS) {
      if (dirty[key]) payload[key] = (values[key] ?? '').trim();
    }
    if (Object.keys(payload).length === 0) {
      payload.companyName = values.companyName.trim();
    }
    await mutateAsync(payload);
    form.reset(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6' noValidate>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='companyName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('companyNameLabel')}</FormLabel>
                <FormControl>
                  <Input autoComplete='organization' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='roleTitle'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('roleTitleLabel')}</FormLabel>
                <FormControl>
                  <Input autoComplete='organization-title' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='countryOfOperation'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('countryLabel')}</FormLabel>
                <FormControl>
                  <Input autoComplete='country-name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='qeacNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('qeacNumberLabel')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>{t('qeacNumberHint')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('phoneLabel')}</FormLabel>
                <FormControl>
                  <Input type='tel' autoComplete='tel' placeholder={t('phonePlaceholder')} {...field} />
                </FormControl>
                <FormDescription>{t('phoneHint')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='website'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('websiteLabel')}</FormLabel>
                <FormControl>
                  <Input type='url' autoComplete='url' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('bioLabel')}</FormLabel>
              <FormControl>
                <Textarea rows={4} {...field} />
              </FormControl>
              <FormDescription>{t('bioHint')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isPending} aria-busy={isPending} className='self-start'>
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
          {t('saveButton')}
        </Button>
      </form>
    </Form>
  );
}
