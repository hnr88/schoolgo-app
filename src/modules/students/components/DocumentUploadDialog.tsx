'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, X, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DOCUMENT_TYPES } from '@/modules/students/types/document.types';
import {
  uploadDocumentSchema,
  type UploadDocumentFormValues,
} from '@/modules/students/schemas/document.schema';
import { useUploadDocument } from '@/modules/students/queries/use-upload-document.mutation';
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from '@/modules/students/constants/document.constants';
import type { DocumentUploadDialogProps } from '@/modules/students/types/component.types';

export function DocumentUploadDialog({
  open,
  onOpenChange,
  studentDocumentId,
}: DocumentUploadDialogProps) {
  const t = useTranslations('Students');
  const [files, setFiles] = useState<File[]>([]);
  const uploadMutation = useUploadDocument();

  const form = useForm<UploadDocumentFormValues>({
    resolver: zodResolver(uploadDocumentSchema),
    defaultValues: {
      documentType: undefined,
      fileName: '',
      expiresAt: '',
      notes: '',
    },
  });

  const onDrop = useCallback((accepted: File[]) => {
    setFiles(accepted);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
  });

  function removeFile() {
    setFiles([]);
  }

  async function onSubmit(values: UploadDocumentFormValues) {
    if (files.length === 0) return;

    await uploadMutation.mutateAsync({
      studentDocumentId,
      file: files[0],
      documentType: values.documentType,
      fileName: values.fileName || undefined,
      expiresAt: values.expiresAt || undefined,
      notes: values.notes || undefined,
    });

    form.reset();
    setFiles([]);
    onOpenChange(false);
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle>{t('docUploadTitle')}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <div
              {...getRootProps()}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 transition-colors ${
                isDragActive
                  ? 'border-brand-500 bg-brand-50'
                  : 'border-border hover:border-brand-300'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className='mb-2 h-8 w-8 text-foggy' />
              <p className='text-sm font-medium text-ink-900'>{t('docDropzone')}</p>
              <p className='mt-1 text-xs text-foggy'>{t('docDropzoneHint')}</p>
            </div>

            {files.length > 0 && (
              <div className='flex items-center gap-3 rounded-md border border-border p-3'>
                <FileText className='h-5 w-5 shrink-0 text-foggy' />
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-sm font-medium text-ink-900'>{files[0].name}</p>
                  <p className='text-xs text-foggy'>{formatSize(files[0].size)}</p>
                </div>
                <button type='button' onClick={removeFile} className='text-foggy hover:text-ink-900'>
                  <X className='h-4 w-4' />
                </button>
              </div>
            )}

            <FormField
              control={form.control}
              name='documentType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('docTypeLabel')}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('docTypeSelect')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DOCUMENT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {t(`docType_${type}`)}
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
              name='fileName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('docFileNameLabel')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('docFileNamePlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='expiresAt'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('docExpiresLabel')}</FormLabel>
                  <FormControl>
                    <Input type='date' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='notes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('docNotesLabel')}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t('docNotesPlaceholder')} rows={2} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end gap-3 pt-2'>
              <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
                {t('docCancel')}
              </Button>
              <Button type='submit' disabled={files.length === 0 || uploadMutation.isPending}>
                {uploadMutation.isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                {t('docUploadButton')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
