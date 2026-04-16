'use client';

import dynamic from 'next/dynamic';
import { MOCK_SCHOOLS } from '@/modules/school-search/constants/school.constants';

const LeafletMap = dynamic(
  () =>
    import('@/modules/school-search/components/LeafletMap').then(
      (mod) => mod.LeafletMap,
    ),
  {
    ssr: false,
    loading: () => (
      <div className='w-full h-full bg-surface-container-low rounded-3xl flex items-center justify-center'>
        <span className='text-xs font-bold text-on-surface-variant uppercase tracking-widest animate-pulse'>
          Loading map...
        </span>
      </div>
    ),
  },
);

export function MapView() {
  return (
    <div className='w-full h-full rounded-3xl overflow-hidden shadow-xl shadow-on-surface/5'>
      <LeafletMap schools={MOCK_SCHOOLS} />
    </div>
  );
}
