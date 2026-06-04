import { SectionHeading, SurfaceCard } from '@/modules/core';

interface InfoRow {
  label: string;
  value: string | null | undefined;
}

interface ParentStudentInfoSectionProps {
  title: string;
  rows: InfoRow[];
}

export function ParentStudentInfoSection({ title, rows }: ParentStudentInfoSectionProps) {
  return (
    <SurfaceCard padding='lg'>
      <SectionHeading title={title} level={3} className='mb-2' />
      {rows.map((row) => (
        <div
          key={row.label}
          className='flex items-baseline justify-between gap-4 border-b border-border/50 py-3 last:border-b-0'
        >
          <span className='text-sm text-foggy'>{row.label}</span>
          <span className='text-right text-sm font-medium text-ink-900'>{row.value || '—'}</span>
        </div>
      ))}
    </SurfaceCard>
  );
}
