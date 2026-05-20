import type { ComponentType } from 'react';
import type { ContentPage } from '@/modules/content-pages';

export interface ContentBlockProps {
  page: ContentPage;
  relatedPages?: ContentPage[];
  categoryPages?: ContentPage[];
  designLabel?: string;
}

export type ContentBlockKey =
  | 'anchorPillNav'
  | 'audienceCards'
  | 'breadcrumbTrail'
  | 'checklistRows'
  | 'comparisonMatrix'
  | 'contactRouting'
  | 'ctaBanner'
  | 'deadlineTimeline'
  | 'faqRows'
  | 'featureTileGrid'
  | 'feeSummary'
  | 'heroIntro'
  | 'heroMedia'
  | 'imageText'
  | 'keyFactRows'
  | 'linkRail'
  | 'metricStrip'
  | 'processStepper'
  | 'programCards'
  | 'quoteBand'
  | 'relatedPages'
  | 'resourceRows'
  | 'storyPreview'
  | 'trustBadgeRow';

export interface ContentBlockDefinition {
  key: ContentBlockKey;
  name: string;
  description: string;
  component: ComponentType<ContentBlockProps>;
}

export interface ContentPageDesign {
  slug: string;
  name: string;
  description: string;
  useCase: string;
  blocks: ContentBlockKey[];
  samplePageSlug: string;
}
