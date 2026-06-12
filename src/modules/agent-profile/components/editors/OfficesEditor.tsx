'use client';

import { useTranslations } from 'next-intl';
import { RepeatableSection } from '@/modules/agent-profile/components/RepeatableSection';
import { OfficeRowFields } from '@/modules/agent-profile/components/editors/OfficeRowFields';
import type { AgentOfficeLocationItem } from '@/modules/agent-profile/types/agent-profile.types';
import type { RepeatableEditorProps } from '@/modules/agent-profile/types/editor.types';

function makeOffice(): AgentOfficeLocationItem {
  return {
    label: '',
    streetAddress: '',
    suburb: '',
    city: '',
    state: '',
    country: '',
    regionGrouping: '',
    phone: '',
    email: '',
    openingHours: '',
    timezone: '',
    isHeadOffice: false,
    inPersonConsultation: false,
    latitude: '',
    longitude: '',
    order: 0,
  };
}

/**
 * Repeatable editor for `shared.office-location` items (Task 089) — the agent's
 * physical footprint. Includes geo coordinates (latitude/longitude) that power
 * map/proximity search, plus head-office and in-person-consultation flags.
 */
export function OfficesEditor({
  items,
  onChange,
  disabled,
}: RepeatableEditorProps<AgentOfficeLocationItem>) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <RepeatableSection<AgentOfficeLocationItem>
      items={items}
      onChange={onChange}
      makeItem={makeOffice}
      disabled={disabled}
      labels={{
        addLabel: t('officeAdd'),
        rowLabel: (index) => t('officeRow', { number: index }),
        removeLabel: t('officeRemove'),
        moveUpLabel: t('moveUp'),
        moveDownLabel: t('moveDown'),
        emptyLabel: t('officeEmpty'),
      }}
      renderItem={({ item, index, setField }) => (
        <OfficeRowFields item={item} index={index} setField={setField} disabled={disabled} />
      )}
    />
  );
}
