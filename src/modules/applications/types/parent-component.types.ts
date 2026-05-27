import type { Dispatch, SetStateAction } from 'react';
import type { ParentApplication } from '@/modules/applications/types/parent-application.types';

export type ParentApplicationSortField = 'student' | 'school' | 'status' | 'submittedAt';
export type ParentApplicationSortDirection = 'asc' | 'desc';

export interface ParentApplicationTableProps {
  applications: ParentApplication[];
  isLoading: boolean;
  sortField: ParentApplicationSortField | null;
  sortDirection: ParentApplicationSortDirection;
  onSort: (field: ParentApplicationSortField) => void;
  pageSize: number;
}

export interface ParentApplicationToolbarProps {
  status: string;
  onStatusChange: (value: string) => void;
}

export interface ParentApplicationPaginationProps {
  pagination: { page: number; pageSize: number; pageCount: number; total: number } | undefined;
  showPagination: boolean | undefined;
  setPage: Dispatch<SetStateAction<number>>;
}

export interface ParentApplicationListPageProps {
  studentDocumentId?: string;
}

export interface ParentApplicationDetailProps {
  documentId: string;
}
