'use client';

import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { DialogFooter } from '@/components/ui/dialog';
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
import { useAskAboutSchoolForm } from '@/modules/parent-ask-school/hooks/useAskAboutSchoolForm';
import { QUESTION_TOPICS } from '@/modules/parent-ask-school/constants/ask-school.constants';

interface AskAboutSchoolFormProps {
  schoolDocumentId: string;
  onClose: () => void;
}

export function AskAboutSchoolForm({ schoolDocumentId, onClose }: AskAboutSchoolFormProps) {
  const t = useTranslations('AskSchool');
  const { form, handleSubmit, isPending } = useAskAboutSchoolForm(schoolDocumentId, onClose);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('topicLabel')}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {QUESTION_TOPICS.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {t(`topic_${topic}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('questionLabel')}</FormLabel>
              <FormControl>
                <Textarea rows={5} placeholder={t('questionPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
            {t('cancel')}
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            {t('askSubmit')}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
