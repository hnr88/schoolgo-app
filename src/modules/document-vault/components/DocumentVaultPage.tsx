'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { AlertCircle, FolderOpen, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/modules/core';
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
        <EmptyState
          framed
          icon={AlertCircle}
          title={t('errorTitle')}
          description={t('errorSubtitle')}
        />
      ) : documents.length === 0 ? (
        <EmptyState
          framed
          icon={FolderOpen}
          title={t('emptyTitle')}
          description={t('emptySubtitle')}
          action={
            <Button variant='outline' size='sm' onClick={() => setUploadOpen(true)}>
              <Plus className='mr-2 h-4 w-4' />
              {t('upload')}
            </Button>
          }
        />
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
