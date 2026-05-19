export type ContentAudience = 'families' | 'agents' | 'schools' | 'all';

export type ContentAccent = 'brand' | 'trust' | 'featured' | 'muted';

export type ContentPageType =
  | 'overview'
  | 'admissions'
  | 'fees'
  | 'curriculum'
  | 'student-life'
  | 'boarding'
  | 'international'
  | 'agents'
  | 'schools'
  | 'events'
  | 'faq'
  | 'directory';

export interface ContentCategory {
  slug: string;
  label: string;
  description: string;
}

export interface ContentLink {
  label: string;
  href: string;
}

export interface ContentMetric {
  value: string;
  label: string;
}

export interface ContentFact {
  label: string;
  value: string;
}

export interface ContentFeature {
  title: string;
  description: string;
  href?: string;
  icon?: string;
}

export interface ContentStep {
  title: string;
  description: string;
  href?: string;
}

export interface ContentTimelineItem {
  date: string;
  title: string;
  description: string;
  href?: string;
}

export interface ContentChecklistItem {
  label: string;
  detail: string;
  href?: string;
}

export interface ContentComparisonRow {
  label: string;
  primary: string;
  secondary: string;
  tertiary: string;
}

export interface ContentFaqItem {
  question: string;
  answer: string;
}

export interface ContentResource {
  title: string;
  description: string;
  href: string;
  meta: string;
}

export interface ContentQuote {
  quote: string;
  name: string;
  role: string;
}

export interface ContentPageSeed {
  slug: string;
  category: string;
  type: ContentPageType;
  audience: ContentAudience;
  title: string;
  subtitle: string;
  image: string;
  accent: ContentAccent;
}

export interface ContentPage extends ContentPageSeed {
  description: string;
  eyebrow: string;
  imageAlt: string;
  metrics: ContentMetric[];
  facts: ContentFact[];
  features: ContentFeature[];
  steps: ContentStep[];
  timeline: ContentTimelineItem[];
  checklist: ContentChecklistItem[];
  comparison: ContentComparisonRow[];
  faqs: ContentFaqItem[];
  resources: ContentResource[];
  links: ContentLink[];
  quote: ContentQuote;
  cta: {
    title: string;
    description: string;
    primary: ContentLink;
    secondary: ContentLink;
  };
}
