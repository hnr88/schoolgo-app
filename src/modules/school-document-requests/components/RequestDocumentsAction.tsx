'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { FilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Input } from '@/components/ui/input';
import { requestDocumentsSchema } from '@/modules/school-document-requests/schemas/request-documents.schema';
import type { RequestDocumentsFormValues } from '@/modules/school-document-requests/types/school-document-requests.types';
import { useCreateDocumentRequest } from '@/modules/school-document-requests/queries/use-create-document-request.mutation';
import { DocumentTypeChecklist } from '@/modules/school-document-requests/components/DocumentTypeChecklist';

export function RequestDocumentsAction({ applicationDocumentId }: { applicationDocumentId: string }) {
  const t = useTranslations('SchoolDocumentRequests');
  const [open, setOpen] = useState(false);
  const mutation = useCreateDocumentRequest();
  const form = useForm<RequestDocumentsFormValues>({
    resolver: zodResolver(requestDocumentsSchema),
    defaultValues: { requiredDocuments: [], deadline: '' },
  });

  function onSubmit(values: RequestDocumentsFormValues) {
    const deadline = values.deadline?.trim();
    mutation.mutate(
      {
        applicationDocumentId,
        requiredDocuments: values.requiredDocuments,
        ...(deadline ? { deadline } : {}),
      },
      {
        onSuccess: () => {
          toast.success(t('createSuccess'));
          setOpen(false);
          form.reset();
        },
        onError: () => toast.error(t('createError')),
      },
    );
  }

  return (
    <>
      <Button type='button' variant='outline' size='sm' onClick={() => setOpen(true)}>
        <FilePlus className='mr-2 h-4 w-4' />
        {t('requestButton')}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-2xl'>
          <DialogHeader>
            <DialogTitle>{t('dialogTitle')}</DialogTitle>
            <DialogDescription>{t('dialogDescription')}</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
              <FormField
                control={form.control}
                name='requiredDocuments'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('documentTypesLabel')}</FormLabel>
                    <FormControl>
                      <DocumentTypeChecklist value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='deadline'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('deadlineFieldLabel')}</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type='button' variant='outline' onClick={() => setOpen(false)}>
                  {t('formCancel')}
                </Button>
                <Button type='submit' disabled={mutation.isPending}>
                  {t('formSubmit')}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
