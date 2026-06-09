import type { z } from 'zod';
import type { tourFormSchema } from '@/modules/school-tours-manage/schemas/tour-form.schema';
import type { ManagedTour } from '@/modules/school-tours-manage/types/school-tours-manage.types';

export type TourFormInput = z.input<typeof tourFormSchema>;

export function toDateTimeLocalValue(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function tourFormDefaults(tour: ManagedTour | null): TourFormInput {
  if (!tour) {
    return { title: '', startsAt: '', location: '', capacity: 20, description: '' };
  }
  return {
    title: tour.title,
    startsAt: toDateTimeLocalValue(tour.startsAt),
    location: tour.location ?? '',
    capacity: tour.capacity,
    description: tour.description ?? '',
  };
}
