import { CreditCard, Search, Settings, UserPlus } from 'lucide-react';
import type { ParentQuickAction } from '@/modules/dashboard/parent/types/parent-dashboard.types';

export const PARENT_DASHBOARD_RECENT_LIMIT = 4;

export const PARENT_QUICK_ACTIONS: ParentQuickAction[] = [
  {
    href: '/parent/students/new',
    icon: UserPlus,
    labelKey: 'quickAddStudent',
    bg: 'bg-vivid-coral-soft',
    color: 'text-vivid-coral',
  },
  {
    href: '/parent/search',
    icon: Search,
    labelKey: 'quickSearchSchools',
    bg: 'bg-vivid-mint-soft',
    color: 'text-vivid-mint',
  },
  {
    href: '/parent/settings',
    icon: Settings,
    labelKey: 'quickSettings',
    bg: 'bg-vivid-iris-soft',
    color: 'text-vivid-iris',
  },
];

export const PARENT_PAYMENTS_ACTION = {
  icon: CreditCard,
  labelKey: 'quickPayments',
  bg: 'bg-muted',
  color: 'text-foggy',
} as const;
