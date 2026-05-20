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

export type ContentSignalTone = 'brand' | 'trust' | 'featured' | 'muted';

export interface ContentSearchSignal {
  label: string;
  value: string;
  tone: ContentSignalTone;
}

export interface ContentDecisionPoint {
  title: string;
  summary: string;
  owner: string;
  evidence: string;
  href?: string;
}

export interface ContentAiSummary {
  answer: string;
  intent: string;
  entities: string[];
  followUps: ContentLink[];
}

export interface ContentProofPoint {
  label: string;
  detail: string;
  confidence: string;
  href?: string;
}

export interface ContentStakeholder {
  name: string;
  goal: string;
  owner: string;
  metric: string;
  href: string;
}

export interface ContentActionPath {
  label: string;
  description: string;
  href: string;
  priority: 'Primary' | 'Secondary' | 'Support';
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
  searchSignals: ContentSearchSignal[];
  decisionPoints: ContentDecisionPoint[];
  aiSummary: ContentAiSummary;
  proofPoints: ContentProofPoint[];
  stakeholders: ContentStakeholder[];
  actionPaths: ContentActionPath[];
  schemaKeywords: string[];
  lastReviewed: string;
  quote: ContentQuote;
  cta: {
    title: string;
    description: string;
    primary: ContentLink;
    secondary: ContentLink;
  };
}
