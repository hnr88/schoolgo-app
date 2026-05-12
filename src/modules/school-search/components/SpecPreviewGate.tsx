'use client';

import type { ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Portal } from '@/lib/portal-url';
import { SpecResultsPanel } from '@/modules/school-search/components/SpecResultsPanel';

interface SpecPreviewGateProps {
  activePortal: Portal;
  fallback: ReactNode;
}

export function SpecPreviewGate({ activePortal, fallback }: SpecPreviewGateProps) {
  const searchParams = useSearchParams();
  const isPreview = searchParams.get('preview') === 'spec';
  if (!isPreview) return <>{fallback}</>;
  return <SpecResultsPanel activePortal={activePortal} />;
}
