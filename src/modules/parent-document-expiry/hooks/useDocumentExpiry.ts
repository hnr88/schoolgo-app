'use client';

import { useMemo, useState } from 'react';
import { useVaultDocuments } from '@/modules/document-vault/queries/use-vault-documents.query';
import { bucketExpiry } from '@/modules/parent-document-expiry/lib/bucket-expiry';
import { useChildrenDocuments } from '@/modules/parent-document-expiry/queries/use-children-documents.query';
import type { DocumentExpiryItem } from '@/modules/parent-document-expiry/types/document-expiry.types';

export function useDocumentExpiry() {
  const [now] = useState(() => new Date());
  const vault = useVaultDocuments();
  const childDocs = useChildrenDocuments();

  const items = useMemo<DocumentExpiryItem[]>(() => {
    const merged: DocumentExpiryItem[] = [];

    for (const doc of vault.data?.data ?? []) {
      merged.push({
        key: `vault-${doc.documentId}`,
        source: 'vault',
        title: doc.title,
        documentType: doc.documentType,
        expiresAt: doc.expiresAt,
        href: '/parent/documents',
        ownerName: null,
      });
    }

    for (const doc of childDocs.data?.data ?? []) {
      merged.push({
        key: `student-${doc.documentId}`,
        source: 'student',
        title: doc.fileName,
        documentType: doc.documentType,
        expiresAt: doc.expiresAt,
        href: doc.student ? `/parent/students/${doc.student.documentId}` : '/parent/students',
        ownerName: doc.student
          ? [doc.student.firstName, doc.student.lastName].filter(Boolean).join(' ') || null
          : null,
      });
    }

    return merged;
  }, [vault.data, childDocs.data]);

  const buckets = useMemo(() => bucketExpiry(items, now), [items, now]);

  const isLoading = vault.isLoading || childDocs.isLoading;
  const isError = vault.isError || childDocs.isError;
  const trackedCount =
    buckets.expired.length + buckets.expiringSoon.length + buckets.later.length;

  const retry = () => {
    void vault.refetch();
    void childDocs.refetch();
  };

  return {
    buckets,
    isLoading,
    isError,
    isEmpty: !isLoading && !isError && trackedCount === 0,
    retry,
  };
}
