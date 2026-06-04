'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormItem, FormLabel } from '@/components/ui/form';
import {
  agentProfileSchema,
  type AgentProfileValues,
} from '@/modules/agent-settings/schemas/profile.schema';
import { useUpdateAgentProfile } from '@/modules/agent-settings/queries/use-update-agent-profile.mutation';
import { useUnsavedChangesGuard } from '@/modules/agent-settings/hooks/useUnsavedChangesGuard';
import { AgentTextField } from '@/modules/agent-settings/components/AgentTextField';
import { AgentSettingsFormError } from '@/modules/agent-settings/components/AgentSettingsFormError';
import { AgentCompanyDetails } from '@/modules/agent-settings/components/AgentCompanyDetails';
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
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<AgentProfileValues>({
    resolver: zodResolver(agentProfileSchema),
    defaultValues: {
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      phone: user.phone ?? '',
    },
  });

  const isDirty = form.formState.isDirty;
  useUnsavedChangesGuard(isDirty);

  const handleSubmit = async (values: AgentProfileValues) => {
    setFormError(null);
    try {
      const next = await mutateAsync({
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone || '',
      });
      form.reset({
        firstName: next.firstName ?? '',
        lastName: next.lastName ?? '',
        phone: next.phone ?? '',
      });
    } catch (error) {
      const status = isAxiosError(error) ? error.response?.status : undefined;
      const apiMessage = isAxiosError(error)
        ? (error.response?.data?.error?.message as string | undefined)
        : undefined;
      setFormError(status === 422 && apiMessage ? apiMessage : t('saveError'));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6' noValidate>
        {formError ? <AgentSettingsFormError message={formError} /> : null}

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          <AgentTextField
            control={form.control}
            name='firstName'
            label={t('firstNameLabel')}
            autoComplete='given-name'
          />
          <AgentTextField
            control={form.control}
            name='lastName'
            label={t('lastNameLabel')}
            autoComplete='family-name'
          />
        </div>

        <AgentTextField
          control={form.control}
          name='phone'
          label={t('phoneLabel')}
          type='tel'
          autoComplete='tel'
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

        <AgentCompanyDetails profile={profile} />

        <Button
          type='submit'
          disabled={isPending || !isDirty}
          aria-busy={isPending}
          className='self-start'
        >
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
          {t('saveButton')}
        </Button>
      </form>
    </Form>
  );
}
