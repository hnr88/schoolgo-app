import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { DsButtonProps } from '@/modules/design-system/types/design-system.types';
import { buttonStyles } from '../constants/design-system.constants';

export const DsButton = forwardRef<HTMLButtonElement, DsButtonProps>(
  function DsButton({ variant, size, className, children, ...props }, ref) {
    return (
      <button ref={ref} className={cn(buttonStyles({ variant, size }), className)} {...props}>
        {children}
      </button>
    );
  },
);
