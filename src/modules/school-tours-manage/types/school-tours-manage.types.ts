import type { z } from 'zod';
import type {
  managedTourResponseSchema,
  managedTourSchema,
  managedToursResponseSchema,
  toursStaffMeResponseSchema,
  toursStaffMeSchema,
} from '@/modules/school-tours-manage/schemas/school-tours-manage.schema';

export type ManagedTour = z.infer<typeof managedTourSchema>;

export type ManagedToursResponse = z.infer<typeof managedToursResponseSchema>;

export type ManagedTourResponse = z.infer<typeof managedTourResponseSchema>;

export interface TourWritePayload {
  title: string;
  startsAt: string;
  location: string | null;
  capacity: number;
  description: string | null;
}

export type ToursStaffMe = z.infer<typeof toursStaffMeSchema>;

export type ToursStaffMeResponse = z.infer<typeof toursStaffMeResponseSchema>;
