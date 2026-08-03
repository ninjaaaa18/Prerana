import React from 'react';
import { cn } from '@/lib/utils';

export type SpaceCanvasProps = React.CanvasHTMLAttributes<HTMLCanvasElement>;

export const SpaceCanvas: React.FC<SpaceCanvasProps> = ({ className, ...props }) => {
  return <canvas aria-hidden="true" className={cn('absolute inset-0', className)} {...props} />;
};
