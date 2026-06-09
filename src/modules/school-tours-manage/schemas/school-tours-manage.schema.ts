import { z } from 'zod';

export const managedTourSchema = z.object({
  documentId: z.string(),
  title: z.string(),
  startsAt: z.string(),
  location: z.string().nullable(),
  capacity: z.number(),
  description: z.string().nullable(),
  bookingsCount: z.number(),
});

export const managedToursResponseSchema = z.object({
  data: z.array(managedTourSchema),
});

export const managedTourResponseSchema = z.object({
  data: managedTourSchema,
});

export const toursStaffMeSchema = z.object({
  documentId: z.string(),
  permissionLevel: z.enum(['admin', 'staff']),
  school: z.object({
    documentId: z.string(),
    name: z.string(),
  }),
});

export const toursStaffMeResponseSchema = z.object({
  data: toursStaffMeSchema,
});
