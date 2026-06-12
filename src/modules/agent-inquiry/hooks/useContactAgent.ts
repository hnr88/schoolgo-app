'use client';

import { useState } from 'react';

export function useContactAgent() {
  const [open, setOpen] = useState(false);

  return {
    open,
    onOpenChange: setOpen,
    openDialog: () => setOpen(true),
    closeDialog: () => setOpen(false),
  };
}
