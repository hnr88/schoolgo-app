import type { ParentApplication } from '@/modules/applications/types/parent-application.types';

export interface ParentDeclineOfferInput {
  declineNote?: string;
}

export interface ParentApplicationActionsProps {
  application: ParentApplication;
}
