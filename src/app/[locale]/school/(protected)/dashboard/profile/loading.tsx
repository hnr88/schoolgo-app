import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-8 w-48' />
        <Skeleton className='h-4 w-80' />
      </div>
      <Skeleton className='h-64 w-full rounded-xl' />
      <Skeleton className='h-64 w-full rounded-xl' />
      <Skeleton className='h-48 w-full rounded-xl' />
    </div>
  );
}
