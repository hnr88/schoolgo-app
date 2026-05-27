import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center justify-between gap-3'>
        <Skeleton className='h-8 w-48' />
        <Skeleton className='h-9 w-32 rounded-md' />
      </div>
      <Skeleton className='h-96 w-full rounded-xl' />
    </div>
  );
}
