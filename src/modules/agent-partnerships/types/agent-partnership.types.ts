import type { z } from 'zod';
import type {
  agentPartnershipSchema,
  myPartnershipsResponseSchema,
  partnershipStatusResponseSchema,
  PARTNERSHIP_STATUSES,
  SCHOOL_PARTNERSHIP_STATUSES,
} from '@/modules/agent-partnerships/schemas/agent-partnership.schema';

export type PartnershipStatus = (typeof PARTNERSHIP_STATUSES)[number];
export type SchoolPartnershipStatus = (typeof SCHOOL_PARTNERSHIP_STATUSES)[number];
export type AgentPartnership = z.infer<typeof agentPartnershipSchema>;
export type MyPartnershipsResponse = z.infer<typeof myPartnershipsResponseSchema>;
export type PartnershipStatusResponse = z.infer<typeof partnershipStatusResponseSchema>;
