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
    <div className='rounded-xl border border-border bg-card p-6'>
      <h2 className='mb-2 text-base font-semibold text-ink-900'>{title}</h2>
      {rows.map((row) => (
        <div
          key={row.label}
          className='flex items-baseline justify-between border-b border-border/50 py-3 last:border-b-0'
        >
          <span className='text-sm text-foggy'>{row.label}</span>
          <span className='text-sm font-medium text-ink-900'>{row.value || '—'}</span>
        </div>
      ))}
    </div>
  );
}
