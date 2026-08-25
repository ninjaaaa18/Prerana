import React from 'react';
import {
  AlertTriangle,
  BookOpen,
  ClipboardCheck,
  Milestone,
  PartyPopper,
  Radar,
  ScanLine,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { Dropdown } from '@/components/ui/dropdown';
import { GalaxyGlow } from '@/components/theme/GalaxyGlow';
import { Reveal } from '@/components/landing/Reveal';
import { ParentNav } from '../components/ParentNav';
import { ActivityFeed } from '../components/ActivityFeed';
import { filterActivities, getActivityCounts, getChildren } from '../data';
import { ACTIVITY_TYPE_LABELS } from '../utils';
import type { ParentActivityType } from '../types';

const CHILD_FILTERS = (): { label: string; value: string }[] => [
  { label: 'All children', value: 'all' },
  ...getChildren().map((child) => ({ label: child.name, value: child.id })),
];

const TYPE_FILTERS: { label: string; value: string }[] = [
  { label: 'All activity', value: 'all' },
  ...(Object.keys(ACTIVITY_TYPE_LABELS) as ParentActivityType[]).map((type) => ({
    label: ACTIVITY_TYPE_LABELS[type],
    value: type,
  })),
];

const INSIGHT_ICONS: Record<ParentActivityType, { icon: LucideIcon; color: string }> = {
  milestone: { icon: Milestone, color: '#8b5cf6' },
  assessment: { icon: ClipboardCheck, color: '#38bdf8' },
  learning: { icon: BookOpen, color: '#6366f1' },
  concern: { icon: AlertTriangle, color: '#f43f5e' },
  achievement: { icon: PartyPopper, color: '#10b981' },
};

export const ParentActivityPage: React.FC = () => {
  const [childId, setChildId] = React.useState('all');
  const [type, setType] = React.useState('all');

  const activities = filterActivities({
    childId: childId === 'all' ? undefined : childId,
    type: type === 'all' ? undefined : (type as ParentActivityType),
  });

  const counts = getActivityCounts();

  return (
    <Container size="xl" className="space-y-8">
      <ParentNav />

      <Reveal y={16}>
        <section
          aria-label="Family activity log"
          className="relative overflow-hidden rounded-[28px] border border-cyan-400/20 bg-[radial-gradient(circle_at_88%_18%,rgba(56,189,248,0.12),transparent_28%),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(16,10,38,0.9))] px-6 py-7 shadow-[0_20px_60px_rgba(15,23,42,0.7)] sm:px-8"
        >
          <GalaxyGlow color="violet" x="84%" y="-20%" size={280} opacity={0.12} />
          <GalaxyGlow color="pink" x="18%" y="105%" size={220} opacity={0.08} />
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300">
                <Radar className="h-3.5 w-3.5" aria-hidden="true" />
                Family activity log
              </p>
              <h1 className="font-display text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
                Mission Timeline
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-slate-400">
                Track learning moments, milestones, assessments, and important signals across your family.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-cyan-400/15 bg-slate-950/55 px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                <ScanLine className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-xl font-extrabold leading-none text-slate-100">{activities.length}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Signals tracked</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {(Object.keys(INSIGHT_ICONS) as ParentActivityType[]).map((activityType) => {
          const { icon: Icon, color } = INSIGHT_ICONS[activityType];
          return (
            <Card key={activityType} className="flex items-center gap-3 border border-slate-800/80 bg-slate-950/50 p-4">
              <span
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
                style={{ color, borderColor: `${color}40`, backgroundColor: `${color}1a` }}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-xl font-extrabold text-slate-100">
                  {counts[activityType]}
                </p>
                <p className="truncate text-[11px] uppercase tracking-wide text-slate-500">
                  {ACTIVITY_TYPE_LABELS[activityType]}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      <section
        aria-label="Activity scanner"
        className="relative overflow-visible rounded-2xl border border-violet-400/15 bg-slate-950/60 p-4 shadow-[0_14px_40px_rgba(15,23,42,0.35)] sm:p-5"
      >
        <div className="mb-4 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
          <h2 className="text-[10px] font-bold uppercase tracking-[0.24em] text-violet-200">Activity scanner</h2>
          <span className="ml-auto text-[10px] uppercase tracking-[0.16em] text-slate-600">Telemetry filters</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Dropdown label="Child" options={CHILD_FILTERS()} value={childId} onChange={setChildId} />
          <Dropdown label="Activity type" options={TYPE_FILTERS} value={type} onChange={setType} />
        </div>
      </section>

      <Card className="border border-slate-800/80 bg-slate-950/50 p-4 shadow-[0_18px_50px_rgba(2,6,23,0.35)] sm:p-6">
        <ActivityFeed activities={activities} />
      </Card>
    </Container>
  );
};
