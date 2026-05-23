import { cn } from '@/lib/utils';

interface SpacerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Spacer({ size = 'md', className }: SpacerProps) {
  return (
    <div
      className={cn(
        size === 'sm' && 'h-4',
        size === 'md' && 'h-6',
        size === 'lg' && 'h-8',
        size === 'xl' && 'h-12',
        className,
      )}
    />
  );
}
