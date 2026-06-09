import type {
  FamilyMatrix,
  FamilyMatrixApplicationInput,
  FamilyMatrixCell,
  FamilyMatrixSchoolColumn,
  FamilyMatrixStudentInput,
} from '@/modules/parent-family-overview/types/family-overview.types';

function cellKey(studentDocumentId: string, schoolDocumentId: string): string {
  return `${studentDocumentId}::${schoolDocumentId}`;
}

export function buildFamilyMatrix(
  students: FamilyMatrixStudentInput[],
  applications: FamilyMatrixApplicationInput[],
): FamilyMatrix {
  const schoolMap = new Map<string, FamilyMatrixSchoolColumn>();
  for (const application of applications) {
    if (!schoolMap.has(application.school.documentId)) {
      schoolMap.set(application.school.documentId, {
        documentId: application.school.documentId,
        name: application.school.name,
      });
    }
  }
  const schools = [...schoolMap.values()].sort((a, b) => a.name.localeCompare(b.name));

  const cellMap = new Map<string, { cell: FamilyMatrixCell; createdAt: string }>();
  for (const application of applications) {
    const key = cellKey(application.student.documentId, application.school.documentId);
    const existing = cellMap.get(key);
    if (!existing || application.createdAt > existing.createdAt) {
      cellMap.set(key, {
        createdAt: application.createdAt,
        cell: {
          applicationDocumentId: application.documentId,
          status: application.status,
        },
      });
    }
  }

  const rows = students.map((student) => ({
    studentDocumentId: student.documentId,
    studentName: `${student.firstName} ${student.lastName}`.trim(),
    cells: schools.map(
      (school) => cellMap.get(cellKey(student.documentId, school.documentId))?.cell ?? null,
    ),
  }));

  return { schools, rows };
}
