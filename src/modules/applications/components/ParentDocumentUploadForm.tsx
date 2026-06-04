'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMediaUpload } from '@/modules/forms';
import { useUploadParentDocument } from '@/modules/applications/queries/use-upload-parent-document.mutation';
import {
  DOCUMENT_FILE_ACCEPT,
  MAX_DOCUMENT_SIZE_BYTES,
  PARENT_DOCUMENT_TYPE_OPTIONS,
} from '@/modules/applications/constants/parent-document.constants';
import type { DocumentType } from '@/modules/students';
import type { ParentDocumentUploadFormProps } from '@/modules/applications/types/parent-document.types';

export function ParentDocumentUploadForm({
  applicationDocumentId,
  studentDocumentId,
  documentType,
  onDocumentTypeChange,
}: ParentDocumentUploadFormProps) {
  const t = useTranslations('ParentApplications');
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const upload = useMediaUpload();
  const uploadDocument = useUploadParentDocument(applicationDocumentId);

  const isBusy = upload.isPending || uploadDocument.isPending;

  function resetForm() {
    setFile(null);
    onDocumentTypeChange('');
    if (inputRef.current) inputRef.current.value = '';
  }

  async function handleSubmit() {
    if (!documentType || !file) return;
    if (file.size > MAX_DOCUMENT_SIZE_BYTES) {
      toast.error(t('documentsUploadError'));
      return;
    }
    try {
      const media = await upload.mutateAsync(file);
      uploadDocument.mutate(
        {
          documentType,
          file: media.id,
          fileName: file.name,
          student: studentDocumentId,
          application: applicationDocumentId,
        },
        {
          onSuccess: () => {
            toast.success(t('documentsUploadSuccess'));
            resetForm();
          },
          onError: () => toast.error(t('documentsUploadError')),
        },
      );
    } catch {
      toast.error(t('documentsUploadError'));
    }
  }

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='document-type'>{t('documentsSelectType')}</Label>
        <Select
          value={documentType}
          onValueChange={(value) => onDocumentTypeChange(value as DocumentType)}
        >
          <SelectTrigger id='document-type' className='w-full'>
            <SelectValue placeholder={t('documentsSelectTypePlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            {PARENT_DOCUMENT_TYPE_OPTIONS.map((type) => (
              <SelectItem key={type} value={type}>
                {t(`documentType_${type}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='document-file'>{t('documentsFileLabel')}</Label>
        <input
          ref={inputRef}
          id='document-file'
          type='file'
          accept={DOCUMENT_FILE_ACCEPT}
          disabled={isBusy}
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className='block w-full rounded-lg border border-input bg-transparent text-sm text-ink-900 file:mr-4 file:cursor-pointer file:border-0 file:bg-muted file:px-4 file:py-2 file:text-sm file:font-medium file:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
        />
      </div>

      {upload.isPending && <Progress value={upload.progress} />}

      <Button type='button' onClick={handleSubmit} disabled={!documentType || !file || isBusy}>
        {isBusy && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
        {t('documentsUploadButton')}
      </Button>
    </div>
  );
}
