'use client';

import { useState } from 'react';
import { useDebouncedValue } from '@/modules/core/client';
import { useParentStudents } from '@/modules/students';
import { useParentApplications } from '@/modules/applications/queries/use-parent-applications.query';
import {
  PARENT_APPLICATIONS_DEFAULT_PAGE_SIZE,
  PARENT_APPLICATION_SORT_FIELD_TO_API,
} from '@/modules/applications/constants/parent-applications.constants';
import { SEARCH_DEBOUNCE_MS, SEARCH_MIN_LENGTH } from '@/modules/applications/constants/search.constants';
import type {
  ParentApplicationSortField,
  ParentApplicationSortDirection,
} from '@/modules/applications/types/parent-component.types';

const CHILD_FILTER_ALL = 'all';

export function useParentApplicationList(studentDocumentId?: string) {
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [childFilter, setChildFilter] = useState(CHILD_FILTER_ALL);
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<ParentApplicationSortField | null>(null);
  const [sortDirection, setSortDirection] = useState<ParentApplicationSortDirection>('asc');

  const studentsQuery = useParentStudents({ pageSize: 100 });
  const children = studentsQuery.data?.data ?? [];

  const debouncedSearch = useDebouncedValue(search, SEARCH_DEBOUNCE_MS);
  const effectiveSearch = debouncedSearch.trim().length >= SEARCH_MIN_LENGTH ? debouncedSearch : '';

  const selectedChild = childFilter !== CHILD_FILTER_ALL ? childFilter : undefined;
  const student = studentDocumentId ?? selectedChild;

  const sortParam = sortField
    ? `${PARENT_APPLICATION_SORT_FIELD_TO_API[sortField]}:${sortDirection}`
    : undefined;

  const { data, isLoading, isError, refetch } = useParentApplications({
    page,
    pageSize: PARENT_APPLICATIONS_DEFAULT_PAGE_SIZE,
    status,
    student,
    search: effectiveSearch,
    sort: sortParam,
  });

  const applications = data?.data ?? [];
  const pagination = data?.meta?.pagination;
  const showPagination = pagination && pagination.pageCount > 1;
  const isFiltered = status !== 'all' || !!effectiveSearch || childFilter !== CHILD_FILTER_ALL;
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

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleChildFilterChange(value: string) {
    setChildFilter(value);
    setPage(1);
  }

  return {
    status,
    search,
    childFilter,
    childOptions: children,
    showChildFilter: !studentDocumentId,
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
    handleSearchChange,
    handleChildFilterChange,
  };
}
