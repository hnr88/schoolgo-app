'use client';

import { Minus, Plus, RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { Map } from 'leaflet';
import { useSchoolSearchStore } from '@/modules/school-search/stores/use-school-search-store';

interface MapZoomControlsProps {
  map: Map;
}

export function MapZoomControls({ map }: MapZoomControlsProps) {
  const t = useTranslations('SchoolSearch.map');
  const reset = useSchoolSearchStore((s) => s.reset);

  return (
    <div className="absolute bottom-6 left-6 z-map-controls flex flex-col gap-2">
      <button
        type="button"
        aria-label={t('reset')}
        onClick={reset}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-pill border border-border bg-card text-foreground shadow-2 transition-colors hover:text-primary"
      >
        <RotateCcw className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label={t('zoomIn')}
        onClick={() => map.zoomIn()}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-pill border border-border bg-card text-foreground shadow-2 transition-colors hover:text-primary"
      >
        <Plus className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label={t('zoomOut')}
        onClick={() => map.zoomOut()}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-pill border border-border bg-card text-foreground shadow-2 transition-colors hover:text-primary"
      >
        <Minus className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
      </button>
    </div>
  );
}
