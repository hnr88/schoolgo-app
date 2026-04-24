'use client';

import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface AuthCloseButtonProps {
  className?: string;
}

export function AuthCloseButton({ className }: AuthCloseButtonProps) {
  const t = useTranslations('Auth');

  return (
    <Button
      nativeButton={false}
      size='icon'
      className={cn('h-12 w-12 rounded-full shadow-brand', className)}
      render={<Link href='/' aria-label={t('close')} />}
    >
      <X className='h-5 w-5' strokeWidth={3} />
    </Button>
  );
}
