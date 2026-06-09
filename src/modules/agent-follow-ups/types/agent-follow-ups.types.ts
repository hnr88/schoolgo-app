import type { z } from 'zod';
import type {
  agentFollowUpsResponseSchema,
  followUpItemSchema,
} from '@/modules/agent-follow-ups/schemas/agent-follow-ups.schema';

export type FollowUpItem = z.infer<typeof followUpItemSchema>;
export type AgentFollowUpsResponse = z.infer<typeof agentFollowUpsResponseSchema>;
export type FollowUpBuckets = AgentFollowUpsResponse['data'];
export type FollowUpCounts = AgentFollowUpsResponse['meta']['counts'];
export type FollowUpBucketKey = keyof FollowUpBuckets;
export type FollowUpVariant = 'stale' | 'draft' | 'offer';
