export interface QueueStaffMe {
  documentId: string;
  permissionLevel: 'admin' | 'staff';
}

export interface QueueStaffMeResponse {
  data: QueueStaffMe;
}
