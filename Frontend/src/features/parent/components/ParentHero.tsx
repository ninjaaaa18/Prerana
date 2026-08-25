import React from 'react';
import { Orbit, Users } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { GalaxyGlow } from '@/components/theme/GalaxyGlow';
import { Reveal } from '@/components/landing/Reveal';
import { PARENT_PROFILE, getChildren } from '../data';
import { cn } from '@/lib/utils';

export interface ParentHeroProps {
  className?: string;
}

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

export const ParentHero: React.FC<ParentHeroProps> = ({ className }) => {
  const childCount = getChildren().length;

  return (
    <Reveal y={16}>
      <section
        aria-label="Parent overview"
        className={cn(
          'relative overflow-hidden rounded-[28px] border border-violet-500/20 bg-slate-950/70 px-6 py-7 shadow-[0_20px_60px_rgba(15,23,42,0.7)] backdrop-blur-md sm:px-8',
          className
        )}
      >
        <GalaxyGlow color="violet" x="18%" y="-18%" size={360} opacity={0.18} />
        <GalaxyGlow color="sky" x="82%" y="85%" size={300} opacity={0.12} />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar name={PARENT_PROFILE.name} size="xl" status="online" />
              <span className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-900 bg-violet-500/90 text-[10px] text-white shadow-lg shadow-violet-500/30">
                <Orbit className="h-2.5 w-2.5" aria-hidden="true" />
              </span>
            </div>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-300">
                <Orbit className="h-3.5 w-3.5" aria-hidden="true" />
                Mission Control
              </p>
              <h1 className="font-display text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
                {getGreeting()}, {PARENT_PROFILE.name}
              </h1>
              <p className="text-sm text-slate-400">{PARENT_PROFILE.role}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="primary" size="lg">
              <Orbit className="h-3.5 w-3.5" aria-hidden="true" />
              {childCount} children
            </Badge>
            <Badge variant="info" size="lg">
              <Users className="h-3.5 w-3.5" aria-hidden="true" />
              Family overview
            </Badge>
          </div>
        </div>

        <div className="relative mt-6 grid gap-3 md:grid-cols-[1.8fr_1fr]">
          <p className="rounded-2xl border border-slate-800/80 bg-slate-900/60 px-4 py-3 text-sm leading-relaxed text-slate-300">
            {PARENT_PROFILE.motivation}
          </p>
          <div className="flex items-center justify-between rounded-2xl border border-violet-500/20 bg-violet-500/5 px-4 py-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Family health</p>
              <p className="mt-1 text-lg font-display font-bold text-slate-100">87%</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 text-xs font-bold text-violet-200">
              +7
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
};
