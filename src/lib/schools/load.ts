import 'server-only';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { SchoolRecord } from '@/lib/schools/types';

let cache: SchoolRecord[] | null = null;

export async function loadSchools(): Promise<SchoolRecord[]> {
  if (cache) return cache;
  const path = join(process.cwd(), 'public', 'data', 'schools.json');
  const raw = await readFile(path, 'utf8');
  cache = JSON.parse(raw) as SchoolRecord[];
  return cache;
}
