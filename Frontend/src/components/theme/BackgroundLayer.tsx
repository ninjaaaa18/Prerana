import React from 'react';
import { cn } from '@/lib/utils';

export interface BackgroundLayerProps {
  children?: React.ReactNode;
  className?: string;
}

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({ children, className }) => {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      {children}
    </div>
  );
};
