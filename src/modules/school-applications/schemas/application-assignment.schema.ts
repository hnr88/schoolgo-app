import { z } from 'zod';

export const schoolApplicationStatusSchema = z.enum([
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
]);

export const applicationAssignedStaffSchema = z.object({
  documentId: z.string(),
  roleTitle: z.string().nullable(),
  user: z
    .object({
      firstName: z.string().nullable(),
      lastName: z.string().nullable(),
    })
    .nullable(),
});

export const assignApplicationResultSchema = z.object({
  documentId: z.string(),
  assignedStaff: applicationAssignedStaffSchema.nullable(),
});

export const assignApplicationResponseSchema = z.object({
  data: assignApplicationResultSchema,
});

export const schoolApplicationListItemSchema = z.object({
  documentId: z.string(),
  status: schoolApplicationStatusSchema,
  targetYearLevel: z.string().nullable(),
  targetIntake: z.string().nullable(),
  boardingRequired: z.boolean(),
  submittedAt: z.string().nullable(),
  daysInStatus: z.number(),
  offerDeadline: z.string().nullable(),
  student: z
    .object({
      documentId: z.string(),
      name: z.string(),
      nationality: z.string().nullable(),
    })
    .nullable(),
  agent: z
    .object({
      documentId: z.string(),
      companyName: z.string().nullable(),
      name: z.string().nullable(),
      qeacNumber: z.string().nullable(),
    })
    .nullable(),
});

export const schoolApplicationListResponseSchema = z.object({
  data: z.array(schoolApplicationListItemSchema),
});
