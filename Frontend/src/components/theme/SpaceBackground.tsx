import React from 'react';
import { BackgroundContainer } from '@/components/theme/BackgroundContainer';
import { ConstellationLayer } from '@/components/theme/ConstellationLayer';
import { FloatingParticles } from '@/components/theme/FloatingParticles';
import { GalaxyGlow } from '@/components/theme/GalaxyGlow';
import { NebulaGradient } from '@/components/theme/NebulaGradient';
import { StarField } from '@/components/theme/StarField';
import { cn } from '@/lib/utils';

export interface SpaceBackgroundProps {
  className?: string;
}

export const SpaceBackground: React.FC<SpaceBackgroundProps> = ({ className }) => {
  return (
    <BackgroundContainer variant="fixed" className={cn('z-0', className)}>
      <NebulaGradient depth={3} />
      <GalaxyGlow color="indigo" x="72%" y="-8%" size={420} opacity={0.09} />
      <GalaxyGlow color="violet" x="12%" y="82%" size={280} opacity={0.06} />
      <StarField count={52} />
      <ConstellationLayer starCount={10} segmentCount={12} className="opacity-28" />
      <FloatingParticles count={6} />
    </BackgroundContainer>
  );
};
