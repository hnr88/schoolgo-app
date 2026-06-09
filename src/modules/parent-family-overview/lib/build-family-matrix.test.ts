import { describe, expect, it } from 'vitest';
import { buildFamilyMatrix } from '@/modules/parent-family-overview/lib/build-family-matrix';
import type {
  FamilyMatrixApplicationInput,
  FamilyMatrixStudentInput,
} from '@/modules/parent-family-overview/types/family-overview.types';

function student(overrides: Partial<FamilyMatrixStudentInput>): FamilyMatrixStudentInput {
  return { documentId: 'stu-1', firstName: 'Mia', lastName: 'Tan', ...overrides };
}

function application(
  overrides: Partial<FamilyMatrixApplicationInput> & {
    student?: FamilyMatrixApplicationInput['student'];
    school?: FamilyMatrixApplicationInput['school'];
  },
): FamilyMatrixApplicationInput {
  return {
    documentId: 'app-1',
    status: 'submitted',
    createdAt: '2026-01-01T00:00:00.000Z',
    student: { documentId: 'stu-1' },
    school: { documentId: 'sch-1', name: 'Alpha College' },
    ...overrides,
  };
}

describe('buildFamilyMatrix', () => {
  it('returns an empty matrix for no students and no applications', () => {
    expect(buildFamilyMatrix([], [])).toEqual({ schools: [], rows: [] });
  });

  it('builds rows per child and columns per school for multiple children', () => {
    const students = [
      student({ documentId: 'stu-1', firstName: 'Mia' }),
      student({ documentId: 'stu-2', firstName: 'Leo' }),
    ];
    const applications = [
      application({
        documentId: 'app-1',
        student: { documentId: 'stu-1' },
        school: { documentId: 'sch-b', name: 'Beta Grammar' },
        status: 'offer_made',
      }),
      application({
        documentId: 'app-2',
        student: { documentId: 'stu-2' },
        school: { documentId: 'sch-a', name: 'Alpha College' },
        status: 'under_review',
      }),
    ];

    const matrix = buildFamilyMatrix(students, applications);

    expect(matrix.schools.map((s) => s.name)).toEqual(['Alpha College', 'Beta Grammar']);
    expect(matrix.rows).toHaveLength(2);
    expect(matrix.rows[0]?.cells).toEqual([
      null,
      { applicationDocumentId: 'app-1', status: 'offer_made' },
    ]);
    expect(matrix.rows[1]?.cells).toEqual([
      { applicationDocumentId: 'app-2', status: 'under_review' },
      null,
    ]);
  });

  it('keeps a row of empty cells for a child with zero applications', () => {
    const students = [
      student({ documentId: 'stu-1', firstName: 'Mia' }),
      student({ documentId: 'stu-2', firstName: 'Leo', lastName: 'Tan' }),
    ];
    const applications = [application({ student: { documentId: 'stu-1' } })];

    const matrix = buildFamilyMatrix(students, applications);

    expect(matrix.rows[1]?.studentName).toBe('Leo Tan');
    expect(matrix.rows[1]?.cells).toEqual([null]);
  });

  it('shares one column when two children applied to the same school', () => {
    const students = [
      student({ documentId: 'stu-1' }),
      student({ documentId: 'stu-2', firstName: 'Leo' }),
    ];
    const applications = [
      application({ documentId: 'app-1', student: { documentId: 'stu-1' }, status: 'enrolled' }),
      application({ documentId: 'app-2', student: { documentId: 'stu-2' }, status: 'draft' }),
    ];

    const matrix = buildFamilyMatrix(students, applications);

    expect(matrix.schools).toHaveLength(1);
    expect(matrix.rows[0]?.cells[0]?.status).toBe('enrolled');
    expect(matrix.rows[1]?.cells[0]?.status).toBe('draft');
  });

  it('keeps the most recent application when one child applied twice to a school', () => {
    const students = [student({})];
    const applications = [
      application({ documentId: 'app-old', createdAt: '2025-01-01T00:00:00.000Z', status: 'withdrawn' }),
      application({ documentId: 'app-new', createdAt: '2026-02-01T00:00:00.000Z', status: 'submitted' }),
    ];

    const matrix = buildFamilyMatrix(students, applications);

    expect(matrix.schools).toHaveLength(1);
    expect(matrix.rows[0]?.cells[0]).toEqual({
      applicationDocumentId: 'app-new',
      status: 'submitted',
    });
  });
});
