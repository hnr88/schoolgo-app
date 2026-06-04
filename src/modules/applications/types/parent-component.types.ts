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

export interface ParentApplicationChildOption {
  documentId: string;
  firstName: string;
  lastName: string;
}

export interface ParentApplicationToolbarProps {
  status: string;
  onStatusChange: (value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  childFilter: string;
  onChildFilterChange: (value: string) => void;
  childOptions: ParentApplicationChildOption[];
  showChildFilter: boolean;
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

export interface ParentDeclineOfferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applicationDocumentId: string;
  onDeclined?: () => void;
}
