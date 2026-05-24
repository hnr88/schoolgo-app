'use cache';
import 'server-only';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cacheLife, cacheTag } from 'next/cache';
import type { SchoolRecord } from '@/lib/schools/types';

export async function loadSchools(): Promise<SchoolRecord[]> {
  cacheLife('days');
  cacheTag('schools');
  const path = join(process.cwd(), 'public', 'data', 'schools.json');
  const raw = await readFile(path, 'utf8');
  return JSON.parse(raw) as SchoolRecord[];
}
