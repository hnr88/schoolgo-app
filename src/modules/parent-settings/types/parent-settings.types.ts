export type SettingsLocale = 'en' | 'ko' | 'ms' | 'th' | 'vi' | 'zh';

export interface NotificationPreferences {
  email?: boolean;
  sms?: boolean;
}

export interface ParentPreferences {
  language?: SettingsLocale;
  notifications?: NotificationPreferences;
}

export interface ParentMe {
  id: number;
  documentId: string;
  username: string;
  email: string;
  userType: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  preferences: ParentPreferences | null;
  confirmed: boolean;
  blocked: boolean;
}

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  preferences?: ParentPreferences;
}

export interface ChangePasswordResponse {
  jwt: string;
  user: ParentMe;
}

export type PasswordRequirementId = 'length' | 'letter' | 'number';

export interface PasswordRequirement {
  id: PasswordRequirementId;
  met: boolean;
}

export type PasswordStrengthLevel = 'weak' | 'fair' | 'good' | 'strong';

export interface PasswordStrength {
  level: PasswordStrengthLevel;
  score: number;
  percent: number;
}
