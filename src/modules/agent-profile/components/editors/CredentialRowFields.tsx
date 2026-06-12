'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { RepeatableMediaField } from '@/modules/agent-profile/components/RepeatableMediaField';
import { EditorField } from '@/modules/agent-profile/components/editors/EditorField';
import { SelectField, TextField } from '@/modules/agent-profile/components/editors/EditorFields';
import {
  AGENT_CREDENTIAL_TYPES,
  AGENT_CREDENTIAL_VERIFICATION_STATUSES,
} from '@/modules/agent-profile/constants/credentials-offices.constants';
import type {
  AgentCredentialItem,
  AgentCredentialType,
  AgentCredentialVerificationStatus,
} from '@/modules/agent-profile/types/agent-profile.types';

interface CredentialRowFieldsProps {
  item: AgentCredentialItem;
  index: number;
  setField: <K extends keyof AgentCredentialItem>(key: K, value: AgentCredentialItem[K]) => void;
  disabled?: boolean;
}

/** Per-row fields for the CredentialsEditor — kept out of the editor shell so
 * each component stays within the line limit. */
export function CredentialRowFields({ item, index, setField, disabled }: CredentialRowFieldsProps) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
      <SelectField
        id={`credential-${index}-type`}
        label={t('credentialTypeLabel')}
        value={item.credentialType}
        onChange={(value) => setField('credentialType', value as AgentCredentialType)}
        placeholder={t('credentialTypePlaceholder')}
        options={AGENT_CREDENTIAL_TYPES}
        optionLabel={(option) => t(`credentialType_${option}`)}
        disabled={disabled}
      />
      <SelectField
        id={`credential-${index}-status`}
        label={t('credentialStatusLabel')}
        value={item.verificationStatus}
        onChange={(value) =>
          setField('verificationStatus', value as AgentCredentialVerificationStatus)
        }
        placeholder={t('credentialStatusPlaceholder')}
        options={AGENT_CREDENTIAL_VERIFICATION_STATUSES}
        optionLabel={(option) => t(`credentialStatus_${option}`)}
        disabled={disabled}
      />
      <TextField
        id={`credential-${index}-issuer`}
        label={t('credentialIssuingBodyLabel')}
        value={item.issuingBody}
        onChange={(value) => setField('issuingBody', value)}
        placeholder={t('credentialIssuingBodyPlaceholder')}
        disabled={disabled}
      />
      <TextField
        id={`credential-${index}-number`}
        label={t('credentialRegistrationNumberLabel')}
        value={item.registrationNumber}
        onChange={(value) => setField('registrationNumber', value)}
        disabled={disabled}
      />
      <TextField
        id={`credential-${index}-holder`}
        label={t('credentialHolderNameLabel')}
        value={item.holderName}
        onChange={(value) => setField('holderName', value)}
        disabled={disabled}
      />
      <TextField
        id={`credential-${index}-scope`}
        label={t('credentialScopeLabel')}
        value={item.scope}
        onChange={(value) => setField('scope', value)}
        placeholder={t('credentialScopePlaceholder')}
        disabled={disabled}
      />
      <EditorField label={t('credentialIssueDateLabel')}>
        <Input
          type='date'
          value={item.issueDate}
          disabled={disabled}
          onChange={(event) => setField('issueDate', event.target.value)}
        />
      </EditorField>
      <EditorField label={t('credentialExpiryDateLabel')}>
        <Input
          type='date'
          value={item.expiryDate}
          disabled={disabled}
          onChange={(event) => setField('expiryDate', event.target.value)}
        />
      </EditorField>
      <TextField
        id={`credential-${index}-url`}
        label={t('credentialVerificationUrlLabel')}
        value={item.verificationUrl}
        onChange={(value) => setField('verificationUrl', value)}
        type='url'
        placeholder={t('credentialVerificationUrlPlaceholder')}
        disabled={disabled}
      />
      <div className='sm:col-span-2'>
        <RepeatableMediaField
          label={t('credentialBadgeImageLabel')}
          value={item.badgeImage}
          onChange={(media) => setField('badgeImage', media)}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
