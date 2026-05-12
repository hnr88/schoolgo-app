'use client';

import type { ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { SpecResultsPanel } from '@/modules/school-search/components/SpecResultsPanel';

interface SpecPreviewGateProps {
  fallback: ReactNode;
}

export function SpecPreviewGate({ fallback }: SpecPreviewGateProps) {
  const searchParams = useSearchParams();
  const isPreview = searchParams.get('preview') === 'spec';
  if (!isPreview) return <>{fallback}</>;
  return <SpecResultsPanel />;
}
