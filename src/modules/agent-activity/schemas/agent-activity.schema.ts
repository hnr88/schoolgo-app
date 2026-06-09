import { z } from 'zod';

const activitySchoolSchema = z.object({
  documentId: z.string(),
  name: z.string(),
});

const activityStudentSchema = z.object({
  documentId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

const activityApplicationSchema = z.object({
  documentId: z.string(),
  status: z.string(),
  school: activitySchoolSchema.nullish(),
  student: activityStudentSchema.nullish(),
});

export const agentActivityEventSchema = z.object({
  documentId: z.string(),
  eventType: z.string(),
  description: z.string(),
  actorRole: z.string().nullish(),
  createdAt: z.string(),
  iconHint: z.string(),
  application: activityApplicationSchema.nullish(),
});

export const agentActivityPaginationSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  total: z.number(),
});

export const agentActivityResponseSchema = z.object({
  data: z.array(agentActivityEventSchema),
  meta: z.object({
    pagination: agentActivityPaginationSchema,
  }),
});
