import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { FocusRecommendation } from '../types';

export interface FocusRecommendationCardProps {
  recommendation: FocusRecommendation;
  className?: string;
}

export const FocusRecommendationCard: React.FC<FocusRecommendationCardProps> = ({
  recommendation,
  className,
}) => {
  return (
    <Card className={cn('relative space-y-4 overflow-hidden border-violet-500/15 bg-slate-950/60 p-4', className)}>
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-25 blur-3xl"
        style={{ backgroundColor: recommendation.color }}
        aria-hidden="true"
      />
      <div className="relative space-y-3">
        <div className="flex items-center gap-3">
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border"
            style={{
              color: recommendation.color,
              borderColor: `${recommendation.color}40`,
              backgroundColor: `${recommendation.color}1a`,
            }}
          >
            <Lightbulb className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300">
              Focus next
            </p>
            <h3 className="font-display text-base font-bold text-slate-100">
              {recommendation.childName}
            </h3>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-3">
          <p className="text-sm font-semibold text-slate-200">
            {recommendation.subjectName} · {recommendation.chapter}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">{recommendation.reason}</p>
        </div>

        <p className="rounded-2xl border border-violet-500/10 bg-violet-500/5 p-3 text-xs leading-relaxed text-slate-300">
          {recommendation.action}
        </p>
      </div>

      <Link to={`/app/parent/children/${recommendation.childId}`} className="relative block">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          rightIcon={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
        >
          Open {recommendation.childName}&apos;s detail
        </Button>
      </Link>
    </Card>
  );
};
