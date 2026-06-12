import { getTranslations } from 'next-intl/server';
import { Building2 } from 'lucide-react';
import { Eyebrow } from '@/modules/design-system';
import type { AgentDetail, LegalIdentitySection } from '@/modules/agent-detail/types/agent-detail.types';

interface AgentAboutSectionProps {
  agent: AgentDetail;
}

function resolveName(agent: AgentDetail): string {
  return agent.displayName || agent.tradingName || agent.companyName || agent.contactName;
}

function paragraphsOf(text: string | null): string[] {
  if (!text) return [];
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function identityFacts(
  identity: LegalIdentitySection,
  t: Awaited<ReturnType<typeof getTranslations>>,
): { key: string; label: string; value: string }[] {
  const facts: { key: string; label: string; value: string }[] = [];
  if (identity.legalEntityName)
    facts.push({ key: 'entity', label: t('legalEntity'), value: identity.legalEntityName });
  if (identity.tradingName)
    facts.push({ key: 'trading', label: t('tradingName'), value: identity.tradingName });
  if (identity.directorName)
    facts.push({ key: 'director', label: t('director'), value: identity.directorName });
  if (identity.businessRegistration)
    facts.push({ key: 'registration', label: t('registration'), value: identity.businessRegistration });
  if (identity.countryOfRegistration)
    facts.push({ key: 'country', label: t('registeredIn'), value: identity.countryOfRegistration });
  return facts;
}

export async function AgentAboutSection({ agent }: AgentAboutSectionProps) {
  const summary = paragraphsOf(agent.publicSummary);
  const bio = summary.length > 0 ? [] : paragraphsOf(agent.bio);
  const paragraphs = [...summary, ...bio];
  const identity = agent.sections.legalIdentity;
  const facts = identity ? identityFacts(identity, await getTranslations('AgentDetail.about')) : [];

  if (paragraphs.length === 0 && facts.length === 0) return null;

  const t = await getTranslations('AgentDetail.about');
  const name = resolveName(agent);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="rounded-lg border border-border bg-card px-6 py-10 shadow-1 md:px-8 md:py-14"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="about-heading" className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl">
        {t('heading', { name })}
      </h2>

      {paragraphs.length > 0 && (
        <div className="mt-6 max-w-3xl space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-body leading-relaxed text-foggy">
              {p}
            </p>
          ))}
        </div>
      )}

      {facts.length > 0 && (
        <dl className="mt-8 grid gap-4 rounded-lg border border-divider bg-muted p-5 sm:grid-cols-2">
          {facts.map((fact) => (
            <div key={fact.key} className="flex items-start gap-2">
              <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-foggy" aria-hidden="true" />
              <div className="min-w-0">
                <dt className="text-caption font-semibold uppercase text-foggy">{fact.label}</dt>
                <dd className="mt-0.5 text-body-sm font-medium text-ink-900">{fact.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
