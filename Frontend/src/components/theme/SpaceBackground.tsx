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
      <NebulaGradient />
      <GalaxyGlow color="indigo" x="72%" y="-8%" size={560} opacity={0.2} />
      <GalaxyGlow color="violet" x="8%" y="85%" size={420} opacity={0.14} />
      <StarField count={140} />
      <ConstellationLayer />
      <FloatingParticles count={26} />
    </BackgroundContainer>
  );
};
