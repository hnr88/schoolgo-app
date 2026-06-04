'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ExternalLink, FileQuestion } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { EmptyState } from '@/modules/core';
import { toAbsoluteVaultUrl } from '@/modules/document-vault/lib/format-vault-file';
import { getVaultPreviewKind } from '@/modules/document-vault/lib/vault-preview';
import type { VaultDocumentPreviewDialogProps } from '@/modules/document-vault/types/document-vault.types';

export function VaultDocumentPreviewDialog({
  document,
  onOpenChange,
}: VaultDocumentPreviewDialogProps) {
  const t = useTranslations('DocumentVault');

  const file = document?.file ?? null;
  const kind = getVaultPreviewKind(file);
  const url = file?.url ? toAbsoluteVaultUrl(file.url) : null;

  return (
    <Dialog
      open={!!document}
      onOpenChange={(open) => {
        if (!open) onOpenChange(false);
      }}
    >
      <DialogContent className='max-w-3xl'>
        <DialogHeader>
          <DialogTitle className='truncate pr-6'>{document?.title ?? t('previewTitle')}</DialogTitle>
        </DialogHeader>

        {kind === 'image' && url ? (
          <div className='relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted'>
            <Image
              src={url}
              alt={t('previewImageAlt', { title: document?.title ?? '' })}
              fill
              sizes='(max-width: 768px) 100vw, 768px'
              className='object-contain'
            />
          </div>
        ) : kind === 'pdf' && url ? (
          <iframe
            src={url}
            title={document?.title ?? t('previewTitle')}
            className='min-h-96 w-full rounded-lg border border-border bg-muted'
          />
        ) : (
          <EmptyState
            framed
            icon={FileQuestion}
            title={t('previewUnavailable')}
          />
        )}

        {url ? (
          <div className='flex justify-end'>
            <a
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-2')}
            >
              <ExternalLink className='h-4 w-4' />
              {t('openInNewTab')}
            </a>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
