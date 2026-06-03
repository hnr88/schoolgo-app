import { Skeleton } from '@/components/ui/skeleton';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';

export function ParentApplicationsTableSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow key={index}>
          <TableCell className='px-5 py-3.5'>
            <Skeleton className='h-3.5 w-28' />
          </TableCell>
          <TableCell className='px-5 py-3.5'>
            <Skeleton className='h-3.5 w-36' />
          </TableCell>
          <TableCell className='px-5 py-3.5'>
            <Skeleton className='h-5 w-20 rounded-full' />
          </TableCell>
          <TableCell className='px-5 py-3.5'>
            <Skeleton className='ml-auto h-4 w-4 rounded-full' />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
