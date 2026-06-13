export interface SchoolStrapiEnvelope<T> {
  data: T;
  meta?: Record<string, unknown>;
}

export type SchoolDigestFrequency = 'immediate' | 'daily' | 'weekly' | 'off';

export type SchoolNotificationChannel = 'emailEnabled' | 'smsEnabled' | 'inAppEnabled';

export type SchoolNotificationTopic =
  | 'applicationUpdates'
  | 'offers'
  | 'messages'
  | 'deadlines'
  | 'marketing';

export interface SchoolNotificationPreferencesData {
  id: number;
  documentId: string;
  emailEnabled: boolean;
  smsEnabled: boolean;
  inAppEnabled: boolean;
  applicationUpdates: boolean;
  offers: boolean;
  messages: boolean;
  deadlines: boolean;
  marketing: boolean;
  digestFrequency: SchoolDigestFrequency;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateSchoolNotificationPreferencesPayload {
  emailEnabled?: boolean;
  smsEnabled?: boolean;
  inAppEnabled?: boolean;
  applicationUpdates?: boolean;
  offers?: boolean;
  messages?: boolean;
  deadlines?: boolean;
  marketing?: boolean;
  digestFrequency?: SchoolDigestFrequency;
}
