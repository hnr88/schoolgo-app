interface BuilderSectionPlaceholderProps {
  title: string;
  note: string;
}

/**
 * Temporary per-tab content for the builder shell. Round 2 replaces these with
 * the real per-section editors.
 */
export function BuilderSectionPlaceholder({ title, note }: BuilderSectionPlaceholderProps) {
  return (
    <div className='flex flex-col gap-2'>
      <h3 className='text-base font-semibold text-foreground'>{title}</h3>
      <p className='text-sm text-muted-foreground'>{note}</p>
    </div>
  );
}
