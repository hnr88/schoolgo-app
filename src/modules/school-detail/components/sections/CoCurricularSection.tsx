import { getTranslations } from 'next-intl/server';
import { Eyebrow, Chip } from '@/modules/design-system';
import type { SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';

interface CoCurricularSectionProps {
  school: SchoolDetail;
}

export async function CoCurricularSection({ school }: CoCurricularSectionProps) {
  const t = await getTranslations('SchoolDetail.cocurricular');

  const programTypesRaw = school.programTypes;
  const activities = Array.isArray(programTypesRaw)
    ? programTypesRaw.filter((v): v is string => typeof v === 'string')
    : t('defaultActivities')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

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
      <p className="mt-4 max-w-3xl text-body text-foggy">{t('intro')}</p>

      {activities.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {activities.map((activity, i) => (
            <Chip key={`${activity}-${i}`} variant="soft" size="sm" tabIndex={-1}>
              {activity}
            </Chip>
          ))}
        </div>
      )}
    </section>
  );
}
