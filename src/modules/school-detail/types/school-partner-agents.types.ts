export interface SchoolPartnerAgent {
  documentId: string;
  slug: string | null;
  companyName: string | null;
  displayName: string | null;
  headline: string | null;
  roleTitle: string | null;
  countryOfOperation: string | null;
  contactName: string;
  photoUrl: string | null;
  verified: boolean;
  qeacValidationStatus: string | null;
  yearsExperience: number | null;
  approvedAt: string | null;
}
