import { asRecord, pickBool, pickStr } from '@/modules/agent-profile/lib/builder-hydrate-fields';
import type {
  AgentAvailabilityStatus,
  AgentComplianceValues,
  AgentFeeModel,
  AgentPublicProfilePreview,
} from '@/modules/agent-profile/types/agent-profile.types';

/**
 * Hydrates the ComplianceEditor's scalar slice from the read-side projection.
 * `feeTransparency` / `ethicsCommitments` / `responsiveness` are present only
 * when their visibility toggle is on; the always-exposed top-level scalars
 * (`availabilityStatus`, `handlesUnder18`) backfill when a block is hidden.
 */
export function hydrateComplianceValues(
  preview: AgentPublicProfilePreview,
): AgentComplianceValues {
  const fee = asRecord(preview.sections.feeTransparency);
  const ethics = asRecord(preview.sections.ethicsCommitments);
  const responsiveness = asRecord(preview.sections.responsiveness);

  const availability =
    pickStr(responsiveness, 'availabilityStatus') || (preview.availabilityStatus ?? '');

  return {
    feeModel: pickStr(fee, 'feeModel') as AgentFeeModel,
    feeTransparencyStatement: pickStr(fee, 'feeTransparencyStatement'),
    writtenAgreementOffered: pickBool(fee, 'writtenAgreementOffered'),
    noGuaranteeStatement: pickBool(ethics, 'noGuaranteeStatement'),
    agentCodeOfEthicsSigned: pickBool(ethics, 'agentCodeOfEthicsSigned'),
    protectsMinorsCommitment: pickBool(ethics, 'protectsMinorsCommitment'),
    handlesUnder18: pickBool(ethics, 'handlesUnder18') || preview.handlesUnder18,
    availabilityStatus: availability as AgentAvailabilityStatus,
  };
}
