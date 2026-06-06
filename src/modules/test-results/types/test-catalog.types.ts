export type TestCatalogMode = 'practice_prep' | 'placement';

export type TestCatalogSkill =
  | 'reading'
  | 'writing'
  | 'listening'
  | 'speaking'
  | 'integrated'
  | 'maths'
  | 'nonverbal';

export interface TestCatalogItem {
  documentId: string;
  title: string;
  mode: TestCatalogMode;
  skill: TestCatalogSkill;
  description: string | null;
  durationMinutes: number;
}

export interface TestCatalogResponse {
  data: TestCatalogItem[];
  meta: Record<string, unknown>;
}

export interface UseTestCatalogParams {
  mode?: TestCatalogMode;
}
