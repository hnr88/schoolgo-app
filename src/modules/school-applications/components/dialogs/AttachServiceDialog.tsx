'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import type { z } from 'zod';
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
import { formatAud } from '@/modules/school-invoices/lib/format-finance';
import { useServiceCatalog } from '@/modules/school-applications/queries/use-service-catalog.query';
import { useAttachService } from '@/modules/school-applications/queries/use-attach-service.mutation';
import {
  attachServiceSchema,
  type AttachServiceFormValues,
} from '@/modules/school-applications/schemas/attach-service.schema';

type AttachServiceFormInput = z.input<typeof attachServiceSchema>;

interface Props {
  documentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AttachServiceDialog({ documentId, open, onOpenChange }: Props) {
  const t = useTranslations('SchoolApplications');
  const { data: services = [], isLoading } = useServiceCatalog({ active: true });
  const attach = useAttachService(documentId);
  const form = useForm<AttachServiceFormInput, unknown, AttachServiceFormValues>({
    resolver: zodResolver(attachServiceSchema),
    defaultValues: { serviceCatalogItem: '', quantity: 1, dueDate: '' },
  });

  const selectedId = form.watch('serviceCatalogItem');
  const quantity = form.watch('quantity');
  const selected = services.find((service) => service.documentId === selectedId) ?? null;
  const total = selected ? selected.priceAud * (quantity || 0) : 0;

  function onSubmit(values: AttachServiceFormValues) {
    attach.mutate(values, {
      onSuccess: () => {
        toast.success(t('attachServiceSuccess'));
        onOpenChange(false);
        form.reset();
      },
      onError: () => toast.error(t('attachServiceError')),
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>{t('attachServiceTitle')}</DialogTitle>
          <DialogDescription>{t('attachServiceDescription')}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='serviceCatalogItem'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('attachServiceItemLabel')}</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={isLoading ? t('attachServiceLoading') : t('attachServiceItemPlaceholder')}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.documentId} value={service.documentId}>
                          {service.name} · {formatAud(service.priceAud)}
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
              name='quantity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('attachServiceQuantityLabel')}</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min='1'
                      step='1'
                      value={field.value ?? 1}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='dueDate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('attachServiceDueDateLabel')}</FormLabel>
                  <FormControl>
                    <Input type='date' {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-3'>
              <span className='text-sm text-foggy'>{t('attachServiceTotalLabel')}</span>
              <span className='text-sm font-semibold text-ink-900 tabular-nums'>{formatAud(total)}</span>
            </div>
            <DialogFooter>
              <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
                {t('confirmCancel')}
              </Button>
              <Button type='submit' disabled={attach.isPending || !selected}>
                {t('attachServiceSubmit')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
