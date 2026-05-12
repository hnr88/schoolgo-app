'use client';

import { type ReactNode, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { LockedOverlay } from '@/modules/school-search/components/filters/LockedOverlay';

type FilterGroupProps = {
  title: string;
  defaultOpen?: boolean;
  locked?: boolean;
  lockedDescription?: string;
  signUpHref?: string;
  children: ReactNode;
  className?: string;
};

export function FilterGroup({
  title,
  defaultOpen = true,
  locked = false,
  lockedDescription = '',
  signUpHref = '/parent/sign-up',
  children,
  className,
}: FilterGroupProps) {
  const t = useTranslations('SchoolSearch.filters');
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className={cn('w-full', className)}>
      <div className="flex items-center justify-between py-2">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <CollapsibleTrigger
          aria-label={open ? t('collapse') : t('expand')}
          className={cn(
            'flex size-6 shrink-0 items-center justify-center rounded text-muted-foreground',
            'transition-colors hover:bg-muted hover:text-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          )}
        >
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="pb-3">
        {locked ? (
          <LockedOverlay
            locked={locked}
            description={lockedDescription}
            signUpHref={signUpHref}
          >
            {children}
          </LockedOverlay>
        ) : (
          children
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
