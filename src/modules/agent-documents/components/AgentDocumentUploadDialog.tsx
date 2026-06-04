'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Upload, X, FileText, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from '@/modules/students/constants/document.constants';
import { DOCUMENT_TYPES } from '@/modules/students/types/document.types';
import { useStudents } from '@/modules/students/queries/use-students.query';
import { useUploadAgentDocument } from '@/modules/agent-documents/queries/use-upload-agent-document.mutation';
import {
  uploadAgentDocumentSchema,
  type UploadAgentDocumentFormValues,
} from '@/modules/agent-documents/schemas/agent-document.schema';
import { formatFileSize } from '@/modules/agent-documents/lib/format-file-size';
import type { AgentDocumentUploadDialogProps } from '@/modules/agent-documents/types/component.types';

export function AgentDocumentUploadDialog({ open, onOpenChange }: AgentDocumentUploadDialogProps) {
  const t = useTranslations('AgentDocuments');
  const [files, setFiles] = useState<File[]>([]);
  const { data: studentsData } = useStudents({ pageSize: 100 });
  const uploadMutation = useUploadAgentDocument();

  const form = useForm<UploadAgentDocumentFormValues>({
    resolver: zodResolver(uploadAgentDocumentSchema),
    defaultValues: { studentDocumentId: '', documentType: undefined, fileName: '', notes: '' },
  });

  const onDrop = useCallback((accepted: File[]) => setFiles(accepted), []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
  });

  async function onSubmit(values: UploadAgentDocumentFormValues) {
    if (files.length === 0) return;
    try {
      await uploadMutation.mutateAsync({
        studentDocumentId: values.studentDocumentId,
        file: files[0],
        documentType: values.documentType,
        fileName: values.fileName || undefined,
        notes: values.notes || undefined,
      });
      toast.success(t('uploadSuccess'));
      form.reset();
      setFiles([]);
      onOpenChange(false);
    } catch {
      toast.error(t('uploadError'));
    }
  }

  const students = studentsData?.data ?? [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle>{t('uploadTitle')}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <div
              {...getRootProps()}
              className={cn(
                'flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 transition-colors ease-out-quart',
                isDragActive
                  ? 'border-babu-500 bg-babu-50'
                  : 'border-border hover:border-babu-500 hover:bg-babu-50/40',
              )}
            >
              <input {...getInputProps()} />
              <span className='mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-babu-50 text-babu-700'>
                <Upload className='h-5 w-5' strokeWidth={1.75} aria-hidden='true' />
              </span>
              <p className='text-sm font-medium text-ink-900'>{t('dropzone')}</p>
              <p className='mt-1 text-xs text-foggy'>{t('dropzoneHint')}</p>
            </div>
            {files.length > 0 && (
              <div className='flex items-center gap-3 rounded-lg border border-border bg-muted/40 p-3'>
                <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-babu-50 text-babu-700'>
                  <FileText className='h-4 w-4' strokeWidth={1.75} aria-hidden='true' />
                </span>
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-sm font-medium text-ink-900'>{files[0].name}</p>
                  <p className='text-xs text-foggy'>{formatFileSize(files[0].size)}</p>
                </div>
                <button type='button' onClick={() => setFiles([])} aria-label={t('cancel')} className='rounded-md p-1 text-foggy transition-colors hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'>
                  <X className='h-4 w-4' />
                </button>
              </div>
            )}
            <FormField control={form.control} name='studentDocumentId' render={({ field }) => (
              <FormItem>
                <FormLabel>{t('studentLabel')}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder={t('studentSelect')} /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {students.map((s) => (
                      <SelectItem key={s.documentId} value={s.documentId}>{s.firstName} {s.lastName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name='documentType' render={({ field }) => (
              <FormItem>
                <FormLabel>{t('typeLabel')}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value ?? ''}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder={t('typeSelect')} /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {DOCUMENT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>{t(`docType_${type}`)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name='fileName' render={({ field }) => (
              <FormItem>
                <FormLabel>{t('fileNameLabel')}</FormLabel>
                <FormControl><Input placeholder={t('fileNamePlaceholder')} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name='notes' render={({ field }) => (
              <FormItem>
                <FormLabel>{t('notesLabel')}</FormLabel>
                <FormControl><Textarea placeholder={t('notesPlaceholder')} rows={2} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className='flex justify-end gap-3 pt-2'>
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
