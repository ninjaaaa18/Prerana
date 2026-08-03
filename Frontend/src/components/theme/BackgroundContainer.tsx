import React from 'react';
import { cn } from '@/lib/utils';

export interface BackgroundContainerProps {
  children?: React.ReactNode;
  variant?: 'fixed' | 'absolute';
  className?: string;
}

export const BackgroundContainer: React.FC<BackgroundContainerProps> = ({
  children,
  variant = 'absolute',
  className,
}) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none overflow-hidden',
        variant === 'fixed' ? 'fixed inset-0' : 'absolute inset-0',
        className
      )}
    >
      {children}
    </div>
  );
};
