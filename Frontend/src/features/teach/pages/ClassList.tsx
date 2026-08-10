import React from 'react';
import { GraduationCap, Target, TrendingUp, Users } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { EmptyState } from '@/components/ui/empty-state';
import { GalaxyGlow } from '@/components/theme/GalaxyGlow';
import { Reveal } from '@/components/landing/Reveal';
import { TeacherNav } from '../components/TeacherNav';
import { TeacherStatGrid } from '../components/TeacherStatGrid';
import { FilterTabs } from '../components/FilterTabs';
import { ClassGrid } from '../components/ClassGrid';
import { ACTIVE_CLASSES, CLASSES } from '../data';
import type { TeacherStat } from '../types';

type ClassFilter = 'all' | 'active' | 'archived';

const FILTERS: { id: ClassFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'archived', label: 'Archived' },
];

const average = (values: number[]): number =>
  values.length === 0 ? 0 : Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);

export const ClassList: React.FC = () => {
  const [query, setQuery] = React.useState('');
  const [filter, setFilter] = React.useState<ClassFilter>('all');

  const stats = React.useMemo<TeacherStat[]>(
    () => [
      { id: 'cls-1', label: 'Active Classes', value: ACTIVE_CLASSES.length, icon: Users },
      {
        id: 'cls-2',
        label: 'Total Students',
        value: CLASSES.reduce((sum, klass) => sum + klass.studentCount, 0),
        icon: GraduationCap,
      },
      {
        id: 'cls-3',
        label: 'Average Completion',
        value: average(ACTIVE_CLASSES.map((klass) => klass.completion)),
        unit: '%',
        icon: Target,
      },
      {
        id: 'cls-4',
        label: 'Average Score',
        value: average(ACTIVE_CLASSES.map((klass) => klass.averageScore)),
        unit: '%',
        icon: TrendingUp,
      },
    ],
    []
  );

  const filtered = React.useMemo(() => {
    return CLASSES.filter((klass) => {
      const matchesQuery =
        query.trim() === '' ||
        `${klass.name} ${klass.subject}`.toLowerCase().includes(query.trim().toLowerCase());
      const matchesFilter = filter === 'all' || klass.status === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  const counts = React.useMemo(
    () => ({
      all: CLASSES.length,
      active: ACTIVE_CLASSES.length,
      archived: CLASSES.length - ACTIVE_CLASSES.length,
    }),
    []
  );

  return (
    <Container size="xl" className="space-y-8">
      <TeacherNav />

      <Reveal y={16}>
        <section
          aria-label="Your Classes"
          className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/15 via-slate-900/70 to-violet-600/15 px-6 py-8 sm:px-8"
        >
          <GalaxyGlow color="sky" x="90%" y="-20%" size={340} opacity={0.16} />
          <div className="relative space-y-1.5">
            <h1 className="font-display text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
              Your Classes
            </h1>
            <p className="max-w-xl text-sm text-slate-400">
              Monitor rosters, completion and performance across every class you teach.
            </p>
          </div>
        </section>
      </Reveal>

      <TeacherStatGrid stats={stats} />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <FilterTabs
          tabs={FILTERS.map((f) => ({ id: f.id, label: f.label, count: counts[f.id] }))}
          value={filter}
          onChange={setFilter}
          className="md:max-w-sm"
        />
        <Input
          variantType="search"
          placeholder="Search classes…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="md:max-w-xs"
          aria-label="Search classes"
        />
      </div>

      {filtered.length > 0 ? (
        <ClassGrid classes={filtered} />
      ) : (
        <EmptyState
          title="No classes found"
          description="Try a different search term or filter."
        />
      )}
    </Container>
  );
};
