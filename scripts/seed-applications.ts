/**
 * Seed 20 demo applications into Strapi for UI testing.
 * Fetches existing students and schools, then creates applications with varied statuses.
 *
 * Run:  pnpm seed:applications
 */
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

loadEnvLocal();

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

type ApplicationStatus =
  | 'draft' | 'submitted' | 'received' | 'under_review'
  | 'documents_requested' | 'assessment_required' | 'interview_scheduled'
  | 'offer_made' | 'offer_accepted' | 'pre_enrolment' | 'coe_issued'
  | 'enrolled' | 'withdrawn' | 'declined' | 'waitlisted';

const STATUSES: ApplicationStatus[] = [
  'draft', 'draft',
  'submitted', 'submitted',
  'received',
  'under_review', 'under_review', 'under_review',
  'documents_requested', 'documents_requested',
  'assessment_required',
  'interview_scheduled',
  'offer_made', 'offer_made',
  'offer_accepted',
  'pre_enrolment',
  'coe_issued',
  'enrolled',
  'withdrawn',
  'declined',
];

const YEAR_LEVELS = ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12'];
const INTAKES = ['Term 1, 2026', 'Term 2, 2026', 'Term 3, 2026', 'Term 1, 2027', 'Term 2, 2027'];

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPastDate(maxDaysAgo: number): string {
  const now = Date.now();
  const daysAgo = Math.floor(Math.random() * maxDaysAgo) + 1;
  return new Date(now - daysAgo * 86400000).toISOString();
}

function statusChangedDate(status: ApplicationStatus): string {
  const daysMap: Record<string, [number, number]> = {
    draft: [1, 5],
    submitted: [1, 10],
    received: [2, 14],
    under_review: [5, 20],
    documents_requested: [7, 30],
    assessment_required: [5, 15],
    interview_scheduled: [3, 14],
    offer_made: [1, 10],
    offer_accepted: [1, 7],
    pre_enrolment: [3, 14],
    coe_issued: [2, 10],
    enrolled: [1, 30],
    withdrawn: [5, 30],
    declined: [3, 20],
    waitlisted: [5, 25],
  };
  const [min, max] = daysMap[status] ?? [1, 10];
  const daysAgo = min + Math.floor(Math.random() * (max - min + 1));
  return new Date(Date.now() - daysAgo * 86400000).toISOString();
}

interface StrapiEntity {
  documentId: string;
  firstName?: string;
  lastName?: string;
  name?: string;
}

async function fetchAll(endpoint: string, fields: string[]): Promise<StrapiEntity[]> {
  const params = new URLSearchParams();
  params.set('pagination[pageSize]', '100');
  fields.forEach((f, i) => params.set(`fields[${i}]`, f));

  const res = await fetch(`${API_URL}${endpoint}?${params}`, { headers: HEADERS });
  if (!res.ok) {
    console.error(`Failed to fetch ${endpoint}: ${res.status}`);
    return [];
  }
  const json = await res.json();
  return json.data ?? [];
}

async function main() {
  console.log(`Fetching students and schools from ${API_URL}...\n`);

  const students = await fetchAll('/api/students', ['firstName', 'lastName']);
  const schools = await fetchAll('/api/schools', ['name']);

  if (students.length === 0) {
    console.error('No students found. Run pnpm seed:students first.');
    process.exit(1);
  }
  if (schools.length === 0) {
    console.error('No schools found. Seed schools first.');
    process.exit(1);
  }

  console.log(`Found ${students.length} students, ${schools.length} schools.\n`);
  console.log('Creating 20 applications...\n');

  let success = 0;
  let failed = 0;

  for (let i = 0; i < 20; i++) {
    const status = STATUSES[i];
    const student = pick(students);
    const school = pick(schools);
    const statusChangedAt = statusChangedDate(status);
    const isSubmitted = status !== 'draft';

    const data: Record<string, unknown> = {
      student: student.documentId,
      school: school.documentId,
      status,
      statusChangedAt,
      targetYearLevel: pick(YEAR_LEVELS),
      targetIntake: pick(INTAKES),
      boardingRequired: Math.random() > 0.7,
    };

    if (isSubmitted) {
      data.submittedAt = randomPastDate(60);
    }

    if (status === 'offer_made' || status === 'offer_accepted') {
      data.offerMadeAt = randomPastDate(14);
      data.offerDeadline = new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0];
      data.offerAnnualFee = pick([25000, 30000, 35000, 40000, 45000, 50000]);
    }

    if (status === 'withdrawn') {
      data.withdrawnAt = statusChangedAt;
    }

    if (status === 'declined') {
      data.declinedAt = statusChangedAt;
      data.declineReason = pick(['english_insufficient', 'no_places', 'incomplete_docs', 'academic_requirements']);
    }

    if (status === 'enrolled') {
      data.enrolledAt = statusChangedAt;
    }

    const res = await fetch(`${API_URL}/api/applications`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ data }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[${i + 1}] FAILED: ${res.status} — ${body}`);
      failed++;
    } else {
      const studentName = `${student.firstName} ${student.lastName}`;
      const schoolName = school.name;
      console.log(`[${i + 1}] ${status.padEnd(22)} ${studentName} → ${schoolName}`);
      success++;
    }
  }

  console.log(`\nDone! ${success} created, ${failed} failed.`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
