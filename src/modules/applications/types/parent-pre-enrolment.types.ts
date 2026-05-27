export type PreEnrolmentItemType =
  | 'written_agreement'
  | 'oshc'
  | 'guardian_nomination'
  | 'financial_evidence'
  | 'custom';

export type PreEnrolmentItemStatus = 'pending' | 'submitted' | 'approved' | 'rejected';

export type PreEnrolmentOshcArrangement = 'school_arranged' | 'agent_arranged' | 'either';

export interface ParentPreEnrolmentItem {
  documentId: string;
  itemType: PreEnrolmentItemType;
  customLabel: string | null;
  status: PreEnrolmentItemStatus;
  note: string | null;
  submittedAt: string | null;
  reviewedAt: string | null;
  oshcProvider: string | null;
  oshcPolicyNumber: string | null;
  oshcCoverStartDate: string | null;
  oshcCoverEndDate: string | null;
  oshcArrangement: PreEnrolmentOshcArrangement | null;
}

export interface ParentPreEnrolmentResponse {
  data: ParentPreEnrolmentItem[];
}

export interface PreEnrolmentSummary {
  total: number;
  approved: number;
  pending: number;
  submitted: number;
  rejected: number;
  allComplete: boolean;
}
