import type { ParentApplication } from '@/modules/applications/types/parent-application.types';

export type ParentOffer = ParentApplication;

export interface UseParentOffersResult {
  offers: ParentOffer[];
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  refetch: () => void;
}

export interface OfferCardProps {
  offer: ParentOffer;
}
