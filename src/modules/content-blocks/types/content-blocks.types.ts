import type { ComponentType, ReactNode } from 'react';
import type { ContentPage } from '@/modules/content-pages';

export interface ContentBlockProps {
  page: ContentPage;
  relatedPages?: ContentPage[];
  categoryPages?: ContentPage[];
  designLabel?: string;
  getPageHref?: (page: ContentPage) => string;
  getCategoryHref?: (categorySlug: string) => string;
  sectionLabel?: string;
}

export type ContentBlockKey =
  | 'approvalFlow'
  | 'anchorPillNav'
  | 'answerPanel'
  | 'audienceCards'
  | 'breadcrumbTrail'
  | 'checklistRows'
  | 'comparisonMatrix'
  | 'contactRouting'
  | 'ctaBanner'
  | 'deadlineTimeline'
  | 'evidencePack'
  | 'faqRows'
  | 'featureTileGrid'
  | 'feeSummary'
  | 'governanceMatrix'
  | 'heroIntro'
  | 'heroMedia'
  | 'imageText'
  | 'integrationMap'
  | 'keyFactRows'
  | 'kpiDashboard'
  | 'linkRail'
  | 'metricStrip'
  | 'operatingModel'
  | 'processStepper'
  | 'programCards'
  | 'quoteBand'
  | 'relatedPages'
  | 'resourceRows'
  | 'riskRegister'
  | 'segmentStrategy'
  | 'serviceLevel'
  | 'storyPreview'
  | 'trustBadgeRow'
  | 'workflowBoard';

export interface ContentBlockDefinition {
  key: ContentBlockKey;
  name: string;
  description: string;
  component: ComponentType<ContentBlockProps>;
}

export interface BlockShellProps {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  tone?: 'plain' | 'muted' | 'dark' | 'brand' | 'trust' | 'featured' | 'ink';
  children: ReactNode;
}

export interface ContentPageBlocksRendererProps {
  page: ContentPage;
  design: ContentPageDesign;
  getPageHref?: (page: ContentPage) => string;
  getCategoryHref?: (categorySlug: string) => string;
  sectionLabel?: string;
}

export interface ContentDesignPageViewProps {
  design: ContentPageDesign;
  page: ContentPage;
}

export interface ContentPageDesign {
  slug: string;
  name: string;
  description: string;
  useCase: string;
  blocks: ContentBlockKey[];
  samplePageSlug: string;
}
