'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useAuthStore } from '@/modules/auth';
import { mapStoreToTypedRequest } from '@/modules/school-search/lib/store-to-typed-request';
import { useCreateSavedSearch } from '@/modules/school-search/queries/use-create-saved-search.mutation';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';
import {
  buildSaveSearchFormSchema,
  type SaveSearchFormValues,
} from '@/modules/school-search/schemas/save-search-form.schema';

interface UseSaveSearchFormArgs {
  onSaved: () => void;
}

export function useSaveSearchForm({ onSaved }: UseSaveSearchFormArgs) {
  const t = useTranslations('SchoolSearch.saveSearch');

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const createSavedSearch = useCreateSavedSearch();

  const query = useSchoolSearchStore((s) => s.query);
  const states = useSchoolSearchStore((s) => s.states);
  const suburb = useSchoolSearchStore((s) => s.suburb);
  const postcode = useSchoolSearchStore((s) => s.postcode);
  const feeMin = useSchoolSearchStore((s) => s.feeMin);
  const feeMax = useSchoolSearchStore((s) => s.feeMax);
  const sectors = useSchoolSearchStore((s) => s.sectors);
  const accommodation = useSchoolSearchStore((s) => s.accommodation);
  const religiousAffiliations = useSchoolSearchStore((s) => s.religiousAffiliations);
  const entryYearLevels = useSchoolSearchStore((s) => s.entryYearLevels);
  const studentAge = useSchoolSearchStore((s) => s.studentAge);
  const entryTerms = useSchoolSearchStore((s) => s.entryTerms);
  const programTypes = useSchoolSearchStore((s) => s.programTypes);
  const atarAvailable = useSchoolSearchStore((s) => s.atarAvailable);
  const englishLanguageSupport = useSchoolSearchStore((s) => s.englishLanguageSupport);
  const scholarshipAvailable = useSchoolSearchStore((s) => s.scholarshipAvailable);
  const englishTest = useSchoolSearchStore((s) => s.englishTest);
  const sortBy = useSchoolSearchStore((s) => s.sortBy);

  const schema = useMemo(
    () =>
      buildSaveSearchFormSchema({
        required: t('nameRequired'),
        tooLong: t('nameTooLong'),
      }),
    [t],
  );

  const form = useForm<SaveSearchFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: { name: '' },
  });

  const handleSubmit = form.handleSubmit((values) => {
    if (!isAuthenticated) {
      toast.error(t('signInRequired'));
      return;
    }

    const filterState = mapStoreToTypedRequest({
      query,
      states,
      suburb,
      postcode,
      feeMin,
      feeMax,
      sectors,
      accommodation,
      religiousAffiliations,
      entryYearLevels,
      studentAge,
      entryTerms,
      programTypes,
      atarAvailable,
      englishLanguageSupport,
      scholarshipAvailable,
      englishTest,
      sortBy,
    }, isAuthenticated);

    createSavedSearch.mutate(
      { name: values.name.trim(), filterState },
      {
        onSuccess: () => {
          toast.success(t('successToast'));
          form.reset({ name: '' });
          onSaved();
        },
        onError: () => {
          toast.error(t('errorToast'));
        },
      },
    );
  });

  return {
    form,
    handleSubmit,
    isSaving: createSavedSearch.isPending,
  };
}
