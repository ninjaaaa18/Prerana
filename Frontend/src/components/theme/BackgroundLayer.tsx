import React from 'react';
import { cn } from '@/lib/utils';
import { SpaceBackground } from '@/components/theme/SpaceBackground';

export interface BackgroundLayerProps {
  className?: string;
}

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({ className }) => {
  return <SpaceBackground className={cn(className)} />;
};
