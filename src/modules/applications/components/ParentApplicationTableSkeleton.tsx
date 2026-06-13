import { TableCell, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export function ParentApplicationTableSkeletonRows({ rowCount }: { rowCount: number }) {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, i) => (
        <TableRow key={`skeleton-${i}`} className='hover:bg-transparent'>
          <TableCell>
            <div className='flex items-center gap-3'>
              <Skeleton className='size-9 rounded-full' />
              <Skeleton className='h-4 w-28' />
            </div>
          </TableCell>
          <TableCell>
            <div className='flex items-center gap-3'>
              <Skeleton className='size-9 rounded-md' />
              <Skeleton className='h-4 w-32' />
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className='h-6 w-24 rounded-pill' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-4 w-20' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-4 w-24' />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
