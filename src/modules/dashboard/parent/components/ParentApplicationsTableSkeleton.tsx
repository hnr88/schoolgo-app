import { Skeleton } from '@/components/ui/skeleton';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';

export function ParentApplicationsTableSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow key={index} className='border-divider hover:bg-transparent'>
          <TableCell className='h-16 px-6'>
            <Skeleton className='h-3.5 w-28 rounded-md' />
          </TableCell>
          <TableCell className='h-16 px-6'>
            <Skeleton className='h-3.5 w-36 rounded-md' />
          </TableCell>
          <TableCell className='h-16 px-6'>
            <Skeleton className='h-6 w-20 rounded-pill' />
          </TableCell>
          <TableCell className='h-16 px-6 text-right'>
            <Skeleton className='ml-auto h-3.5 w-12 rounded-md' />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
