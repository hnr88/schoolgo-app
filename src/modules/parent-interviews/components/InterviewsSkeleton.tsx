import { Skeleton } from '@/components/ui/skeleton';

export function InterviewsSkeleton() {
  return (
    <div className='flex flex-col gap-6'>
      {Array.from({ length: 2 }).map((_, index) => (
        <Skeleton key={index} className='h-48 w-full rounded-xl' />
      ))}
    </div>
  );
}
