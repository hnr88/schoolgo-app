import type { IconComponent } from '@/modules/design-system';

export type HeroRowKey = 'a' | 'b' | 'c';
export type HeroRowTone = 'brand' | 'featured' | 'trust';

export type HeroRow = {
  key: HeroRowKey;
  tone: HeroRowTone;
  image: string;
};

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
