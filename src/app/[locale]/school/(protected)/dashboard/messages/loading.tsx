import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='flex flex-col gap-6'>
      <Skeleton className='h-12 w-64 rounded-xl' />
      <div className='flex flex-col gap-3'>
        <Skeleton className='h-20 w-full rounded-xl' />
        <Skeleton className='h-20 w-full rounded-xl' />
        <Skeleton className='h-20 w-full rounded-xl' />
      </div>
    </div>
  );
}
