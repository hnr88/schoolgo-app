'use client';

import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { StudentFormActionBarProps } from '@/modules/students/types/component.types';

export function StudentFormActionBar({
  isLoading,
  submitLabel,
  cancelHref,
}: StudentFormActionBarProps) {
  const t = useTranslations('Students');

  return (
    <div className='sticky bottom-0 z-10 flex items-center justify-between gap-4 rounded-2xl border border-divider bg-card/95 px-6 py-4 shadow-1 backdrop-blur'>
      <Link href={cancelHref} className={cn(buttonVariants({ variant: 'ghost' }))}>
        {t('cancel')}
      </Link>
      <Button type='submit' size='lg' disabled={isLoading}>
        {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
        {submitLabel}
      </Button>
    </div>
  );
}
