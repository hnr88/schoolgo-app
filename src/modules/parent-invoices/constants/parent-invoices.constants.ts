import type {
  ParentInvoiceKind,
  ParentInvoiceStatus,
} from '@/modules/parent-invoices/types/parent-invoice.types';

type BadgeStyle = { dot: string; bg: string; text: string };

export const PARENT_INVOICE_STATUS_STYLES: Record<ParentInvoiceStatus, BadgeStyle> = {
  draft: { dot: 'bg-foggy/50', bg: 'bg-muted', text: 'text-foggy' },
  issued: { dot: 'bg-vivid-iris', bg: 'bg-vivid-iris-soft', text: 'text-vivid-iris-strong' },
  paid: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-babu-700' },
  overdue: { dot: 'bg-vivid-coral', bg: 'bg-vivid-coral-soft', text: 'text-vivid-coral-strong' },
  cancelled: { dot: 'bg-rausch-500', bg: 'bg-rausch-50', text: 'text-rausch-700' },
  refunded: { dot: 'bg-vivid-amber', bg: 'bg-vivid-amber-soft', text: 'text-arches-700' },
};

export const PARENT_INVOICE_STATUS_LABEL_KEY: Record<ParentInvoiceStatus, string> = {
  draft: 'invoices.statusDraft',
  issued: 'invoices.statusIssued',
  paid: 'invoices.statusPaid',
  overdue: 'invoices.statusOverdue',
  cancelled: 'invoices.statusCancelled',
  refunded: 'invoices.statusRefunded',
};

export const PARENT_INVOICE_KIND_LABEL_KEY: Record<ParentInvoiceKind, string> = {
  application_fee: 'invoices.kindApplicationFee',
  tuition: 'invoices.kindTuition',
  enrolment: 'invoices.kindEnrolment',
  boarding: 'invoices.kindBoarding',
  add_on_service: 'invoices.kindAddOnService',
};
