import { ApprovalFlowBlock } from '@/modules/content-blocks/components/ApprovalFlowBlock';
import { AnchorPillNavBlock } from '@/modules/content-blocks/components/AnchorPillNavBlock';
import { AnswerPanelBlock } from '@/modules/content-blocks/components/AnswerPanelBlock';
import { AudienceCardsBlock } from '@/modules/content-blocks/components/AudienceCardsBlock';
import { BreadcrumbTrailBlock } from '@/modules/content-blocks/components/BreadcrumbTrailBlock';
import { ChecklistRowsBlock } from '@/modules/content-blocks/components/ChecklistRowsBlock';
import { ComparisonMatrixBlock } from '@/modules/content-blocks/components/ComparisonMatrixBlock';
import { ContactRoutingBlock } from '@/modules/content-blocks/components/ContactRoutingBlock';
import { CtaBannerBlock } from '@/modules/content-blocks/components/CtaBannerBlock';
import { DeadlineTimelineBlock } from '@/modules/content-blocks/components/DeadlineTimelineBlock';
import { EvidencePackBlock } from '@/modules/content-blocks/components/EvidencePackBlock';
import { FaqRowsBlock } from '@/modules/content-blocks/components/FaqRowsBlock';
import { FeatureTileGridBlock } from '@/modules/content-blocks/components/FeatureTileGridBlock';
import { FeeSummaryBlock } from '@/modules/content-blocks/components/FeeSummaryBlock';
import { GovernanceMatrixBlock } from '@/modules/content-blocks/components/GovernanceMatrixBlock';
import { HeroIntroBlock } from '@/modules/content-blocks/components/HeroIntroBlock';
import { HeroMediaBlock } from '@/modules/content-blocks/components/HeroMediaBlock';
import { ImageTextBlock } from '@/modules/content-blocks/components/ImageTextBlock';
import { IntegrationMapBlock } from '@/modules/content-blocks/components/IntegrationMapBlock';
import { KeyFactRowsBlock } from '@/modules/content-blocks/components/KeyFactRowsBlock';
import { KpiDashboardBlock } from '@/modules/content-blocks/components/KpiDashboardBlock';
import { LinkRailBlock } from '@/modules/content-blocks/components/LinkRailBlock';
import { MetricStripBlock } from '@/modules/content-blocks/components/MetricStripBlock';
import { OperatingModelBlock } from '@/modules/content-blocks/components/OperatingModelBlock';
import { ProcessStepperBlock } from '@/modules/content-blocks/components/ProcessStepperBlock';
import { ProgramCardsBlock } from '@/modules/content-blocks/components/ProgramCardsBlock';
import { QuoteBandBlock } from '@/modules/content-blocks/components/QuoteBandBlock';
import { RelatedPagesBlock } from '@/modules/content-blocks/components/RelatedPagesBlock';
import { ResourceRowsBlock } from '@/modules/content-blocks/components/ResourceRowsBlock';
import { RiskRegisterBlock } from '@/modules/content-blocks/components/RiskRegisterBlock';
import { SegmentStrategyBlock } from '@/modules/content-blocks/components/SegmentStrategyBlock';
import { ServiceLevelBlock } from '@/modules/content-blocks/components/ServiceLevelBlock';
import { StoryPreviewBlock } from '@/modules/content-blocks/components/StoryPreviewBlock';
import { TrustBadgeRowBlock } from '@/modules/content-blocks/components/TrustBadgeRowBlock';
import { WorkflowBoardBlock } from '@/modules/content-blocks/components/WorkflowBoardBlock';
import type {
  ContentBlockDefinition,
  ContentBlockKey,
} from '@/modules/content-blocks/types/content-blocks.types';

export const contentBlockDefinitions = [
  { key: 'approvalFlow', name: 'Approval Flow', description: 'Decision gates with evidence requirements.', component: ApprovalFlowBlock },
  { key: 'answerPanel', name: 'Answer Panel', description: 'AEO-ready direct answer, entities, links, and proof signals.', component: AnswerPanelBlock },
  { key: 'breadcrumbTrail', name: 'Breadcrumb Trail', description: 'Small route context bar for detail pages.', component: BreadcrumbTrailBlock },
  { key: 'heroIntro', name: 'Hero Intro', description: 'Title, copy, and primary/secondary CTAs.', component: HeroIntroBlock },
  { key: 'heroMedia', name: 'Hero Media', description: 'Image-led hero media with stat cells.', component: HeroMediaBlock },
  { key: 'anchorPillNav', name: 'Anchor Pill Nav', description: 'Sticky in-page navigation for long pages.', component: AnchorPillNavBlock },
  { key: 'metricStrip', name: 'Metric Strip', description: 'Three compact proof metrics.', component: MetricStripBlock },
  { key: 'keyFactRows', name: 'Key Fact Rows', description: 'Definition-list facts for scannable context.', component: KeyFactRowsBlock },
  { key: 'featureTileGrid', name: 'Feature Tile Grid', description: 'Linked cards for benefits or content areas.', component: FeatureTileGridBlock },
  { key: 'imageText', name: 'Image Text', description: 'Media and narrative block for explanation.', component: ImageTextBlock },
  { key: 'processStepper', name: 'Process Stepper', description: 'Three linked sequential actions.', component: ProcessStepperBlock },
  { key: 'deadlineTimeline', name: 'Deadline Timeline', description: 'Milestone cards for timing-heavy content.', component: DeadlineTimelineBlock },
  { key: 'evidencePack', name: 'Evidence Pack', description: 'Document and proof-point readiness checklist.', component: EvidencePackBlock },
  { key: 'checklistRows', name: 'Checklist Rows', description: 'Linked checklist items for readiness.', component: ChecklistRowsBlock },
  { key: 'comparisonMatrix', name: 'Comparison Matrix', description: 'Reusable table for decision tradeoffs.', component: ComparisonMatrixBlock },
  { key: 'feeSummary', name: 'Fee Summary', description: 'Cost snapshot panel for planning pages.', component: FeeSummaryBlock },
  { key: 'governanceMatrix', name: 'Governance Matrix', description: 'Owners, controls, evidence, and cadence.', component: GovernanceMatrixBlock },
  { key: 'faqRows', name: 'FAQ Rows', description: 'Disclosure rows for common questions.', component: FaqRowsBlock },
  { key: 'integrationMap', name: 'Integration Map', description: 'Connected systems and content handoffs.', component: IntegrationMapBlock },
  { key: 'kpiDashboard', name: 'KPI Dashboard', description: 'Executive metric snapshot for operational pages.', component: KpiDashboardBlock },
  { key: 'resourceRows', name: 'Resource Rows', description: 'Linked resources, forms, or guide rows.', component: ResourceRowsBlock },
  { key: 'operatingModel', name: 'Operating Model', description: 'Owners, stages, handoffs, and control points.', component: OperatingModelBlock },
  { key: 'relatedPages', name: 'Related Pages', description: 'Cards linking to neighboring pages.', component: RelatedPagesBlock },
  { key: 'riskRegister', name: 'Risk Register', description: 'Decision risks and mitigations.', component: RiskRegisterBlock },
  { key: 'segmentStrategy', name: 'Segment Strategy', description: 'Stakeholder segmentation and routing cards.', component: SegmentStrategyBlock },
  { key: 'serviceLevel', name: 'Service Level', description: 'Operational standards and escalation paths.', component: ServiceLevelBlock },
  { key: 'linkRail', name: 'Link Rail', description: 'Compact row of high-intent links.', component: LinkRailBlock },
  { key: 'trustBadgeRow', name: 'Trust Badge Row', description: 'Small trust markers or verification badges.', component: TrustBadgeRowBlock },
  { key: 'audienceCards', name: 'Audience Cards', description: 'Three-way routing for families, agents, schools.', component: AudienceCardsBlock },
  { key: 'programCards', name: 'Program Cards', description: 'Related program or pathway cards.', component: ProgramCardsBlock },
  { key: 'contactRouting', name: 'Contact Routing', description: 'Routes visitors to the correct contact path.', component: ContactRoutingBlock },
  { key: 'storyPreview', name: 'Story Preview', description: 'Editorial preview with image and text.', component: StoryPreviewBlock },
  { key: 'quoteBand', name: 'Quote Band', description: 'Dark proof quote section.', component: QuoteBandBlock },
  { key: 'workflowBoard', name: 'Workflow Board', description: 'Kanban-style content and decision pipeline.', component: WorkflowBoardBlock },
  { key: 'ctaBanner', name: 'CTA Banner', description: 'Full-width final call-to-action.', component: CtaBannerBlock },
] satisfies ContentBlockDefinition[];

export const contentBlockRegistry = Object.fromEntries(
  contentBlockDefinitions.map((definition) => [definition.key, definition]),
) as Record<ContentBlockKey, ContentBlockDefinition>;

export function getContentBlockDefinition(key: ContentBlockKey) {
  return contentBlockRegistry[key];
}
