export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_HAS_UPPERCASE = /[A-Z]/;
export const PASSWORD_HAS_LOWERCASE = /[a-z]/;
export const PASSWORD_HAS_NUMBER = /[0-9]/;

export const PASSWORD_POLICY_RULES = [
  { id: 'length', labelKey: 'passwordPolicyLengthRule' },
  { id: 'uppercase', labelKey: 'passwordPolicyUppercaseRule' },
  { id: 'lowercase', labelKey: 'passwordPolicyLowercaseRule' },
  { id: 'number', labelKey: 'passwordPolicyNumberRule' },
] as const;
