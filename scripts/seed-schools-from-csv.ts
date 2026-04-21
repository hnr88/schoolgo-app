/**
 * One-shot seed: data/*.csv → public/data/schools.json
 *
 * Run:
 *   pnpm seed:schools
 * or:
 *   node --experimental-strip-types scripts/seed-schools-from-csv.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

type SchoolSector = 'Government' | 'Independent' | 'Catholic' | string;

type School = {
  slug: string;
  name: string;
  cricosProviderCode: string;
  state: string;
  suburb: string;
  postcode: string;
  latitude: number | null;
  longitude: number | null;
  sector: SchoolSector;
  schoolType: string;
  totalEnrolment: number | null;
  icseaScore: number | null;
  annualFeeAud: string;
  schoolWebsiteUrl: string;
  mySchoolProfileLink: string;
  applicationUrl: string;
  intakePeriods: string;
  boardingAvailable: string;
  oshcArrangedBySchool: string;
  scholarshipAvailable: string;
  internationalContactEmail: string;
  schoolDescription: string;
  dataLastVerified: string;
};

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let field = '';
  let row: string[] = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === ',') {
        row.push(field);
        field = '';
      } else if (c === '\n') {
        row.push(field);
        rows.push(row);
        row = [];
        field = '';
      } else if (c === '\r') {
        // skip
      } else {
        field += c;
      }
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function slugify(...parts: string[]): string {
  return parts
    .join(' ')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toNumber(v: string): number | null {
  if (!v || v.trim() === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function uniqueSlug(base: string, used: Set<string>): string {
  if (!used.has(base)) {
    used.add(base);
    return base;
  }
  let i = 2;
  while (used.has(`${base}-${i}`)) i++;
  const slug = `${base}-${i}`;
  used.add(slug);
  return slug;
}

const csvPath = resolve('data/australian_international_high_schools.csv');
const outPath = resolve('public/data/schools.json');

const raw = readFileSync(csvPath, 'utf8').replace(/^\uFEFF/, '');
const rows = parseCsv(raw);
const header = rows.shift();
if (!header) throw new Error('CSV has no header row');

const col = (name: string) => {
  const idx = header.indexOf(name);
  if (idx === -1) throw new Error(`Missing column: ${name}`);
  return idx;
};

const idx = {
  name: col('School_Name'),
  cricos: col('CRICOS_Provider_Code'),
  state: col('State_Territory'),
  suburb: col('Suburb'),
  postcode: col('Postcode'),
  lat: col('GPS_Latitude'),
  lng: col('GPS_Longitude'),
  sector: col('School_Sector'),
  type: col('School_Type'),
  enrolment: col('Total_Enrolment'),
  icsea: col('ICSEA_Score'),
  fee: col('Annual_Tuition_Fee_AUD'),
  applicationUrl: col('Application_Enrolment_Process_URL'),
  intake: col('Intake_Periods'),
  boarding: col('Boarding_Available'),
  oshc: col('OSHC_Arranged_by_School'),
  scholarship: col('Scholarship_Available'),
  contactEmail: col('International_Student_Contact_Email'),
  websiteUrl: col('School_Website_URL'),
  mySchoolUrl: col('My_School_Profile_Link'),
  description: col('School_Description'),
  verified: col('Data_Last_Verified'),
};

const usedSlugs = new Set<string>();
const schools: School[] = rows
  .filter((r) => r[idx.name]?.trim())
  .map((r) => {
    const name = r[idx.name].trim();
    const suburb = r[idx.suburb]?.trim() ?? '';
    const slug = uniqueSlug(slugify(name, suburb), usedSlugs);
    return {
      slug,
      name,
      cricosProviderCode: r[idx.cricos]?.trim() ?? '',
      state: r[idx.state]?.trim() ?? '',
      suburb,
      postcode: r[idx.postcode]?.trim() ?? '',
      latitude: toNumber(r[idx.lat]),
      longitude: toNumber(r[idx.lng]),
      sector: r[idx.sector]?.trim() ?? '',
      schoolType: r[idx.type]?.trim() ?? '',
      totalEnrolment: toNumber(r[idx.enrolment]),
      icseaScore: toNumber(r[idx.icsea]),
      annualFeeAud: r[idx.fee]?.trim() ?? '',
      schoolWebsiteUrl: r[idx.websiteUrl]?.trim() ?? '',
      mySchoolProfileLink: r[idx.mySchoolUrl]?.trim() ?? '',
      applicationUrl: r[idx.applicationUrl]?.trim() ?? '',
      intakePeriods: r[idx.intake]?.trim() ?? '',
      boardingAvailable: r[idx.boarding]?.trim() ?? '',
      oshcArrangedBySchool: r[idx.oshc]?.trim() ?? '',
      scholarshipAvailable: r[idx.scholarship]?.trim() ?? '',
      internationalContactEmail: r[idx.contactEmail]?.trim() ?? '',
      schoolDescription: r[idx.description]?.trim() ?? '',
      dataLastVerified: r[idx.verified]?.trim() ?? '',
    };
  });

writeFileSync(outPath, JSON.stringify(schools, null, 2) + '\n', 'utf8');

const sectorCounts = schools.reduce<Record<string, number>>((acc, s) => {
  acc[s.sector] = (acc[s.sector] ?? 0) + 1;
  return acc;
}, {});
const stateCounts = schools.reduce<Record<string, number>>((acc, s) => {
  acc[s.state] = (acc[s.state] ?? 0) + 1;
  return acc;
}, {});

process.stdout.write(
  `Seeded ${schools.length} schools → ${outPath}\n` +
    `  States: ${Object.keys(stateCounts).length} (${Object.entries(stateCounts)
      .map(([k, v]) => `${k}:${v}`)
      .join(', ')})\n` +
    `  Sectors: ${Object.entries(sectorCounts)
      .map(([k, v]) => `${k}:${v}`)
      .join(', ')}\n`
);
