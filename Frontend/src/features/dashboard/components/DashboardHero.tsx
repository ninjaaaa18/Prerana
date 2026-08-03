import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, PlayCircle, Sparkles } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { GalaxyGlow } from '@/components/theme/GalaxyGlow';
import { Reveal } from '@/components/landing/Reveal';
import { cn } from '@/lib/utils';

export interface DashboardHeroProps {
  name: string;
  streak: number;
  motivation: string;
  className?: string;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export const DashboardHero: React.FC<DashboardHeroProps> = ({
  name,
  streak,
  motivation,
  className,
}) => {
  return (
    <Reveal y={16}>
      <section
        className={cn(
          'relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/15 via-slate-900/70 to-violet-600/15',
          className
        )}
        aria-label="Welcome"
      >
        <GalaxyGlow color="indigo" x="10%" y="-30%" size={380} opacity={0.22} />
        <GalaxyGlow color="violet" x="90%" y="110%" size={340} opacity={0.18} />

        <div className="relative flex flex-col gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl space-y-6">
            <div className="flex items-center gap-4">
              <Avatar name={name} size="xl" status="online" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
                  {getGreeting()}
                </p>
                <h1 className="font-display text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
                  {name}
                </h1>
              </div>
            </div>

            <p className="inline-flex items-start gap-2 text-sm leading-relaxed text-slate-300">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-indigo-300" />
              {motivation}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="/app/subjects"
                className={cn(buttonVariants({ size: 'lg' }))}
              >
                <PlayCircle className="h-5 w-5" />
                Continue Learning
              </Link>
              <Badge variant="warning" size="lg">
                <Flame className="h-3.5 w-3.5" />
                {streak} day streak
              </Badge>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
};
