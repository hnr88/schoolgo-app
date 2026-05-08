'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Map } from 'leaflet';

const HINT_DURATION_MS = 1500;

export function ScrollWheelZoomHandler({ map }: { map: Map }) {
  const t = useTranslations('SchoolSearch.map');
  const [showHint, setShowHint] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const clearHideTimer = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  useEffect(() => {
    const container = map.getContainer();

    function handleWheel(e: WheelEvent) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -1 : 1;
        map.zoomIn(delta, { animate: true });
        setShowHint(false);
        clearHideTimer();
      } else {
        setShowHint(true);
        clearHideTimer();
        hideTimer.current = setTimeout(() => setShowHint(false), HINT_DURATION_MS);
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      clearHideTimer();
    };
  }, [map, clearHideTimer]);

  if (!showHint) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-map-controls flex items-center justify-center bg-ink-900/40">
      <p className="rounded-lg bg-card px-4 py-2.5 text-body-sm font-semibold text-foreground shadow-3">
        {t('ctrlScrollHint')}
      </p>
    </div>
  );
}
