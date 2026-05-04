import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function loadEnvLocal() {
  try {
    const content = readFileSync(resolve(import.meta.dirname ?? '.', '..', '.env.local'), 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx);
      const val = trimmed.slice(eqIdx + 1);
      if (!process.env[key]) process.env[key] = val;
    }
  } catch { /* .env.local not found */ }
}

function loadApiEnv() {
  try {
    const content = readFileSync(resolve(import.meta.dirname ?? '.', '..', '..', 'schoolgo-api', '.env'), 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx);
      const val = trimmed.slice(eqIdx + 1);
      if (!process.env[key]) process.env[key] = val;
    }
  } catch { /* schoolgo-api/.env not found */ }
}

loadEnvLocal();
loadApiEnv();

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5110';
const JWT = process.env.STRAPI_JWT;

if (!JWT) {
  console.error('Missing STRAPI_JWT environment variable.');
  process.exit(1);
}

const HEADERS = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${JWT}`,
};

const STATUS_DISTRIBUTION = [
  'draft',
  'submitted',
  'received',
  'under_review',
  'under_review',
  'assessment_required',
  'interview_scheduled',
  'documents_requested',
  'documents_requested',
  'offer_made',
  'offer_made',
  'offer_accepted',
  'pre_enrolment',
  'pre_enrolment',
  'coe_issued',
  'enrolled',
  'enrolled',
  'enrolled',
  'withdrawn',
  'declined',
  'waitlisted',
] as const;

function daysAgo(days: number): string {
  return new Date(Date.now() - days * 86400000).toISOString();
}

interface StrapiApplication {
  id: number;
  documentId: string;
  status: string;
}

async function main() {
  const params = new URLSearchParams();
  params.set('pagination[pageSize]', '100');
  params.set('fields[0]', 'status');

  const res = await fetch(`${API_URL}/api/applications?${params}`, { headers: HEADERS });
  if (!res.ok) {
    console.error('Failed to fetch applications:', res.status, await res.text());
    process.exit(1);
  }

  const json = await res.json();
  const applications: StrapiApplication[] = json.data ?? [];

  if (applications.length === 0) {
    console.error('No applications found. Run seed:applications first.');
    process.exit(1);
  }

  console.log(`Found ${applications.length} applications. Updating statuses directly via database...\n`);

  const dbHost = process.env.DATABASE_HOST;
  const dbPort = process.env.DATABASE_PORT ?? '5432';
  const dbName = process.env.DATABASE_NAME;
  const dbUser = process.env.DATABASE_USERNAME;
  const dbPass = process.env.DATABASE_PASSWORD;

  if (!dbHost || !dbName || !dbUser || !dbPass) {
    console.error('Missing DATABASE_* env vars. Ensure schoolgo-api/.env exists.');
    process.exit(1);
  }

  const pgPath = resolve(import.meta.dirname ?? '.', '..', '..', 'schoolgo-api', 'node_modules', 'pg', 'lib', 'index.js');
  const pg = await import(pgPath);
  const { Client } = pg.default ?? pg;

  const client = new Client({
    host: dbHost,
    port: parseInt(dbPort, 10),
    database: dbName,
    user: dbUser,
    password: dbPass,
    ssl: false,
  });

  await client.connect();
  console.log('Connected to database.\n');

  let success = 0;

  for (let i = 0; i < applications.length; i++) {
    const app = applications[i];
    const status = STATUS_DISTRIBUTION[i % STATUS_DISTRIBUTION.length];
    const statusAge = 3 + Math.floor(Math.random() * 20);
    const statusChangedAt = daysAgo(statusAge);

    const submittedAt = status !== 'draft'
      ? daysAgo(statusAge + 10)
      : null;

    const result = await client.query(
      `UPDATE applications
       SET status = $1, status_changed_at = $2, submitted_at = COALESCE($3, submitted_at)
       WHERE document_id = $4`,
      [status, statusChangedAt, submittedAt, app.documentId],
    );

    if (result.rowCount && result.rowCount > 0) {
      console.log(`  ✓ ${app.documentId.slice(0, 8)}... → ${status}`);
      success++;
    } else {
      console.error(`  ✗ ${app.documentId.slice(0, 8)}... → ${status}: no rows updated`);
    }
  }

  await client.end();
  console.log(`\nDone! ${success}/${applications.length} updated.`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
