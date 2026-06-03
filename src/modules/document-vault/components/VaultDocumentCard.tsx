'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { Download, Trash2 } from 'lucide-react';

import { VAULT_DOCUMENT_TYPE_ICON } from '@/modules/document-vault/constants/document-vault.constants';
import { toAbsoluteVaultUrl } from '@/modules/document-vault/lib/format-vault-file';
import type { VaultDocumentCardProps } from '@/modules/document-vault/types/document-vault.types';

export function VaultDocumentCard({ document, onDelete }: VaultDocumentCardProps) {
  const t = useTranslations('DocumentVault');
  const format = useFormatter();
  const Icon = VAULT_DOCUMENT_TYPE_ICON[document.documentType];

  return (
    <article className='flex flex-col gap-4 rounded-lg border border-border bg-card p-4 shadow-1 transition-shadow hover:shadow-2'>
      <div className='flex items-start gap-3'>
        <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-rausch-50 text-rausch-600'>
          <Icon className='h-5 w-5' />
        </span>
        <div className='min-w-0 flex-1'>
          <h3 className='truncate text-sm font-semibold text-ink-900' title={document.title}>
            {document.title}
          </h3>
          <p className='mt-0.5 text-xs text-foggy'>{t(`docType_${document.documentType}`)}</p>
        </div>
      </div>

      <p className='text-xs text-muted-foreground'>
        {t('uploadedOn', { date: format.dateTime(new Date(document.createdAt), { dateStyle: 'medium' }) })}
      </p>

      <div className='mt-auto flex items-center gap-2'>
        {document.file?.url ? (
          <a
            href={toAbsoluteVaultUrl(document.file.url)}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-md border border-border text-sm font-medium text-ink-900 transition-colors hover:bg-muted'
          >
            <Download className='h-4 w-4' />
            {t('download')}
          </a>
        ) : (
          <span className='inline-flex h-9 flex-1 items-center justify-center rounded-md border border-dashed border-border text-sm text-foggy'>
            {t('noFile')}
          </span>
        )}
        <button
          type='button'
          onClick={() => onDelete(document)}
          aria-label={t('deleteButton')}
          className='inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-foggy transition-colors hover:bg-muted hover:text-destructive'
        >
          <Trash2 className='h-4 w-4' />
        </button>
      </div>
    </article>
  );
}
