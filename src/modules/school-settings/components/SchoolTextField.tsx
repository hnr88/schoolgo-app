'use client';

import type { ComponentProps } from 'react';
import type { Control, FieldPath } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { SchoolProfileValues } from '@/modules/school-settings/schemas/profile.schema';

interface SchoolTextFieldProps {
  control: Control<SchoolProfileValues>;
  name: FieldPath<SchoolProfileValues>;
  label: string;
  autoComplete: ComponentProps<typeof Input>['autoComplete'];
  type?: ComponentProps<typeof Input>['type'];
}

export function SchoolTextField({ control, name, label, autoComplete, type }: SchoolTextFieldProps) {
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
