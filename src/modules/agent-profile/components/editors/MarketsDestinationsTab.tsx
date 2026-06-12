'use client';

import { useTranslations } from 'next-intl';
import { RepeatableEditorTab } from '@/modules/agent-profile/components/editors/RepeatableEditorTab';
import {
  DESTINATIONS_SECTION,
  MARKETS_SECTION,
} from '@/modules/agent-profile/constants/builder-registry.constants';

interface MarketsDestinationsTabProps {
  marketsRaw: unknown;
  destinationsRaw: unknown;
}

/**
 * The `marketsAndDestinations` tab hosts two repeatable editors — source markets
 * served and study destinations — each with its own draft + Save.
 */
export function MarketsDestinationsTab({
  marketsRaw,
  destinationsRaw,
}: MarketsDestinationsTabProps) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <div className='flex flex-col gap-8'>
      <section className='flex flex-col gap-4'>
        <h3 className='text-base font-semibold text-foreground'>{t('marketsHeading')}</h3>
        <RepeatableEditorTab entry={MARKETS_SECTION} raw={marketsRaw} />
      </section>
      <section className='flex flex-col gap-4'>
        <h3 className='text-base font-semibold text-foreground'>{t('destinationsHeading')}</h3>
        <RepeatableEditorTab entry={DESTINATIONS_SECTION} raw={destinationsRaw} />
      </section>
    </div>
  );
}
