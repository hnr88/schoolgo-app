'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAddItem } from '@/modules/parent-shortlist/queries/use-add-item.mutation';
import { addItemSchema } from '@/modules/parent-shortlist/schemas/shortlist.schema';
import { DECISION_STATUSES } from '@/modules/parent-shortlist/constants/shortlist.constants';
import type { AddItemInput } from '@/modules/parent-shortlist/types/shortlist.types';

interface AddItemDialogProps {
  shortlistDocumentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddItemDialog({ shortlistDocumentId, open, onOpenChange }: AddItemDialogProps) {
  const t = useTranslations('ParentShortlist');
  const addMutation = useAddItem(shortlistDocumentId);

  const form = useForm<AddItemInput>({
    resolver: zodResolver(addItemSchema),
    defaultValues: { schoolId: '', decisionStatus: 'considering' },
  });

  async function onSubmit(values: AddItemInput) {
    await addMutation.mutateAsync(values);
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{t('addItemTitle')}</DialogTitle>
          <DialogDescription>{t('addItemSubtitle')}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='schoolId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('schoolIdLabel')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('schoolIdPlaceholder')} autoComplete='off' {...field} />
                  </FormControl>
                  <FormDescription>{t('schoolIdHint')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='decisionStatus'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('decisionStatusLabel')}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DECISION_STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          {t(`decision_${status}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end gap-3 pt-2'>
              <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
                {t('cancel')}
              </Button>
              <Button type='submit' disabled={addMutation.isPending}>
                {addMutation.isPending && (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />
                )}
                {t('addItemAction')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
