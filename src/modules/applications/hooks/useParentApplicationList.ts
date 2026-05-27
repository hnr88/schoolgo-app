'use client';

import { useState } from 'react';
import { useParentApplications } from '@/modules/applications/queries/use-parent-applications.query';
import {
  PARENT_APPLICATIONS_DEFAULT_PAGE_SIZE,
  PARENT_APPLICATION_SORT_FIELD_TO_API,
} from '@/modules/applications/constants/parent-applications.constants';
import type {
  ParentApplicationSortField,
  ParentApplicationSortDirection,
} from '@/modules/applications/types/parent-component.types';

export function useParentApplicationList(studentDocumentId?: string) {
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<ParentApplicationSortField | null>(null);
  const [sortDirection, setSortDirection] = useState<ParentApplicationSortDirection>('asc');

  const sortParam = sortField
    ? `${PARENT_APPLICATION_SORT_FIELD_TO_API[sortField]}:${sortDirection}`
    : undefined;

  const { data, isLoading, isError, refetch } = useParentApplications({
    page,
    pageSize: PARENT_APPLICATIONS_DEFAULT_PAGE_SIZE,
    status,
    student: studentDocumentId,
    sort: sortParam,
  });

  const applications = data?.data ?? [];
  const pagination = data?.meta?.pagination;
  const showPagination = pagination && pagination.pageCount > 1;
  const isFiltered = status !== 'all';
  const isEmpty = !isLoading && !isError && applications.length === 0 && !isFiltered;

  function handleSort(field: ParentApplicationSortField) {
    if (sortField !== field) {
      setSortField(field);
      setSortDirection('asc');
    } else if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else {
      setSortField(null);
    }
    setPage(1);
  }

  function handleStatusChange(value: string) {
    setStatus(value);
    setPage(1);
  }

  return {
    status,
    sortField,
    sortDirection,
    applications,
    pagination,
    showPagination,
    isLoading,
    isError,
    isEmpty,
    isFiltered,
    refetch,
    setPage,
    handleSort,
    handleStatusChange,
  };
}
