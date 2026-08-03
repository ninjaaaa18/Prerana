import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';

export function useCountUp<T extends HTMLElement = HTMLDivElement>(target: number, duration = 1400) {
  const elementRef = useRef<T>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) {
      setValue(target);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry || !entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(target * eased);
          if (progress < 1) {
            frame = requestAnimationFrame(tick);
          } else {
            setValue(target);
          }
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration, reducedMotion]);

  return { ref: elementRef, value };
}
