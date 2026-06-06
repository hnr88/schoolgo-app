'use client';

import { useTranslations } from 'next-intl';
import { GraduationCap } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { StudentSessionStudent } from '@/modules/test-runner/types/student-session.types';

interface TestSessionReadyProps {
  student: StudentSessionStudent;
  testDocumentId?: string;
}

export function TestSessionReady({ student, testDocumentId }: TestSessionReadyProps) {
  const t = useTranslations('TestRunner');
  const name = student.firstName?.trim();
  const trimmedTest = testDocumentId?.trim();
  const runHref = {
    pathname: '/test/run',
    query: trimmedTest ? { test: trimmedTest } : undefined,
  };

  return (
    <Card className='w-full max-w-md'>
      <CardHeader className='items-center gap-3 text-center'>
        <span className='flex size-12 items-center justify-center rounded-full bg-babu-50 text-babu-700'>
          <GraduationCap className='size-6' aria-hidden='true' />
        </span>
        <CardTitle>{name ? t('ready.titleNamed', { name }) : t('ready.title')}</CardTitle>
        <CardDescription>{t('ready.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='text-center text-sm text-muted-foreground'>{t('ready.instructions')}</p>
      </CardContent>
      <CardFooter>
        <Link href={runHref} className={cn(buttonVariants({ size: 'lg' }), 'w-full')}>
          {t('ready.startCta')}
        </Link>
      </CardFooter>
    </Card>
  );
}
