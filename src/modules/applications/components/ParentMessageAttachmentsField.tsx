'use client';

import { useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useDropzone, type FileRejection } from 'react-dropzone';
import { AlertCircle, FileText, Paperclip, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ACCEPTED_MESSAGE_ATTACHMENT_TYPES,
  MAX_MESSAGE_ATTACHMENT_COUNT,
  MAX_MESSAGE_ATTACHMENT_SIZE,
} from '@/modules/applications/constants/parent-message-attachment.constants';
import {
  formatAttachmentSize,
  resolveAttachmentRejection,
} from '@/modules/applications/lib/message-attachment';
import type { ParentMessageAttachmentsFieldProps } from '@/modules/applications/types/parent-message.types';

export function ParentMessageAttachmentsField({
  files,
  onFilesChange,
  disabled,
}: ParentMessageAttachmentsFieldProps) {
  const t = useTranslations('ParentMessages');

  const onDrop = useCallback(
    (accepted: File[]) => {
      if (accepted.length === 0) return;
      onFilesChange([...files, ...accepted].slice(0, MAX_MESSAGE_ATTACHMENT_COUNT));
    },
    [files, onFilesChange],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: ACCEPTED_MESSAGE_ATTACHMENT_TYPES,
    maxSize: MAX_MESSAGE_ATTACHMENT_SIZE,
    maxFiles: MAX_MESSAGE_ATTACHMENT_COUNT,
    disabled,
  });

  const rejectionMessage = useMemo(() => {
    const rejection = resolveAttachmentRejection(fileRejections as FileRejection[]);
    if (!rejection) return null;
    return t(rejection.key, {
      name: rejection.name,
      maxSize: formatAttachmentSize(MAX_MESSAGE_ATTACHMENT_SIZE),
      max: MAX_MESSAGE_ATTACHMENT_COUNT,
    });
  }, [fileRejections, t]);

  function removeFile(index: number) {
    onFilesChange(files.filter((_, i) => i !== index));
  }

  return (
    <div className='flex flex-col gap-2'>
      <div
        {...getRootProps()}
        className={cn(
          'flex cursor-pointer items-center gap-2 rounded-md border border-dashed px-3 py-2 text-xs font-medium transition-colors ease-out-quart focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
          isDragActive ? 'border-rausch-500 bg-rausch-50 text-rausch-600' : 'border-border text-foggy hover:border-rausch-300',
          disabled && 'pointer-events-none opacity-60',
        )}
      >
        <input {...getInputProps()} />
        <Paperclip className='h-4 w-4' aria-hidden='true' />
        {t('attachLabel')}
      </div>

      {rejectionMessage ? (
        <p
          role='alert'
          className='flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-2 text-xs font-medium text-destructive'
        >
          <AlertCircle className='mt-0.5 h-3.5 w-3.5 shrink-0' aria-hidden='true' />
          {rejectionMessage}
        </p>
      ) : null}

      {files.length > 0 && (
        <ul className='flex flex-col gap-1.5'>
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className='flex items-center gap-2 rounded-md border border-border bg-card p-2 shadow-1'
            >
              <FileText className='h-4 w-4 shrink-0 text-foggy' aria-hidden='true' />
              <div className='min-w-0 flex-1'>
                <p className='truncate text-xs font-medium text-ink-900'>{file.name}</p>
                <p className='text-xs text-foggy'>{formatAttachmentSize(file.size)}</p>
              </div>
              <button
                type='button'
                onClick={() => removeFile(index)}
                disabled={disabled}
                aria-label={t('attachRemove', { name: file.name })}
                className='rounded-sm text-foggy hover:text-ink-900 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
              >
                <X className='h-4 w-4' />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
