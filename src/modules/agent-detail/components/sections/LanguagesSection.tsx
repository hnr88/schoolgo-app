import { getTranslations } from 'next-intl/server';
import { Languages, MessageSquareText } from 'lucide-react';
import { Eyebrow } from '@/modules/design-system';
import { sortByOrder } from '@/modules/agent-detail/lib/section-utils';
import type { SpokenLanguage } from '@/modules/agent-detail/types/agent-detail.types';

const PROFICIENCY_KEYS = ['native', 'fluent', 'professional', 'conversational'] as const;
type ProficiencyKey = (typeof PROFICIENCY_KEYS)[number];

function isProficiencyKey(value: string | null | undefined): value is ProficiencyKey {
  return value != null && (PROFICIENCY_KEYS as readonly string[]).includes(value);
}

interface LanguagesSectionProps {
  languages?: SpokenLanguage[];
}

export async function LanguagesSection({ languages }: LanguagesSectionProps) {
  const items = Array.isArray(languages)
    ? sortByOrder(languages).filter((l) => Boolean(l.language?.trim()))
    : [];
  if (items.length === 0) return null;

  const t = await getTranslations('AgentDetail.languages');

  return (
    <section
      id="languages"
      aria-labelledby="languages-heading"
      className="rounded-lg border border-border bg-card py-10 px-6 shadow-1 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="languages-heading" className="mt-2 flex items-center gap-2 text-2xl font-bold text-ink-900 md:text-3xl">
        <Languages className="h-6 w-6 text-primary" aria-hidden="true" />
        {t('heading')}
      </h2>
      <p className="mt-2 text-body-sm text-foggy">{t('subheading')}</p>

      <ul className="mt-6 flex flex-wrap gap-3">
        {items.map((lang, i) => {
          const proficiency = isProficiencyKey(lang.proficiency)
            ? t(`proficiency.${lang.proficiency}`)
            : null;
          return (
            <li
              key={`${lang.language}-${i}`}
              className="flex items-center gap-2 rounded-pill border border-divider bg-muted px-3.5 py-2"
            >
              <span className="text-body-sm font-semibold text-ink-900">{lang.language}</span>
              {proficiency ? (
                <span className="text-caption font-medium text-foggy">{proficiency}</span>
              ) : null}
              {lang.canCounselInThisLanguage ? (
                <span
                  className="inline-flex items-center gap-1 rounded-pill bg-babu-50 px-2 py-0.5 text-caption font-semibold text-babu-700"
                  title={t('canCounsel')}
                >
                  <MessageSquareText className="h-3 w-3" aria-hidden="true" />
                  {t('canCounsel')}
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
