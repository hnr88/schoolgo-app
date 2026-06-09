import type { ApplicationStatus } from '@/modules/applications';

export interface FamilyMatrixStudentInput {
  documentId: string;
  firstName: string;
  lastName: string;
}

export interface FamilyMatrixApplicationInput {
  documentId: string;
  status: ApplicationStatus;
  createdAt: string;
  student: { documentId: string };
  school: { documentId: string; name: string };
}

export interface FamilyMatrixSchoolColumn {
  documentId: string;
  name: string;
}

export interface FamilyMatrixCell {
  applicationDocumentId: string;
  status: ApplicationStatus;
}

export interface FamilyMatrixRow {
  studentDocumentId: string;
  studentName: string;
  cells: (FamilyMatrixCell | null)[];
}

export interface FamilyMatrix {
  schools: FamilyMatrixSchoolColumn[];
  rows: FamilyMatrixRow[];
}

export interface FamilyMatrixGridProps {
  matrix: FamilyMatrix;
}
