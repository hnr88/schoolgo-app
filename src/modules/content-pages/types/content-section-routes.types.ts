export type ContentSectionRoute =
  | 'admissions'
  | 'fees'
  | 'international'
  | 'curriculum'
  | 'student-life'
  | 'boarding'
  | 'partners'
  | 'school-solutions'
  | 'events'
  | 'pathways'
  | 'company'
  | 'school-search';

export interface ContentSectionPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export interface ContentSectionIndexProps {
  params: Promise<{ locale: string }>;
}

export interface ContentSectionIndexPageProps {
  section: ContentSectionRoute;
}
