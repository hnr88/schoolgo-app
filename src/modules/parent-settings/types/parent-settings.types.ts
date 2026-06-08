export type SettingsLocale = 'en' | 'ko' | 'ms' | 'th' | 'vi' | 'zh';

export type ParentRelationship = 'mother' | 'father' | 'guardian' | 'grandparent' | 'other';

export type ParentContactMethod = 'email' | 'phone' | 'whatsapp' | 'wechat';

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
  relationshipToStudent: ParentRelationship | null;
  occupation: string | null;
  secondaryPhone: string | null;
  preferredContactMethod: ParentContactMethod | null;
  addressLine: string | null;
  city: string | null;
  stateRegion: string | null;
  postalCode: string | null;
  countryOfResidence: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  emergencyContactRelationship: string | null;
  profileCompleted: boolean;
  confirmed: boolean;
  blocked: boolean;
}

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  preferences?: ParentPreferences;
  relationshipToStudent?: string;
  occupation?: string;
  secondaryPhone?: string;
  preferredContactMethod?: string;
  addressLine?: string;
  city?: string;
  stateRegion?: string;
  postalCode?: string;
  countryOfResidence?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
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
