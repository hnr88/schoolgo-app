import type { ParentApplication } from '@/modules/applications/types/parent-application.types';

export type ParentOffer = ParentApplication;

export interface UseParentOffersResult {
  offers: ParentOffer[];
  total: number;
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  hasMore: boolean;
  isLoadingMore: boolean;
  loadMore: () => void;
  refetch: () => void;
}

export interface OfferCardProps {
  offer: ParentOffer;
}
