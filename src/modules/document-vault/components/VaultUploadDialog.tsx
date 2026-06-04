'use client';

import { useState } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format as formatDate } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUploadVaultDocument } from '@/modules/document-vault/queries/use-upload-vault-document.mutation';
import { VaultFileDropzone } from '@/modules/document-vault/components/VaultFileDropzone';
import {
  uploadVaultDocumentSchema,
  type UploadVaultDocumentFormValues,
} from '@/modules/document-vault/schemas/vault-document.schema';
import { VAULT_DOCUMENT_TYPES } from '@/modules/document-vault/types/document-vault.types';
import type { VaultUploadDialogProps } from '@/modules/document-vault/types/document-vault.types';

export function VaultUploadDialog({ open, onOpenChange }: VaultUploadDialogProps) {
  const t = useTranslations('DocumentVault');
  const format = useFormatter();
  const [files, setFiles] = useState<File[]>([]);
  const uploadMutation = useUploadVaultDocument();

  const form = useForm<UploadVaultDocumentFormValues>({
    resolver: zodResolver(uploadVaultDocumentSchema),
    defaultValues: { title: '', documentType: undefined, notes: '', expiresAt: undefined },
  });

  async function onSubmit(values: UploadVaultDocumentFormValues) {
    if (files.length === 0) return;
    try {
      await uploadMutation.mutateAsync({
        title: values.title,
        documentType: values.documentType,
        notes: values.notes || undefined,
        expiresAt: values.expiresAt ? formatDate(values.expiresAt, 'yyyy-MM-dd') : undefined,
        file: files[0],
      });
      toast.success(t('uploadSuccess'));
      form.reset();
      setFiles([]);
      onOpenChange(false);
    } catch {
      toast.error(t('uploadError'));
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>{t('uploadTitle')}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
            <VaultFileDropzone files={files} onFilesChange={setFiles} />
            <FormField control={form.control} name='title' render={({ field }) => (
              <FormItem>
                <FormLabel>{t('titleLabel')}</FormLabel>
                <FormControl><Input placeholder={t('titlePlaceholder')} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <FormField control={form.control} name='documentType' render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('typeLabel')}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value ?? ''}>
                    <FormControl>
                      <SelectTrigger className='w-full'><SelectValue placeholder={t('typeSelect')} /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {VAULT_DOCUMENT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>{t(`docType_${type}`)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name='expiresAt' render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>{t('expiresAtLabel')}</FormLabel>
                  <Popover>
                    <FormControl>
                      <PopoverTrigger
                        render={
                          <Button
                            type='button'
                            variant='outline'
                            className={cn('w-full justify-start font-normal', !field.value && 'text-foggy')}
                          />
                        }
                      >
                        <CalendarIcon className='mr-2 h-4 w-4 shrink-0 opacity-70' />
                        {field.value
                          ? format.dateTime(field.value, { dateStyle: 'medium' })
                          : t('expiresAtPlaceholder')}
                      </PopoverTrigger>
                    </FormControl>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        autoFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name='notes' render={({ field }) => (
              <FormItem>
                <FormLabel>{t('notesLabel')}</FormLabel>
                <FormControl><Textarea placeholder={t('notesPlaceholder')} rows={2} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className='flex justify-end gap-3 pt-1'>
              <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>{t('cancel')}</Button>
              <Button type='submit' disabled={files.length === 0 || uploadMutation.isPending}>
                {uploadMutation.isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                {t('uploadButton')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
