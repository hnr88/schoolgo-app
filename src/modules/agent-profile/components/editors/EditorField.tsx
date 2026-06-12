'use client';

import type { ReactNode } from 'react';
import { Label } from '@/components/ui/label';

interface EditorFieldProps {
  label: string;
  htmlFor?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Label + control wrapper shared by the repeatable per-section editors. Keeps a
 * consistent vertical field layout (Label above the control) so each editor
 * stays terse and under the component line limit.
 */
export function EditorField({ label, htmlFor, className, children }: EditorFieldProps) {
  return (
    <div className={className ?? 'flex flex-col gap-1.5'}>
      <Label htmlFor={htmlFor} className='text-xs text-muted-foreground'>
        {label}
      </Label>
      {children}
    </div>
  );
}
