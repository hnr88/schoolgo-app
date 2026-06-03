'use client';

import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useDropzone } from 'react-dropzone';
import { FileText, Upload, X } from 'lucide-react';

import {
  ACCEPTED_VAULT_FILE_TYPES,
  MAX_VAULT_FILE_SIZE,
} from '@/modules/document-vault/constants/document-vault.constants';
import { formatVaultFileSize } from '@/modules/document-vault/lib/format-vault-file';

interface VaultFileDropzoneProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

export function VaultFileDropzone({ files, onFilesChange }: VaultFileDropzoneProps) {
  const t = useTranslations('DocumentVault');

  const onDrop = useCallback((accepted: File[]) => onFilesChange(accepted), [onFilesChange]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_VAULT_FILE_TYPES,
    maxSize: MAX_VAULT_FILE_SIZE,
    multiple: false,
  });

  return (
    <div className='flex flex-col gap-3'>
      <div
        {...getRootProps()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 transition-colors ${isDragActive ? 'border-rausch-500 bg-rausch-50' : 'border-border hover:border-rausch-300'}`}
      >
        <input {...getInputProps()} />
        <Upload className='mb-2 h-8 w-8 text-foggy' />
        <p className='text-sm font-medium text-ink-900'>{t('dropzone')}</p>
        <p className='mt-1 text-xs text-foggy'>{t('dropzoneHint')}</p>
      </div>
      {files.length > 0 && (
        <div className='flex items-center gap-3 rounded-md border border-border p-3'>
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
