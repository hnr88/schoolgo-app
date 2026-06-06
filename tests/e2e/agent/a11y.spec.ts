import { test, expect, request as playwrightRequest } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { AGENT } from '../_shared/creds';

/**
 * Accessibility sweep (WCAG 2.2 AA) across every agent-portal page from
 * GAP.master.portalPages.agent, at desktop (1440) + mobile (375). Runs axe-core
 * under the agent storageState (agent.localhost subdomain) and fails on any
 * serious/critical violation. Detail/edit routes use a real documentId resolved
 * at runtime from the agent's own students/applications (never hardcoded).
 */
const AUTH_FILE = path.resolve(__dirname, '../.auth/agent.json');

function readAgentJwt(): string {
  if (!existsSync(AUTH_FILE)) throw new Error(`agent storageState missing: ${AUTH_FILE}`);
  const raw = readFileSync(AUTH_FILE, 'utf8');
  const storageState = JSON.parse(raw) as {
    origins?: { localStorage?: { name: string; value: string }[] }[];
  };
  for (const origin of storageState.origins ?? []) {
    const entry = origin.localStorage?.find((item) => item.name === 'schoolgo-auth');
    if (!entry) continue;
    const persisted = JSON.parse(entry.value) as { state?: { jwt?: string } };
    const jwt = persisted.state?.jwt;
    if (typeof jwt === 'string' && jwt.length > 0) return jwt;
  }
  throw new Error('no schoolgo-auth jwt in agent storageState');
}

async function firstDocumentId(
  ctx: APIRequestContext,
  resource: 'students' | 'applications',
  jwt: string,
): Promise<string> {
  const res = await ctx.get(`${AGENT.baseUrl}/api/${resource}?pagination[pageSize]=1`, {
    headers: { Authorization: `Bearer ${jwt}` },
    timeout: 20_000,
  });
  expect(res.ok(), `GET /api/${resource} failed: ${res.status()}`).toBeTruthy();
  const body = (await res.json()) as { data?: { documentId?: string }[] };
  const documentId = body.data?.[0]?.documentId;
  expect(documentId, `no ${resource} documentId for agent`).toBeTruthy();
  return documentId as string;
}

interface AgentPage {
  readonly name: string;
  readonly path: string;
}

let PAGES: AgentPage[] = [];

test.beforeAll(async () => {
  const jwt = readAgentJwt();
  const ctx = await playwrightRequest.newContext();
  try {
    const studentId = await firstDocumentId(ctx, 'students', jwt);
    const applicationId = await firstDocumentId(ctx, 'applications', jwt);
    PAGES = [
      { name: 'dashboard', path: '/en/agent/dashboard' },
      { name: 'search', path: '/en/agent/dashboard/search' },
      { name: 'students-list', path: '/en/agent/dashboard/students' },
      { name: 'students-new', path: '/en/agent/dashboard/students/new' },
      { name: 'student-profile', path: `/en/agent/dashboard/students/${studentId}` },
      { name: 'student-edit', path: `/en/agent/dashboard/students/${studentId}/edit` },
      { name: 'applications-list', path: '/en/agent/dashboard/applications' },
      { name: 'application-detail', path: `/en/agent/dashboard/applications/${applicationId}` },
      { name: 'create-application', path: '/en/agent/dashboard/applications/new' },
      { name: 'pipeline', path: '/en/agent/dashboard/pipeline' },
      { name: 'profile', path: '/en/agent/dashboard/profile' },
    ];
  } finally {
    await ctx.dispose();
  }
});

const VIEWPORTS: { label: string; width: number; height: number }[] = [
  { label: 'desktop', width: 1440, height: 900 },
  { label: 'mobile', width: 375, height: 812 },
];

for (const vp of VIEWPORTS) {
  test(`a11y agent portal @ ${vp.label}`, async ({ page }) => {
    expect(PAGES.length, 'agent pages resolved').toBeGreaterThan(0);
    await page.setViewportSize({ width: vp.width, height: vp.height });

    const failures: string[] = [];
    const moderateMinor: string[] = [];

    for (const p of PAGES) {
      await page.goto(p.path, { waitUntil: 'networkidle', timeout: 45_000 });
      await page.waitForTimeout(1200);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();

      const serious = results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical',
      );
      const lesser = results.violations.filter(
        (v) => v.impact !== 'serious' && v.impact !== 'critical',
      );

      for (const v of lesser) {
        moderateMinor.push(`  [${v.impact}] ${p.name}: ${v.id} (${v.nodes.length})`);
      }
      if (serious.length > 0) {
        const summary = serious
          .map(
            (v) =>
              `  [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node(s))\n    e.g. ${v.nodes[0]?.target?.join(' ')}`,
          )
          .join('\n');
        failures.push(`${p.name} @ ${vp.label} — ${serious.length} serious/critical:\n${summary}`);
      }
    }

    if (moderateMinor.length > 0) {
      console.log(`\n[a11y] agent @ ${vp.label} moderate/minor (non-gating):\n${moderateMinor.join('\n')}`);
    }
    if (failures.length > 0) {
      console.error(`\n[a11y] agent @ ${vp.label} serious/critical:\n${failures.join('\n\n')}`);
    }
    expect(failures, `serious/critical a11y violations (agent @ ${vp.label})`).toEqual([]);
  });
}
