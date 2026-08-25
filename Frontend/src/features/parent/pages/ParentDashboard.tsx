import React from 'react';
import { Activity, AlertTriangle, ArrowUpRight, CalendarCheck2, Clock3, Flame, Gauge, Sparkles, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { EmptyState } from '@/components/ui/empty-state';
import { FamilyGalaxy } from '../components/FamilyGalaxy';
import { ChildCard } from '../components/ChildCard';
import { ParentNav } from '../components/ParentNav';
import { ParentSection } from '../components/ParentSection';
import { ParentStatGrid } from '../components/ParentStatGrid';
import {
  FOCUS_RECOMMENDATIONS,
  PARENT_STATS,
  PARENT_ACTIVITIES,
  getAttentionItems,
  getChildPerformance,
  getChildren,
  getFocusRecommendation,
} from '../data';

const PLANET_METRICS = [
  { id: 'study', label: 'Study time', value: '20h', tone: 'violet', icon: Clock3 },
  { id: 'assessments', label: 'Assessments', value: '12', tone: 'sky', icon: CalendarCheck2 },
  { id: 'achievements', label: 'Achievements', value: '8', tone: 'pink', icon: Sparkles },
  { id: 'streak', label: 'Streak', value: '23d', tone: 'cyan', icon: TrendingUp },
];

const statusConfig: Record<string, { label: string; dot: string; glow: string }> = {
  ahead: { label: 'Ahead', dot: '#34d399', glow: 'rgba(52,211,153,0.35)' },
  'on-track': { label: 'On track', dot: '#38bdf8', glow: 'rgba(56,189,248,0.35)' },
  'at-risk': { label: 'Needs support', dot: '#f97316', glow: 'rgba(249,115,22,0.35)' },
};

export const ParentDashboard: React.FC = () => {
  const [selectedChildId, setSelectedChildId] = React.useState<string>('all');

  const children = getChildren();
  const attentionItems = getAttentionItems(selectedChildId === 'all' ? undefined : selectedChildId);
  const recommendation =
    selectedChildId === 'all' ? FOCUS_RECOMMENDATIONS[0] : getFocusRecommendation(selectedChildId);
  const recentActivities = PARENT_ACTIVITIES.slice(0, 4);

  return (
    <Container size="xl" className="space-y-8 pb-8">
      <ParentNav />
      <FamilyGalaxy children={children} />

      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.95fr]">
        <div className="space-y-6">
          <ParentSection title="Family map" subtitle="Choose a child to focus today's attention on.">
            <div className="relative overflow-hidden rounded-[28px] border border-slate-800/80 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_35%),linear-gradient(180deg,rgba(15,23,42,0.88),rgba(2,6,23,0.96))] p-4 sm:p-5">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(168,85,247,0.12),transparent_40%)]" aria-hidden="true" />
              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path d="M25 50 L50 68 L75 48" stroke="rgba(148,163,184,0.26)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
                <path d="M50 68 L50 28" stroke="rgba(148,163,184,0.18)" strokeWidth="0.7" fill="none" strokeLinecap="round" />
              </svg>

              <div className="relative grid gap-4 sm:grid-cols-3">
                {children.map((child) => {
                  const performance = getChildPerformance(child.id);
                  const isSelected = selectedChildId === child.id;
                  const status = statusConfig[performance?.status ?? 'on-track'];

                  return (
                    <React.Fragment key={child.id}>
                      <div className="absolute left-[50%] top-[50%] hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400/10 bg-violet-500/5 blur-2xl sm:block" aria-hidden="true" />
                      <a
                        href={`/app/parent/children/${child.id}`}
                        onClick={() => setSelectedChildId(child.id)}
                        className={[
                          'group relative flex min-h-[180px] flex-col items-center justify-between rounded-[24px] border p-3 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
                          isSelected
                            ? 'border-violet-400/40 bg-violet-500/8 shadow-[0_0_0_1px_rgba(168,85,247,0.22),0_0_32px_rgba(168,85,247,0.18)]'
                            : 'border-slate-800/80 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/70'
                        ].join(' ')}
                        aria-label={`Open ${child.name} details`}
                      >
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10"
                          style={{
                            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.96), ${child.color} 28%, rgba(15,23,42,0.86) 72%)`,
                            boxShadow: `inset -10px -12px 18px rgba(15,23,42,0.62), inset 10px 10px 14px rgba(255,255,255,0.14), 0 0 28px ${status.glow}`,
                            borderColor: `${child.color}70`,
                          }}
                        >
                          <span className="text-base font-black tracking-[0.18em] text-slate-100/85">
                            {child.name.slice(0, 2).toUpperCase()}
                          </span>
                        </div>

                        <div className="mt-4 w-full space-y-2">
                          <div className="flex items-center justify-center gap-2">
                            <p className="text-sm font-semibold text-slate-100">{child.name}</p>
                            <span
                              className="inline-flex h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: status.dot, boxShadow: `0 0 18px ${status.glow}` }}
                              aria-label={status.label}
                            />
                          </div>

                          <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">{child.grade}</p>

                          <div className="flex items-center justify-between rounded-full border border-slate-700/70 bg-slate-950/60 px-2.5 py-1.5 text-[10px] font-medium text-slate-300">
                            <span className="inline-flex items-center gap-1">
                              <Gauge className="h-3 w-3" aria-hidden="true" />
                              {performance?.mastery ?? 0}%
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Flame className="h-3 w-3" aria-hidden="true" />
                              {performance?.streak ?? 0}d
                            </span>
                          </div>

                          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-400">
                            <span>{status.label}</span>
                          </div>
                        </div>
                      </a>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </ParentSection>

          <ParentStatGrid stats={PARENT_STATS} />

          <ParentSection title="Learning planets" subtitle="Quick-read mission metrics for the family.">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {PLANET_METRICS.map((item) => {
                const Icon = item.icon;
                const accentMap: Record<string, string> = {
                  violet: '#8b5cf6',
                  sky: '#38bdf8',
                  pink: '#ec4899',
                  cyan: '#22d3ee',
                };
                const accent = accentMap[item.tone] ?? '#8b5cf6';

                return (
                  <div key={item.id} className="relative flex items-center gap-3 rounded-[28px] border border-slate-800/80 bg-slate-950/40 p-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full border text-white shadow-[0_0_30px_rgba(148,163,184,0.18)]"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), ${accent} 32%, rgba(15,23,42,0.88) 72%)`,
                        borderColor: `${accent}60`,
                        boxShadow: `0 0 0 1px ${accent}20, 0 0 28px ${accent}26`,
                      }}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                        {item.label}
                      </p>
                      <p className="mt-1 font-display text-2xl font-bold tracking-tight text-slate-100">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ParentSection>

          <ParentSection title="Your children" subtitle="A quick read on how each child is tracking.">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {children.map((child) => {
                const performance = getChildPerformance(child.id);
                if (!performance) return null;
                return <ChildCard key={child.id} child={child} performance={performance} />;
              })}
            </div>
          </ParentSection>
        </div>

        <div className="space-y-6">
          <ParentSection title="Today's priority" subtitle="Most helpful next step for the family.">
            {recommendation ? (
              <div className="relative overflow-hidden rounded-[28px] border border-violet-500/20 bg-[radial-gradient(circle_at_top_right,_rgba(168,85,247,0.12),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.94),rgba(2,6,23,0.98))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl" style={{ backgroundColor: `${recommendation.color}30` }} aria-hidden="true" />

                <div className="relative space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border"
                        style={{
                          backgroundColor: `${recommendation.color}18`,
                          borderColor: `${recommendation.color}50`,
                          color: recommendation.color,
                        }}
                      >
                        <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-300">
                          Mission alert
                        </p>
                        <h3 className="font-display text-base font-bold text-slate-100">
                          {recommendation.childName}
                        </h3>
                      </div>
                    </div>

                    <Badge variant="warning" size="sm">High priority</Badge>
                  </div>

                  <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Focus area</p>
                    <p className="mt-2 text-base font-semibold text-slate-100">
                      {recommendation.subjectName} · {recommendation.chapter}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{recommendation.reason}</p>
                  </div>

                  <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Recommended next step</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-200">{recommendation.action}</p>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-violet-500/15 bg-violet-500/5 px-3 py-2 text-xs text-slate-300">
                    <span className="inline-flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" />
                      Keep the momentum steady with a short, guided session.
                    </span>
                  </div>

                  <a
                    href={`/app/parent/children/${recommendation.childId}`}
                    className="block"
                    onClick={() => setSelectedChildId(recommendation.childId)}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-between"
                      rightIcon={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
                    >
                      Open {recommendation.childName}&apos;s detail
                    </Button>
                  </a>
                </div>
              </div>
            ) : (
              <EmptyState
                title="No recommendation"
                description="Select a child to see their focus recommendation."
              />
            )}
          </ParentSection>

          <ParentSection title="Today's activity" subtitle="Latest moments across the learning galaxy.">
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <Card key={activity.id} className="border border-slate-800/80 bg-slate-950/50 p-3.5">
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full border"
                      style={{
                        backgroundColor: `${activity.type === 'concern' ? '#f43f5e' : activity.type === 'achievement' ? '#ec4899' : '#8b5cf6'}1a`,
                        borderColor: `${activity.type === 'concern' ? '#f43f5e' : activity.type === 'achievement' ? '#ec4899' : '#8b5cf6'}40`,
                        color: activity.type === 'concern' ? '#fda4af' : activity.type === 'achievement' ? '#f9a8d4' : '#c4b5fd',
                      }}
                    >
                      <Activity className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-slate-100">{activity.childName}</p>
                        <Badge variant={activity.type === 'concern' ? 'destructive' : activity.type === 'achievement' ? 'primary' : 'info'} size="sm">
                          {activity.type}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-slate-300">{activity.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-400">{activity.description}</p>
                      <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">{activity.time}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ParentSection>

          <ParentSection title="Needs attention" subtitle="Things that may deserve a conversation today.">
            {attentionItems.length > 0 ? (
              <div className="space-y-3">
                {attentionItems.map((item) => (
                  <Card key={item.id} className="border border-amber-500/15 bg-slate-950/50 p-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-100">{item.childName}</p>
                        <p className="mt-1 text-sm text-slate-300">{item.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-400">{item.description}</p>
                      </div>
                      <Badge variant={item.severity === 'high' ? 'destructive' : item.severity === 'medium' ? 'warning' : 'info'} size="sm">
                        {item.severity}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState title="All clear" description="Nothing needs your attention right now." />
            )}
          </ParentSection>
        </div>
      </div>
    </Container>
  );
};
