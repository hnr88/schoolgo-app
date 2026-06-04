'use client';

import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { AgentSettingsFormMessage } from '@/modules/agent-settings/components/AgentSettingsFormMessage';

interface AgentTextFieldProps<TValues extends FieldValues> {
  control: Control<TValues>;
  name: FieldPath<TValues>;
  label: string;
  type?: 'text' | 'tel' | 'email';
  autoComplete?: string;
}

export function AgentTextField<TValues extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  autoComplete,
}: AgentTextFieldProps<TValues>) {
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
          <AgentSettingsFormMessage />
        </FormItem>
      )}
    />
  );
}
