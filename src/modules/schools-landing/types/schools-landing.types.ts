import type { IconComponent } from '@/modules/design-system';

export type PlanKey = 'listing' | 'admissions';

export type Plan = {
  key: PlanKey;
  featured?: boolean;
  featureKeys: string[];
  ctaHref: string;
};

export type TimelineStepKey = 'receive' | 'review' | 'decide' | 'onboard';

export type TimelineStep = {
  key: TimelineStepKey;
  icon: IconComponent;
  comingSoon?: true;
};

export type ToolItem = {
  key: string;
  icon: IconComponent;
};
