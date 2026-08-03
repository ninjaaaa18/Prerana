import React from 'react';
import { cn } from '@/lib/utils';

export interface GalaxyContainerProps {
  children?: React.ReactNode;
  className?: string;
}

export const GalaxyContainer: React.FC<GalaxyContainerProps> = ({ children, className }) => {
  return (
    <div aria-hidden="true" className={cn('absolute inset-0', className)}>
      {children}
    </div>
  );
};
