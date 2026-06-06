'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useParentStudents } from '@/modules/students';
import { useIssueMagicLink } from '@/modules/test-results/queries/use-issue-magic-link.mutation';
import type { IssueMagicLinkError } from '@/modules/test-results/types/issue-magic-link.types';

const ERROR_KEYS: Record<IssueMagicLinkError['kind'], string> = {
  rateLimited: 'errorRateLimited',
  unauthorized: 'errorUnauthorized',
  notFound: 'errorNotFound',
  forbidden: 'errorForbidden',
  validation: 'errorGeneric',
  unknown: 'errorGeneric',
};

export function useBookTest(testDocumentId: string) {
  const t = useTranslations('BookTestDialog');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const { data, isLoading, isError, refetch } = useParentStudents({ pageSize: 100 });
  const issueMagicLink = useIssueMagicLink();

  const students = data?.data ?? [];
  const canSubmit = selectedStudentId !== '' && !issueMagicLink.isPending;

  async function bookTest() {
    if (selectedStudentId === '') return false;

    try {
      await issueMagicLink.mutateAsync({
        documentId: selectedStudentId,
        testDocumentId,
      });
      toast.success(t('bookSuccess'));
      return true;
    } catch (error) {
      const kind = (error as IssueMagicLinkError).kind ?? 'unknown';
      toast.error(t(ERROR_KEYS[kind]));
      return false;
    }
  }

  function reset() {
    setSelectedStudentId('');
  }

  return {
    students,
    isLoading,
    isError,
    refetch,
    selectedStudentId,
    setSelectedStudentId,
    canSubmit,
    isPending: issueMagicLink.isPending,
    bookTest,
    reset,
  };
}
