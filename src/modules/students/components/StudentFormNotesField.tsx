'use client';

import { useTranslations } from 'next-intl';
import { StickyNote } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { StudentFormSectionCard } from '@/modules/students/components/StudentFormSectionCard';
import type { StudentFormNotesFieldProps } from '@/modules/students/types/component.types';

export function StudentFormNotesField({ control }: StudentFormNotesFieldProps) {
  const t = useTranslations('Students');

  return (
    <StudentFormSectionCard
      icon={StickyNote}
      title={t('sectionNotes')}
      description={t('sectionNotesDesc')}
    >
      <FormField
        control={control}
        name='agentNotes'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('fieldNotes')}</FormLabel>
            <FormControl><Textarea rows={5} placeholder={t('notesPlaceholder')} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </StudentFormSectionCard>
  );
}
