'use client';

import type { Control } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { BuilderFormMessage } from '@/modules/agent-profile/components/editors/BuilderFormMessage';
import type { IdentityFormValues } from '@/modules/agent-profile/schemas/identity.schema';

interface IdentityFormRowProps {
  control: Control<IdentityFormValues>;
  name: keyof IdentityFormValues;
  labelKey: string;
  kind?: 'input' | 'textarea';
  type?: string;
  autoComplete?: string;
  inputMode?: 'numeric';
}

/**
 * One react-hook-form field row for the IdentityEditor. Renders an Input or
 * Textarea bound to the form control and shows the shared validation message.
 * Keeps the editor shell terse so it stays under the component line limit.
 */
export function IdentityFormRow({
  control,
  name,
  labelKey,
  kind = 'input',
  type = 'text',
  autoComplete,
  inputMode,
}: IdentityFormRowProps) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t(labelKey)}</FormLabel>
          <FormControl>
            {kind === 'textarea' ? (
              <Textarea rows={4} {...field} />
            ) : (
              <Input type={type} inputMode={inputMode} autoComplete={autoComplete} {...field} />
            )}
          </FormControl>
          <BuilderFormMessage />
        </FormItem>
      )}
    />
  );
}
