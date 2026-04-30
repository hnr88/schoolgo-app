'use client';

import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ErrorStateProps } from '@/modules/core/types/component.types';

export function ErrorState({ message, onRetry, retryLabel }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="h-6 w-6 text-destructive" />
      </div>
      <p className="mt-4 text-sm font-medium text-foreground">{message}</p>
      {onRetry && (
        <div className="mt-4">
          <Button variant="outline" size="sm" onClick={onRetry}>
            {retryLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
