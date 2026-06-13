import type { z } from 'zod';
import type {
  shortlistSchema,
  shortlistMemberSchema,
  shortlistItemSchema,
  shortlistNoteSchema,
  createShortlistSchema,
  inviteMemberSchema,
  addItemSchema,
  addNoteSchema,
} from '@/modules/parent-shortlist/schemas/shortlist.schema';
import type {
  DECISION_STATUSES,
  SHORTLIST_REACTIONS,
  MEMBER_ROLES,
} from '@/modules/parent-shortlist/constants/shortlist.constants';

export type DecisionStatus = (typeof DECISION_STATUSES)[number];
export type ShortlistReaction = (typeof SHORTLIST_REACTIONS)[number];
export type MemberRole = (typeof MEMBER_ROLES)[number];
export type ShortlistAccess = 'owner' | 'member';

export type ShortlistMember = z.infer<typeof shortlistMemberSchema>;
export type Shortlist = z.infer<typeof shortlistSchema>;
export type ShortlistItem = z.infer<typeof shortlistItemSchema>;
export type ShortlistNote = z.infer<typeof shortlistNoteSchema>;

export type CreateShortlistInput = z.infer<typeof createShortlistSchema>;
export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;
export type AddItemInput = z.infer<typeof addItemSchema>;
export type AddNoteInput = z.infer<typeof addNoteSchema>;
