'use client';

import { useEffect, type RefObject } from 'react';

export function useSearchShortcut(inputRef: RefObject<HTMLInputElement | null>) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const input = inputRef.current;
      if (!input) return;

      const activeElement = document.activeElement;
      const isInputFocused =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        (activeElement instanceof HTMLElement && activeElement.isContentEditable);

      if (event.key === '/' && !isInputFocused) {
        event.preventDefault();
        input.focus();
        return;
      }

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        input.focus();
        return;
      }

      if (event.key === 'Escape' && activeElement === input) {
        event.preventDefault();
        input.blur();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputRef]);
}
