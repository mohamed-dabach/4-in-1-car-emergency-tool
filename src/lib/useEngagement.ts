import { useEffect } from 'react';
import { trackScrollDepth, trackTimeOnPage, trackExitIntent, trackSectionViewed } from './metaEvents';

// Browser-observation hooks that feed lib/metaEvents.ts. Each trackX()
// helper already dedups itself (see metaEvents.ts), so these hooks can fire
// on every tick/scroll/intersection without worrying about repeats.

const SCROLL_MILESTONES = [25, 50, 75, 100] as const;

// rAF-throttled + passive, so this never competes with scroll-driven paint.
export function useScrollDepth() {
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - doc.clientHeight;
        const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 100;
        for (const milestone of SCROLL_MILESTONES) {
          if (pct >= milestone) trackScrollDepth(milestone);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

const TIME_MILESTONES = [30, 60, 120] as const;

// Accumulates only while the tab is actually visible.
export function useTimeOnPage() {
  useEffect(() => {
    let elapsedSeconds = 0;
    let lastTick = Date.now();
    let visible = document.visibilityState === 'visible';

    const onVisibility = () => {
      visible = document.visibilityState === 'visible';
      lastTick = Date.now();
    };

    const interval = setInterval(() => {
      if (!visible) return;
      const now = Date.now();
      elapsedSeconds += (now - lastTick) / 1000;
      lastTick = now;
      for (const milestone of TIME_MILESTONES) {
        if (elapsedSeconds >= milestone) trackTimeOnPage(milestone);
      }
    }, 1000);

    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);
}

// Fires once, when the pointer leaves the top of the viewport (the classic
// "about to close the tab / hit back" signal) with no relatedTarget — i.e.
// it left the document entirely, not just moved onto another element.
export function useExitIntent() {
  useEffect(() => {
    const start = Date.now();
    let reachedOrderForm = false;

    const orderEl = document.getElementById('order');
    const io = orderEl
      ? new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) reachedOrderForm = true;
        })
      : undefined;
    if (orderEl && io) io.observe(orderEl);

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY > 0 || e.relatedTarget) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const scrollPercentage = scrollable > 0 ? Math.round((window.scrollY / scrollable) * 100) : 100;
      trackExitIntent({
        scrollPercentage,
        secondsOnPage: Math.round((Date.now() - start) / 1000),
        reachedOrderForm,
      });
    };

    document.addEventListener('mouseout', onMouseOut);
    return () => {
      document.removeEventListener('mouseout', onMouseOut);
      io?.disconnect();
    };
  }, []);
}

// One IntersectionObserver over every [data-analytics-section] element,
// rather than one per section component.
export function useSectionViews() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-analytics-section]');
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const section = entry.target.getAttribute('data-analytics-section');
          if (section) trackSectionViewed(section);
        }
      },
      { threshold: 0.5 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
