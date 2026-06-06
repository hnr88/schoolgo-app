import type { z } from 'zod';
import type { issueMagicLinkInputSchema } from '@/modules/test-results/schemas/issue-magic-link.schema';

export type IssueMagicLinkInput = z.infer<typeof issueMagicLinkInputSchema>;

export interface IssueMagicLinkResult {
  message: string;
  email: string;
  expiresAt: string;
}

export type IssueMagicLinkErrorKind =
  | 'validation'
  | 'unauthorized'
  | 'forbidden'
  | 'notFound'
  | 'rateLimited'
  | 'unknown';

export interface IssueMagicLinkError {
  kind: IssueMagicLinkErrorKind;
  message: string;
}
