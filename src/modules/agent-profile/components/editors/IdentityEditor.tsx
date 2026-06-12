'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { IdentityFormRow } from '@/modules/agent-profile/components/editors/IdentityFormRow';
import { IdentityMediaFields } from '@/modules/agent-profile/components/editors/IdentityMediaFields';
import { useIdentityEditorForm } from '@/modules/agent-profile/hooks/useIdentityEditorForm';
import type { IdentityFormValues } from '@/modules/agent-profile/schemas/identity.schema';
import type {
  AgentPublicProfilePreview,
  UpdateAgentProfilePayload,
} from '@/modules/agent-profile/types/agent-profile.types';

interface IdentityEditorProps {
  preview: AgentPublicProfilePreview;
}

const GRID_ROWS: Array<{
  name: keyof IdentityFormValues;
  labelKey: string;
  type?: string;
  autoComplete?: string;
  inputMode?: 'numeric';
}> = [
  { name: 'displayName', labelKey: 'identityDisplayNameLabel', autoComplete: 'organization' },
  { name: 'headline', labelKey: 'identityHeadlineLabel' },
  { name: 'tagline', labelKey: 'identityTaglineLabel' },
  { name: 'tradingName', labelKey: 'identityTradingNameLabel' },
  { name: 'legalEntityName', labelKey: 'identityLegalEntityNameLabel' },
  { name: 'directorName', labelKey: 'identityDirectorNameLabel' },
  {
    name: 'countryOfRegistration',
    labelKey: 'identityCountryOfRegistrationLabel',
    autoComplete: 'country-name',
  },
  { name: 'yearEstablished', labelKey: 'identityYearEstablishedLabel', inputMode: 'numeric' },
  { name: 'website', labelKey: 'identityWebsiteLabel', type: 'url', autoComplete: 'url' },
  { name: 'phone', labelKey: 'identityPhoneLabel', type: 'tel', autoComplete: 'tel' },
];

/**
 * Identity & basics editor (Task 087). react-hook-form + zod over the agent's
 * displayName, branding (headline/tagline) and legal-identity scalars, plus
 * logo/cover/photo uploads. Saves dirty fields via `updateMe` (replace
 * semantics). Hydrates from the builder preview projection.
 */
export function IdentityEditor({ preview }: IdentityEditorProps) {
  const t = useTranslations('AgentProfileBuilder');
  const { form, submit, isPending } = useIdentityEditorForm(preview);
  const [media, setMedia] = useState<UpdateAgentProfilePayload>({});

  const onSubmit = (values: IdentityFormValues) => submit(values, media);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6' noValidate>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {GRID_ROWS.map((row) => (
            <IdentityFormRow
              key={row.name}
              control={form.control}
              name={row.name}
              labelKey={row.labelKey}
              type={row.type}
              autoComplete={row.autoComplete}
              inputMode={row.inputMode}
            />
          ))}
        </div>

        <IdentityFormRow
          control={form.control}
          name='publicSummary'
          labelKey='identityPublicSummaryLabel'
          kind='textarea'
        />

        <IdentityMediaFields
          existingPhotoUrl={preview.photoUrl}
          existingCoverUrl={preview.coverPhotoUrl}
          onChange={setMedia}
          disabled={isPending}
        />

        <Button type='submit' disabled={isPending} aria-busy={isPending} className='self-start'>
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
          {t('identitySave')}
        </Button>
      </form>
    </Form>
  );
}
