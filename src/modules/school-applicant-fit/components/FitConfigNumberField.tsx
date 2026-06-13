'use client';

import { useTranslations } from 'next-intl';
import type { Control, FieldPath } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { FitConfigFormValues } from '@/modules/school-applicant-fit/schemas/fit-config-form.schema';

interface FitConfigNumberFieldProps {
  control: Control<FitConfigFormValues>;
  name: FieldPath<FitConfigFormValues>;
  label: string;
  max: number;
  step: number;
}

export function FitConfigNumberField({ control, name, label, max, step }: FitConfigNumberFieldProps) {
  const tErrors = useTranslations('SchoolApplicantFit.formErrors');

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type='number'
              min={0}
              max={max}
              step={step}
              value={Number.isNaN(field.value) ? '' : field.value}
              onChange={(e) => field.onChange(e.target.valueAsNumber)}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          </FormControl>
          {fieldState.error?.message ? (
            <p className='text-sm text-destructive'>{tErrors(fieldState.error.message)}</p>
          ) : (
            <FormMessage />
          )}
        </FormItem>
      )}
    />
  );
}
