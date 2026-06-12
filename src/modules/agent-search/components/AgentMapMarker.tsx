'use client';

import { memo, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { Marker, Popup } from 'react-leaflet';
import { Link } from '@/i18n/navigation';
import type { Portal } from '@/lib/portal-url';
import {
  AGENT_MAP_ICON,
  getAgentCoords,
  getAgentKey,
} from '@/modules/agent-search/lib/agent-map-utils';
import { portalAgentProfilePath } from '@/modules/agent-search/lib/agent-paths';
import type { AgentHit } from '@/modules/agent-search/types/agent-search.types';

interface AgentMapMarkerProps {
  agent: AgentHit;
  activePortal: Portal;
}

function AgentMapMarkerComponent({ agent, activePortal }: AgentMapMarkerProps) {
  const t = useTranslations('AgentSearch.map');
  const coords = getAgentCoords(agent);
  const lat = coords?.lat ?? 0;
  const lng = coords?.lng ?? 0;
  const position = useMemo<[number, number]>(() => [lat, lng], [lat, lng]);
  const href = portalAgentProfilePath(activePortal, agent.slug ?? agent.documentId);

  return (
    <Marker position={position} icon={AGENT_MAP_ICON} title={agent.name} alt={agent.name}>
      <Popup
        className="schoolgo-map-popup schoolgo-map-popup--compact"
        closeButton={false}
        autoPan={false}
      >
        <Link
          href={href}
          className="group flex min-w-44 max-w-52 flex-col no-underline transition-colors"
        >
          <div className="flex flex-col gap-1 p-3 pb-2">
            <h3 className="line-clamp-2 text-body-sm font-semibold leading-snug text-ink-900">
              {agent.name}
            </h3>
            {agent.city && (
              <p className="text-caption leading-none text-foggy">{agent.city}</p>
            )}
            {agent.verified && (
              <span className="mt-0.5 inline-flex items-center gap-1 self-start rounded-pill bg-rausch-50 px-2 py-0.5 text-caption font-semibold leading-normal text-primary">
                <BadgeCheck className="h-3 w-3" strokeWidth={2.25} aria-hidden="true" />
                {t('popupVerified')}
              </span>
            )}
          </div>
          <div className="mx-3 border-t border-divider" />
          <div className="flex items-center justify-between px-3 py-2 transition-colors group-hover:bg-muted/60">
            <span className="text-caption font-semibold text-primary transition-colors group-hover:text-rausch-600">
              {t('popupViewAgent')}
            </span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rausch-50 text-primary transition-all group-hover:bg-primary group-hover:text-on-primary">
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </span>
          </div>
        </Link>
      </Popup>
    </Marker>
  );
}

export const AgentMapMarker = memo(
  AgentMapMarkerComponent,
  (prev, next) =>
    getAgentKey(prev.agent) === getAgentKey(next.agent) &&
    prev.agent.verified === next.agent.verified &&
    prev.activePortal === next.activePortal,
);
