import { ShieldCheck, ReceiptText, History } from 'lucide-react';
import type { PaymentFeatureCard } from '@/modules/payments/types/payments.types';

export const PAYMENT_FEATURE_CARDS: PaymentFeatureCard[] = [
  {
    icon: ShieldCheck,
    titleKey: 'features.secure.title',
    descriptionKey: 'features.secure.description',
    bg: 'bg-vivid-mint-soft',
    color: 'text-vivid-mint',
  },
  {
    icon: ReceiptText,
    titleKey: 'features.receipts.title',
    descriptionKey: 'features.receipts.description',
    bg: 'bg-vivid-iris-soft',
    color: 'text-vivid-iris',
  },
  {
    icon: History,
    titleKey: 'features.history.title',
    descriptionKey: 'features.history.description',
    bg: 'bg-vivid-coral-soft',
    color: 'text-vivid-coral',
  },
];
