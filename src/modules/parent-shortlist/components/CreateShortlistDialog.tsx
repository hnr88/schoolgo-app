'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateShortlist } from '@/modules/parent-shortlist/queries/use-create-shortlist.mutation';
import { createShortlistSchema } from '@/modules/parent-shortlist/schemas/shortlist.schema';
import type { CreateShortlistInput } from '@/modules/parent-shortlist/types/shortlist.types';

export function CreateShortlistDialog() {
  const t = useTranslations('ParentShortlist');
  const [open, setOpen] = useState(false);
  const createMutation = useCreateShortlist();

  const form = useForm<CreateShortlistInput>({
    resolver: zodResolver(createShortlistSchema),
    defaultValues: { name: '' },
  });

  async function onSubmit(values: CreateShortlistInput) {
    await createMutation.mutateAsync(values);
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size='sm' className='gap-1.5' />}>
        <Plus className='h-4 w-4' aria-hidden='true' />
        {t('createAction')}
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{t('createTitle')}</DialogTitle>
          <DialogDescription>{t('createSubtitle')}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('nameLabel')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('namePlaceholder')} autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end gap-3 pt-2'>
              <Button type='button' variant='outline' onClick={() => setOpen(false)}>
                {t('cancel')}
              </Button>
              <Button type='submit' disabled={createMutation.isPending}>
                {createMutation.isPending && (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />
                )}
                {t('createAction')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
