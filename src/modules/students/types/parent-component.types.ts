import type { ParentStudent } from '@/modules/students/types/parent-student.types';

export type ParentSortField = 'name' | 'nationality' | 'currentYearLevel' | 'targetEntryYear';
export type ParentSortDirection = 'asc' | 'desc';

export interface ParentStudentTableProps {
  students: ParentStudent[];
  isLoading: boolean;
  sortField: ParentSortField | null;
  sortDirection: ParentSortDirection;
  onSort: (field: ParentSortField) => void;
  pageSize: number;
}

export interface ParentStudentListToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  showArchived: boolean;
  onToggleArchived: (next: boolean) => void;
}

export interface ParentStudentProfileProps {
  documentId: string;
}

export interface AgentRepresentationPanelProps {
  studentDocumentId: string;
}

export interface ShareWithAgentDialogProps {
  studentDocumentId: string;
}

export interface RevokeShareButtonProps {
  studentDocumentId: string;
  shareDocumentId: string;
}

export interface ParentStudentStats {
  children: number;
  activeApplications: number;
  verifiedTests: number;
  pendingTests: number;
}

export type ParentStudentStatKey = keyof ParentStudentStats;
