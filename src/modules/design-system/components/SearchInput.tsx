'use client';

import { forwardRef } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SearchInputProps } from '@/modules/design-system/types/design-system.types';

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput({ className, onSearch, ...props }, ref) {
    return (
      <div
        className={cn(
          'flex items-center gap-2.5 rounded-pill border border-divider bg-white px-4.5 py-3.5 shadow-2',
          'focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/18',
          className,
        )}
      >
        <Search
          className='h-5 w-5 shrink-0 text-foggy'
          strokeWidth={2}
          aria-hidden='true'
        />
        <input
          ref={ref}
          type='text'
          className='min-w-0 flex-1 border-none bg-transparent text-[15px] text-hof outline-none placeholder:text-quill'
          onChange={(e) => onSearch?.(e.target.value)}
          {...props}
        />
      </div>
    );
  },
);
