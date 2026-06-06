import type {
  InvoiceKind,
  InvoiceStatus,
  PayoutStatus,
} from '@/modules/school-invoices/types/school-invoices.types';

type BadgeStyle = { dot: string; bg: string; text: string };

export const INVOICE_STATUS_STYLES: Record<InvoiceStatus, BadgeStyle> = {
  draft: { dot: 'bg-foggy/50', bg: 'bg-muted', text: 'text-foggy' },
  issued: { dot: 'bg-vivid-iris', bg: 'bg-vivid-iris-soft', text: 'text-vivid-iris-strong' },
  paid: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-babu-700' },
  overdue: { dot: 'bg-vivid-coral', bg: 'bg-vivid-coral-soft', text: 'text-vivid-coral-strong' },
  cancelled: { dot: 'bg-rausch-500', bg: 'bg-rausch-50', text: 'text-rausch-700' },
  refunded: { dot: 'bg-vivid-amber', bg: 'bg-vivid-amber-soft', text: 'text-arches-700' },
};

export const PAYOUT_STATUS_STYLES: Record<PayoutStatus, BadgeStyle> = {
  pending: { dot: 'bg-vivid-amber', bg: 'bg-vivid-amber-soft', text: 'text-arches-700' },
  scheduled: { dot: 'bg-vivid-iris', bg: 'bg-vivid-iris-soft', text: 'text-vivid-iris-strong' },
  paid: { dot: 'bg-vivid-mint', bg: 'bg-vivid-mint-soft', text: 'text-babu-700' },
  failed: { dot: 'bg-vivid-coral', bg: 'bg-vivid-coral-soft', text: 'text-vivid-coral-strong' },
};

export const INVOICE_STATUS_LABEL_KEY: Record<InvoiceStatus, string> = {
  draft: 'statusDraft',
  issued: 'statusIssued',
  paid: 'statusPaid',
  overdue: 'statusOverdue',
  cancelled: 'statusCancelled',
  refunded: 'statusRefunded',
};

export const PAYOUT_STATUS_LABEL_KEY: Record<PayoutStatus, string> = {
  pending: 'statusPending',
  scheduled: 'statusScheduled',
  paid: 'statusPaid',
  failed: 'statusFailed',
};

export const INVOICE_KIND_LABEL_KEY: Record<InvoiceKind, string> = {
  application_fee: 'kindApplicationFee',
  tuition: 'kindTuition',
  enrolment: 'kindEnrolment',
  boarding: 'kindBoarding',
  add_on_service: 'kindAddOnService',
};
