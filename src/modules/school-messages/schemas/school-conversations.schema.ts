import { z } from 'zod';

// Mirrors the C-S9 response of GET /api/school-staffs/me/conversations exactly.
export const conversationSenderRoleSchema = z.enum(['agent', 'school_staff', 'parent']);

export const conversationStudentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

export const conversationLastMessageSchema = z.object({
  content: z.string(),
  senderRole: conversationSenderRoleSchema,
  createdAt: z.string(),
});

export const conversationRowSchema = z.object({
  applicationDocumentId: z.string(),
  student: conversationStudentSchema.nullable(),
  agentCompanyName: z.string().nullable(),
  lastMessage: conversationLastMessageSchema,
  unreadCount: z.number(),
});

export const conversationsMetaSchema = z.object({
  scannedMessages: z.number(),
  truncated: z.boolean(),
});

export const conversationsResponseSchema = z.object({
  data: z.array(conversationRowSchema),
  meta: conversationsMetaSchema,
});
