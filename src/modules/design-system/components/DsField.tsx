import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DsFieldProps {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function DsField({
  label,
  htmlFor,
  hint,
  error,
  required,
  children,
  className,
}: DsFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={htmlFor}
        className={cn(
          'text-[13px] font-semibold',
          error ? 'text-primary' : 'text-hof',
        )}
      >
        {label}
        {required && (
          <span className='ml-1 font-normal text-foggy'>· required</span>
        )}
      </label>
      {children}
      {(hint || error) && (
        <p className={cn('text-xs', error ? 'text-primary' : 'text-foggy')}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
