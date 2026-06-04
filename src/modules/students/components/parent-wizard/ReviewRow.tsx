interface ReviewRowProps {
  label: string;
  value: string;
}

export function ReviewRow({ label, value }: ReviewRowProps) {
  return (
    <div className='flex flex-col gap-1 border-t border-border/60 pt-4'>
      <dt className='text-sm font-medium text-muted-foreground'>{label}</dt>
      <dd className='text-base font-medium text-ink-900'>{value}</dd>
    </div>
  );
}
