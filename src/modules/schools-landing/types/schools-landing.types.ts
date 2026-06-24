import type { IconComponent } from '@/modules/design-system';

export type PlanKey = 'listing' | 'admissions';

export type Plan = {
  key: PlanKey;
  featured?: boolean;
  featureKeys: string[];
  ctaHref: string;
};

export type TimelineStepKey = 'find' | 'understand' | 'connect' | 'apply';

export type TimelineStep = {
  key: TimelineStepKey;
  icon: IconComponent;
  comingSoon?: true;
};

export type ToolItem = {
  key: string;
  icon: IconComponent;
};

export type AppQualityKey = 'english' | 'costs' | 'accommodation' | 'agents';

export type AppQualityItem = {
  key: AppQualityKey;
  icon: IconComponent;
};

export type AgentRelationshipKey =
  | 'approve'
  | 'connect'
  | 'agreements'
  | 'performance'
  | 'remove';

export type AgentRelationshipBullet = {
  key: AgentRelationshipKey;
  icon: IconComponent;
};
