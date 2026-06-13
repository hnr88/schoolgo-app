'use client';

import { useTranslations } from 'next-intl';
import { Check, ChevronDown, Users } from 'lucide-react';
import { CtaLink } from '@/modules/design-system';
import { cn } from '@/lib/utils';
import { FOCUS_RING } from '@/modules/core';
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
      <CtaLink href='/parent/students/new' variant='secondary' size='sm'>
        <Users className='h-4 w-4' strokeWidth={1.75} aria-hidden='true' />
        {t('addChild')}
      </CtaLink>
    );
  }

  const label = activeChild
    ? `${activeChild.firstName} ${activeChild.lastName}`
    : t('allChildren');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t('triggerAriaLabel', { name: label })}
        className={cn(
          'flex h-11 items-center gap-2 rounded-pill bg-muted pl-1 pr-3 text-sm font-semibold text-ink-900 outline-none transition-[background-color,box-shadow] duration-200 ease-out-quart hover:bg-surface-container-high data-[state=open]:bg-surface-container-high',
          FOCUS_RING,
        )}
      >
        {activeChild ? (
          <ParentStudentAvatar
            firstName={activeChild.firstName}
            lastName={activeChild.lastName}
            photoUrl={activeChild.photo?.url}
            size={28}
          />
        ) : (
          <span className='flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-foggy'>
            <Users className='h-4 w-4' strokeWidth={1.75} aria-hidden='true' />
          </span>
        )}
        <span className='hidden max-w-32 truncate sm:block'>{label}</span>
        <ChevronDown className='h-4 w-4 text-foggy' strokeWidth={1.75} aria-hidden='true' />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='start'
        sideOffset={8}
        className='w-60 rounded-xl bg-card p-2 shadow-3'
      >
        <DropdownMenuItem
          onClick={() => setActiveChild(null)}
          className='gap-3 rounded-md px-2 py-2 text-sm font-medium'
        >
          <span className='flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-foggy'>
            <Users className='h-4 w-4' strokeWidth={1.75} aria-hidden='true' />
          </span>
          <span className='flex-1 truncate'>{t('allChildren')}</span>
          {activeChildId === null && (
            <Check className='h-4 w-4 shrink-0 text-primary-strong' aria-hidden='true' />
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator className='my-2' />
        {children.map((child) => (
          <DropdownMenuItem
            key={child.documentId}
            onClick={() => setActiveChild(child.documentId)}
            className='gap-3 rounded-md px-2 py-2 text-sm font-medium'
          >
            <ParentStudentAvatar
              firstName={child.firstName}
              lastName={child.lastName}
              photoUrl={child.photo?.url}
              size={28}
            />
            <span className='flex-1 truncate'>
              {child.firstName} {child.lastName}
            </span>
            {activeChildId === child.documentId && (
              <Check className='h-4 w-4 shrink-0 text-primary-strong' aria-hidden='true' />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
