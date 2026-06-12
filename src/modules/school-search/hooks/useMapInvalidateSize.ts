'use client';

import { useEffect } from 'react';
import type { Map } from 'leaflet';

/**
 * Keeps Leaflet's cached pixel size in sync with its real container box.
 *
 * When the map mounts inside a sticky/grid + double-dynamic(ssr:false) layout,
 * Leaflet often measures the container before it has its final size, caching a
 * wrong size and rendering grey/half tiles ("fogged"). We recover by calling
 * `invalidateSize()`:
 *  - right after mount, on the next animation frame (+ a setTimeout backstop),
 *  - whenever the container box resizes or becomes visible (ResizeObserver),
 *  - whenever the dependency token changes (e.g. the results set / visibility).
 */
export function useMapInvalidateSize(map: Map | null, dependencyToken?: unknown): void {
  useEffect(() => {
    if (!map) return;
    const m = map;
    const container = m.getContainer();

    const invalidate = () => {
      // `false` = no pan animation; we only want the size recomputed.
      m.invalidateSize(false);
    };

    const rafId = requestAnimationFrame(invalidate);
    const timeoutId = setTimeout(invalidate, 0);

    const observer = new ResizeObserver(() => {
      invalidate();
    });
    observer.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [map, dependencyToken]);
}
