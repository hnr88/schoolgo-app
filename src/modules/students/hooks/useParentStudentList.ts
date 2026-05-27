'use client';

import { useState } from 'react';
import { useDebouncedValue } from '@/modules/core/client';
import { useParentStudents } from '@/modules/students/queries/use-parent-students.query';
import { PARENT_SORT_FIELD_TO_API } from '@/modules/students/constants/parent-sort.constants';
import { SEARCH_DEBOUNCE_MS, SEARCH_MIN_LENGTH } from '@/modules/students/constants/search.constants';
import { PARENT_STUDENTS_DEFAULT_PAGE_SIZE } from '@/modules/students/constants/parent-students.constants';
import type {
  ParentSortField,
  ParentSortDirection,
} from '@/modules/students/types/parent-component.types';

export function useParentStudentList() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(PARENT_STUDENTS_DEFAULT_PAGE_SIZE);
  const [showAll, setShowAll] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [sortField, setSortField] = useState<ParentSortField | null>(null);
  const [sortDirection, setSortDirection] = useState<ParentSortDirection>('asc');

  const debouncedSearch = useDebouncedValue(search, SEARCH_DEBOUNCE_MS);
  const effectiveSearch = debouncedSearch.length >= SEARCH_MIN_LENGTH ? debouncedSearch : '';

  const sortParam = sortField
    ? `${PARENT_SORT_FIELD_TO_API[sortField]}:${sortDirection}`
    : undefined;

  const effectivePageSize = showAll ? 1000 : pageSize;

  const { data, isLoading, isError, refetch } = useParentStudents({
    page: showAll ? 1 : page,
    pageSize: effectivePageSize,
    search: effectiveSearch,
    sort: sortParam,
    status: showArchived ? 'archived' : undefined,
  });

  const students = data?.data ?? [];
  const pagination = data?.meta?.pagination;
  const showPagination = !showAll && pagination && pagination.pageCount > 1;
  const isEmpty = !isLoading && !isError && students.length === 0 && !effectiveSearch;

  function handleSort(field: ParentSortField) {
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

  function handlePageSizeChange(size: number | 'all') {
    if (size === 'all') {
      setShowAll(true);
    } else {
      setShowAll(false);
      setPageSize(size);
    }
    setPage(1);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleToggleArchived(next: boolean) {
    setShowArchived(next);
    setPage(1);
  }

  return {
    search,
    pageSize,
    showAll,
    showArchived,
    sortField,
    sortDirection,
    students,
    pagination,
    showPagination,
    isLoading,
    isError,
    isEmpty,
    refetch,
    setPage,
    handleSort,
    handlePageSizeChange,
    handleSearchChange,
    handleToggleArchived,
  };
}
