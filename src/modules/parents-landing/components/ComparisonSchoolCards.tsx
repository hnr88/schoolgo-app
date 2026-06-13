import { SchoolCard } from '@/modules/design-system';
import { parseFeeAud, formatFeeAud } from '@/lib/schools/format-fee';
import type { ComparisonSchoolCardsProps } from '@/modules/parents-landing/types/parents-comparison.types';

export function ComparisonSchoolCards({ schools, tc }: ComparisonSchoolCardsProps) {
  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {schools.map((s) => (
        <SchoolCard
          key={s.slug}
          href={`/parent/schools/${s.slug}`}
          photoUrl={s.photoUrl ?? undefined}
          logoUrl={s.logoUrl ?? undefined}
          name={s.name}
          location={`${s.suburb}, ${s.state}`}
          fee={formatFeeAud(parseFeeAud(s.annualFeeAud), true) ?? undefined}
          cricosLabel={tc('cricosVerified')}
        />
      ))}
    </div>
  );
}
