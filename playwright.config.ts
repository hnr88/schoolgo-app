import { defineConfig, devices } from '@playwright/test';
import { PARENT, AGENT, SCHOOL } from './tests/e2e/_shared/creds';

// 3-portal harness (parent / agent / school).
//
// PORT RECONCILIATION: the cross-cutting build decision mandates the frontend on
// :3001 and Strapi on :1338. The repo's schoolgo-api/.env.e2e still pins FE :3000 /
// API :1337, so all base URLs are env-driven and default to the live :3001 stack.
// Override globally via PLAYWRIGHT_BASE_URL (parent default origin) or per portal via
// PLAYWRIGHT_PARENT_URL / PLAYWRIGHT_AGENT_URL / PLAYWRIGHT_SCHOOL_URL (see
// tests/e2e/_shared/creds.ts). Never silently hardcode a port that contradicts the
// decision — if the running stack is on :3000/:1337 the operator overrides via env.

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  outputDir: 'test-results',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? PARENT.baseUrl,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off',
    locale: 'en-US',
    viewport: { width: 1440, height: 900 },
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*auth\.setup\.ts/,
    },
    {
      name: 'parent',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: PARENT.baseUrl,
        storageState: 'tests/e2e/.auth/parent.json',
      },
      dependencies: ['setup'],
      testMatch: /parent\/.*\.spec\.ts/,
    },
    {
      name: 'agent',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: AGENT.baseUrl,
        storageState: 'tests/e2e/.auth/agent.json',
      },
      dependencies: ['setup'],
      testMatch: /agent\/.*\.spec\.ts/,
    },
    {
      name: 'school',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: SCHOOL.baseUrl,
        storageState: 'tests/e2e/.auth/school.json',
      },
      dependencies: ['setup'],
      testMatch: /school\/.*\.spec\.ts/,
    },
  ],
});
