'use client';

import { useMemo, useState } from 'react';

import { useDebouncedValue } from '@/modules/core/client';
import { useVaultDocuments } from '@/modules/document-vault/queries/use-vault-documents.query';
import { DEFAULT_VAULT_SORT } from '@/modules/document-vault/constants/document-vault.constants';
import { VAULT_DOCUMENT_TYPES } from '@/modules/document-vault/types/document-vault.types';
import type {
  VaultDocument,
  VaultDocumentType,
  VaultSortOption,
  VaultTypeFilter,
} from '@/modules/document-vault/types/document-vault.types';

const SEARCH_DEBOUNCE_MS = 200;

function compareDocuments(a: VaultDocument, b: VaultDocument, sort: VaultSortOption): number {
  switch (sort) {
    case 'oldest':
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    case 'title_asc':
      return a.title.localeCompare(b.title);
    case 'title_desc':
      return b.title.localeCompare(a.title);
    case 'newest':
    default:
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }
}

export function useDocumentVault() {
  const { data, isLoading, isError, refetch } = useVaultDocuments();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<VaultTypeFilter>('all');
  const [sort, setSort] = useState<VaultSortOption>(DEFAULT_VAULT_SORT);

  const debouncedSearch = useDebouncedValue(search, SEARCH_DEBOUNCE_MS);

  const documents = useMemo(() => data?.data ?? [], [data]);

  const availableTypes = useMemo<VaultDocumentType[]>(() => {
    const present = new Set(documents.map((doc) => doc.documentType));
    return VAULT_DOCUMENT_TYPES.filter((type) => present.has(type));
  }, [documents]);

  const filteredDocuments = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    return documents
      .filter((doc) => {
        if (typeFilter !== 'all' && doc.documentType !== typeFilter) return false;
        if (!query) return true;
        const haystack = `${doc.title} ${doc.notes ?? ''}`.toLowerCase();
        return haystack.includes(query);
      })
      .sort((a, b) => compareDocuments(a, b, sort));
  }, [documents, debouncedSearch, typeFilter, sort]);

  const totalCount = documents.length;
  const resultCount = filteredDocuments.length;
  const isEmpty = !isLoading && !isError && totalCount === 0;
  const hasActiveFilters = search.trim().length > 0 || typeFilter !== 'all';
  const isNoResults = !isLoading && !isError && totalCount > 0 && resultCount === 0;

  function handleClearFilters() {
    setSearch('');
    setTypeFilter('all');
  }

  return {
    documents: filteredDocuments,
    availableTypes,
    totalCount,
    resultCount,
    isLoading,
    isError,
    isEmpty,
    isNoResults,
    hasActiveFilters,
    refetch,
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
    sort,
    setSort,
    handleClearFilters,
  };
}
