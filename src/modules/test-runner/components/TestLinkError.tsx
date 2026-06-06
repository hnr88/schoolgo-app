'use client';

import { useTranslations } from 'next-intl';
import { TriangleAlert } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { StudentSessionError } from '@/modules/test-runner/types/student-session.types';

export function TestLinkError({ error }: { error: StudentSessionError }) {
  const t = useTranslations('TestRunner');

  return (
    <Card className='w-full max-w-md'>
      <CardHeader className='items-center gap-3 text-center'>
        <span className='flex size-12 items-center justify-center rounded-full bg-vivid-coral-soft text-vivid-coral-strong'>
          <TriangleAlert className='size-6' aria-hidden='true' />
        </span>
        <CardTitle>{t('error.title')}</CardTitle>
        <CardDescription>{t(`error.${error.kind}`)}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='text-center text-sm text-muted-foreground'>{t('error.help')}</p>
      </CardContent>
    </Card>
  );
}
