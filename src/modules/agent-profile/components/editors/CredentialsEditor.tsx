'use client';

import { useTranslations } from 'next-intl';
import { RepeatableSection } from '@/modules/agent-profile/components/RepeatableSection';
import { CredentialRowFields } from '@/modules/agent-profile/components/editors/CredentialRowFields';
import type { AgentCredentialItem } from '@/modules/agent-profile/types/agent-profile.types';
import type { RepeatableEditorProps } from '@/modules/agent-profile/types/editor.types';

function makeCredential(): AgentCredentialItem {
  return {
    credentialType: 'qeac',
    issuingBody: '',
    registrationNumber: '',
    holderName: '',
    issueDate: '',
    expiryDate: '',
    scope: '',
    verificationUrl: '',
    verificationStatus: 'unverified',
    badgeImage: null,
    order: 0,
  };
}

/**
 * Repeatable editor for `shared.agent-credential` items (Task 088) — the
 * highest-trust layer and AU differentiator. Holds every QEAC/MARA/ICEF/ITAC/NZ
 * credential incl. secondary holders, each independently checkable via
 * verificationUrl. Badge image uploads as a media relation.
 */
export function CredentialsEditor({
  items,
  onChange,
  disabled,
}: RepeatableEditorProps<AgentCredentialItem>) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <RepeatableSection<AgentCredentialItem>
      items={items}
      onChange={onChange}
      makeItem={makeCredential}
      disabled={disabled}
      labels={{
        addLabel: t('credentialAdd'),
        rowLabel: (index) => t('credentialRow', { number: index }),
        removeLabel: t('credentialRemove'),
        moveUpLabel: t('moveUp'),
        moveDownLabel: t('moveDown'),
        emptyLabel: t('credentialEmpty'),
      }}
      renderItem={({ item, index, setField }) => (
        <CredentialRowFields item={item} index={index} setField={setField} disabled={disabled} />
      )}
    />
  );
}
