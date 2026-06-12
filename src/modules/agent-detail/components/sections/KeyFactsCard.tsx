import { getTranslations } from 'next-intl/server';
import { BadgeCheck, Activity } from 'lucide-react';
import type { AgentDetail } from '@/modules/agent-detail/types/agent-detail.types';

interface KeyFactsCardProps {
  agent: AgentDetail;
}

type FactTone = 'verified' | 'platform' | 'plain';

interface Fact {
  key: string;
  label: string;
  value: string;
  tone: FactTone;
}

function buildLanguageValue(agent: AgentDetail): string | null {
  const langs = agent.sections.spokenLanguages
    ?.map((l) => l.language)
    .filter((l): l is string => Boolean(l));
  if (!langs || langs.length === 0) return null;
  return langs.join(', ');
}

export async function KeyFactsCard({ agent }: KeyFactsCardProps) {
  const t = await getTranslations('AgentDetail.keyFacts');

  const responsiveness = agent.sections.responsiveness;
  const yearEstablished = agent.sections.legalIdentity?.yearEstablished ?? null;
  const languageValue = buildLanguageValue(agent);

  const facts: Fact[] = [];
  if (agent.qeacNumber) {
    facts.push({
      key: 'qeac',
      label: t('qeacNumber'),
      value: agent.qeacNumber,
      tone: agent.qeacValidationStatus === 'verified' ? 'verified' : 'plain',
    });
  }
  if (agent.maraNumber) {
    facts.push({
      key: 'mara',
      label: t('maraNumber'),
      value: agent.maraNumber,
      tone: agent.maraValidationStatus === 'verified' ? 'verified' : 'plain',
    });
  }
  if (yearEstablished != null) {
    facts.push({
      key: 'established',
      label: t('yearEstablished'),
      value: t('establishedSince', { year: yearEstablished }),
      tone: 'plain',
    });
  }
  if (languageValue) {
    facts.push({ key: 'languages', label: t('languages'), value: languageValue, tone: 'plain' });
  }
  if (responsiveness?.medianResponseTimeHours != null) {
    facts.push({
      key: 'response',
      label: t('responseTime'),
      value: t('responseHours', { hours: responsiveness.medianResponseTimeHours }),
      tone: 'platform',
    });
  }

  if (facts.length === 0) return null;

  return (
    <section
      aria-labelledby="agent-key-facts-heading"
      className="rounded-lg border border-border bg-card p-5 shadow-2"
    >
      <h2 id="agent-key-facts-heading" className="mb-5 text-xl font-semibold text-ink-900">
        {t('heading')}
      </h2>
      <dl>
        {facts.map((fact) => (
          <div
            key={fact.key}
            className="flex items-start justify-between gap-4 border-b border-divider py-3 last:border-b-0"
          >
            <dt className="text-body-sm text-foggy">{fact.label}</dt>
            <dd className="flex max-w-[60%] flex-col items-end gap-1 text-right text-body-sm font-semibold text-ink-900">
              <span>{fact.value}</span>
              {fact.tone === 'verified' && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-babu-700">
                  <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
                  {t('verifiedLabel')}
                </span>
              )}
              {fact.tone === 'platform' && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-babu-700">
                  <Activity className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
                  {t('platformMeasuredLabel')}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
