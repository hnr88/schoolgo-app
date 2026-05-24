'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from '@/i18n/navigation';

export function useMarketingHeader() {
  const pathname = usePathname();
  const isSearchPage = pathname.endsWith('/search');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sheetRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);
  const dragOffset = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    const scrollContainer = sheet.querySelector('[data-scroll]') as HTMLElement | null;
    if (scrollContainer && scrollContainer.scrollTop > 0) return;
    dragStartY.current = e.touches[0].clientY;
    isDragging.current = true;
    sheet.style.transition = 'none';
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current || !sheetRef.current) return;
    const dy = e.touches[0].clientY - dragStartY.current;
    if (dy < 0) {
      dragOffset.current = 0;
      sheetRef.current.style.transform = 'translateY(0)';
      return;
    }
    dragOffset.current = dy;
    sheetRef.current.style.transform = `translateY(${dy}px)`;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current || !sheetRef.current) return;
    isDragging.current = false;
    const sheet = sheetRef.current;
    sheet.style.transition = 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)';
    if (dragOffset.current > 120) {
      sheet.style.transform = 'translateY(100%)';
      sheet.addEventListener('transitionend', () => {
        setMobileOpen(false);
      }, { once: true });
    } else {
      sheet.style.transform = 'translateY(0)';
    }
    dragOffset.current = 0;
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    if (sheetRef.current) {
      sheetRef.current.style.transform = '';
      sheetRef.current.style.transition = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return {
    scrolled,
    mobileOpen,
    setMobileOpen,
    sheetRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isSearchPage,
  };
}
