import React from 'react';
import { GALAXY } from '@/constants/colors';
import { cn } from '@/lib/utils';

export interface NebulaGradientProps {
  className?: string;
  depth?: number;
}

export const NebulaGradient: React.FC<NebulaGradientProps> = ({ className, depth = 4 }) => {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <div className="absolute inset-0" style={{ background: GALAXY.gradients.deepSpace }} />
      <div
        className="absolute inset-0"
        style={{ background: GALAXY.gradients.nebulaPurple, mixBlendMode: 'screen' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: GALAXY.gradients.nebulaIndigo, mixBlendMode: 'screen' }}
      />
      {depth >= 3 && (
        <div
          className="absolute inset-0"
          style={{ background: GALAXY.gradients.nebulaSky, mixBlendMode: 'screen' }}
        />
      )}
      {depth >= 4 && (
        <div
          className="absolute inset-0"
          style={{ background: GALAXY.gradients.nebulaPink, mixBlendMode: 'screen' }}
        />
      )}
    </div>
  );
};
