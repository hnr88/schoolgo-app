'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { tourFormSchema, type TourFormValues } from '@/modules/school-tours-manage/schemas/tour-form.schema';
import { tourFormDefaults, type TourFormInput } from '@/modules/school-tours-manage/lib/tour-form-defaults';
import { useCreateTour } from '@/modules/school-tours-manage/queries/use-create-tour.mutation';
import { useUpdateTour } from '@/modules/school-tours-manage/queries/use-update-tour.mutation';
import type { ManagedTour, TourWritePayload } from '@/modules/school-tours-manage/types/school-tours-manage.types';

interface UseTourFormArgs {
  tour: ManagedTour | null;
  onClose: () => void;
}

export function useTourForm({ tour, onClose }: UseTourFormArgs) {
  const t = useTranslations('SchoolTours');
  const createTour = useCreateTour();
  const updateTour = useUpdateTour();

  const form = useForm<TourFormInput, unknown, TourFormValues>({
    resolver: zodResolver(tourFormSchema),
    defaultValues: tourFormDefaults(tour),
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    const payload: TourWritePayload = {
      title: values.title,
      startsAt: new Date(values.startsAt).toISOString(),
      location: values.location ? values.location : null,
      capacity: values.capacity,
      description: values.description ? values.description : null,
    };
    try {
      if (tour) {
        await updateTour.mutateAsync({ documentId: tour.documentId, payload });
      } else {
        await createTour.mutateAsync(payload);
      }
      toast.success(tour ? t('updateSuccess') : t('createSuccess'));
      form.reset();
      onClose();
    } catch (error) {
      const message = isAxiosError(error)
        ? (error.response?.data?.error?.message as string | undefined)
        : undefined;
      toast.error(message ?? (tour ? t('updateError') : t('createError')));
    }
  });

  return { form, handleSubmit, isPending: createTour.isPending || updateTour.isPending };
}
