export type SchoolInvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'void';

export interface SchoolInvoice {
  documentId: string;
  reference: string;
  amount: number;
  currency: string;
  status: SchoolInvoiceStatus;
  issuedAt: string | null;
  dueAt: string | null;
}

export type SchoolPayoutStatus = 'pending' | 'processing' | 'paid' | 'failed';

export interface SchoolPayout {
  documentId: string;
  reference: string;
  amount: number;
  currency: string;
  status: SchoolPayoutStatus;
  issuedAt: string | null;
}
