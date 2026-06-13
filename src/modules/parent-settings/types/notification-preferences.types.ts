export type DigestFrequency = 'immediate' | 'daily' | 'weekly' | 'off';

export type NotificationChannel = 'emailEnabled' | 'smsEnabled' | 'inAppEnabled';

export type NotificationTopic =
  | 'applicationUpdates'
  | 'offers'
  | 'messages'
  | 'deadlines'
  | 'marketing';

export interface NotificationPreferencesData {
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
  digestFrequency: DigestFrequency;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateNotificationPreferencesPayload {
  emailEnabled?: boolean;
  smsEnabled?: boolean;
  inAppEnabled?: boolean;
  applicationUpdates?: boolean;
  offers?: boolean;
  messages?: boolean;
  deadlines?: boolean;
  marketing?: boolean;
  digestFrequency?: DigestFrequency;
}
