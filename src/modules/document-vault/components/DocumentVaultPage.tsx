'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { AlertCircle, FolderOpen, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useVaultDocuments } from '@/modules/document-vault/queries/use-vault-documents.query';
import { useDeleteVaultDocument } from '@/modules/document-vault/queries/use-delete-vault-document.mutation';
import { VaultDocumentCard } from '@/modules/document-vault/components/VaultDocumentCard';
import { VaultUploadDialog } from '@/modules/document-vault/components/VaultUploadDialog';
import { DeleteVaultDocumentDialog } from '@/modules/document-vault/components/DeleteVaultDocumentDialog';
import type { VaultDocument } from '@/modules/document-vault/types/document-vault.types';

export function DocumentVaultPage() {
  const t = useTranslations('DocumentVault');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<VaultDocument | null>(null);

  const { data, isLoading, isError } = useVaultDocuments();
  const deleteMutation = useDeleteVaultDocument();
  const documents = data?.data ?? [];

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.documentId);
      toast.success(t('deleteSuccess'));
    } catch {
      toast.error(t('deleteError'));
    }
    setDeleteTarget(null);
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center justify-end'>
        <Button onClick={() => setUploadOpen(true)}>
          <Plus className='mr-2 h-4 w-4' />
          {t('upload')}
        </Button>
      </div>

      {isLoading ? (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className='h-40 w-full rounded-lg' />
          ))}
        </div>
      ) : isError ? (
        <div className='flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16'>
          <AlertCircle className='mb-3 h-10 w-10 text-destructive' />
          <p className='text-sm font-medium text-ink-900'>{t('errorTitle')}</p>
          <p className='mt-1 text-xs text-foggy'>{t('errorSubtitle')}</p>
        </div>
      ) : documents.length === 0 ? (
        <div className='flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16'>
          <FolderOpen className='mb-3 h-10 w-10 text-foggy' />
          <p className='text-sm font-medium text-ink-900'>{t('emptyTitle')}</p>
          <p className='mt-1 text-xs text-foggy'>{t('emptySubtitle')}</p>
          <Button variant='outline' size='sm' className='mt-4' onClick={() => setUploadOpen(true)}>
            <Plus className='mr-2 h-4 w-4' />
            {t('upload')}
          </Button>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {documents.map((doc) => (
            <VaultDocumentCard key={doc.documentId} document={doc} onDelete={setDeleteTarget} />
          ))}
        </div>
      )}

      <VaultUploadDialog open={uploadOpen} onOpenChange={setUploadOpen} />
      <DeleteVaultDocumentDialog
        document={deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
      />
    </div>
  );
}
