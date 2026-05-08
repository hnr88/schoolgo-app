export interface GuideNavItem {
  id: string;
  label: string;
}

export interface GuideTableData {
  headers: string[];
  rows: string[][];
}

export interface GuideCalloutData {
  title: string;
  text: string;
  link?: {
    label: string;
    href: string;
  };
}

export interface GuideFeatureItem {
  emoji: string;
  title: string;
  description: string;
}

export interface GuideAccordionItem {
  question: string;
  paragraphs: string[];
}

export interface GuideWorkflowStep {
  title: string;
  items: string[];
}

export interface GuideWorkflowData {
  title: string;
  subtitle: string;
  steps: GuideWorkflowStep[];
  footer: {
    text: string;
    buttonLabel: string;
    buttonHref: string;
  };
}

export interface GuideRelatedItem {
  slug: string;
  title: string;
  description: string;
  image?: string;
}

export interface GuideHeroData {
  breadcrumbLabel: string;
  title: string;
  subtitle: string;
  image?: string;
  navItems: GuideNavItem[];
}

export interface GuideContentData {
  type: 'content';
  id: string;
  heading: string;
  paragraphs: string[];
  image?: string;
  imageAlt?: string;
  reverse?: boolean;
  table?: GuideTableData;
  callout?: GuideCalloutData;
  workflow?: GuideWorkflowData;
}

export interface GuideSplitData {
  type: 'split';
  id?: string;
  heading: string;
  paragraphs: string[];
  link?: { label: string; href: string };
  reverse?: boolean;
  features: GuideFeatureItem[];
}

export interface GuideAccordionData {
  type: 'accordion';
  id?: string;
  heading: string;
  items: GuideAccordionItem[];
}

export type GuideSection =
  | GuideContentData
  | GuideSplitData
  | GuideAccordionData;

export interface GuideCTAData {
  heading: string;
  text: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface GuideCTAProps extends GuideCTAData {
  relatedGuides?: GuideRelatedItem[];
}

export interface GuideMeta {
  title: string;
  description: string;
}

export interface GuidePageData {
  slug: string;
  meta: GuideMeta;
  hero: GuideHeroData;
  sections: GuideSection[];
  relatedGuides: GuideRelatedItem[];
  cta: GuideCTAData;
}
