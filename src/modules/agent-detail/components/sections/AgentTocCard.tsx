import { getTranslations } from 'next-intl/server';
import type {
  AgentDetailSections,
  AgentDetail,
} from '@/modules/agent-detail/types/agent-detail.types';

// Canonical render order. Each key is BOTH the i18n label key (AgentDetail.toc.<key>)
// and the in-page anchor id used by the matching section component (id === key).
const TOC_ORDER: (keyof AgentDetailSections)[] = [
  'credentials',
  'partnerSchools',
  'legalIdentity',
  'officeLocations',
  'contactChannels',
  'spokenLanguages',
  'services',
  'welfareCapabilities',
  'counsellors',
  'feeTransparency',
  'ethicsCommitments',
  'successMetrics',
  'responsiveness',
  'testimonials',
  'successStories',
  'experienceEntries',
  'professionalMemberships',
  'awards',
  'marketsServed',
  'destinations',
  'processSteps',
  'mediaItems',
  'pressItems',
  'faqs',
  'customSections',
];

function isPresent(value: AgentDetailSections[keyof AgentDetailSections]): boolean {
  if (value == null) return false;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

function visibleSectionKeys(sections: AgentDetailSections): (keyof AgentDetailSections)[] {
  return TOC_ORDER.filter((key) => isPresent(sections[key]));
}

export async function AgentTocCard({ agent }: { agent: AgentDetail }) {
  const keys = visibleSectionKeys(agent.sections);
  if (keys.length === 0) return null;

  const t = await getTranslations('AgentDetail.toc');

  return (
    <section
      aria-labelledby="agent-toc-heading"
      className="rounded-lg border border-border bg-card p-5 shadow-1"
    >
      <h2 id="agent-toc-heading" className="mb-5 text-xl font-semibold text-ink-900">
        {t('heading')}
      </h2>
      <nav aria-labelledby="agent-toc-heading">
        <ul className="space-y-2">
          {keys.map((key) => (
            <li key={key}>
              <a
                href={`#${key}`}
                className="block rounded-md border-l-2 border-transparent px-3 py-2 text-body-sm text-foggy transition-colors hover:border-primary hover:bg-rausch-50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
