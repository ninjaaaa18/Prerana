import React from 'react';
import { Clock3, Flame, Radio } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { GalaxyGlow } from '@/components/theme/GalaxyGlow';
import { Reveal } from '@/components/landing/Reveal';
import { CHILD_STATUS_BADGE_VARIANT, CHILD_STATUS_LABELS } from '../utils';
import { cn } from '@/lib/utils';
import type { Child, ChildPerformance } from '../types';

export interface ChildHeroProps {
  child: Child;
  performance: ChildPerformance;
  className?: string;
}

export const ChildHero: React.FC<ChildHeroProps> = ({ child, performance, className }) => {
  return (
    <Reveal y={16}>
      <section
        aria-label={`${child.name} overview`}
        className={cn('relative overflow-hidden rounded-[28px] border px-5 py-6 sm:px-7', className)}
        style={{
          borderColor: `${child.color}33`,
          background: `linear-gradient(135deg, rgba(15,23,42,0.96) 0%, rgba(15,23,42,0.92) 35%, rgba(76,29,149,0.38) 100%)`,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05), 0 0 30px ${child.color}15`,
        }}
      >
        <GalaxyGlow color="violet" x="10%" y="-5%" size={340} opacity={0.18} />
        <GalaxyGlow color="sky" x="90%" y="120%" size={280} opacity={0.12} />

        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" aria-hidden="true" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative flex items-center justify-center">
              <div
                className="absolute h-24 w-24 rounded-full border opacity-80"
                style={{ borderColor: `${child.color}50`, boxShadow: `0 0 32px ${child.color}25` }}
                aria-hidden="true"
              />
              <div
                className="absolute h-20 w-20 rounded-full border border-white/10"
                style={{ borderColor: `${child.color}45` }}
                aria-hidden="true"
              />
              <Avatar
                name={child.name}
                size="xl"
                className="relative z-10 border-2 shadow-[0_0_30px_rgba(15,23,42,0.7)]"
                style={{
                  borderColor: `${child.color}88`,
                  background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95), ${child.color} 34%, rgba(15,23,42,0.95) 72%)`,
                }}
              />
            </div>

            <div className="space-y-2">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-violet-300">
                <Radio className="h-3.5 w-3.5" aria-hidden="true" />
                Learner observatory
              </p>
              <h1 className="font-display text-2xl font-bold tracking-tight text-slate-50 sm:text-[2rem]">
                {child.name}
              </h1>
              <p className="text-sm text-slate-300 sm:text-base">
                {child.grade} · {child.school} · Age {child.age}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Badge variant={CHILD_STATUS_BADGE_VARIANT[performance.status]} size="lg" dot>
              {CHILD_STATUS_LABELS[performance.status]}
            </Badge>
            <Badge variant="warning" size="lg">
              <Flame className="h-3.5 w-3.5" aria-hidden="true" />
              {performance.streak} day streak
            </Badge>
            <Badge variant="info" size="lg">
              <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
              Active {child.lastActive}
            </Badge>
          </div>
        </div>
      </section>
    </Reveal>
  );
};
