import React from 'react';
import { ClipboardCheck, Gauge, Hourglass, Trophy } from 'lucide-react';
import { GalaxyGlow } from '@/components/theme/GalaxyGlow';
import { cn } from '@/lib/utils';

export interface AssessmentHeroProps {
  available: number;
  completed: number;
  upcoming: number;
  bestAverage: number;
  className?: string;
}

interface HeroStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const HeroStat: React.FC<HeroStatProps> = ({ icon, label, value }) => {
  return (
    <div className="space-y-1">
      <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
        {icon}
        {label}
      </span>
      <p className="font-display text-xl font-bold text-slate-100">{value}</p>
    </div>
  );
};

export const AssessmentHero: React.FC<AssessmentHeroProps> = ({
  available,
  completed,
  upcoming,
  bestAverage,
  className,
}) => {
  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/15 via-slate-900/70 to-violet-600/15',
        className
      )}
      aria-label="Assessments overview"
    >
      <GalaxyGlow color="indigo" x="8%" y="-40%" size={360} opacity={0.2} />

      <div className="relative flex flex-col gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
            Check yourself
          </p>
          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
            Assessments
          </h1>
          <p className="text-sm leading-relaxed text-slate-400">
            Chapter exercises, quizzes and timed tests that show exactly how much you’ve mastered.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-4">
          <HeroStat
            icon={<ClipboardCheck className="h-3.5 w-3.5" />}
            label="Available"
            value={`${available}`}
          />
          <HeroStat
            icon={<Gauge className="h-3.5 w-3.5" />}
            label="Upcoming"
            value={`${upcoming}`}
          />
          <HeroStat
            icon={<Trophy className="h-3.5 w-3.5" />}
            label="Completed"
            value={`${completed}`}
          />
          <HeroStat
            icon={<Hourglass className="h-3.5 w-3.5" />}
            label="Best average"
            value={`${bestAverage}%`}
          />
        </div>
      </div>
    </section>
  );
};
