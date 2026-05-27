import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='mx-auto flex max-w-3xl flex-col gap-6'>
      <Skeleton className='h-8 w-48' />
      <Skeleton className='h-24 w-full rounded-lg' />
      <Skeleton className='h-96 w-full rounded-lg' />
    </div>
  );
}
