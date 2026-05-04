import { useState } from 'react';
import { useDebouncedValue } from '@/modules/core/client';
import { useStudents } from '@/modules/students/queries/use-students.query';
import { SORT_FIELD_TO_API } from '@/modules/students/constants/sort.constants';
import { SEARCH_DEBOUNCE_MS, SEARCH_MIN_LENGTH } from '@/modules/students/constants/search.constants';
import type { SortField, SortDirection } from '@/modules/students/types/component.types';

export function useStudentList() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [showAll, setShowAll] = useState(false);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const debouncedSearch = useDebouncedValue(search, SEARCH_DEBOUNCE_MS);
  const effectiveSearch = debouncedSearch.length >= SEARCH_MIN_LENGTH ? debouncedSearch : '';

  const sortParam = sortField
    ? `${SORT_FIELD_TO_API[sortField]}:${sortDirection}`
    : undefined;

  const effectivePageSize = showAll ? 1000 : pageSize;

  const { data, isLoading } = useStudents({
    page: showAll ? 1 : page,
    pageSize: effectivePageSize,
    status,
    search: effectiveSearch,
    sort: sortParam,
  });

  const students = data?.data ?? [];
  const pagination = data?.meta?.pagination;
  const showPagination = !showAll && pagination && pagination.pageCount > 1;

  function handleSort(field: SortField) {
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

  function handleStatusChange(value: string) {
    setStatus(value);
    setPage(1);
  }

  return {
    search,
    status,
    page,
    pageSize,
    showAll,
    sortField,
    sortDirection,
    students,
    pagination,
    showPagination,
    isLoading,
    setPage,
    handleSort,
    handlePageSizeChange,
    handleSearchChange,
    handleStatusChange,
  };
}
