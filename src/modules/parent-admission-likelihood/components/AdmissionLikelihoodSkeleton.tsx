import { Skeleton } from '@/components/ui/skeleton';

export function AdmissionLikelihoodSkeleton() {
  return (
    <div className='flex flex-col gap-6'>
      <Skeleton className='h-24 w-full rounded-xl' />
      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className='h-48 w-full rounded-xl' />
        ))}
      </div>
    </div>
  );
}
