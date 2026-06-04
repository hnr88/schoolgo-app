import { SchoolCard } from '@/modules/design-system';
import type { ComparisonSchoolCardsProps } from '@/modules/parents-landing/types/parents-comparison.types';

export function ComparisonSchoolCards({ schools, tc }: ComparisonSchoolCardsProps) {
  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {schools.map((s) => (
        <SchoolCard
          key={s.slug}
          href={`/parent/schools/${s.slug}`}
          logoUrl={s.logoUrl ?? undefined}
          name={s.name}
          location={`${s.suburb}, ${s.state}`}
          cricosLabel={tc('cricosVerified')}
          className='transition-transform hover:-translate-y-1'
        />
      ))}
    </div>
  );
}
