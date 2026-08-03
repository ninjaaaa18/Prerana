import React, { useMemo, useState } from 'react';
import { Reveal } from '@/components/landing/Reveal';
import { cn } from '@/lib/utils';
import { AssessmentHero } from '../components/AssessmentHero';
import { AssessmentGrid } from '../components/AssessmentGrid';
import { ASSESSMENTS } from '../data';
import type { AssessmentStatus } from '../types';

type Filter = 'all' | AssessmentStatus;

const TABS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'available', label: 'Available' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
];

const emptyVariantFor: Record<Filter, 'none' | 'completed' | 'upcoming'> = {
  all: 'none',
  available: 'none',
  upcoming: 'upcoming',
  completed: 'completed',
};

export const AssessmentsPage: React.FC = () => {
  const [tab, setTab] = useState<Filter>('all');

  const stats = useMemo(() => {
    const available = ASSESSMENTS.filter((item) => item.status === 'available').length;
    const upcoming = ASSESSMENTS.filter((item) => item.status === 'upcoming').length;
    const completed = ASSESSMENTS.filter((item) => item.status === 'completed');
    const bestAverage = completed.length
      ? Math.round(
          completed.reduce((total, item) => total + (item.bestScore ?? 0), 0) / completed.length
        )
      : 0;
    return { available, upcoming, completedCount: completed.length, bestAverage };
  }, []);

  const continueItems = useMemo(
    () => ASSESSMENTS.filter((item) => item.progress && item.progress > 0 && item.progress < 100),
    []
  );

  const filtered = useMemo(() => {
    if (tab === 'all') return ASSESSMENTS;
    return ASSESSMENTS.filter((item) => item.status === tab);
  }, [tab]);

  const tabCount = (id: Filter) =>
    id === 'all' ? ASSESSMENTS.length : ASSESSMENTS.filter((item) => item.status === id).length;

  return (
    <div className="space-y-10">
      <Reveal y={16}>
        <AssessmentHero
          available={stats.available}
          upcoming={stats.upcoming}
          completed={stats.completedCount}
          bestAverage={stats.bestAverage}
        />
      </Reveal>

      {continueItems.length > 0 && (
        <Reveal>
          <section className="space-y-4" aria-label="Continue assessment">
            <div className="space-y-1">
              <h2 className="font-display text-xl font-bold tracking-tight text-slate-100">
                Continue assessment
              </h2>
              <p className="text-sm text-slate-400">
                You’re partway through — pick up right where you left off.
              </p>
            </div>
            <AssessmentGrid assessments={continueItems} />
          </section>
        </Reveal>
      )}

      <Reveal>
        <section className="space-y-5" aria-label="Browse assessments">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="space-y-1">
              <h2 className="font-display text-xl font-bold tracking-tight text-slate-100">
                All assessments
              </h2>
              <p className="text-sm text-slate-400">
                Chapter exercises and quizzes across all your subjects.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Filter assessments"
              className="inline-flex flex-wrap gap-1 rounded-xl border border-slate-800 bg-slate-900/70 p-1"
            >
              {TABS.map((item) => {
                const isActive = tab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setTab(item.id)}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        'rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums',
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                      )}
                    >
                      {tabCount(item.id)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <AssessmentGrid assessments={filtered} emptyVariant={emptyVariantFor[tab]} />
        </section>
      </Reveal>
    </div>
  );
};
