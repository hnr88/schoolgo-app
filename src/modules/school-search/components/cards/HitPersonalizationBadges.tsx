'use client';

import { ApplicationStatusBadge } from '@/modules/applications';
import { SavedBadge } from '@/modules/school-search/components/cards/SavedBadge';
import { asApplicationStatus } from '@/modules/school-search/lib/school-hit-guards';
import type { SchoolHit } from '@/modules/school-search/types/search-api.types';

export function HitPersonalizationBadges({ school }: { school: SchoolHit }) {
  const status = asApplicationStatus(school.myApplicationStatus);
  const isSaved = school.isBookmarked === true;

  if (!isSaved && !status) return null;

  return (
    <div className='flex flex-wrap items-center gap-1.5'>
      {isSaved && <SavedBadge />}
      {status && <ApplicationStatusBadge status={status} />}
    </div>
  );
}
