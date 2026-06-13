import { asRecord, pickBool, pickStr } from '@/modules/agent-profile/lib/builder-hydrate-fields';
import type {
  AgentAvailabilityStatus,
  AgentComplianceValues,
  AgentFeeModel,
  AgentPublicProfilePreview,
} from '@/modules/agent-profile/types/agent-profile.types';

/**
 * Hydrates the ComplianceEditor's scalar slice from the ungated `editorSections`
 * so the editor loads saved fee/ethics/responsiveness data regardless of each
 * block's visibility toggle. The always-exposed top-level scalars
 * (`availabilityStatus`, `handlesUnder18`) still backfill when a block is absent.
 */
export function hydrateComplianceValues(
  preview: AgentPublicProfilePreview,
): AgentComplianceValues {
  const fee = asRecord(preview.editorSections.feeTransparency);
  const ethics = asRecord(preview.editorSections.ethicsCommitments);
  const responsiveness = asRecord(preview.editorSections.responsiveness);

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
