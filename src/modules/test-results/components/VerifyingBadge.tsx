import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VERIFICATION_STATUS_STYLES } from '@/modules/test-results/constants/test-results.constants';

interface VerifyingBadgeProps {
  label: string;
}

export function VerifyingBadge({ label }: VerifyingBadgeProps) {
  const styles = VERIFICATION_STATUS_STYLES.verifying;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        styles.bg,
        styles.text,
      )}
      aria-live='polite'
    >
      <Loader2 className='h-3 w-3 animate-spin' aria-hidden='true' />
      {label}
    </span>
  );
}
