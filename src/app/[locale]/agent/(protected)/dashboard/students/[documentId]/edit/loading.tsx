import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='flex flex-col gap-6'>
      <Skeleton className='h-8 w-48' />
      <div className='rounded-lg border border-border bg-card p-6'>
        <div className='flex flex-col gap-4'>
          <Skeleton className='h-10 w-full rounded-md' />
          <Skeleton className='h-10 w-full rounded-md' />
          <Skeleton className='h-32 w-full rounded-md' />
        </div>
      </div>
    </div>
  );
}
