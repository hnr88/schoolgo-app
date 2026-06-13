import { z } from 'zod';
import {
  DECISION_STATUSES,
  SHORTLIST_REACTIONS,
  MEMBER_ROLES,
  SHORTLIST_NAME_MAX,
  SHORTLIST_NOTE_MAX,
} from '@/modules/parent-shortlist/constants/shortlist.constants';

// --- Response shapes (exactly as the shortlist controllers serialize) ---

export const shortlistMemberSchema = z.object({
  userDocumentId: z.string(),
  role: z.enum(MEMBER_ROLES),
});

export const shortlistSchema = z.object({
  documentId: z.string(),
  name: z.string(),
  status: z.enum(['active', 'archived']),
  members: z.array(shortlistMemberSchema),
  ownerId: z.string().nullish(),
  access: z.enum(['owner', 'member']),
  createdAt: z.string(),
  updatedAt: z.string().nullish(),
});

export const shortlistsResponseSchema = z.object({
  data: z.array(shortlistSchema),
});

export const shortlistItemSchema = z.object({
  documentId: z.string(),
  shortlistId: z.string(),
  schoolId: z.string(),
  decisionStatus: z.enum(DECISION_STATUSES),
  createdAt: z.string(),
});

export const shortlistItemResponseSchema = z.object({
  data: shortlistItemSchema,
});

export const shortlistNoteSchema = z.object({
  documentId: z.string(),
  itemId: z.string(),
  body: z.string().nullish(),
  reaction: z.enum(SHORTLIST_REACTIONS).nullish(),
  authorId: z.string(),
  createdAt: z.string(),
});

export const shortlistNoteResponseSchema = z.object({
  data: shortlistNoteSchema,
});

export const shortlistResponseSchema = z.object({
  data: shortlistSchema.omit({ access: true }).extend({
    access: z.enum(['owner', 'member']).optional(),
  }),
});

// --- Form input shapes ---

export const createShortlistSchema = z.object({
  name: z.string().trim().min(1, 'nameRequired').max(SHORTLIST_NAME_MAX, 'nameTooLong'),
});

export const inviteMemberSchema = z.object({
  email: z.string().trim().min(1, 'emailRequired').email('emailInvalid'),
  role: z.enum(MEMBER_ROLES),
});

export const addItemSchema = z.object({
  schoolId: z.string().trim().min(1, 'schoolRequired'),
  decisionStatus: z.enum(DECISION_STATUSES),
});

export const addNoteSchema = z
  .object({
    body: z.string().trim().max(SHORTLIST_NOTE_MAX, 'noteTooLong').optional().or(z.literal('')),
    reaction: z.enum(SHORTLIST_REACTIONS).optional(),
  })
  .refine((value) => Boolean(value.body?.trim()) || Boolean(value.reaction), {
    message: 'noteOrReactionRequired',
    path: ['body'],
  });
