import type { ComparisonSchool } from '@/modules/parents-landing/lib/comparison';

export interface SchoolPhotoOrLogoProps {
  photoUrl: string | null;
  logoUrl: string | null;
  name: string;
  size?: 'lg' | 'sm';
}

export interface ComparisonCell {
  text: string;
  highlight?: boolean;
  muted?: boolean;
}

export interface ComparisonRow {
  key: string;
  value: (s: ComparisonSchool, i: number) => ComparisonCell;
}

export interface ComparisonSchoolCardsProps {
  schools: ComparisonSchool[];
  tc: (key: string) => string;
}

export interface ComparisonDesktopTableProps {
  schools: ComparisonSchool[];
  rows: ComparisonRow[];
  t: (key: string) => string;
}

export interface ComparisonMobileTableProps {
  schools: ComparisonSchool[];
  rows: ComparisonRow[];
  t: (key: string) => string;
}
