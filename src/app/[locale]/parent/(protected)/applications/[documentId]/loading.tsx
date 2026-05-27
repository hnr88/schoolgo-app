import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='flex flex-col gap-6'>
      <Skeleton className='h-5 w-40' />
      <Skeleton className='h-48 w-full rounded-xl' />
      <div className='grid gap-6 lg:grid-cols-2'>
        <Skeleton className='h-56 w-full rounded-xl' />
        <Skeleton className='h-56 w-full rounded-xl' />
      </div>
    </div>
  );
}
