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
import { profileSchema, type ProfileValues } from '@/modules/parent-settings/schemas/profile.schema';
import { useUpdateProfile } from '@/modules/parent-settings/queries/use-update-profile.mutation';
import { useUnsavedChangesGuard } from '@/modules/parent-settings/hooks/useUnsavedChangesGuard';
import { toProfileDefaults } from '@/modules/parent-settings/lib/parent-profile';
import { ParentIdentityFields } from '@/modules/parent-settings/components/ParentIdentityFields';
import { ParentContactFields } from '@/modules/parent-settings/components/ParentContactFields';
import { ParentAddressFields } from '@/modules/parent-settings/components/ParentAddressFields';
import { ParentEmergencyFields } from '@/modules/parent-settings/components/ParentEmergencyFields';
import { ProfileFormSection } from '@/modules/parent-settings/components/ProfileFormSection';
import { SettingsFormError } from '@/modules/parent-settings/components/SettingsFormError';
import { ChangeEmailButton } from '@/modules/parent-settings/components/ChangeEmailButton';
import type { ParentMe } from '@/modules/parent-settings/types/parent-settings.types';

export function ProfileForm({ me }: { me: ParentMe }) {
  const t = useTranslations('ParentSettings');
  const { mutateAsync, isPending } = useUpdateProfile();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: toProfileDefaults(me),
  });

  const isDirty = form.formState.isDirty;
  useUnsavedChangesGuard(isDirty);

  const handleSubmit = async (values: ProfileValues) => {
    setFormError(null);
    try {
      const next = await mutateAsync(values);
      form.reset(toProfileDefaults(next));
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-8' noValidate>
        {formError ? <SettingsFormError message={formError} /> : null}

        <ProfileFormSection title={t('sectionIdentity')}>
          <ParentIdentityFields control={form.control} />
        </ProfileFormSection>

        <ProfileFormSection title={t('sectionContact')}>
          <ParentContactFields control={form.control} />
          <div className='flex flex-col gap-2'>
            <FormItem>
              <FormLabel>{t('emailLabel')}</FormLabel>
              <FormControl>
                <Input value={me.email} readOnly disabled autoComplete='email' />
              </FormControl>
            </FormItem>
            <div className='flex flex-wrap items-center justify-between gap-2'>
              <p className='text-xs text-muted-foreground'>{t('emailHint')}</p>
              <ChangeEmailButton />
            </div>
          </div>
        </ProfileFormSection>

        <ProfileFormSection title={t('sectionAddress')}>
          <ParentAddressFields control={form.control} />
        </ProfileFormSection>

        <ProfileFormSection title={t('sectionEmergency')}>
          <ParentEmergencyFields control={form.control} />
        </ProfileFormSection>

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
