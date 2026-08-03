import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ProgressRing } from '@/components/ui/progress-ring';
import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GalaxyGlow } from '@/components/theme/GalaxyGlow';
import { useCountUp } from '@/hooks/use-count-up';
import { cn } from '@/lib/utils';

export interface ProgressHeroProps {
  overallCompletion: number;
  streak: number;
  weeklyHours: number;
  subjectCount: number;
  name: string;
  className?: string;
}

export const ProgressHero: React.FC<ProgressHeroProps> = ({
  overallCompletion,
  streak,
  weeklyHours,
  subjectCount,
  name,
  className,
}) => {
  const { ref, value } = useCountUp(overallCompletion);

  return (
    <section
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/15 via-slate-900/70 to-violet-600/15',
        className
      )}
      aria-label="Learning progress overview"
    >
      <GalaxyGlow color="indigo" x="6%" y="-40%" size={400} opacity={0.22} />
      <GalaxyGlow color="violet" x="92%" y="110%" size={340} opacity={0.16} />

      <div className="relative flex flex-col gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary" dot>
              {streak} day streak
            </Badge>
            <Badge variant="secondary">
              <Flame className="h-3 w-3 text-amber-400" />
              {weeklyHours} hrs this week
            </Badge>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
              Your growth, visualized
            </p>
            <h1 className="font-display text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
              Great momentum, {name.split(' ')[0]}
            </h1>
            <p className="text-sm leading-relaxed text-slate-400">
              You’re exploring <span className="font-semibold text-slate-200">{subjectCount} subjects</span> and
              every session is building toward your goals. Keep the streak alive.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              to="/app/subjects"
              className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}
            >
              Keep learning
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="inline-flex items-center gap-1.5 text-xs text-slate-500">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              AI coaches are ready when you are
            </p>
          </div>
        </div>

        <Card className="relative flex flex-col items-center gap-3 self-center px-8 py-6 lg:self-auto">
          <ProgressRing value={overallCompletion} size={140} strokeWidth={12} color="#6366f1" />
          <div className="text-center">
            <p className="font-display text-2xl font-extrabold text-slate-100">
              {Math.round(value)}%
            </p>
            <p className="text-xs font-medium text-slate-400">overall completion</p>
          </div>
        </Card>
      </div>
    </section>
  );
};
