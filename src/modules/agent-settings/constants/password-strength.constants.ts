import type {
  PasswordRuleState,
  PasswordStrengthLevel,
} from '@/modules/auth/lib/password-strength';

type AgentPasswordRuleId = keyof PasswordRuleState;

type AgentPasswordRuleLabelKey =
  | 'passwordReqLength'
  | 'passwordReqUppercase'
  | 'passwordReqLowercase'
  | 'passwordReqNumber';

export const AGENT_PASSWORD_RULES: ReadonlyArray<{
  id: AgentPasswordRuleId;
  labelKey: AgentPasswordRuleLabelKey;
}> = [
  { id: 'length', labelKey: 'passwordReqLength' },
  { id: 'uppercase', labelKey: 'passwordReqUppercase' },
  { id: 'lowercase', labelKey: 'passwordReqLowercase' },
  { id: 'number', labelKey: 'passwordReqNumber' },
];

export const PASSWORD_STRENGTH_SEGMENTS = 4;

export const PASSWORD_STRENGTH_LABEL_KEY: Record<
  PasswordStrengthLevel,
  'passwordStrength_0' | 'passwordStrength_1' | 'passwordStrength_2' | 'passwordStrength_3' | 'passwordStrength_4'
> = {
  0: 'passwordStrength_0',
  1: 'passwordStrength_1',
  2: 'passwordStrength_2',
  3: 'passwordStrength_3',
  4: 'passwordStrength_4',
};

export const PASSWORD_STRENGTH_BAR_CLASS: Record<PasswordStrengthLevel, string> = {
  0: 'bg-destructive',
  1: 'bg-destructive',
  2: 'bg-vivid-amber',
  3: 'bg-babu-500',
  4: 'bg-vivid-mint',
};

export const PASSWORD_STRENGTH_TEXT_CLASS: Record<PasswordStrengthLevel, string> = {
  0: 'text-destructive',
  1: 'text-destructive',
  2: 'text-vivid-amber',
  3: 'text-babu-600',
  4: 'text-vivid-mint',
};
