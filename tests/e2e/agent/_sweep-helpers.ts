import { expect, request as playwrightRequest } from '@playwright/test';
import type { APIRequestContext, Page } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { AGENT } from '../_shared/creds';

// Shared utilities for the agent-portal UI sweep (task 051). Every control is
// exercised under the agent storageState at desktop (1440) and mobile (375).
// DocumentIds are resolved at runtime from the agent's own data — never hardcoded.

const AUTH_FILE = path.resolve(__dirname, '../.auth/agent.json');

export const VIEWPORTS: { label: string; width: number; height: number }[] = [
  { label: 'desktop', width: 1440, height: 900 },
  { label: 'mobile', width: 375, height: 812 },
];

/** Read the live agent JWT out of the storageState written by auth.setup.ts. */
export function readAgentJwt(): string {
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

/** Authenticated APIRequestContext that talks to the live backend as the agent. */
export async function agentApi(): Promise<{ ctx: APIRequestContext; jwt: string }> {
  const jwt = readAgentJwt();
  const ctx = await playwrightRequest.newContext({
    baseURL: AGENT.baseUrl,
    extraHTTPHeaders: { Authorization: `Bearer ${jwt}` },
  });
  return { ctx, jwt };
}

interface DocRow {
  documentId?: string;
  status?: string;
}

/** First documentId from a list resource owned by the agent. */
export async function firstDocumentId(
  ctx: APIRequestContext,
  resource: 'students' | 'applications',
): Promise<string> {
  const res = await ctx.get(`/api/${resource}?pagination[pageSize]=1`, { timeout: 20_000 });
  expect(res.ok(), `GET /api/${resource} failed: ${res.status()}`).toBeTruthy();
  const body = (await res.json()) as { data?: DocRow[] };
  const documentId = body.data?.[0]?.documentId;
  expect(documentId, `no ${resource} documentId for agent`).toBeTruthy();
  return documentId as string;
}

/** documentId of the first application in one of the given statuses, or null. */
export async function applicationInStatus(
  ctx: APIRequestContext,
  statuses: string[],
): Promise<string | null> {
  const res = await ctx.get(
    `/api/applications?pagination[pageSize]=100&fields[0]=status`,
    { timeout: 20_000 },
  );
  expect(res.ok(), `GET /api/applications failed: ${res.status()}`).toBeTruthy();
  const body = (await res.json()) as { data?: DocRow[] };
  const match = (body.data ?? []).find((a) => a.status && statuses.includes(a.status));
  return match?.documentId ?? null;
}

/**
 * Attach a console.error / pageerror collector. Call before navigation; assert
 * with `assertNoConsoleErrors` before the test ends. Mirrors the parent helper.
 */
export function attachConsoleErrorWatcher(page: Page, allowlist: string[] = []): void {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    const text = msg.text();
    if (allowlist.some((p) => text.includes(p))) return;
    errors.push(`[console.error] ${text}`);
  });
  page.on('pageerror', (err) => {
    if (allowlist.some((p) => err.message.includes(p))) return;
    errors.push(`[pageerror] ${err.message}`);
  });
  (page as Page & { _consoleErrors?: string[] })._consoleErrors = errors;
}

export function assertNoConsoleErrors(page: Page): void {
  const errors = (page as Page & { _consoleErrors?: string[] })._consoleErrors ?? [];
  if (errors.length > 0) {
    throw new Error(`Unexpected browser errors on ${page.url()}:\n  ${errors.join('\n  ')}`);
  }
}

/** Wait for a hydrated, settled agent page. */
export async function settle(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(400);
}
