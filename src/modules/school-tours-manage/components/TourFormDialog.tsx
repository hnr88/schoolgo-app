'use client';

import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { TourFormFields } from '@/modules/school-tours-manage/components/TourFormFields';
import { useTourForm } from '@/modules/school-tours-manage/hooks/useTourForm';
import type { ManagedTour } from '@/modules/school-tours-manage/types/school-tours-manage.types';

interface TourFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tour: ManagedTour | null;
}

function TourFormDialogBody({ tour, onClose }: { tour: ManagedTour | null; onClose: () => void }) {
  const t = useTranslations('SchoolTours');
  const { form, handleSubmit, isPending } = useTourForm({ tour, onClose });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' noValidate>
        <TourFormFields form={form} />
        <DialogFooter>
          <Button type='button' variant='outline' onClick={onClose} disabled={isPending}>
            {t('formCancel')}
          </Button>
          <Button type='submit' disabled={isPending}>
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {tour ? t('formSaveUpdate') : t('formSaveCreate')}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export function TourFormDialog({ open, onOpenChange, tour }: TourFormDialogProps) {
  const t = useTranslations('SchoolTours');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>{tour ? t('editTitle') : t('createTitle')}</DialogTitle>
          <DialogDescription>{tour ? t('editDescription') : t('createDescription')}</DialogDescription>
        </DialogHeader>
        {open && <TourFormDialogBody tour={tour} onClose={() => onOpenChange(false)} />}
      </DialogContent>
    </Dialog>
  );
}
