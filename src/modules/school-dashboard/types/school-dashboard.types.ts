export interface StrapiEnvelope<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface SchoolStaffSchool {
  documentId: string;
  name: string;
  slug: string;
  suburb: string | null;
  state: string | null;
  tier: string;
  claimed: boolean;
  claimedAt: string | null;
  emailDomain: string | null;
  logo: { url: string } | null;
}

export interface SchoolStaffUser {
  documentId: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
}

export interface SchoolStaffMe {
  documentId: string;
  roleTitle: string;
  permissionLevel: 'admin' | 'staff';
  status: 'active' | 'deactivated';
  user: SchoolStaffUser | null;
  school: SchoolStaffSchool;
  invitedBy: { documentId: string; roleTitle: string } | null;
}

export interface SchoolDashboardActionRequired {
  newApplications: number;
  expiringOffers: number;
}

export interface SchoolDashboardSummary {
  unacknowledged: number;
  inReview: number;
  offersOutstanding: number;
  enrolledThisYear: number;
}

export interface SchoolExpiringOffer {
  applicationDocumentId: string;
  studentName: string;
  offerDeadline: string;
  daysRemaining: number;
}

export interface SchoolActivityEvent {
  eventType: string;
  description: string;
  createdAt: string;
  applicationDocumentId: string | null;
  studentName: string | null;
  agentName: string | null;
}

export interface SchoolDashboardData {
  actionRequired: SchoolDashboardActionRequired;
  summary: SchoolDashboardSummary;
  expiringOffers: SchoolExpiringOffer[];
  activityFeed: SchoolActivityEvent[];
}

export interface SchoolOnboardingState {
  step1_profile_reviewed: boolean;
  step2_applications_viewed: boolean;
  step3_template_configured: boolean;
  pendingApplicationCount: number;
}

export interface SchoolDashboardBundle {
  staff: SchoolStaffMe;
  dashboard: SchoolDashboardData;
  onboarding: SchoolOnboardingState;
}

export interface SchoolStatCardView {
  labelKey: string;
  count: number;
  href: string;
}

export interface SchoolActivityRowView {
  id: string;
  text: string;
  timestamp: string;
  href: string;
}

export interface SchoolOnboardingStepView {
  labelKey: string;
  done: boolean;
}
