'use client';

import Image from 'next/image';
import { useFormatter, useTranslations } from 'next-intl';
import { Download, Eye, Trash2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { SurfaceCard } from '@/modules/core';
import { VAULT_DOCUMENT_TYPE_ICON } from '@/modules/document-vault/constants/document-vault.constants';
import { toAbsoluteVaultUrl } from '@/modules/document-vault/lib/format-vault-file';
import { getVaultPreviewKind, isVaultImage } from '@/modules/document-vault/lib/vault-preview';
import { getVaultExpiryStatus } from '@/modules/document-vault/lib/vault-expiry';
import { VaultExpiryBadge } from '@/modules/document-vault/components/VaultExpiryBadge';
import type { VaultDocumentCardProps } from '@/modules/document-vault/types/document-vault.types';

export function VaultDocumentCard({ document, onDelete, onPreview }: VaultDocumentCardProps) {
  const t = useTranslations('DocumentVault');
  const format = useFormatter();
  const Icon = VAULT_DOCUMENT_TYPE_ICON[document.documentType];
  const canPreview = getVaultPreviewKind(document.file) !== 'none';
  const thumbnailUrl = isVaultImage(document.file) ? toAbsoluteVaultUrl(document.file!.url) : null;
  const expiryStatus = getVaultExpiryStatus(document.expiresAt);

  return (
    <SurfaceCard elevation='interactive' padding='sm' className='flex flex-col gap-4'>
      {thumbnailUrl ? (
        <button
          type='button'
          onClick={() => onPreview(document)}
          aria-label={t('previewOpen')}
          className='relative aspect-video w-full overflow-hidden rounded-md border border-border bg-muted transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-none'
        >
          <Image
            src={thumbnailUrl}
            alt={t('previewImageAlt', { title: document.title })}
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px'
            className='object-cover'
          />
        </button>
      ) : null}

      <div className='flex items-start gap-3'>
        <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-vivid-iris-soft text-vivid-iris-strong'>
          <Icon className='h-5 w-5' />
        </span>
        <div className='min-w-0 flex-1'>
          <h3 className='truncate text-sm font-semibold text-ink-900' title={document.title}>
            {document.title}
          </h3>
          <p className='mt-0.5 text-xs text-foggy'>{t(`docType_${document.documentType}`)}</p>
        </div>
        <VaultExpiryBadge status={expiryStatus} />
      </div>

      {document.notes ? (
        <p className='line-clamp-2 text-xs text-muted-foreground' title={document.notes}>
          <span className='font-medium text-foggy'>{t('notesLabelStatic')}: </span>
          {document.notes}
        </p>
      ) : null}

      <div className='flex flex-col gap-1'>
        <p className='text-xs text-muted-foreground'>
          {t('uploadedOn', {
            date: format.dateTime(new Date(document.createdAt), { dateStyle: 'medium' }),
          })}
        </p>
        {document.expiresAt ? (
          <p
            className={cn(
              'text-xs',
              expiryStatus === 'expired' ? 'text-vivid-coral-strong' : 'text-muted-foreground',
            )}
          >
            {t('expiresOn', {
              date: format.dateTime(new Date(document.expiresAt), { dateStyle: 'medium' }),
            })}
          </p>
        ) : null}
      </div>

      <div className='mt-auto flex items-center gap-2'>
        {canPreview ? (
          <button
            type='button'
            onClick={() => onPreview(document)}
            className='inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-md border border-border text-sm font-medium text-ink-900 transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-none'
          >
            <Eye className='h-4 w-4' />
            {t('previewOpen')}
          </button>
        ) : document.file?.url ? (
          <a
            href={toAbsoluteVaultUrl(document.file.url)}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-md border border-border text-sm font-medium text-ink-900 transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-none'
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
          className='inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-foggy transition-colors hover:bg-muted hover:text-destructive focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-none'
        >
          <Trash2 className='h-4 w-4' />
        </button>
      </div>
    </SurfaceCard>
  );
}
