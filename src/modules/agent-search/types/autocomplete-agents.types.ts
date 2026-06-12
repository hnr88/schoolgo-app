export interface AutocompleteAgentHit {
  id: string;
  slug: string | null;
  name: string;
  headline: string | null;
  photoUrl: string | null;
}

export interface AutocompleteAgentsResponse {
  data: AutocompleteAgentHit[];
  error?: null | { status: number; message: string };
}
