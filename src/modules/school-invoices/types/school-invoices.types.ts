export type InvoiceStatus =
  | 'draft'
  | 'issued'
  | 'paid'
  | 'overdue'
  | 'cancelled'
  | 'refunded';

export type InvoiceKind =
  | 'application_fee'
  | 'tuition'
  | 'enrolment'
  | 'boarding'
  | 'add_on_service';

export interface InvoiceApplication {
  documentId: string;
  status: string;
  targetYearLevel: string | null;
  targetIntake: string | null;
  student?: {
    documentId: string;
    firstName: string | null;
    lastName: string | null;
  } | null;
}

export interface InvoiceAgent {
  documentId: string;
  companyName: string | null;
}

export interface SchoolInvoice {
  documentId: string;
  invoiceNumber: string | null;
  kind: InvoiceKind;
  amountAud: number;
  currency: string | null;
  status: InvoiceStatus;
  dueDate: string | null;
  issuedAt: string | null;
  paidAt: string | null;
  application: InvoiceApplication | null;
  agent: InvoiceAgent | null;
}

export interface SchoolInvoicesResponse {
  data: SchoolInvoice[];
}

export type PayoutStatus = 'pending' | 'scheduled' | 'paid' | 'failed';

export interface PayoutInvoice {
  documentId: string;
  invoiceNumber: string | null;
  kind: InvoiceKind;
  amountAud: number;
  status: InvoiceStatus;
}

export interface SchoolPayout {
  documentId: string;
  amountAud: number;
  platformFeeAud: number | null;
  netAmountAud: number | null;
  status: PayoutStatus;
  scheduledFor: string | null;
  paidAt: string | null;
  reference: string | null;
  invoice: PayoutInvoice | null;
  application: InvoiceApplication | null;
}

export interface SchoolPayoutsResponse {
  data: SchoolPayout[];
}
