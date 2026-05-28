import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-8 w-48' />
        <Skeleton className='h-4 w-72' />
      </div>
      <Skeleton className='h-12 w-80 rounded-xl' />
      <Skeleton className='h-40 w-full rounded-xl' />
    </div>
  );
}
