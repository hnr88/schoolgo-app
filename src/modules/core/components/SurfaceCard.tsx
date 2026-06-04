import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const surfaceCardVariants = cva(
  'rounded-xl bg-card ease-out-quart',
  {
    variants: {
      elevation: {
        flat: 'shadow-1',
        raised: 'shadow-1',
        interactive:
          'shadow-1 transition-[transform,box-shadow] duration-300 ease-out-quart hover:-translate-y-0.5 hover:shadow-2 focus-within:-translate-y-0.5 focus-within:shadow-2',
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
