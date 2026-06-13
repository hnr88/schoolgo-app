'use client';

import { useState } from 'react';
import { APPLICANT_FIT_PAGE_SIZE } from '@/modules/school-applicant-fit/constants/applicant-fit.constants';
import type {
  ApplicantFitQueryParams,
  FitSortField,
} from '@/modules/school-applicant-fit/types/applicant-fit.types';

export function useFitTriage() {
  const [params, setParams] = useState<ApplicantFitQueryParams>({
    sort: 'score',
    order: 'desc',
    page: 1,
    pageSize: APPLICANT_FIT_PAGE_SIZE,
  });

  const handleSort = (field: FitSortField) => {
    setParams((prev) =>
      prev.sort === field
        ? { ...prev, order: prev.order === 'desc' ? 'asc' : 'desc', page: 1 }
        : { ...prev, sort: field, order: 'desc', page: 1 },
    );
  };

  const handlePage = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  return { params, handleSort, handlePage };
}
