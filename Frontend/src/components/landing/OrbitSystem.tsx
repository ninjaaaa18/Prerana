import React, { useMemo } from 'react';
import type { IconName } from '@/components/ui/icon';
import { PlanetNode } from './PlanetNode';
import { ConstellationLines } from './ConstellationLines';
import { LearnerCore } from './LearnerCore';
import { cn } from '@/lib/utils';

export interface OrbitalPlanet {
  id: string;
  name: string;
  icon: IconName;
  angle: number;
  radius: number;
  size: number;
  from: string;
  to: string;
  glow: string;
  floatDuration: number;
  floatDelay: number;
}

export interface OrbitSystemProps {
  planets: OrbitalPlanet[];
  className?: string;
}

const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

export const OrbitSystem: React.FC<OrbitSystemProps> = ({ planets, className }) => {
  const positions = useMemo(
    () =>
      planets.map((planet) => {
        const radians = toRadians(planet.angle);
        return {
          planet,
          x: 50 + planet.radius * Math.cos(radians),
          y: 50 + planet.radius * Math.sin(radians),
        };
      }),
    [planets]
  );

  const ringRadii = useMemo(
    () => Array.from(new Set(planets.map((planet) => planet.radius))).sort((a, b) => a - b),
    [planets]
  );

  return (
    <div className={cn('relative aspect-square w-full select-none', className)}>
      {ringRadii.map((radius) => (
        <div
          key={radius}
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-slate-700/50"
          style={{
            width: `${radius * 2}%`,
            height: `${radius * 2}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      <ConstellationLines
        points={positions.map(({ x, y }) => ({ x, y }))}
        center={{ x: 50, y: 50 }}
      />

      {positions.map(({ planet, x, y }) => (
        <div
          key={planet.id}
          className="absolute z-10"
          style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <PlanetNode
            name={planet.name}
            icon={planet.icon}
            from={planet.from}
            to={planet.to}
            glow={planet.glow}
            size={planet.size}
            floatDuration={planet.floatDuration}
            floatDelay={planet.floatDelay}
          />
        </div>
      ))}

      <LearnerCore size={104} />
    </div>
  );
};
