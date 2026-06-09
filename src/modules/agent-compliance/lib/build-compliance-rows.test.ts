import { describe, expect, it } from 'vitest';
import {
  buildComplianceRows,
  daysUntilExpiry,
  EXPIRING_SOON_DAYS,
  summarizeCompliance,
} from '@/modules/agent-compliance/lib/build-compliance-rows';
import type {
  ComplianceDocumentInput,
  ComplianceStudentInput,
} from '@/modules/agent-compliance/types/agent-compliance.types';

const NOW = new Date(2026, 0, 1, 14, 30);

const STUDENT: ComplianceStudentInput = {
  id: 1,
  documentId: 'stu-1',
  firstName: 'Mina',
  lastName: 'Park',
};

function doc(overrides: Partial<ComplianceDocumentInput>): ComplianceDocumentInput {
  return {
    documentId: 'doc-1',
    documentType: 'passport',
    status: 'active',
    expiresAt: null,
    createdAt: '2026-01-01T00:00:00.000Z',
    student: { documentId: 'stu-1' },
    ...overrides,
  };
}

describe('daysUntilExpiry', () => {
  it('counts whole calendar days ignoring time of day', () => {
    expect(daysUntilExpiry('2026-01-02', NOW)).toBe(1);
    expect(daysUntilExpiry('2025-12-31', NOW)).toBe(-1);
  });

  it('returns null for unparseable dates', () => {
    expect(daysUntilExpiry('not-a-date', NOW)).toBeNull();
  });
});

describe('buildComplianceRows', () => {
  it('marks all three cells missing when the student has no documents', () => {
    const [row] = buildComplianceRows([STUDENT], [], NOW);
    expect(row?.passport).toEqual({ state: 'missing', expiresAt: null, daysLeft: null });
    expect(row?.visa).toEqual({ state: 'missing', expiresAt: null, daysLeft: null });
    expect(row?.oshc).toEqual({ state: 'missing', expiresAt: null, daysLeft: null });
  });

  it('treats yesterday as expired and today as expiring with 0 days left', () => {
    const rows = buildComplianceRows(
      [STUDENT],
      [
        doc({ documentId: 'a', documentType: 'passport', expiresAt: '2025-12-31' }),
        doc({ documentId: 'b', documentType: 'current_visa', expiresAt: '2026-01-01' }),
      ],
      NOW,
    );
    expect(rows[0]?.passport).toEqual({ state: 'expired', expiresAt: '2025-12-31', daysLeft: -1 });
    expect(rows[0]?.visa).toEqual({ state: 'expiring', expiresAt: '2026-01-01', daysLeft: 0 });
  });

  it('splits exactly at the 90-day boundary', () => {
    const rows = buildComplianceRows(
      [STUDENT],
      [
        doc({ documentId: 'a', documentType: 'current_visa', expiresAt: '2026-04-01' }),
        doc({ documentId: 'b', documentType: 'oshc', expiresAt: '2026-04-02' }),
      ],
      NOW,
    );
    expect(rows[0]?.visa.state).toBe('expiring');
    expect(rows[0]?.visa.daysLeft).toBe(EXPIRING_SOON_DAYS);
    expect(rows[0]?.oshc).toEqual({ state: 'ok', expiresAt: '2026-04-02', daysLeft: 91 });
  });

  it('marks an active document without expiresAt as ok with untracked expiry', () => {
    const rows = buildComplianceRows([STUDENT], [doc({ expiresAt: null })], NOW);
    expect(rows[0]?.passport).toEqual({ state: 'ok', expiresAt: null, daysLeft: null });
  });

  it('lets the latest active document of a type win and ignores non-active ones', () => {
    const rows = buildComplianceRows(
      [STUDENT],
      [
        doc({ documentId: 'old', expiresAt: '2025-12-01', createdAt: '2025-01-01T00:00:00.000Z' }),
        doc({ documentId: 'new', expiresAt: '2027-06-01', createdAt: '2025-06-01T00:00:00.000Z' }),
        doc({
          documentId: 'replaced',
          status: 'replaced',
          expiresAt: '2025-01-01',
          createdAt: '2026-01-01T00:00:00.000Z',
        }),
      ],
      NOW,
    );
    expect(rows[0]?.passport.state).toBe('ok');
    expect(rows[0]?.passport.expiresAt).toBe('2027-06-01');
  });
});

describe('summarizeCompliance', () => {
  it('counts each student once by their most severe state', () => {
    const other = { ...STUDENT, id: 2, documentId: 'stu-2' };
    const rows = buildComplianceRows(
      [STUDENT, other],
      [
        doc({ documentId: 'a', expiresAt: '2025-12-31' }),
        doc({ documentId: 'b', documentType: 'current_visa', expiresAt: '2026-02-01' }),
      ],
      NOW,
    );
    expect(summarizeCompliance(rows)).toEqual({ expired: 1, expiring: 0, missing: 1, ok: 0 });
  });
});
