'use client';

import { useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useVaultDocuments } from '@/modules/document-vault/queries/use-vault-documents.query';
import { PARENT_STUDENTS_MAX_PAGE_SIZE } from '@/modules/students/constants/parent-students.constants';
import { useParentStudents } from '@/modules/students/queries/use-parent-students.query';
import { bucketExpiry } from '@/modules/parent-document-expiry/lib/bucket-expiry';
import {
  CHILDREN_DOCUMENTS_QUERY_KEY,
  useChildrenDocuments,
} from '@/modules/parent-document-expiry/queries/use-children-documents.query';
import type { DocumentExpiryItem } from '@/modules/parent-document-expiry/types/document-expiry.types';

export function useDocumentExpiry() {
  const [now] = useState(() => new Date());
  const queryClient = useQueryClient();
  const vault = useVaultDocuments();
  const students = useParentStudents({ pageSize: PARENT_STUDENTS_MAX_PAGE_SIZE });

  const children = useMemo(() => students.data?.data ?? [], [students.data]);
  const childIds = useMemo(() => children.map((child) => child.documentId), [children]);
  const childDocs = useChildrenDocuments(childIds);

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

    for (const result of childDocs.perStudent) {
      const child = children.find((c) => c.documentId === result.studentDocumentId);

      for (const doc of result.documents) {
        merged.push({
          key: `student-${doc.documentId}`,
          source: 'student',
          title: doc.fileName,
          documentType: doc.documentType,
          expiresAt: doc.expiresAt,
          href: `/parent/students/${result.studentDocumentId}`,
          ownerName: child ? `${child.firstName} ${child.lastName}` : null,
        });
      }
    }

    return merged;
  }, [vault.data, childDocs.perStudent, children]);

  const buckets = useMemo(() => bucketExpiry(items, now), [items, now]);

  const isLoading = vault.isLoading || students.isLoading || childDocs.isLoading;
  const isError = vault.isError || students.isError || childDocs.isError;
  const trackedCount =
    buckets.expired.length + buckets.expiringSoon.length + buckets.later.length;

  const retry = () => {
    void vault.refetch();
    void students.refetch();
    void queryClient.invalidateQueries({ queryKey: CHILDREN_DOCUMENTS_QUERY_KEY });
  };

  return {
    buckets,
    isLoading,
    isError,
    isEmpty: !isLoading && !isError && trackedCount === 0,
    retry,
  };
}
