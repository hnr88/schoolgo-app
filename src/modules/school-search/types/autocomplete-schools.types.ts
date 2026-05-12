export interface AutocompleteSchoolHit {
  id: string;
  name: string;
  suburb: string;
  state: string;
  logoUrl: string | null;
}

export interface AutocompleteSchoolsResponse {
  data: AutocompleteSchoolHit[];
  error?: null | { status: number; message: string };
}
