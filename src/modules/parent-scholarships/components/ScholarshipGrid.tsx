'use client';

import { ScholarshipCard } from '@/modules/parent-scholarships/components/ScholarshipCard';
import type { Scholarship } from '@/modules/parent-scholarships/types/scholarship.types';

export function ScholarshipGrid({ scholarships }: { scholarships: Scholarship[] }) {
  return (
    <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
      {scholarships.map((scholarship) => (
        <ScholarshipCard key={scholarship.documentId} scholarship={scholarship} />
      ))}
    </div>
  );
}
