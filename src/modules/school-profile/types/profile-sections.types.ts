import type { ComponentType } from 'react';

export interface ProfileSectionMeta {
  id: string;
  icon: ComponentType<{ className?: string }>;
  titleKey: string;
  descriptionKey: string;
}
