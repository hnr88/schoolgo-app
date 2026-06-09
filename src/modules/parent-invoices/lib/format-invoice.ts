import type { ParentInvoice } from '@/modules/parent-invoices/types/parent-invoice.types';

export function formatAud(amount: number, currency: string | null | undefined = 'AUD'): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: currency || 'AUD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatInvoiceDate(value: string | null | undefined): string {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('en-AU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

const OPEN_STATUSES: ReadonlySet<ParentInvoice['status']> = new Set(['issued', 'overdue']);

/** An invoice is overdue when flagged as such, or still open past its due date. */
export function isInvoiceOverdue(invoice: ParentInvoice, now: Date = new Date()): boolean {
  if (invoice.status === 'overdue') return true;
  if (!OPEN_STATUSES.has(invoice.status) || !invoice.dueDate) return false;
  const due = new Date(invoice.dueDate);
  if (Number.isNaN(due.getTime())) return false;
  due.setHours(23, 59, 59, 999);
  return due.getTime() < now.getTime();
}

export function studentName(invoice: ParentInvoice): string | null {
  const student = invoice.application?.student;
  if (!student) return null;
  return [student.firstName, student.lastName].filter(Boolean).join(' ') || null;
}
