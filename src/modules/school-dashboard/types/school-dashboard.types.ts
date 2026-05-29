export interface SchoolDashboardKpis {
  newApplications: number;
  underReview: number;
  offersMade: number;
  enrolledThisTerm: number;
}

export interface SchoolStaffMe {
  documentId: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
  schoolDocumentId: string;
}

export interface SchoolOnboardingState {
  isComplete: boolean;
  completedSteps: number;
  totalSteps: number;
}
