import { isAxiosError } from 'axios';

export function isAgentShareConflict(error: unknown): boolean {
  return isAxiosError(error) && error.response?.status === 409;
}

export type AgentShareErrorKey =
  | 'errorConflict'
  | 'errorForbidden'
  | 'errorNotFound'
  | 'errorGeneric';

export function classifyAgentShareError(error: unknown): AgentShareErrorKey {
  const status = isAxiosError(error) ? error.response?.status : undefined;

  switch (status) {
    case 409:
      return 'errorConflict';
    case 403:
      return 'errorForbidden';
    case 404:
      return 'errorNotFound';
    default:
      return 'errorGeneric';
  }
}
