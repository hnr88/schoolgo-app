interface ReviewRowProps {
  label: string;
  value: string;
}

export function ReviewRow({ label, value }: ReviewRowProps) {
  return (
    <div className='flex flex-col gap-0.5'>
      <dt className='text-xs font-medium text-muted-foreground'>{label}</dt>
      <dd className='text-sm text-ink-900'>{value}</dd>
    </div>
  );
}
