/**
 * Seed 100 demo students into Strapi for UI testing.
 *
 * Run:  pnpm seed:students
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
  } catch { /* .env.local not found — rely on env vars */ }
}

loadEnvLocal();

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5110';
const JWT = process.env.STRAPI_JWT;

if (!JWT) {
  console.error('Missing STRAPI_JWT environment variable.');
  console.error('Usage: STRAPI_JWT=<token> pnpm seed:students');
  process.exit(1);
}

const FIRST_NAMES_MALE = [
  'Wei', 'Hiroshi', 'Min-jun', 'Tuan', 'Arjun', 'Ravi', 'Kai', 'Yuto',
  'Jian', 'Seo-jun', 'Hao', 'Takeshi', 'Minh', 'Anh', 'Bao', 'Chen',
  'Dae-jung', 'Feng', 'Geon', 'Haruto', 'Jin', 'Kenta', 'Liang', 'Nam',
  'Omar', 'Prem', 'Quan', 'Ryu', 'Satoshi', 'Thien', 'Umar', 'Vinh',
  'Xiang', 'Yong', 'Zhi',
];

const FIRST_NAMES_FEMALE = [
  'Mei', 'Sakura', 'Ji-yeon', 'Linh', 'Priya', 'Aisha', 'Yui', 'Hana',
  'Xiao', 'Soo-yeon', 'Lan', 'Yuki', 'Mai', 'Anya', 'Binh', 'Dan',
  'Eun-ji', 'Fang', 'Gia', 'Haruka', 'Ines', 'Jia', 'Kaori', 'Luna',
  'Mina', 'Nari', 'Olive', 'Phuong', 'Qian', 'Rina', 'Suki', 'Thi',
  'Uma', 'Vivian', 'Wen',
];

const LAST_NAMES = [
  'Wang', 'Li', 'Zhang', 'Liu', 'Chen', 'Yang', 'Huang', 'Zhao',
  'Kim', 'Park', 'Lee', 'Choi', 'Nguyen', 'Tran', 'Pham', 'Le',
  'Tanaka', 'Suzuki', 'Takahashi', 'Watanabe', 'Sharma', 'Patel',
  'Singh', 'Kumar', 'Wu', 'Xu', 'Sun', 'Ma', 'Hu', 'Guo',
  'Lin', 'He', 'Gao', 'Luo', 'Zheng', 'Lim', 'Ong', 'Tan',
  'Chan', 'Ho',
];

const NATIONALITIES = [
  'Chinese', 'South Korean', 'Japanese', 'Vietnamese', 'Indian',
  'Thai', 'Malaysian', 'Indonesian', 'Filipino', 'Taiwanese',
  'Hong Kong', 'Singaporean', 'Cambodian', 'Myanmar', 'Bangladeshi',
];

const SCHOOLS = [
  'Beijing No.4 High School', 'Seoul International School', 'Tokyo Gakuen',
  'Hanoi Academy', 'Delhi Public School', 'Bangkok Prep', 'KL International',
  'Jakarta Global School', 'Manila Science High', 'Taipei European School',
  'HKIS', 'Singapore American School', 'Phnom Penh Intl', 'Yangon ISM',
  'Dhaka Scholars', null, null, null,
];

const YEAR_LEVELS = ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12'];
const TARGET_YEARS = ['2025', '2026', '2027'];
const TARGET_TERMS = ['Term 1', 'Term 2', 'Term 3', 'Term 4'];
const STATUSES = ['active', 'active', 'active', 'active', 'active', 'archived', 'enrolled'] as const;
const GENDERS = ['male', 'female', 'other'] as const;

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(startYear: number, endYear: number): string {
  const year = startYear + Math.floor(Math.random() * (endYear - startYear + 1));
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function randomPhone(): string {
  const prefix = pick(['+86', '+82', '+81', '+84', '+91', '+66', '+60', '+62', '+63']);
  const digits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('');
  return `${prefix} ${digits}`;
}

function generateStudent(index: number) {
  const gender = pick(GENDERS);
  const firstName = gender === 'female'
    ? pick(FIRST_NAMES_FEMALE)
    : pick(FIRST_NAMES_MALE);
  const lastName = pick(LAST_NAMES);
  const nationality = pick(NATIONALITIES);
  const parentLastName = pick(LAST_NAMES);
  const parentFirst = pick([...FIRST_NAMES_MALE, ...FIRST_NAMES_FEMALE]);

  return {
    firstName,
    lastName,
    dateOfBirth: randomDate(2006, 2014),
    gender,
    nationality,
    passportNumber: `${nationality.slice(0, 2).toUpperCase()}${String(1000000 + index).slice(1)}`,
    currentSchool: pick(SCHOOLS),
    currentYearLevel: pick(YEAR_LEVELS),
    targetEntryYear: pick(TARGET_YEARS),
    targetEntryTerm: pick(TARGET_TERMS),
    parentGuardianName: `${parentFirst} ${parentLastName}`,
    parentGuardianEmail: `${parentFirst.toLowerCase()}.${parentLastName.toLowerCase()}@example.com`,
    parentGuardianPhone: randomPhone(),
    parentGuardianWechat: Math.random() > 0.5 ? `wx_${parentFirst.toLowerCase()}${Math.floor(Math.random() * 999)}` : null,
    agentNotes: Math.random() > 0.7 ? pick([
      'Strong academic record, high IELTS score expected.',
      'Family prefers Melbourne area schools.',
      'Needs boarding accommodation.',
      'Scholarship candidate — excellent extracurriculars.',
      'Waiting on passport renewal before application.',
      'Prefers co-educational school.',
      'Has sibling already studying in Australia.',
      'Transfer from another agent — priority handling.',
    ]) : null,
    status: pick(STATUSES),
  };
}

async function createStudent(student: ReturnType<typeof generateStudent>, index: number) {
  const res = await fetch(`${API_URL}/api/students`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JWT}`,
    },
    body: JSON.stringify({ data: student }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`[${index + 1}] FAILED ${student.firstName} ${student.lastName}: ${res.status} — ${body}`);
    return false;
  }

  console.log(`[${index + 1}] Created ${student.firstName} ${student.lastName}`);
  return true;
}

async function main() {
  console.log(`Seeding 100 students to ${API_URL}...\n`);

  let success = 0;
  let failed = 0;

  const BATCH_SIZE = 5;
  const students = Array.from({ length: 100 }, (_, i) => generateStudent(i));

  for (let i = 0; i < students.length; i += BATCH_SIZE) {
    const batch = students.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(
      batch.map((s, j) => createStudent(s, i + j))
    );
    success += results.filter(Boolean).length;
    failed += results.filter((r) => !r).length;
  }

  console.log(`\nDone! ${success} created, ${failed} failed.`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
