import { Skeleton } from '@/components/ui/skeleton';

export function AgentInvoicesSkeleton() {
  return (
    <div className='flex flex-col gap-2 rounded-lg border border-border bg-card p-4 shadow-1'>
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className='h-12 w-full rounded-md' />
      ))}
    </div>
  );
}
