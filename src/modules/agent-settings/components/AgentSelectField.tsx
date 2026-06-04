'use client';

import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AgentSettingsFormMessage } from '@/modules/agent-settings/components/AgentSettingsFormMessage';

interface AgentSelectOption {
  value: string;
  label: string;
}

interface AgentSelectFieldProps<TValues extends FieldValues> {
  control: Control<TValues>;
  name: FieldPath<TValues>;
  label: string;
  description: string;
  options: ReadonlyArray<AgentSelectOption>;
}

export function AgentSelectField<TValues extends FieldValues>({
  control,
  name,
  label,
  description,
  options,
}: AgentSelectFieldProps<TValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className='w-full sm:w-64'>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{description}</FormDescription>
          <AgentSettingsFormMessage />
        </FormItem>
      )}
    />
  );
}
