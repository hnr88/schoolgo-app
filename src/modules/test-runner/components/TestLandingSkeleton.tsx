'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function TestLandingSkeleton() {
  const t = useTranslations('TestRunner');

  return (
    <Card className='w-full max-w-md'>
      <CardHeader className='gap-3'>
        <Skeleton className='h-6 w-2/3' />
        <Skeleton className='h-4 w-full' />
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <Skeleton className='h-4 w-1/2' />
        <Skeleton className='h-10 w-full' />
        <p className='text-center text-sm text-muted-foreground'>{t('verifying')}</p>
      </CardContent>
    </Card>
  );
}
