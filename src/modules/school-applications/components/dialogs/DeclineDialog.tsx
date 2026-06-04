'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { declineSchema, type DeclineForm } from '@/modules/school-applications/schemas/school-actions.schema';
import { useSchoolApplicationAction } from '@/modules/school-applications/queries/use-school-application-action.mutation';

const REASONS = [
  'english_insufficient',
  'no_places',
  'age_year_mismatch',
  'incomplete_docs',
  'academic_requirements',
  'behaviour_welfare',
  'other',
];

interface Props {
  documentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeclineDialog({ documentId, open, onOpenChange }: Props) {
  const t = useTranslations('SchoolApplications');
  const action = useSchoolApplicationAction(documentId, 'decline');
  const form = useForm<DeclineForm>({
    resolver: zodResolver(declineSchema),
    defaultValues: { declineReason: '', declineNote: '' },
  });

  function onSubmit(values: DeclineForm) {
    const payload: Record<string, unknown> = { declineReason: values.declineReason };
    if (values.declineNote) payload.declineNote = values.declineNote;
    action.mutate(payload, {
      onSuccess: () => {
        toast.success(t('actionSuccess'));
        onOpenChange(false);
        form.reset();
      },
      onError: () => toast.error(t('actionError')),
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{t('actionDecline')}</DialogTitle>
          <DialogDescription>{t('declineDialogDescription')}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='declineReason'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('declineReasonLabel')}</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('declineReasonPlaceholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {REASONS.map((r) => (
                        <SelectItem key={r} value={r}>
                          {t(`declineReason_${r}`)}
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
              name='declineNote'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('declineNoteLabel')}</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
                {t('confirmCancel')}
              </Button>
              <Button type='submit' variant='destructive' disabled={action.isPending}>
                {t('actionDecline')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
