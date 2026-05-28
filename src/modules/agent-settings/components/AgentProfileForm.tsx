'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  agentProfileSchema,
  type AgentProfileValues,
} from '@/modules/agent-settings/schemas/profile.schema';
import { useUpdateAgentProfile } from '@/modules/agent-settings/queries/use-update-agent-profile.mutation';
import type {
  AgentProfileSummary,
  AgentUserMe,
} from '@/modules/agent-settings/types/agent-settings.types';

interface AgentProfileFormProps {
  user: AgentUserMe;
  profile: AgentProfileSummary;
}

export function AgentProfileForm({ user, profile }: AgentProfileFormProps) {
  const t = useTranslations('AgentSettings');
  const { mutateAsync, isPending } = useUpdateAgentProfile();

  const form = useForm<AgentProfileValues>({
    resolver: zodResolver(agentProfileSchema),
    defaultValues: {
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      phone: user.phone ?? '',
    },
  });

  const handleSubmit = async (values: AgentProfileValues) => {
    await mutateAsync({
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone || '',
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6' noValidate>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('firstNameLabel')}</FormLabel>
                <FormControl>
                  <Input autoComplete='given-name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('lastNameLabel')}</FormLabel>
                <FormControl>
                  <Input autoComplete='family-name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('phoneLabel')}</FormLabel>
              <FormControl>
                <Input type='tel' autoComplete='tel' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex flex-col gap-2'>
          <FormItem>
            <FormLabel>{t('emailLabel')}</FormLabel>
            <FormControl>
              <Input value={user.email} readOnly disabled autoComplete='email' />
            </FormControl>
          </FormItem>
          <p className='text-xs text-muted-foreground'>{t('emailHint')}</p>
        </div>

        <fieldset className='grid grid-cols-1 gap-4 rounded-lg border border-border bg-muted/40 p-4 sm:grid-cols-2'>
          <legend className='px-1 text-sm font-medium text-ink-900'>{t('companyLegend')}</legend>
          <div className='flex flex-col gap-1'>
            <span className='text-xs font-medium text-muted-foreground'>{t('companyLabel')}</span>
            <span className='text-sm text-ink-900'>{profile.companyName || t('notProvided')}</span>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='text-xs font-medium text-muted-foreground'>{t('countryLabel')}</span>
            <span className='text-sm text-ink-900'>
              {profile.countryOfOperation || t('notProvided')}
            </span>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='text-xs font-medium text-muted-foreground'>{t('qeacLabel')}</span>
            <Badge variant={profile.qeacCertified ? 'default' : 'secondary'} className='w-fit'>
              {profile.qeacCertified ? t('qeacCertified') : t('qeacNotCertified')}
            </Badge>
          </div>
          <div className='flex flex-col gap-1'>
            <span className='text-xs font-medium text-muted-foreground'>
              {t('verifiedLabel')}
            </span>
            <Badge variant={profile.verified ? 'default' : 'secondary'} className='w-fit'>
              {profile.verified ? t('verifiedYes') : t('verifiedNo')}
            </Badge>
          </div>
          <p className='text-xs text-muted-foreground sm:col-span-2'>{t('companyHint')}</p>
        </fieldset>

        <Button type='submit' disabled={isPending} aria-busy={isPending} className='self-start'>
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
          {t('saveButton')}
        </Button>
      </form>
    </Form>
  );
}
