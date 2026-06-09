import type { AgentInvoice } from '@/modules/agent-invoices/types/agent-invoice.types';

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

const OPEN_STATUSES: ReadonlySet<AgentInvoice['status']> = new Set(['issued', 'overdue']);

/** An invoice is overdue when flagged as such, or still open past its due date. */
export function isInvoiceOverdue(invoice: AgentInvoice, now: Date = new Date()): boolean {
  if (invoice.status === 'overdue') return true;
  if (!OPEN_STATUSES.has(invoice.status) || !invoice.dueDate) return false;
  const due = new Date(invoice.dueDate);
  if (Number.isNaN(due.getTime())) return false;
  due.setHours(23, 59, 59, 999);
  return due.getTime() < now.getTime();
}

export function studentName(invoice: AgentInvoice): string | null {
  const student = invoice.application?.student;
  if (!student) return null;
  return [student.firstName, student.lastName].filter(Boolean).join(' ') || null;
}

export function schoolName(invoice: AgentInvoice): string | null {
  return invoice.application?.school?.name ?? invoice.school?.name ?? null;
}

/** Newest issued first; never-issued invoices sink to the bottom. */
export function sortByIssuedAtDesc(invoices: AgentInvoice[]): AgentInvoice[] {
  return [...invoices].sort((a, b) => {
    const aTime = a.issuedAt ? new Date(a.issuedAt).getTime() : Number.NEGATIVE_INFINITY;
    const bTime = b.issuedAt ? new Date(b.issuedAt).getTime() : Number.NEGATIVE_INFINITY;
    return bTime - aTime;
  });
}
