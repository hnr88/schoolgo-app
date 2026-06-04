import type { IconComponent } from '@/modules/design-system';

export type PaymentStatus = 'paid' | 'pending' | 'upcoming';

export type PaymentStatValueFormat = 'aud' | 'count';

export interface PaymentStatTileConfig {
  key: string;
  icon: IconComponent;
  labelKey: string;
  subKey: string;
  value: number;
  format: PaymentStatValueFormat;
}

export interface EarningPoint {
  monthIndex: number;
  paid: number;
  scheduled: number;
}

export interface SpendCategory {
  key: string;
  labelKey: string;
  value: number;
  color: string;
}

export interface BalancePoint {
  monthIndex: number;
  value: number;
}

export interface PaymentTransaction {
  id: string;
  invoiceNumber: string;
  descriptionKey: string;
  amount: number;
  status: PaymentStatus;
  date: string;
}

export interface PaymentStatusStyle {
  bg: string;
  text: string;
  dot: string;
}
