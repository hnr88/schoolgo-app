import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-8 w-48' />
        <Skeleton className='h-4 w-72' />
      </div>
      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        <Skeleton className='h-52 w-full rounded-xl' />
        <Skeleton className='h-52 w-full rounded-xl' />
        <Skeleton className='h-52 w-full rounded-xl' />
      </div>
    </div>
  );
}
