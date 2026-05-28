export type AgentInterfaceLanguage = 'en' | 'zh_CN' | 'vi' | 'ko';

export type AgentDateFormat = 'DD_MMM_YYYY' | 'MMM_DD_YYYY' | 'YYYY_MM_DD';

export type AgentNotificationEvent =
  | 'applicationStatus'
  | 'newMessage'
  | 'documentRequest'
  | 'offerReceived'
  | 'testResults';

export type AgentNotificationDigest = 'instant' | 'daily' | 'weekly';

export interface AgentNotificationChannel {
  inApp: boolean;
  email: boolean;
}

export type AgentNotificationEventMap = Record<
  AgentNotificationEvent,
  AgentNotificationChannel
>;

export interface AgentNotificationPreferences {
  events?: Partial<AgentNotificationEventMap>;
  digest?: AgentNotificationDigest;
}

export interface AgentMessagingPreferences {
  sendOnEnter: boolean;
  autoPolish: boolean;
  signature: string | null;
  appendSignature: boolean;
}

export interface AgentLocalePreferences {
  interfaceLanguage: AgentInterfaceLanguage;
  timezone: string | null;
  dateFormat: AgentDateFormat;
}

export interface AgentUserMe {
  id: number;
  documentId: string;
  username: string;
  email: string;
  userType: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  confirmed: boolean;
  blocked: boolean;
}

export interface AgentProfileSummary {
  documentId: string;
  companyName: string;
  roleTitle: string | null;
  countryOfOperation: string | null;
  verified: boolean;
  qeacCertified: boolean;
  fullName: string;
}

export interface UpdateUserProfilePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface ChangePasswordResponse {
  jwt: string;
  user: AgentUserMe;
}

export interface AgentExportData {
  exportedAt: string;
  profile: Record<string, unknown>;
  students: unknown[];
  applications: unknown[];
  counts: { students: number; applications: number };
}
