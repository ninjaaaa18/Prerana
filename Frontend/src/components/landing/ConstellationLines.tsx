import React from 'react';
import { cn } from '@/lib/utils';

export interface ConstellationPoint {
  x: number;
  y: number;
}

export interface ConstellationLinesProps {
  points: ConstellationPoint[];
  center?: ConstellationPoint;
  className?: string;
}

export const ConstellationLines: React.FC<ConstellationLinesProps> = ({
  points,
  center,
  className,
}) => {
  const segments: React.ReactNode[] = [];

  if (center) {
    points.forEach((point, index) => {
      segments.push(
        <line
          key={`center-${index}`}
          x1={center.x}
          y1={center.y}
          x2={point.x}
          y2={point.y}
          stroke="rgba(148,163,184,0.16)"
          strokeWidth="0.45"
        />
      );
    });
  }

  points.forEach((point, index) => {
    const next = points[(index + 1) % points.length];
    if (!next) return;
    segments.push(
      <line
        key={`edge-${index}`}
        x1={point.x}
        y1={point.y}
        x2={next.x}
        y2={next.y}
        stroke="rgba(148,163,184,0.22)"
        strokeWidth="0.5"
      />
    );
  });

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    >
      {segments}
    </svg>
  );
};
