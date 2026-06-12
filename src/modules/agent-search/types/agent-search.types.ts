export type AgentSortBy =
  | 'relevance'
  | 'experience'
  | 'name_asc'
  | 'name_desc'
  | 'recently_verified';

export interface AgentSearchRequest {
  q?: string;
  countriesServed?: string[];
  languages?: string[];
  services?: string[];
  verifiedOnly?: boolean;
  sortBy?: AgentSortBy;
  page?: number;
  pageSize?: number;
}

export interface AgentPartnerSchool {
  documentId: string;
  lat: number;
  lng: number;
  name: string;
  slug: string | null;
}

export interface AgentHit {
  documentId: string;
  slug: string | null;
  name: string;
  photoUrl: string | null;
  headline: string | null;
  roleTitle: string | null;
  countriesServed: string[];
  languages: string[];
  specialties: string[];
  yearsExperience: number | null;
  verified: boolean;
  qeacValidationStatus: string;
  partnerSchoolsCount: number;
  completeness: number;
  lat: number | null;
  lng: number | null;
  city: string | null;
  partnerSchools: AgentPartnerSchool[];
}

export interface AgentSearchResponse {
  data: {
    hits: AgentHit[];
    total: number;
    page: number;
    pageSize: number;
  };
  error:
    | null
    | { status: number; name?: string; message: string; details?: Record<string, unknown> };
}
