import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='min-h-screen w-full'>
      <div className='border-b border-border bg-muted/50 pt-28 md:pt-40'>
        <div className='mx-auto max-w-content px-6 pb-12 md:pb-16'>
          <Skeleton className='h-5 w-20' />
          <Skeleton className='mt-3 h-12 w-3/4 max-w-xl' />
          <Skeleton className='mt-4 h-6 w-2/3 max-w-lg' />
        </div>
      </div>

      <div className='mx-auto max-w-content px-6 py-12 md:py-16'>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className='flex flex-col overflow-hidden rounded-xl border border-border'>
              <Skeleton className='aspect-[3/2] w-full' />
              <div className='flex flex-col gap-2 p-5'>
                <Skeleton className='h-6 w-3/4' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-2/3' />
                <Skeleton className='mt-2 h-4 w-24' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
