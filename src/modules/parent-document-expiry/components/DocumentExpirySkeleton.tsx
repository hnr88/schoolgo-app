import { Skeleton } from '@/components/ui/skeleton';

export function DocumentExpirySkeleton() {
  return (
    <div className='flex flex-col gap-6'>
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className='h-48 w-full rounded-xl' />
      ))}
    </div>
  );
}
