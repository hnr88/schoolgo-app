import { Skeleton } from '@/components/ui/skeleton';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';

export function ParentApplicationsTableSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow key={index} className='hover:bg-transparent'>
          <TableCell className='px-5 py-3.5'>
            <Skeleton className='h-3.5 w-28 rounded-md' />
          </TableCell>
          <TableCell className='px-5 py-3.5'>
            <Skeleton className='h-3.5 w-36 rounded-md' />
          </TableCell>
          <TableCell className='px-5 py-3.5'>
            <Skeleton className='h-6 w-20 rounded-pill' />
          </TableCell>
          <TableCell className='px-5 py-3.5 text-right'>
            <Skeleton className='ml-auto h-3.5 w-12 rounded-md' />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
