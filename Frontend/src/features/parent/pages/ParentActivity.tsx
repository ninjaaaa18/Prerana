import React from 'react';
import {
  AlertTriangle,
  BookOpen,
  ClipboardCheck,
  Milestone,
  PartyPopper,
  Radar,
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
          aria-label="Activity and insights"
          className="relative overflow-hidden rounded-[28px] border border-violet-500/20 bg-slate-950/70 px-6 py-7 shadow-[0_20px_60px_rgba(15,23,42,0.7)] sm:px-8"
        >
          <GalaxyGlow color="violet" x="84%" y="-20%" size={300} opacity={0.14} />
          <GalaxyGlow color="pink" x="20%" y="95%" size={240} opacity={0.1} />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-300">
                <Radar className="h-3.5 w-3.5" aria-hidden="true" />
                Mission control
              </p>
              <h1 className="font-display text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
                Family activity
              </h1>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 px-3 py-2 text-sm text-slate-300">
              {activities.length} activity item{activities.length === 1 ? '' : 's'}
            </div>
          </div>
          <p className="relative mt-4 max-w-xl text-sm text-slate-400">
            A chronological view of milestones, assessments, learning moments and concerns.
          </p>
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

      <div className="grid gap-4 sm:grid-cols-2">
        <Dropdown label="Child" options={CHILD_FILTERS()} value={childId} onChange={setChildId} />
        <Dropdown label="Activity type" options={TYPE_FILTERS} value={type} onChange={setType} />
      </div>

      <Card className="border border-slate-800/80 bg-slate-950/50 p-5">
        <ActivityFeed activities={activities} />
      </Card>
    </Container>
  );
};
