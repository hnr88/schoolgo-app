import type { TemplateData } from '@/modules/school-templates';

export interface SchoolRequirements {
  version: number;
  publishedAt: string | null;
  templateData: TemplateData;
}
