import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-8 w-64' />
        <Skeleton className='h-4 w-96' />
      </div>
      <div className='grid gap-4 lg:grid-cols-2'>
        <Skeleton className='h-72 w-full rounded-xl' />
        <Skeleton className='h-72 w-full rounded-xl' />
      </div>
      <Skeleton className='h-48 w-full rounded-xl' />
    </div>
  );
}
