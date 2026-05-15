import { getTranslations } from 'next-intl/server';
import { Eyebrow, Chip } from '@/modules/design-system';
import type { SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';

interface CoCurricularSectionProps {
  school: SchoolDetail;
}

export async function CoCurricularSection({ school }: CoCurricularSectionProps) {
  const programTypesRaw = school.programTypes;
  const activities = Array.isArray(programTypesRaw)
    ? programTypesRaw.filter((v): v is string => typeof v === 'string' && v.trim().length > 0)
    : [];

  if (activities.length === 0) return null;

  const t = await getTranslations('SchoolDetail.cocurricular');

  return (
    <section
      id="cocurricular"
      aria-labelledby="cocurricular-heading"
      className="rounded-lg border border-border bg-card p-6 shadow-1 md:p-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="cocurricular-heading" className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl">
        {t('heading')}
      </h2>
      <div className="mt-6 flex flex-wrap gap-2">
        {activities.map((activity, i) => (
          <Chip key={`${activity}-${i}`} variant="soft" size="sm" tabIndex={-1}>
            {activity}
          </Chip>
        ))}
      </div>
    </section>
  );
}
