'use client';

import { useEffect } from 'react';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { complianceEventFormSchema } from '@/modules/school-compliance/schemas/compliance-event.schema';
import { useRecordComplianceEvent } from '@/modules/school-compliance/queries/use-record-compliance-event.mutation';
import { EVENT_TYPE_OPTIONS } from '@/modules/school-compliance/constants/compliance.constants';
import type {
  CoeRegisterEntry,
  ComplianceEventFormValues,
} from '@/modules/school-compliance/types/school-compliance.types';

interface Props {
  entry: CoeRegisterEntry | null;
  onClose: () => void;
}

export function AnnotateEventDialog({ entry, onClose }: Props) {
  const t = useTranslations('SchoolCompliance');
  const mutation = useRecordComplianceEvent();
  const form = useForm<ComplianceEventFormValues>({
    resolver: zodResolver(complianceEventFormSchema),
    defaultValues: { applicationDocumentId: '', type: 'expiring_soon', dueAt: '', note: '' },
  });

  useEffect(() => {
    if (entry) {
      form.reset({ applicationDocumentId: entry.applicationDocumentId, type: 'expiring_soon', dueAt: '', note: '' });
    }
  }, [entry, form]);

  function onSubmit(values: ComplianceEventFormValues) {
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success(t('annotateSuccess'));
        onClose();
      },
      onError: () => toast.error(t('annotateError')),
    });
  }

  return (
    <Dialog open={!!entry} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>{t('annotateTitle')}</DialogTitle>
          <DialogDescription>
            {entry?.studentName ? t('annotateForStudent', { name: entry.studentName }) : t('annotateDescription')}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('annotateTypeLabel')}</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {EVENT_TYPE_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {t(opt.labelKey)}
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
              name='dueAt'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('annotateDueLabel')}</FormLabel>
                  <FormControl>
                    <Input type='date' {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='note'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('annotateNoteLabel')}</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value ?? ''} placeholder={t('annotateNotePlaceholder')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type='button' variant='outline' onClick={onClose}>
                {t('cancel')}
              </Button>
              <Button type='submit' disabled={mutation.isPending}>
                {t('save')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
