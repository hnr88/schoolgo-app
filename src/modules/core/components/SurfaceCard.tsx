import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const surfaceCardVariants = cva(
  // Canonical card (§3.3): 16px radius (--radius-lg) on white.
  'rounded-lg bg-card ease-out-quart',
  {
    variants: {
      elevation: {
        flat: 'shadow-2',
        raised: 'shadow-2',
        interactive:
          'shadow-2 transition-[transform,box-shadow] duration-300 ease-out-quart hover:-translate-y-0.5 hover:shadow-3 focus-within:-translate-y-0.5 focus-within:shadow-3 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0',
      },
      accent: {
        none: '',
        brand: 'bg-rausch-50',
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-6',
      },
    },
    defaultVariants: { elevation: 'flat', accent: 'none', padding: 'md' },
  },
);

export interface SurfaceCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof surfaceCardVariants> {}

export function SurfaceCard({
  elevation,
  accent,
  padding,
  className,
  children,
  ...props
}: SurfaceCardProps) {
  return (
    <div
      className={cn(surfaceCardVariants({ elevation, accent, padding }), className)}
      {...props}
    >
      {children}
    </div>
  );
}
