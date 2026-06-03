import type { ApplicationStatus } from '@/modules/applications/types/application.types';

export const PARENT_OFFER_STATUSES: ApplicationStatus[] = ['offer_made', 'offer_accepted'];

export const PARENT_OFFERS_QUERY_KEY = ['parent', 'offers'] as const;

export const PARENT_OFFERS_PAGE_SIZE = 100;

export const PARENT_OFFERS_POPULATE: Record<string, string> = {
  'populate[student][fields][0]': 'firstName',
  'populate[student][fields][1]': 'lastName',
  'populate[student][fields][2]': 'documentId',
  'populate[school][fields][0]': 'name',
  'populate[school][fields][1]': 'documentId',
};
