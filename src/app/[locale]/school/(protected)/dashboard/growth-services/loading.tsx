import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='flex flex-col gap-6'>
      <Skeleton className='h-12 w-64' />
      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className='h-48 w-full rounded-xl' />
        ))}
      </div>
    </div>
  );
}
