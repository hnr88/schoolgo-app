export type SchoolSettingsLocale = 'en' | 'ko' | 'ms' | 'th' | 'vi' | 'zh';

export interface SchoolNotificationPreferences {
  email?: boolean;
  sms?: boolean;
}

export interface SchoolPreferences {
  language?: SchoolSettingsLocale;
  notifications?: SchoolNotificationPreferences;
}

export interface SchoolUserMe {
  id: number;
  documentId: string;
  username: string;
  email: string;
  userType: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  preferences: SchoolPreferences | null;
  confirmed: boolean;
  blocked: boolean;
}

export interface UpdateSchoolProfilePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  preferences?: SchoolPreferences;
}

export interface ChangePasswordResponse {
  jwt: string;
  user: SchoolUserMe;
}
