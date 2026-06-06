// Centralized seeded per-role credentials and portal base URLs for the
// 3-portal Playwright harness (parent / agent / school).
//
// PORT RECONCILIATION: the cross-cutting build decision mandates the frontend
// on :3001 and Strapi on :1338. The repo's schoolgo-api/.env.e2e still pins the
// FE to :3000 / API :1337, so base URLs are env-driven (override per portal via
// PLAYWRIGHT_PARENT_URL / PLAYWRIGHT_AGENT_URL / PLAYWRIGHT_SCHOOL_URL, or set
// PLAYWRIGHT_BASE_HOST/PLAYWRIGHT_BASE_PORT). Defaults target the live stack on
// :3001 — never silently hardcode a port that contradicts the decision.
//
// Credentials are the seeded e2e logins sourced from STACK.json test_credentials
// and verified against the live up_users table (agent@/parent@/school@schoolgo.test,
// password Test1234!). They are NOT invented here.

const BASE_HOST = process.env.PLAYWRIGHT_BASE_HOST ?? 'localhost';
const BASE_PORT = process.env.PLAYWRIGHT_BASE_PORT ?? '3001';

function portalBaseUrl(subdomain: string | null, override: string | undefined): string {
  if (override) return override;
  const host = subdomain ? `${subdomain}.${BASE_HOST}` : BASE_HOST;
  return `http://${host}:${BASE_PORT}`;
}

export interface PortalCreds {
  readonly email: string;
  readonly password: string;
  readonly baseUrl: string;
}

const SEEDED_PASSWORD = 'Test1234!';

export const PARENT: PortalCreds = {
  email: 'parent@schoolgo.test',
  password: SEEDED_PASSWORD,
  baseUrl: portalBaseUrl(null, process.env.PLAYWRIGHT_PARENT_URL),
};

export const AGENT: PortalCreds = {
  email: 'agent@schoolgo.test',
  password: SEEDED_PASSWORD,
  baseUrl: portalBaseUrl('agent', process.env.PLAYWRIGHT_AGENT_URL),
};

export const SCHOOL: PortalCreds = {
  email: 'school@schoolgo.test',
  password: SEEDED_PASSWORD,
  baseUrl: portalBaseUrl('school', process.env.PLAYWRIGHT_SCHOOL_URL),
};
