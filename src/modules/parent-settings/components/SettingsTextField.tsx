'use client';

import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { SettingsFormMessage } from '@/modules/parent-settings/components/SettingsFormMessage';

interface SettingsTextFieldProps<TValues extends FieldValues> {
  control: Control<TValues>;
  name: FieldPath<TValues>;
  label: string;
  type?: 'text' | 'tel' | 'email';
  autoComplete?: string;
  description?: string;
}

export function SettingsTextField<TValues extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  autoComplete,
  description,
}: SettingsTextFieldProps<TValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} autoComplete={autoComplete} {...field} />
          </FormControl>
          {description ? <FormDescription>{description}</FormDescription> : null}
          <SettingsFormMessage />
        </FormItem>
      )}
    />
  );
}
