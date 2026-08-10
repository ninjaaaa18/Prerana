import React from 'react';
import { Flame, Radio, Users } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { GalaxyGlow } from '@/components/theme/GalaxyGlow';
import { Reveal } from '@/components/landing/Reveal';
import { TEACHER_PROFILE } from '../data';
import { cn } from '@/lib/utils';

export interface TeacherHeroProps {
  className?: string;
}

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

export const TeacherHero: React.FC<TeacherHeroProps> = ({ className }) => {
  return (
    <Reveal y={16}>
      <section
        aria-label="Teacher overview"
        className={cn(
          'relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/15 via-slate-900/70 to-violet-600/15 px-6 py-8 sm:px-8',
          className
        )}
      >
        <GalaxyGlow color="indigo" x="8%" y="-20%" size={380} opacity={0.22} />
        <GalaxyGlow color="violet" x="92%" y="120%" size={340} opacity={0.16} />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Avatar name={TEACHER_PROFILE.name} size="xl" status="online" />
            <div className="space-y-1">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
                <Radio className="h-3.5 w-3.5" aria-hidden="true" />
                Mission Control
              </p>
              <h1 className="font-display text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
                {getGreeting()}, {TEACHER_PROFILE.name}
              </h1>
              <p className="text-sm text-slate-400">{TEACHER_PROFILE.role}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="warning" size="lg">
              <Flame className="h-3.5 w-3.5" />
              {TEACHER_PROFILE.streak} day teaching streak
            </Badge>
            <Badge variant="info" size="lg">
              <Users className="h-3.5 w-3.5" />
              {TEACHER_PROFILE.classCount} active classes
            </Badge>
          </div>
        </div>

        <p className="relative mt-6 max-w-2xl text-sm leading-relaxed text-slate-300">
          {TEACHER_PROFILE.motivation}
        </p>
      </section>
    </Reveal>
  );
};
