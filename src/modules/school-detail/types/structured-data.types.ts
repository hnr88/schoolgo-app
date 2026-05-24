import type { SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';
import type { Portal } from '@/lib/portal-url';

export interface StructuredDataProps {
  school: SchoolDetail;
  activePortal: Portal;
  locale?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface StepItem {
  title: string;
  desc: string;
}
