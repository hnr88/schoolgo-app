'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  createKeyFactsSchema,
  SCHOOL_TYPES,
  SCHOOL_SECTORS,
  SCHOOL_GENDERS,
  SCHOOL_ACCOMMODATIONS,
  RELIGIOUS_AFFILIATIONS,
  type KeyFactsValues,
} from '@/modules/school-profile/schemas/keyFacts.schema';
import { useUpdateSchool } from '@/modules/school-profile/queries/use-update-school.mutation';
import { emptyToNull } from '@/modules/school-profile/lib/form-helpers';
import type { SchoolProfileDetails } from '@/modules/school-profile/types/school-profile.types';

interface KeyFactsFormProps {
  school: SchoolProfileDetails;
  disabled?: boolean;
}

type EnumName = 'schoolType' | 'sector' | 'gender' | 'accommodation' | 'religiousAffiliation';

const ENUM_OPTIONS: Record<EnumName, readonly string[]> = {
  schoolType: SCHOOL_TYPES,
  sector: SCHOOL_SECTORS,
  gender: SCHOOL_GENDERS,
  accommodation: SCHOOL_ACCOMMODATIONS,
  religiousAffiliation: RELIGIOUS_AFFILIATIONS,
};

export function KeyFactsForm({ school, disabled = false }: KeyFactsFormProps) {
  const t = useTranslations('SchoolProfile');
  const { mutateAsync, isPending } = useUpdateSchool(school.documentId);
  const schema = useMemo(() => createKeyFactsSchema(t), [t]);

  const form = useForm<KeyFactsValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      welcomeMessage: school.welcomeMessage ?? '',
      schoolType: school.schoolType,
      sector: school.sector,
      gender: school.gender,
      accommodation: school.accommodation,
      religiousAffiliation: school.religiousAffiliation,
    },
  });

  const handleSubmit = async (values: KeyFactsValues) => {
    await mutateAsync({
      welcomeMessage: emptyToNull(values.welcomeMessage),
      schoolType: values.schoolType,
      sector: values.sector,
      gender: values.gender,
      accommodation: values.accommodation,
      religiousAffiliation: values.religiousAffiliation,
    });
    form.reset(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6' noValidate>
        <FormField control={form.control} name='welcomeMessage' render={({ field }) => (
          <FormItem>
            <FormLabel>{t('welcomeMessageLabel')}</FormLabel>
            <FormControl><Textarea rows={4} disabled={disabled} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {(Object.keys(ENUM_OPTIONS) as EnumName[]).map((name) => (
            <FormField key={name} control={form.control} name={name} render={({ field }) => (
              <FormItem>
                <FormLabel>{t(`${name}Label`)}</FormLabel>
                <Select disabled={disabled} value={field.value ?? undefined} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder={t(`${name}Placeholder`)} /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ENUM_OPTIONS[name].map((value) => (
                      <SelectItem key={value} value={value}>{t(`${name}_${value}`)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
          ))}
        </div>
        <Button type='submit' disabled={disabled || isPending} aria-busy={isPending} className='self-start'>
          {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />}
          {t('save')}
        </Button>
      </form>
    </Form>
  );
}
