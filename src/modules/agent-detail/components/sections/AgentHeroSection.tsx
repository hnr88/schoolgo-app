import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { MapPin } from 'lucide-react';
import { Eyebrow, SectionContainer } from '@/modules/design-system';
import { DefaultPhoto } from '@/modules/design-system/components/DefaultPhoto';
import { mediaUrl } from '@/modules/agent-detail/lib/agent-detail-api';
import { TrustBadges } from '@/modules/agent-detail/components/sections/TrustBadges';
import type { AgentDetail } from '@/modules/agent-detail/types/agent-detail.types';

interface AgentHeroSectionProps {
  agent: AgentDetail;
}

function resolveName(agent: AgentDetail): string {
  return agent.displayName || agent.tradingName || agent.companyName || agent.contactName;
}

export async function AgentHeroSection({ agent }: AgentHeroSectionProps) {
  const t = await getTranslations('AgentDetail.hero');

  const name = resolveName(agent);
  const subtitle = agent.headline || agent.tagline || agent.publicSummary;
  const cover = mediaUrl(agent.coverPhotoUrl);
  const photo = mediaUrl(agent.photoUrl);
  const availabilityLabel =
    agent.availabilityStatus && t.has(`availability.${agent.availabilityStatus}`)
      ? t(`availability.${agent.availabilityStatus}`)
      : null;

  return (
    <section className="relative overflow-hidden border-b border-divider bg-ink-900 pt-28 text-background md:pt-40">
      {cover && (
        <>
          <div className="absolute inset-0 opacity-35" aria-hidden="true">
            <Image src={cover} alt="" fill sizes="100vw" className="object-cover" priority />
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/88 to-ink-900/40"
            aria-hidden="true"
          />
        </>
      )}

      <SectionContainer size="wide" className="relative py-8 md:py-12 lg:py-16">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="max-w-4xl">
            <div className="mb-5 flex items-center gap-4">
              <div className="relative flex h-20 w-20 shrink-0 overflow-hidden rounded-full bg-muted">
                {photo ? (
                  <Image
                    src={photo}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                    aria-hidden="true"
                  />
                ) : (
                  <DefaultPhoto name={name} />
                )}
              </div>
              <Eyebrow tone="trust" className="text-babu-100">
                {t('verifiedAgentEyebrow')}
              </Eyebrow>
            </div>

            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-background md:text-6xl">
              {name}
            </h1>

            {subtitle && (
              <p className="mt-5 max-w-2xl text-lg text-background/80">{subtitle}</p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-4">
              {agent.countryOfOperation && (
                <span className="inline-flex items-center gap-2 text-body-sm text-background/80">
                  <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {t('countryLabel', { country: agent.countryOfOperation })}
                </span>
              )}
              {availabilityLabel && (
                <span className="inline-flex items-center gap-1.5 rounded-pill bg-background/10 px-3 py-1 text-body-sm font-medium text-background/90">
                  {availabilityLabel}
                </span>
              )}
            </div>

            <div className="mt-6">
              <TrustBadges agent={agent} />
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
