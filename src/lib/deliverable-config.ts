import { env } from '@/lib/env';

/**
 * Public-only deliverable switch. When enabled, the app + auth surfaces are
 * DEACTIVATED (not deleted): the protected dashboards and auth routes redirect
 * to the public landing, and login entry points are hidden from the marketing
 * nav. Flip `NEXT_PUBLIC_PUBLIC_ONLY` to reactivate the full app later.
 */
export const PUBLIC_ONLY = env.NEXT_PUBLIC_PUBLIC_ONLY === 'true';
