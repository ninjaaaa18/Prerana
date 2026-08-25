import React from 'react';
import { AlertTriangle, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { cn } from '@/lib/utils';

export interface TopicItem {
  id: string;
  name: string;
  value: number;
}

export interface StrengthWeaknessListProps {
  strengths: TopicItem[];
  weaknesses: TopicItem[];
  className?: string;
}

export const StrengthWeaknessList: React.FC<StrengthWeaknessListProps> = ({
  strengths,
  weaknesses,
  className,
}) => {
  return (
    <div className={cn('grid gap-4 md:grid-cols-2', className)}>
      <Card className="space-y-4 border border-emerald-500/15 bg-[linear-gradient(180deg,rgba(15,23,42,0.8),rgba(5,46,22,0.2))] p-4">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-slate-200">
            Strengths
          </h3>
        </div>
        {strengths.length > 0 ? (
          <ul className="space-y-4">
            {strengths.map((topic) => (
              <li key={topic.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-200">{topic.name}</span>
                  <span className="text-xs font-semibold text-emerald-400">{topic.value}%</span>
                </div>
                <ProgressBar value={topic.value} variant="emerald" size="sm" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">No strengths to show yet.</p>
        )}
      </Card>

      <Card className="space-y-4 border border-rose-500/15 bg-[linear-gradient(180deg,rgba(15,23,42,0.8),rgba(69,10,10,0.16))] p-4">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400">
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
          </span>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-slate-200">
            Focus areas
          </h3>
        </div>
        {weaknesses.length > 0 ? (
          <ul className="space-y-4">
            {weaknesses.map((topic) => (
              <li key={topic.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-200">{topic.name}</span>
                  <span className="text-xs font-semibold text-rose-400">{topic.value}%</span>
                </div>
                <ProgressBar value={topic.value} variant="coral" size="sm" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">Nothing needs attention right now.</p>
        )}
      </Card>
    </div>
  );
};
