import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  shared: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  },
  server: {
    STRAPI_API_URL: z.string().url().optional(),
    STRAPI_JWT: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
    NEXT_PUBLIC_PARENT_URL: z.string().url().optional(),
    NEXT_PUBLIC_SCHOOL_URL: z.string().url().optional(),
    NEXT_PUBLIC_AGENT_URL: z.string().url().optional(),
    NEXT_PUBLIC_BASE_DOMAIN: z.string().min(1),
    NEXT_PUBLIC_LAUNCHING_SOON: z.string().optional(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    STRAPI_API_URL: process.env.STRAPI_API_URL,
    STRAPI_JWT: process.env.STRAPI_JWT,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_PARENT_URL: process.env.NEXT_PUBLIC_PARENT_URL,
    NEXT_PUBLIC_SCHOOL_URL: process.env.NEXT_PUBLIC_SCHOOL_URL,
    NEXT_PUBLIC_AGENT_URL: process.env.NEXT_PUBLIC_AGENT_URL,
    NEXT_PUBLIC_BASE_DOMAIN: process.env.NEXT_PUBLIC_BASE_DOMAIN,
    NEXT_PUBLIC_LAUNCHING_SOON: process.env.NEXT_PUBLIC_LAUNCHING_SOON,
  },
});
