'use client';

import { useEffect } from 'react';

function scrollToHash() {
  const { hash } = window.location;
  if (!hash) return;
  const el = document.querySelector(hash);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function HashScrollHandler() {
  useEffect(() => {
    let t1: ReturnType<typeof setTimeout> | undefined;
    let t2: ReturnType<typeof setTimeout> | undefined;

    if (window.location.hash) {
      t1 = setTimeout(scrollToHash, 80);
      t2 = setTimeout(scrollToHash, 350);
    }

    window.addEventListener('hashchange', scrollToHash);
    window.addEventListener('pageshow', scrollToHash);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('hashchange', scrollToHash);
      window.removeEventListener('pageshow', scrollToHash);
    };
  }, []);

  return null;
}
