export type ComplianceState = 'missing' | 'expired' | 'expiring' | 'ok';

export interface ComplianceCell {
  state: ComplianceState;
  expiresAt?: string | null;
  daysLeft?: number | null;
}

export interface ComplianceStudentInput {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
}

export interface ComplianceDocumentInput {
  documentId: string;
  documentType: string;
  status: string;
  expiresAt: string | null;
  createdAt: string;
  student: { documentId: string } | null;
}

export interface ComplianceRow<S extends ComplianceStudentInput = ComplianceStudentInput> {
  student: S;
  passport: ComplianceCell;
  visa: ComplianceCell;
  oshc: ComplianceCell;
}

export interface ComplianceSummary {
  expired: number;
  expiring: number;
  missing: number;
  ok: number;
}

export interface ComplianceCellBadgeProps {
  cell: ComplianceCell;
}

export interface ComplianceTableProps {
  rows: ComplianceRow<ComplianceStudentInput>[];
}

export interface ComplianceSummaryHeaderProps {
  summary: ComplianceSummary;
}
