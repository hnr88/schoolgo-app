import { FileText, GraduationCap, Gift, Search } from 'lucide-react';

import type { IconComponent } from '@/modules/design-system';

interface SchoolKpiStyle {
  icon: IconComponent;
  bg: string;
  iconColor: string;
}

export const SCHOOL_KPI_STYLE: Record<string, SchoolKpiStyle> = {
  cardNewApplications: {
    icon: FileText,
    bg: 'bg-vivid-amber-soft',
    iconColor: 'text-vivid-amber',
  },
  cardUnderReview: {
    icon: Search,
    bg: 'bg-vivid-iris-soft',
    iconColor: 'text-vivid-iris',
  },
  cardOffersMade: {
    icon: Gift,
    bg: 'bg-vivid-mint-soft',
    iconColor: 'text-vivid-mint',
  },
  cardEnrolledThisTerm: {
    icon: GraduationCap,
    bg: 'bg-vivid-coral-soft',
    iconColor: 'text-vivid-coral',
  },
};
