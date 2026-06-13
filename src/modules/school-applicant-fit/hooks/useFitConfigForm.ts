'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  fitConfigFormSchema,
  type FitConfigFormValues,
} from '@/modules/school-applicant-fit/schemas/fit-config-form.schema';
import {
  configToFormValues,
  formValuesToConfig,
} from '@/modules/school-applicant-fit/lib/format-fit';
import { useUpdateFitConfig } from '@/modules/school-applicant-fit/queries/use-update-fit-config.mutation';
import type { ApplicantFitConfig } from '@/modules/school-applicant-fit/types/applicant-fit.types';

export function useFitConfigForm(config: ApplicantFitConfig, onSaved: () => void) {
  const mutation = useUpdateFitConfig();
  const form = useForm<FitConfigFormValues>({
    resolver: zodResolver(fitConfigFormSchema),
    defaultValues: configToFormValues(config.weights, config.thresholds),
  });

  // Re-seed the form whenever a freshly fetched/saved config arrives.
  useEffect(() => {
    form.reset(configToFormValues(config.weights, config.thresholds));
  }, [config, form]);

  const submit = form.handleSubmit((values: FitConfigFormValues) => {
    mutation.mutate(formValuesToConfig(values), { onSuccess: onSaved });
  });

  return { form, submit, isPending: mutation.isPending, isError: mutation.isError };
}
