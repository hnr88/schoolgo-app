export type AuthErrorKind =
  | 'rateLimited'
  | 'blocked'
  | 'emailTaken'
  | 'usernameTaken'
  | 'invalidCredentials'
  | 'generic';

export interface ClassifiedAuthError {
  kind: AuthErrorKind;
  messageKey: string;
  field?: 'email' | 'username';
}
