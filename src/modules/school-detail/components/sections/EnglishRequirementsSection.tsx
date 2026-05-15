import { getTranslations } from 'next-intl/server';
import { Eyebrow, StatusBadge } from '@/modules/design-system';
import type { SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';

export async function EnglishRequirementsSection({ school }: { school: SchoolDetail }) {
  const t = await getTranslations('SchoolDetail.english');

  const scoreRows: { label: string; value: number | string | null }[] = [
    { label: 'AEAS', value: school.aeasMinScore },
    { label: 'iDAT', value: school.idatMinScore },
    { label: 'Duolingo', value: school.duolingoMinScore },
    { label: 'IELTS', value: school.ieltsMinScore },
    { label: 'PTE', value: school.pteMinScore },
    { label: 'Cambridge', value: school.cambridgeMinScore },
  ].filter((r) => r.value != null);

  return (
    <section
      id="english"
      aria-labelledby="english-heading"
      className="rounded-lg border border-border bg-card p-6 shadow-1 md:p-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="english-heading" className="text-2xl font-bold text-ink-900 mt-2 md:text-3xl">
        {t('heading')}
      </h2>
      <p className="mt-4 text-body-sm text-foggy max-w-3xl">{t('intro')}</p>

      {scoreRows.length > 0 ? (
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          {scoreRows.map((row) => (
            <StatusBadge
              key={row.label}
              tone="muted"
              size="md"
              className="justify-between rounded-lg px-3 py-2"
            >
              <span>{row.label}</span>
              <span className="font-bold text-ink-900">{String(row.value)}</span>
            </StatusBadge>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-body-sm text-foggy">{t('noScores')}</p>
      )}
    </section>
  );
}
