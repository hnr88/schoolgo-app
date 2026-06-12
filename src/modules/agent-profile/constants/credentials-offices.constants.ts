import type {
  AgentCredentialType,
  AgentCredentialVerificationStatus,
} from '@/modules/agent-profile/types/agent-profile.types';

/**
 * Enum option lists for the credentials (Task 088) and offices (Task 089)
 * editors. Values mirror the `shared.agent-credential` component enums in
 * AGENT-PROFILE-MODEL.json exactly; the FE renders each as a `<Select>` and the
 * BE replace-array `updateMe` persists the raw value. Labels resolve under the
 * `AgentProfileBuilder` namespace (e.g. `credentialType_qeac`).
 */

export const AGENT_CREDENTIAL_TYPES: readonly AgentCredentialType[] = [
  'qeac',
  'qeacs',
  'mara_omara',
  'icef_agency_status',
  'itac',
  'nz_adviser',
  'other',
] as const;

export const AGENT_CREDENTIAL_VERIFICATION_STATUSES: readonly AgentCredentialVerificationStatus[] = [
  'verified',
  'pending',
  'unverified',
] as const;
