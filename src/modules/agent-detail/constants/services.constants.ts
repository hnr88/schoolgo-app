import {
  BookOpen,
  FileText,
  GraduationCap,
  Home,
  MessageSquareText,
  Plane,
  ShieldCheck,
  Stamp,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

/** shared.service.category enum (in display order). */
export const SERVICE_CATEGORY_ORDER = [
  'counselling',
  'application',
  'visa',
  'scholarship',
  'english_prep',
  'accommodation',
  'under18_welfare',
  'post_arrival',
] as const;

export type ServiceCategory = (typeof SERVICE_CATEGORY_ORDER)[number];

export const SERVICE_CATEGORY_ICONS: Record<ServiceCategory, LucideIcon> = {
  counselling: MessageSquareText,
  application: FileText,
  visa: Stamp,
  scholarship: GraduationCap,
  english_prep: BookOpen,
  accommodation: Home,
  under18_welfare: ShieldCheck,
  post_arrival: Plane,
};

export const SERVICE_CATEGORY_FALLBACK_ICON: LucideIcon = Wrench;

export function isServiceCategory(value: string | null | undefined): value is ServiceCategory {
  return value != null && (SERVICE_CATEGORY_ORDER as readonly string[]).includes(value);
}
