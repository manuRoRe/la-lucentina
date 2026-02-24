import { useState, useRef, useEffect } from "react";

export function useStickyTabs(activeId: string, offset = "-73px 0px 0px 0px") {
  const [isSticky, setIsSticky] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Detección de Sticky
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: offset },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [offset]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeBtn = container.querySelector(
      `[data-tab-id="${activeId}"]`,
    ) as HTMLElement | null;

    if (activeBtn) {
      const btnCenter = activeBtn.offsetLeft + activeBtn.offsetWidth / 2;
      const containerCenter = container.offsetWidth / 2;
      const scrollPos = btnCenter - containerCenter;

      container.scrollTo({
        left: scrollPos,
        behavior: "smooth",
      });
    }
  }, [activeId]);
  return { isSticky, containerRef, sentinelRef };
}
