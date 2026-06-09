import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='flex flex-col gap-6'>
      <Skeleton className='h-12 w-64 rounded-xl' />
      <Skeleton className='h-10 w-40 rounded-lg' />
      <Skeleton className='h-64 w-full rounded-xl' />
    </div>
  );
}
