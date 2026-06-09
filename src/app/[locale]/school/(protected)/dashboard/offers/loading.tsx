import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='flex flex-col gap-6'>
      <Skeleton className='h-12 w-64' />
      <div className='overflow-hidden rounded-xl border border-border bg-card'>
        <div className='flex flex-col gap-3 p-6'>
          {[0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className='h-12 w-full rounded-lg' />
          ))}
        </div>
      </div>
    </div>
  );
}
