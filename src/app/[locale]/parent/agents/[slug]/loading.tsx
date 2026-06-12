import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='bg-background'>
      <div className='border-b border-divider bg-ink-900 pt-28 md:pt-40'>
        <div className='mx-auto w-full max-w-wide px-5 py-8 md:px-8 md:py-12 lg:py-16'>
          <div className='mb-5 flex items-center gap-4'>
            <Skeleton className='h-20 w-20 rounded-full bg-white/10' />
            <Skeleton className='h-4 w-40 bg-white/10' />
          </div>
          <Skeleton className='h-12 w-2/3 bg-white/10' />
          <Skeleton className='mt-5 h-5 w-1/2 bg-white/10' />
          <div className='mt-6 flex gap-2'>
            <Skeleton className='h-7 w-32 rounded-pill bg-white/10' />
            <Skeleton className='h-7 w-28 rounded-pill bg-white/10' />
          </div>
        </div>
      </div>

      <div className='mx-auto w-full max-w-wide px-5 py-8 md:px-8 md:py-12'>
        <div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]'>
          <div className='space-y-6'>
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className='rounded-lg border border-border bg-card px-6 py-10 shadow-1 md:px-8 md:py-14'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='mt-3 h-8 w-1/2' />
                <Skeleton className='mt-6 h-4 w-full' />
                <Skeleton className='mt-2 h-4 w-5/6' />
                <Skeleton className='mt-2 h-4 w-2/3' />
              </div>
            ))}
          </div>
          <div className='space-y-4'>
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className='rounded-lg border border-border bg-card p-5 shadow-1'>
                <Skeleton className='h-6 w-32' />
                <Skeleton className='mt-5 h-4 w-full' />
                <Skeleton className='mt-3 h-4 w-3/4' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
