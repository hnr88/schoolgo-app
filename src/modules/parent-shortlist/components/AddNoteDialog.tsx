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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { ReactionPicker } from '@/modules/parent-shortlist/components/ReactionPicker';
import { useAddNote } from '@/modules/parent-shortlist/queries/use-add-note.mutation';
import { addNoteSchema } from '@/modules/parent-shortlist/schemas/shortlist.schema';
import type { AddNoteInput } from '@/modules/parent-shortlist/types/shortlist.types';

interface AddNoteDialogProps {
  itemDocumentId: string;
  schoolLabel: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddNoteDialog({ itemDocumentId, schoolLabel, open, onOpenChange }: AddNoteDialogProps) {
  const t = useTranslations('ParentShortlist');
  const addMutation = useAddNote(itemDocumentId);

  const form = useForm<AddNoteInput>({
    resolver: zodResolver(addNoteSchema),
    defaultValues: { body: '', reaction: undefined },
  });

  async function onSubmit(values: AddNoteInput) {
    await addMutation.mutateAsync(values);
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{t('addNoteTitle')}</DialogTitle>
          <DialogDescription>{t('addNoteSubtitle', { school: schoolLabel })}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='reaction'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('reactionLabel')}</FormLabel>
                  <FormControl>
                    <ReactionPicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='body'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('noteBodyLabel')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('noteBodyPlaceholder')}
                      rows={3}
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
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
                {t('addNoteAction')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
