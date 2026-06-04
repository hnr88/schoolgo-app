'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { BookmarkPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import { useSaveSearchForm } from '@/modules/school-search/hooks/useSaveSearchForm';
import { SAVE_SEARCH_NAME_MAX } from '@/modules/school-search/schemas/save-search-form.schema';

export function SaveSearchButton() {
  const t = useTranslations('SchoolSearch.saveSearch');
  const [open, setOpen] = useState(false);

  const { form, handleSubmit, isSaving } = useSaveSearchForm({
    onSaved: () => setOpen(false),
  });

  const nameValue = form.watch('name');

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) form.reset({ name: '' });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={<Button type="button" variant="outline" size="sm" className="w-full gap-2" />}
      >
        <BookmarkPlus className="size-4" aria-hidden="true" />
        {t('cta')}
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{t('promptTitle')}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-baseline justify-between gap-2">
                    <FormLabel>{t('nameLabel')}</FormLabel>
                    <span
                      className="text-caption tabular-nums text-foggy"
                      aria-hidden="true"
                    >
                      {t('nameCounter', {
                        count: nameValue?.length ?? 0,
                        max: SAVE_SEARCH_NAME_MAX,
                      })}
                    </span>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      maxLength={SAVE_SEARCH_NAME_MAX}
                      placeholder={t('namePlaceholder')}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isSaving}
              >
                {t('cancel')}
              </Button>
              <Button type="submit" disabled={isSaving}>
                {t('confirm')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
