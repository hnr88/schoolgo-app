import type { Application, ApplicationStatus } from '@/modules/applications/types/application.types';

export type ApplicationSortField =
  | 'student'
  | 'school'
  | 'state'
  | 'targetYearLevel'
  | 'status'
  | 'submittedAt'
  | 'daysInStatus';

export type SortDirection = 'asc' | 'desc';

export interface ApplicationTableProps {
  applications: Application[];
  isLoading: boolean;
  sortField: ApplicationSortField | null;
  sortDirection: SortDirection;
  onSort: (field: ApplicationSortField) => void;
  pageSize: number;
}

export interface ApplicationListToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
}

export interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
}

export interface DaysInStatusProps {
  days: number;
}

export interface SortIconProps {
  field: ApplicationSortField;
  activeField: ApplicationSortField | null;
  direction: SortDirection;
}

export interface ApplicationPaginationFooterProps {
  pagination: { page: number; pageSize: number; pageCount: number; total: number } | undefined;
  pageSize: number;
  showAll: boolean;
  showPagination: boolean | undefined;
  onPageChange: (page: number | ((prev: number) => number)) => void;
  onPageSizeChange: (size: number | 'all') => void;
}
