import React, { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

export interface StarFieldProps {
  count?: number;
  className?: string;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  speed: number;
  phase: number;
  tint: string;
}

const STAR_TINTS = ['255,255,255', '226,232,240', '165,180,252', '196,181,253', '186,230,253'];

export const StarField: React.FC<StarFieldProps> = ({ count = 120, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let rafId = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        const alpha = reducedMotion
          ? star.baseAlpha
          : star.baseAlpha * (0.55 + 0.45 * Math.sin(time * 0.001 * star.speed + star.phase));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.tint},${alpha.toFixed(3)})`;
        ctx.fill();
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.max(1, width * dpr);
      canvas.height = Math.max(1, height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.3,
        baseAlpha: Math.random() * 0.55 + 0.2,
        speed: Math.random() * 1.2 + 0.3,
        phase: Math.random() * Math.PI * 2,
        tint: STAR_TINTS[Math.floor(Math.random() * STAR_TINTS.length)],
      }));

      draw(0);
    };

    const animate = (time: number) => {
      draw(time);
      rafId = window.requestAnimationFrame(animate);
    };

    resize();
    const resizeObserver = new ResizeObserver(() => resize());
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    if (reducedMotion) {
      draw(0);
    } else {
      rafId = window.requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, [count, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    />
  );
};
