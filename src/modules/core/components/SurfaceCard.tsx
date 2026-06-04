import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const surfaceCardVariants = cva(
  'rounded-lg border bg-card ease-out-quart',
  {
    variants: {
      elevation: {
        flat: 'border-border shadow-1',
        raised: 'border-border shadow-2',
        interactive:
          'border-border shadow-1 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-2 focus-within:-translate-y-0.5',
      },
      accent: {
        none: '',
        brand: 'border-rausch-200 bg-rausch-50',
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-5',
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
