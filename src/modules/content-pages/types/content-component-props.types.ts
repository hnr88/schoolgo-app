import type {
  ContentCategory,
  ContentChecklistItem,
  ContentComparisonRow,
  ContentFact,
  ContentFeature,
  ContentFaqItem,
  ContentLink,
  ContentMetric,
  ContentPage,
  ContentQuote,
  ContentResource,
  ContentStep,
  ContentTimelineItem,
} from '@/modules/content-pages/types/content-pages.types';

export interface ContentCalloutProps {
  page: ContentPage;
}

export interface ContentBreadcrumbsProps {
  category?: ContentCategory;
  title: string;
}

export interface ContentCategoryPageProps {
  categorySlug: string;
}

export interface ContentChecklistProps {
  items: ContentChecklistItem[];
}

export interface ContentComparisonTableProps {
  rows: ContentComparisonRow[];
}

export interface ContentCtaBandProps {
  page: ContentPage;
}

export interface ContentDirectoryCardProps {
  page: ContentPage;
  getPageHref?: (page: ContentPage) => string;
}

export interface ContentDirectoryGridProps {
  title: string;
  description: string;
  pages: ContentPage[];
  getPageHref?: (page: ContentPage) => string;
}

export interface ContentFeatureGridProps {
  title: string;
  description: string;
  features: ContentFeature[];
}

export interface ContentFactsPanelProps {
  facts: ContentFact[];
}

export interface ContentFaqProps {
  items: ContentFaqItem[];
}

export interface ContentFeatureCardProps {
  feature: ContentFeature;
}

export interface ContentHeroProps {
  page: ContentPage;
}

export interface ContentIndexPageProps {
  currentPage?: number;
}

export interface ContentLinkPanelProps {
  links: ContentLink[];
}

export interface ContentListStructuredDataItem {
  name: string;
  description: string;
  href: string;
}

export interface ContentListStructuredDataProps {
  name: string;
  description: string;
  href: string;
  items: ContentListStructuredDataItem[];
}

export interface ContentPageSchemaInput {
  page: ContentPage;
  getPageHref?: (page: ContentPage) => string;
  getCategoryHref?: (categorySlug: string) => string;
  contentBlocks?: readonly string[];
  designName?: string;
}

export interface ContentMetricCardProps {
  metric: ContentMetric;
}

export interface ContentPaginationProps {
  currentPage: number;
}

export interface ContentQuoteProps {
  quote: ContentQuote;
}

export interface ContentRelatedPagesProps {
  pages: ContentPage[];
}

export interface ContentResourceListProps {
  resources: ContentResource[];
}

export interface ContentSectionNavProps {
  items: ContentLink[];
}

export interface ContentSplitPanelProps {
  page: ContentPage;
}

export interface ContentStatStripProps {
  metrics: ContentMetric[];
}

export interface ContentStepCardsProps {
  steps: ContentStep[];
}

export interface ContentTemplateSectionsProps {
  page: ContentPage;
}

export interface ContentTimelineProps {
  items: ContentTimelineItem[];
}

export interface ContentPageViewProps extends ContentPageSchemaInput {
  sectionLabel?: string;
}

export type ContentPageStructuredDataProps = ContentPageSchemaInput;

export type ContentStandalonePageProps = ContentPageViewProps;
