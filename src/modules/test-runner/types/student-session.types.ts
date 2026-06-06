export interface StudentSessionStudent {
  documentId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  parentDocumentId: string;
}

export interface StudentTokenPayload {
  type: 'student';
  studentDocumentId: string;
  parentDocumentId: string;
  iat: number;
  exp: number;
}

export interface VerifyMagicLinkResponse {
  jwt: string;
  student: StudentSessionStudent;
}

export interface StudentSession {
  payload: StudentTokenPayload;
  student: StudentSessionStudent;
}

export type StudentSessionErrorKind = 'missing_token' | 'invalid_token' | 'expired' | 'unavailable';

export interface StudentSessionError {
  kind: StudentSessionErrorKind;
  message: string;
}
