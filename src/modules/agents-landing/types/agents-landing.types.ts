import type { IconComponent } from '@/modules/design-system';

export type CommissionBulletKey = 'zero' | 'direct' | 'audit';

export type CommissionBullet = {
  key: CommissionBulletKey;
  icon: IconComponent;
};

export type PainPointKey = 'email' | 'status' | 'trust' | 'requirements';

export type PainPointItem = {
  key: PainPointKey;
  icon: IconComponent;
};

export type MatchingStepKey = 'listen' | 'match' | 'deliver';

export type MatchingStep = {
  key: MatchingStepKey;
  icon: IconComponent;
  comingSoon?: true;
};

export type TestimonialKey = 'a' | 'b' | 'c';

export type HeroStatKey = 'schools' | 'sectors' | 'commission';

export type StatsBarItemKey = 'schools' | 'requirements' | 'tests' | 'free';

export type QeacProfileStatKey = 'yearsActive' | 'students' | 'placements' | 'languages';
