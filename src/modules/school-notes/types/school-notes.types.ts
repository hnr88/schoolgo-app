export interface SchoolNoteAuthor {
  documentId: string;
  roleTitle: string | null;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
}

export interface SchoolNote {
  documentId: string;
  content: string;
  createdAt: string;
  author: SchoolNoteAuthor | null;
}

export interface SchoolNotesMeta {
  me?: {
    staffDocumentId: string;
    isAdmin: boolean;
  };
}

export interface SchoolNotesResponse {
  data: SchoolNote[];
  meta: SchoolNotesMeta;
}
