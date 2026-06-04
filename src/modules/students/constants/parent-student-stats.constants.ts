import { Users, FileText, BadgeCheck, Clock } from 'lucide-react';
import type { IconComponent } from '@/modules/design-system';
import type { ParentStudentStatKey } from '@/modules/students/types/parent-component.types';

export interface ParentStudentStatTileConfig {
  key: ParentStudentStatKey;
  icon: IconComponent;
  labelKey: string;
  iconClassName: string;
}

export const PARENT_STUDENT_STAT_TILES: ParentStudentStatTileConfig[] = [
  {
    key: 'children',
    icon: Users,
    labelKey: 'statChildren',
    iconClassName: 'bg-vivid-iris-soft text-vivid-iris-strong',
  },
  {
    key: 'activeApplications',
    icon: FileText,
    labelKey: 'statActiveApps',
    iconClassName: 'bg-vivid-coral-soft text-vivid-coral-strong',
  },
  {
    key: 'verifiedTests',
    icon: BadgeCheck,
    labelKey: 'statVerifiedTests',
    iconClassName: 'bg-vivid-mint-soft text-vivid-mint',
  },
  {
    key: 'pendingTests',
    icon: Clock,
    labelKey: 'statPendingTests',
    iconClassName: 'bg-vivid-amber-soft text-arches-700',
  },
];
