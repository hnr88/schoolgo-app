import dynamic from 'next/dynamic';
import { MOCK_SCHOOLS } from '@/modules/school-search/constants/school.constants';
import { cn } from '@/lib/utils';
import type { MapViewProps } from '@/modules/school-search/types/component.types';

const LeafletMap = dynamic(
  () =>
    import('@/modules/school-search/components/LeafletMap').then(
      (mod) => mod.LeafletMap,
    ),
  {
    ssr: false,
    loading: () => (
      <div className='flex h-full w-full items-center justify-center rounded-lg bg-muted'>
        <span
          className='animate-pulse text-caption font-semibold uppercase text-foggy'
          style={{ letterSpacing: '0.08em' }}
        >
          Loading map…
        </span>
      </div>
    ),
  },
);

export function MapView({ className }: MapViewProps) {
  return (
    <div className={cn('h-full w-full overflow-hidden rounded-lg border border-border shadow-2', className)}>
      <LeafletMap schools={MOCK_SCHOOLS} />
    </div>
  );
}
