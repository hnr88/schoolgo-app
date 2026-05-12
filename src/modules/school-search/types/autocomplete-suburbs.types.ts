export interface AutocompleteSuburbHit {
  suburb: string;
  postcode: string;
  state: string;
}

export interface AutocompleteSuburbsResponse {
  data: AutocompleteSuburbHit[];
  error?: null | { status: number; message: string };
}
