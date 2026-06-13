'use client';

import { useState } from 'react';

export function useWriteReviewDialog() {
  const [open, setOpen] = useState(false);
  const [presetSchoolDocumentId, setPresetSchoolDocumentId] = useState<string | null>(null);

  function openForSchool(schoolDocumentId: string | null) {
    setPresetSchoolDocumentId(schoolDocumentId);
    setOpen(true);
  }

  return {
    open,
    setOpen,
    presetSchoolDocumentId,
    openForSchool,
  };
}
