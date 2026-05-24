'use client';

import { useTranslations } from 'next-intl';
import { Textarea } from '@/components/ui/textarea';
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { StudentFormNotesFieldProps } from '@/modules/students/types/component.types';

export function StudentFormNotesField({ control }: StudentFormNotesFieldProps) {
  const t = useTranslations('Students');

  return (
    <FormField
      control={control}
      name='agentNotes'
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('fieldNotes')}</FormLabel>
          <FormControl><Textarea rows={4} placeholder={t('notesPlaceholder')} {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
