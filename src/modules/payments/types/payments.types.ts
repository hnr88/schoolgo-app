import type { IconComponent } from '@/modules/design-system';

export interface PaymentPlanCard {
  icon: IconComponent;
  nameKey: string;
  priceKey: string;
  descriptionKey: string;
  bg: string;
  color: string;
}
