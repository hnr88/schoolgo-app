import { getTranslations } from 'next-intl/server';
import { Eyebrow } from '@/modules/design-system';
import { byOrder } from '@/modules/agent-detail/lib/agent-detail-sections';
import type { ExperienceEntry } from '@/modules/agent-detail/types/agent-detail.types';

function formatMonthYear(value?: string | null): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-AU', { month: 'short', year: 'numeric' }).format(date);
}

export async function ExperienceSection({ entries }: { entries?: ExperienceEntry[] | null }) {
  const items = (entries ?? []).filter((e) => e.roleTitle || e.organisation).sort(byOrder);
  if (items.length === 0) return null;

  const t = await getTranslations('AgentDetail.experience');

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="rounded-lg border border-border bg-card py-10 px-6 shadow-1 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="experience-heading" className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl">
        {t('heading')}
      </h2>

      <ol className="mt-6 space-y-6 border-l border-divider pl-6">
        {items.map((entry, i) => {
          const start = formatMonthYear(entry.startDate);
          const end = formatMonthYear(entry.endDate) ?? t('present');
          const range = start ? `${start} – ${end}` : null;
          return (
            <li key={i} className="relative">
              <span
                className="absolute -left-6 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-card bg-babu-500"
                aria-hidden="true"
              />
              <p className="text-body-sm font-semibold text-ink-900">{entry.roleTitle}</p>
              {entry.organisation ? (
                <p className="text-body-sm text-foggy">
                  {entry.organisation}
                  {entry.location ? ` · ${entry.location}` : ''}
                </p>
              ) : null}
              {range ? <p className="mt-0.5 text-caption uppercase text-foggy">{range}</p> : null}
              {entry.description ? (
                <p className="mt-2 text-body-sm leading-relaxed text-foggy">{entry.description}</p>
              ) : null}
              {entry.studentCohortFocus ? (
                <p className="mt-2 text-body-sm text-foggy">
                  <span className="font-semibold text-ink-900">{t('cohortFocus')}:</span>{' '}
                  {entry.studentCohortFocus}
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
