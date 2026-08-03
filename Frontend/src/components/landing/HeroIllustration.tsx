import React from 'react';
import { GalaxyGlow } from '@/components/theme/GalaxyGlow';
import { StarField } from '@/components/theme/StarField';
import { OrbitSystem } from './OrbitSystem';
import type { OrbitalPlanet } from './OrbitSystem';
import { Satellite } from './Satellite';
import { cn } from '@/lib/utils';

const ORBITAL_PLANETS: OrbitalPlanet[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: 'Sigma',
    angle: 0,
    radius: 38,
    size: 62,
    from: '#818cf8',
    to: '#3730a3',
    glow: 'rgba(99,102,241,0.55)',
    floatDuration: 6.5,
    floatDelay: 0.2,
  },
  {
    id: 'science',
    name: 'Science',
    icon: 'FlaskConical',
    angle: 62,
    radius: 29,
    size: 54,
    from: '#34d399',
    to: '#065f46',
    glow: 'rgba(16,185,129,0.5)',
    floatDuration: 7.5,
    floatDelay: 0.9,
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    icon: 'Cpu',
    angle: 124,
    radius: 40,
    size: 60,
    from: '#38bdf8',
    to: '#1e40af',
    glow: 'rgba(56,189,248,0.5)',
    floatDuration: 6,
    floatDelay: 0.5,
  },
  {
    id: 'languages',
    name: 'Languages',
    icon: 'Languages',
    angle: 180,
    radius: 29,
    size: 52,
    from: '#f472b6',
    to: '#9d174d',
    glow: 'rgba(244,114,182,0.5)',
    floatDuration: 7,
    floatDelay: 1.3,
  },
  {
    id: 'social-studies',
    name: 'Social Studies',
    icon: 'Globe',
    angle: 236,
    radius: 40,
    size: 56,
    from: '#fbbf24',
    to: '#92400e',
    glow: 'rgba(245,158,11,0.5)',
    floatDuration: 6.8,
    floatDelay: 0.7,
  },
  {
    id: 'arts',
    name: 'Arts',
    icon: 'Palette',
    angle: 298,
    radius: 29,
    size: 54,
    from: '#a78bfa',
    to: '#6d28d9',
    glow: 'rgba(139,92,246,0.5)',
    floatDuration: 7.2,
    floatDelay: 1.1,
  },
];

export interface HeroIllustrationProps {
  className?: string;
}

export const HeroIllustration: React.FC<HeroIllustrationProps> = ({ className }) => {
  return (
    <div className={cn('relative mx-auto w-full max-w-[540px]', className)}>
      <GalaxyGlow color="indigo" x="50%" y="50%" size={460} opacity={0.18} />
      <GalaxyGlow color="violet" x="50%" y="50%" size={300} opacity={0.14} />

      <div className="relative aspect-square">
        <StarField count={40} className="opacity-80" />
        <OrbitSystem planets={ORBITAL_PLANETS} className="relative z-[1]" />
        <Satellite className="relative z-[2]" />
      </div>
    </div>
  );
};
