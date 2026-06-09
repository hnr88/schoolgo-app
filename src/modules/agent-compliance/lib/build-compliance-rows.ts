import type {
  ComplianceCell,
  ComplianceDocumentInput,
  ComplianceRow,
  ComplianceStudentInput,
  ComplianceSummary,
} from '@/modules/agent-compliance/types/agent-compliance.types';

export const EXPIRING_SOON_DAYS = 90;

const MS_PER_DAY = 86_400_000;

const TRACKED_TYPES = ['passport', 'current_visa', 'oshc'] as const;

function startOfDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export function daysUntilExpiry(expiresAt: string, now: Date): number | null {
  const parsed = new Date(expiresAt);
  if (Number.isNaN(parsed.getTime())) return null;
  return Math.round((startOfDay(parsed) - startOfDay(now)) / MS_PER_DAY);
}

function toCell(doc: ComplianceDocumentInput | undefined, now: Date): ComplianceCell {
  if (!doc) return { state: 'missing', expiresAt: null, daysLeft: null };

  const days = doc.expiresAt === null ? null : daysUntilExpiry(doc.expiresAt, now);
  if (doc.expiresAt === null || days === null) {
    return { state: 'ok', expiresAt: null, daysLeft: null };
  }
  if (days < 0) return { state: 'expired', expiresAt: doc.expiresAt, daysLeft: days };
  if (days <= EXPIRING_SOON_DAYS) {
    return { state: 'expiring', expiresAt: doc.expiresAt, daysLeft: days };
  }
  return { state: 'ok', expiresAt: doc.expiresAt, daysLeft: days };
}

export function buildComplianceRows<S extends ComplianceStudentInput>(
  students: readonly S[],
  documents: readonly ComplianceDocumentInput[],
  now: Date,
): ComplianceRow<S>[] {
  const latest = new Map<string, ComplianceDocumentInput>();

  for (const doc of documents) {
    if (doc.status !== 'active' || !doc.student) continue;
    if (!(TRACKED_TYPES as readonly string[]).includes(doc.documentType)) continue;

    const key = `${doc.student.documentId}:${doc.documentType}`;
    const current = latest.get(key);
    if (!current || new Date(doc.createdAt).getTime() > new Date(current.createdAt).getTime()) {
      latest.set(key, doc);
    }
  }

  return students.map((student) => ({
    student,
    passport: toCell(latest.get(`${student.documentId}:passport`), now),
    visa: toCell(latest.get(`${student.documentId}:current_visa`), now),
    oshc: toCell(latest.get(`${student.documentId}:oshc`), now),
  }));
}

export function summarizeCompliance(
  rows: readonly ComplianceRow<ComplianceStudentInput>[],
): ComplianceSummary {
  const summary: ComplianceSummary = { expired: 0, expiring: 0, missing: 0, ok: 0 };

  for (const row of rows) {
    const states = [row.passport.state, row.visa.state, row.oshc.state];
    if (states.includes('expired')) summary.expired += 1;
    else if (states.includes('expiring')) summary.expiring += 1;
    else if (states.includes('missing')) summary.missing += 1;
    else summary.ok += 1;
  }

  return summary;
}
