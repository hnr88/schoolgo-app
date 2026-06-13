'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { formatAud } from '@/modules/school-growth-services/lib/format-aud';
import { purchaseEngagementSchema } from '@/modules/school-growth-services/schemas/growth-services.schema';
import type {
  GrowthService,
  PurchaseEngagementFormValues,
} from '@/modules/school-growth-services/types/growth-services.types';
import { usePurchaseEngagement } from '@/modules/school-growth-services/queries/use-purchase-engagement.mutation';

export function PurchaseServiceDialog({ service }: { service: GrowthService }) {
  const t = useTranslations('SchoolGrowthServices');
  const [open, setOpen] = useState(false);
  const mutation = usePurchaseEngagement();
  const form = useForm<PurchaseEngagementFormValues>({
    resolver: zodResolver(purchaseEngagementSchema),
    defaultValues: { growthService: service.documentId },
  });

  function onSubmit(values: PurchaseEngagementFormValues) {
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success(t('purchaseSuccess'));
        setOpen(false);
      },
      onError: () => toast.error(t('purchaseError')),
    });
  }

  return (
    <>
      <Button type='button' size='sm' onClick={() => setOpen(true)}>
        <ShoppingBag className='mr-2 h-4 w-4' aria-hidden='true' />
        {t('requestButton')}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{t('purchaseDialogTitle')}</DialogTitle>
          <DialogDescription>
            {t('purchaseDialogDescription', {
              name: service.name,
              price: formatAud(service.priceAud),
            })}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <p className='text-sm text-foggy'>{t('purchaseInvoiceNote')}</p>
            <DialogFooter>
              <Button type='button' variant='outline' onClick={() => setOpen(false)}>
                {t('cancel')}
              </Button>
              <Button type='submit' disabled={mutation.isPending}>
                {mutation.isPending ? t('purchaseSubmitting') : t('confirmPurchase')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
