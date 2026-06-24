import { Building2, Home, ShieldCheck, Users } from 'lucide-react';
import type { IconComponent } from '@/modules/design-system';

export const ACCOMMODATION_KEYS = ['boarding', 'homestay', 'family', 'guardians'] as const;

export const ACCOMMODATION_ICONS: Record<(typeof ACCOMMODATION_KEYS)[number], IconComponent> = {
  boarding: Building2,
  homestay: Home,
  family: Users,
  guardians: ShieldCheck,
};

export const WELFARE_KEYS = [
  'responsibleUnder18',
  'sickOrHomesick',
  'contactPerson',
  'communication',
  'sameCountryPeers',
  'adjustmentSupport',
] as const;
