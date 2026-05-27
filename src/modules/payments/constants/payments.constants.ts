import { GraduationCap, LineChart, Target } from 'lucide-react';
import type { PaymentPlanCard } from '@/modules/payments/types/payments.types';

export const PAYMENT_PLAN_CARDS: PaymentPlanCard[] = [
  {
    icon: GraduationCap,
    nameKey: 'plans.practice.name',
    priceKey: 'plans.practice.price',
    descriptionKey: 'plans.practice.description',
    bg: 'bg-vivid-mint-soft',
    color: 'text-vivid-mint',
  },
  {
    icon: Target,
    nameKey: 'plans.placement.name',
    priceKey: 'plans.placement.price',
    descriptionKey: 'plans.placement.description',
    bg: 'bg-vivid-coral-soft',
    color: 'text-vivid-coral',
  },
  {
    icon: LineChart,
    nameKey: 'plans.progress.name',
    priceKey: 'plans.progress.price',
    descriptionKey: 'plans.progress.description',
    bg: 'bg-vivid-iris-soft',
    color: 'text-vivid-iris',
  },
];
