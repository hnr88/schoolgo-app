export interface SchoolTemplatesStaff {
  documentId: string;
  permissionLevel: 'admin' | 'staff';
  school: {
    documentId: string;
    name: string;
  };
}
