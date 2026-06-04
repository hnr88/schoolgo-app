'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { AlertCircle, FolderOpen, Plus, SearchX } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/modules/core';
import { useDocumentVault } from '@/modules/document-vault/hooks/useDocumentVault';
import { useDeleteVaultDocument } from '@/modules/document-vault/queries/use-delete-vault-document.mutation';
import { VaultDocumentCard } from '@/modules/document-vault/components/VaultDocumentCard';
import { VaultDocumentsToolbar } from '@/modules/document-vault/components/VaultDocumentsToolbar';
import { VaultUploadDialog } from '@/modules/document-vault/components/VaultUploadDialog';
import { VaultDocumentPreviewDialog } from '@/modules/document-vault/components/VaultDocumentPreviewDialog';
import { DeleteVaultDocumentDialog } from '@/modules/document-vault/components/DeleteVaultDocumentDialog';
import type { VaultDocument } from '@/modules/document-vault/types/document-vault.types';

export function DocumentVaultPage() {
  const t = useTranslations('DocumentVault');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<VaultDocument | null>(null);
  const [previewTarget, setPreviewTarget] = useState<VaultDocument | null>(null);

  const vault = useDocumentVault();
  const deleteMutation = useDeleteVaultDocument();

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

      {vault.isLoading ? (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className='h-40 w-full rounded-lg' />
          ))}
        </div>
      ) : vault.isError ? (
        <EmptyState
          framed
          icon={AlertCircle}
          title={t('errorTitle')}
          description={t('errorSubtitle')}
        />
      ) : vault.isEmpty ? (
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
        <>
          <VaultDocumentsToolbar
            totalCount={vault.totalCount}
            resultCount={vault.resultCount}
            search={vault.search}
            onSearchChange={vault.setSearch}
            typeFilter={vault.typeFilter}
            onTypeFilterChange={vault.setTypeFilter}
            sort={vault.sort}
            onSortChange={vault.setSort}
            availableTypes={vault.availableTypes}
          />

          {vault.isNoResults ? (
            <EmptyState
              framed
              icon={SearchX}
              title={t('noResultsTitle')}
              description={t('noResultsSubtitle')}
              action={
                <Button variant='outline' size='sm' onClick={vault.handleClearFilters}>
                  {t('clearFilters')}
                </Button>
              }
            />
          ) : (
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {vault.documents.map((doc) => (
                <VaultDocumentCard
                  key={doc.documentId}
                  document={doc}
                  onDelete={setDeleteTarget}
                  onPreview={setPreviewTarget}
                />
              ))}
            </div>
          )}
        </>
      )}

      <VaultUploadDialog open={uploadOpen} onOpenChange={setUploadOpen} />
      <VaultDocumentPreviewDialog
        document={previewTarget}
        onOpenChange={() => setPreviewTarget(null)}
      />
      <DeleteVaultDocumentDialog
        document={deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
      />
    </div>
  );
}
