'use client';

import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { StudentFormSubmitButtonProps } from '@/modules/students/types/component.types';

export function StudentFormSubmitButton({ isLoading, submitLabel }: StudentFormSubmitButtonProps) {
  return (
    <div className='flex justify-end'>
      <Button type='submit' disabled={isLoading}>
        {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
        {submitLabel}
      </Button>
    </div>
  );
}
