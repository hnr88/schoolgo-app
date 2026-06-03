'use client';

import { useTranslations } from 'next-intl';
import { Check, ChevronDown, Users } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ParentStudentAvatar } from '@/modules/students';
import { useActiveChild } from '@/modules/dashboard/parent/hooks/useActiveChild';

export function ParentChildSwitcher() {
  const t = useTranslations('ParentChildSwitcher');
  const { children, activeChildId, activeChild, isLoading, setActiveChild } = useActiveChild();

  if (isLoading) return null;

  if (children.length === 0) {
    return (
      <Link
        href='/parent/students/new'
        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-1.5')}
      >
        <Users className='h-4 w-4' strokeWidth={1.5} aria-hidden='true' />
        {t('addChild')}
      </Link>
    );
  }

  const label = activeChild
    ? `${activeChild.firstName} ${activeChild.lastName}`
    : t('allChildren');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t('triggerAriaLabel', { name: label })}
        className='flex h-11 items-center gap-2 rounded-xl px-2.5 text-sm font-medium text-ink-900 outline-none transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1'
      >
        {activeChild ? (
          <ParentStudentAvatar
            firstName={activeChild.firstName}
            lastName={activeChild.lastName}
            photoUrl={activeChild.photo?.url}
            size={28}
          />
        ) : (
          <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-foggy'>
            <Users className='h-4 w-4' strokeWidth={1.5} aria-hidden='true' />
          </span>
        )}
        <span className='hidden max-w-32 truncate sm:block'>{label}</span>
        <ChevronDown className='h-4 w-4 text-foggy' strokeWidth={1.5} aria-hidden='true' />
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start' sideOffset={8} className='w-56 bg-card shadow-3'>
        <DropdownMenuItem onClick={() => setActiveChild(null)}>
          <Users className='h-4 w-4 text-foggy' strokeWidth={1.5} aria-hidden='true' />
          <span className='flex-1'>{t('allChildren')}</span>
          {activeChildId === null && <Check className='h-4 w-4 text-primary-strong' aria-hidden='true' />}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {children.map((child) => (
          <DropdownMenuItem key={child.documentId} onClick={() => setActiveChild(child.documentId)}>
            <ParentStudentAvatar
              firstName={child.firstName}
              lastName={child.lastName}
              photoUrl={child.photo?.url}
              size={24}
            />
            <span className='flex-1 truncate'>
              {child.firstName} {child.lastName}
            </span>
            {activeChildId === child.documentId && (
              <Check className='h-4 w-4 text-primary-strong' aria-hidden='true' />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
