import type { StatusBadge } from '@/modules/design-system';
import type { ServiceInvoiceStatus } from '@/modules/school-applications/types/school-applications.types';

type BadgeTone = NonNullable<React.ComponentProps<typeof StatusBadge>['tone']>;

export const SERVICE_INVOICE_STATUS_TONE: Record<ServiceInvoiceStatus, BadgeTone> = {
  draft: 'muted',
  issued: 'submitted',
  paid: 'accepted',
  overdue: 'rejected',
  cancelled: 'danger',
  refunded: 'featured',
};
