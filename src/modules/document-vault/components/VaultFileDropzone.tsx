'use client';

import { useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useDropzone, type FileRejection } from 'react-dropzone';
import { AlertCircle, FileText, Upload, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  ACCEPTED_VAULT_FILE_TYPES,
  MAX_VAULT_FILE_SIZE,
} from '@/modules/document-vault/constants/document-vault.constants';
import { formatVaultFileSize } from '@/modules/document-vault/lib/format-vault-file';
import { resolveVaultRejection } from '@/modules/document-vault/lib/vault-rejection';

interface VaultFileDropzoneProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

export function VaultFileDropzone({ files, onFilesChange }: VaultFileDropzoneProps) {
  const t = useTranslations('DocumentVault');

  const onDrop = useCallback(
    (accepted: File[]) => {
      if (accepted.length > 0) onFilesChange(accepted);
    },
    [onFilesChange],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: ACCEPTED_VAULT_FILE_TYPES,
    maxSize: MAX_VAULT_FILE_SIZE,
    multiple: false,
  });

  const rejectionMessage = useMemo(() => {
    const rejection = resolveVaultRejection(fileRejections as FileRejection[]);
    if (!rejection) return null;
    return t(rejection.key, {
      ...rejection.values,
      maxSize: formatVaultFileSize(MAX_VAULT_FILE_SIZE / 1024),
    });
  }, [fileRejections, t]);

  return (
    <div className='flex flex-col gap-3'>
      <div
        {...getRootProps()}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 transition-colors ease-out-quart focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
          isDragActive ? 'border-rausch-500 bg-rausch-50' : 'border-border hover:border-rausch-300',
          rejectionMessage && !isDragActive && 'border-destructive',
        )}
      >
        <input {...getInputProps()} />
        <span className='mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rausch-50 text-rausch-600'>
          <Upload className='h-6 w-6' />
        </span>
        <p className='text-sm font-medium text-ink-900'>{t('dropzone')}</p>
        <p className='mt-1 text-xs text-foggy'>{t('dropzoneHint')}</p>
      </div>

      {rejectionMessage ? (
        <p
          role='alert'
          className='flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-xs font-medium text-destructive'
        >
          <AlertCircle className='mt-0.5 h-4 w-4 shrink-0' aria-hidden='true' />
          {rejectionMessage}
        </p>
      ) : null}

      {files.length > 0 && (
        <div className='flex items-center gap-3 rounded-md border border-border bg-card p-3 shadow-1'>
          <FileText className='h-5 w-5 shrink-0 text-foggy' />
          <div className='min-w-0 flex-1'>
            <p className='truncate text-sm font-medium text-ink-900'>{files[0].name}</p>
            <p className='text-xs text-foggy'>{formatVaultFileSize(files[0].size / 1024)}</p>
          </div>
          <button
            type='button'
            onClick={() => onFilesChange([])}
            aria-label={t('removeFile')}
            className='rounded-sm text-foggy hover:text-ink-900 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
          >
            <X className='h-4 w-4' />
          </button>
        </div>
      )}
    </div>
  );
}
