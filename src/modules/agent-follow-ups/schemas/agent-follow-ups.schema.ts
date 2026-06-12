import { z } from 'zod';

export const APPLICATION_STATUSES = [
  'draft',
  'submitted',
  'received',
  'under_review',
  'documents_requested',
  'assessment_required',
  'interview_scheduled',
  'interview_completed',
  'offer_made',
  'offer_accepted',
  'waitlisted',
  'pre_enrolment',
  'coe_issued',
  'enrolled',
  'declined',
  'withdrawn',
] as const;

export const followUpItemSchema = z.object({
  documentId: z.string(),
  // Loosened from z.enum(APPLICATION_STATUSES): a backend status outside the
  // known set must not throw the whole follow-ups page into an error state.
  status: z.string(),
  statusChangedAt: z.string().nullish(),
  offerDeadline: z.string().nullish(),
  createdAt: z.string().nullish(),
  student: z
    .object({
      firstName: z.string().nullish(),
      lastName: z.string().nullish(),
    })
    .nullish(),
  school: z
    .object({
      name: z.string().nullish(),
    })
    .nullish(),
});

// Flat Strapi v5 envelope from GET /api/agents/me/follow-ups (contract C-A4).
export const agentFollowUpsResponseSchema = z.object({
  data: z.object({
    staleInReview: z.array(followUpItemSchema),
    agingDrafts: z.array(followUpItemSchema),
    expiringOffers: z.array(followUpItemSchema),
  }),
  meta: z.object({
    counts: z.object({
      staleInReview: z.number(),
      agingDrafts: z.number(),
      expiringOffers: z.number(),
    }),
  }),
});
