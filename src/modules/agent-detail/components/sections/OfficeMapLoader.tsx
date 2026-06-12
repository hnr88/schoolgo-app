'use client';

import dynamic from 'next/dynamic';
import type { OfficeLocation } from '@/modules/agent-detail/types/agent-detail.types';

const OfficeMiniMap = dynamic(
  () =>
    import('@/modules/agent-detail/components/sections/OfficeMiniMap').then(
      (mod) => mod.OfficeMiniMap,
    ),
  { ssr: false },
);

export function OfficeMapLoader({ offices }: { offices: OfficeLocation[] }) {
  return <OfficeMiniMap offices={offices} />;
}
