export type AutocompleteItemKind = 'school' | 'suburb' | 'state' | 'agent';

export interface AutocompleteItem {
  key: string;
  kind: AutocompleteItemKind;
  // Flat position across all groups — used for keyboard highlight + aria.
  index: number;
  label: string;
  sublabel: string | null;
  iconUrl: string | null;
  onSelect: () => void;
}

export interface AutocompleteGroup {
  id: string;
  headingKey: string;
  items: AutocompleteItem[];
}
