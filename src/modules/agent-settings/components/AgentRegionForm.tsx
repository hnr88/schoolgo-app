'use client';

import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useAgentRegionForm } from '@/modules/agent-settings/hooks/useAgentRegionForm';
import { useAgentRegionOptions } from '@/modules/agent-settings/hooks/useAgentRegionOptions';
import { AgentSelectField } from '@/modules/agent-settings/components/AgentSelectField';
import { AgentSettingsFormError } from '@/modules/agent-settings/components/AgentSettingsFormError';
import type { AgentLocalePreferences } from '@/modules/agent-settings/types/agent-settings.types';

export function AgentRegionForm({ locale }: { locale: AgentLocalePreferences }) {
  const t = useTranslations('AgentSettings');
  const { form, isPending, isDirty, formError, handleSubmit } = useAgentRegionForm(locale);
  const { languageOptions, timezoneOptions, dateFormatOptions } = useAgentRegionOptions();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6' noValidate>
        {formError ? <AgentSettingsFormError message={formError} /> : null}

        <AgentSelectField
          control={form.control}
          name='interfaceLanguage'
          label={t('interfaceLanguageLabel')}
          description={t('languageAppliedHint')}
          options={languageOptions}
        />

        <AgentSelectField
          control={form.control}
          name='timezone'
          label={t('timezoneLabel')}
          description={t('timezoneHint')}
          options={timezoneOptions}
        />

        <AgentSelectField
          control={form.control}
          name='dateFormat'
          label={t('dateFormatLabel')}
          description={t('dateFormatHint')}
          options={dateFormatOptions}
        />

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
