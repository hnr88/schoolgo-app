export interface SchoolUserMe {
  documentId: string;
  fullName: string;
  email: string;
}

export interface SchoolNotificationPreferences {
  email: boolean;
  push: boolean;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}
