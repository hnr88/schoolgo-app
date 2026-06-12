'use client';

import { useTranslations } from 'next-intl';
import { Textarea } from '@/components/ui/textarea';
import { EditorField } from '@/modules/agent-profile/components/editors/EditorField';
import { EditorSelect } from '@/modules/agent-profile/components/editors/EditorSelect';
import { ToggleField } from '@/modules/agent-profile/components/editors/ToggleField';
import {
  AGENT_AVAILABILITY_STATUSES,
  AGENT_COMPLIANCE_FLAGS,
  AGENT_FEE_MODELS,
} from '@/modules/agent-profile/constants/agent-builder.constants';
import type {
  AgentAvailabilityStatus,
  AgentComplianceEditorProps,
  AgentComplianceValues,
  AgentFeeModel,
} from '@/modules/agent-profile/types/agent-profile.types';

/**
 * Scalar editor for the agent's fee / ethics / availability commitments — the
 * highest-trust, AU-integrity disclosure block (feeModel, fee transparency
 * statement, written-agreement / no-guarantee / code-of-ethics / protects-minors
 * / handles-under-18 flags, availability). Controlled: emits a partial patch the
 * builder merges and persists via `updateMe`.
 */
export function ComplianceEditor({ values, onChange, disabled }: AgentComplianceEditorProps) {
  const t = useTranslations('AgentProfileBuilder');

  return (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
        <EditorField label={t('feeModelLabel')}>
          <EditorSelect
            value={values.feeModel}
            options={AGENT_FEE_MODELS}
            disabled={disabled}
            optionLabel={(option) => t(`feeModel_${option}`)}
            onValueChange={(value) => onChange({ feeModel: value as AgentFeeModel })}
          />
        </EditorField>
        <EditorField label={t('availabilityStatusLabel')}>
          <EditorSelect
            value={values.availabilityStatus}
            options={AGENT_AVAILABILITY_STATUSES}
            disabled={disabled}
            optionLabel={(option) => t(`availabilityStatus_${option}`)}
            onValueChange={(value) =>
              onChange({ availabilityStatus: value as AgentAvailabilityStatus })
            }
          />
        </EditorField>
      </div>

      <EditorField label={t('feeTransparencyLabel')}>
        <Textarea
          rows={4}
          value={values.feeTransparencyStatement}
          disabled={disabled}
          placeholder={t('feeTransparencyPlaceholder')}
          onChange={(e) => onChange({ feeTransparencyStatement: e.target.value })}
        />
      </EditorField>

      <div className='flex flex-col gap-3'>
        {AGENT_COMPLIANCE_FLAGS.map(({ key, labelKey, descriptionKey }) => (
          <div key={key} className='flex flex-col gap-1'>
            <ToggleField
              label={t(labelKey)}
              checked={values[key]}
              disabled={disabled}
              onCheckedChange={(checked) =>
                onChange({ [key]: checked } as Partial<AgentComplianceValues>)
              }
            />
            <p className='pl-7 text-xs text-muted-foreground'>{t(descriptionKey)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
