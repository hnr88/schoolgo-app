import { getTranslations } from 'next-intl/server';
import { Eyebrow, Chip } from '@/modules/design-system';
import type { SchoolDetail } from '@/modules/school-detail/lib/school-detail-api';

function parseStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : [];
}

interface ParsedCourse {
  name: string;
  code: string;
  level: string;
}

function parseCricosCourses(raw: string): ParsedCourse[] {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const separator = line.includes(' – ') ? ' – ' : ' - ';
      const [namePart, codePart] = line.split(separator);
      const name = namePart?.trim() ?? line;
      const code = codePart?.trim() ?? '';
      let level = '—';
      if (/Senior|Sec Senior/i.test(name)) level = 'Senior Secondary';
      else if (/Junior/i.test(name)) level = 'Junior Secondary';
      else if (/Primary/i.test(name)) level = 'Primary';
      return { name, code, level };
    });
}

function resolveAgeRange(school: SchoolDetail): string | null {
  if (school.cricosAgeRange) return school.cricosAgeRange;
  if (school.cricosMinAge != null && school.cricosMaxAge != null) {
    return `${school.cricosMinAge}–${school.cricosMaxAge}`;
  }
  return null;
}

export async function CurriculumSection({ school }: { school: SchoolDetail }) {
  const pills: string[] = [
    ...(school.programType ? [school.programType] : []),
    ...(school.curriculumOffered ? [school.curriculumOffered] : []),
    ...parseStringArray(school.programTypes),
    ...parseStringArray(school.curriculumCodes),
  ];

  const ageRange = resolveAgeRange(school);
  const courses = school.cricosCoursesCodes ? parseCricosCourses(school.cricosCoursesCodes) : [];

  const hasTable = Boolean(
    school.levelsOffered ||
      ageRange ||
      school.proposedEntryLevel ||
      school.proposedEntryTerm ||
      school.languagesOffered ||
      school.elicosEslSupport ||
      school.atarAvailable != null ||
      school.cricosCode,
  );

  if (pills.length === 0 && !hasTable && courses.length === 0) return null;

  const t = await getTranslations('SchoolDetail.curriculum');

  const tableRows: { label: string; value: string | null }[] = [
    { label: t('yearLevels'), value: school.levelsOffered },
    { label: t('cricosAgeRange'), value: ageRange },
    { label: t('proposedEntryLevel'), value: school.proposedEntryLevel },
    { label: t('proposedEntryTerm'), value: school.proposedEntryTerm },
    { label: t('languages'), value: school.languagesOffered },
    { label: t('learningSupport'), value: school.elicosEslSupport ? t('elicosYes') : null },
    { label: t('atar'), value: school.atarAvailable != null ? (school.atarAvailable ? t('yes') : t('no')) : null },
    { label: t('cricosCode'), value: school.cricosCode },
  ];

  return (
    <section
      id="curriculum"
      aria-labelledby="curriculum-heading"
      className="rounded-lg border border-border bg-card py-10 px-6 shadow-1 md:py-14 md:px-8"
    >
      <Eyebrow>{t('eyebrow')}</Eyebrow>
      <h2 id="curriculum-heading" className="mt-2 text-2xl font-bold text-ink-900 md:text-3xl">
        {t('heading')}
      </h2>
      {pills.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {pills.map((pill, i) => (
            <Chip key={`${pill}-${i}`} variant="soft" size="sm" tabIndex={-1}>
              {pill}
            </Chip>
          ))}
        </div>
      )}

      <dl className="mt-6">
        {tableRows.map(
          ({ label, value }) =>
            value != null && (
              <div
                key={label}
                className="flex items-start justify-between gap-4 border-b border-divider py-3 last:border-b-0"
              >
                <dt className="text-body-sm text-foggy">{label}</dt>
                <dd className="max-w-[60%] text-right text-body-sm font-semibold text-ink-900">{value}</dd>
              </div>
            ),
        )}
      </dl>

      {courses.length > 0 && (
        <>
          <h3 className="mt-8 text-xl font-semibold text-ink-900">{t('coursesHeading')}</h3>
          <table className="mt-6 w-full border-collapse text-body-sm">
            <thead>
              <tr className="border-b border-divider text-left">
                <th className="py-3 text-caption font-semibold uppercase text-foggy">{t('courseTable.course')}</th>
                <th className="py-3 text-caption font-semibold uppercase text-foggy">{t('courseTable.code')}</th>
                <th className="py-3 text-caption font-semibold uppercase text-foggy">{t('courseTable.level')}</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, i) => (
                <tr key={i} className="border-b border-divider last:border-b-0">
                  <td className="py-3 text-ink-900">{course.name}</td>
                  <td className="py-3">
                    <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs font-semibold text-ink-900">
                      {course.code}
                    </span>
                  </td>
                  <td className="py-3 text-foggy">{course.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

    </section>
  );
}
