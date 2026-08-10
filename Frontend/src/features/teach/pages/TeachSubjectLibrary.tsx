import React from 'react';
import { Plus, Rocket } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { GalaxyGlow } from '@/components/theme/GalaxyGlow';
import { Reveal } from '@/components/landing/Reveal';
import { useToast } from '@/components/ui/toast';
import { TeacherNav } from '../components/TeacherNav';
import { FilterTabs } from '../components/FilterTabs';
import { TeachSubjectCard } from '../components/TeachSubjectCard';
import { getSubjectTotals, SUBJECTS } from '../data';
import { cn } from '@/lib/utils';

type SubjectFilter = 'all' | 'mine' | 'published' | 'drafts';

const FILTERS: { id: SubjectFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'mine', label: 'My Subjects' },
  { id: 'published', label: 'Published' },
  { id: 'drafts', label: 'Drafts' },
];

export const TeachSubjectLibrary: React.FC = () => {
  const { showToast } = useToast();
  const [query, setQuery] = React.useState('');
  const [filter, setFilter] = React.useState<SubjectFilter>('all');

  const filtered = React.useMemo(() => {
    return SUBJECTS.filter((subject) => {
      const matchesQuery =
        query.trim() === '' ||
        `${subject.title} ${subject.description}`.toLowerCase().includes(query.trim().toLowerCase());

      if (!matchesQuery) return false;

      const totals = getSubjectTotals(subject.id);
      switch (filter) {
        case 'published':
          return totals.published > 0;
        case 'drafts':
          return totals.drafts > 0;
        case 'mine':
        default:
          return true;
      }
    });
  }, [query, filter]);

  const counts = React.useMemo(
    () => ({
      all: SUBJECTS.length,
      mine: SUBJECTS.length,
      published: SUBJECTS.filter((s) => getSubjectTotals(s.id).published > 0).length,
      drafts: SUBJECTS.filter((s) => getSubjectTotals(s.id).drafts > 0).length,
    }),
    []
  );

  return (
    <Container size="xl" className="space-y-8">
      <TeacherNav />

      <Reveal y={16}>
        <section
          aria-label="Content Studio"
          className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/15 via-slate-900/70 to-violet-600/15 px-6 py-8 sm:px-8"
        >
          <GalaxyGlow color="indigo" x="12%" y="-30%" size={360} opacity={0.2} />
          <GalaxyGlow color="violet" x="88%" y="110%" size={320} opacity={0.16} />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1.5">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
                <Rocket className="h-3.5 w-3.5" aria-hidden="true" />
                Content Studio
              </p>
              <h1 className="font-display text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
                Your Subjects
              </h1>
              <p className="max-w-xl text-sm text-slate-400">
                Author chapters and lessons, track what is published, and manage drafts from one place.
              </p>
            </div>
            <Button
              size="lg"
              leftIcon={<Plus className="h-5 w-5" aria-hidden="true" />}
              onClick={() =>
                showToast({
                  title: 'Create Subject',
                  description: 'Subject creation is simulated in this preview.',
                  variant: 'info',
                })
              }
            >
              Create Subject
            </Button>
          </div>
        </section>
      </Reveal>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <FilterTabs
          tabs={FILTERS.map((f) => ({ id: f.id, label: f.label, count: counts[f.id] }))}
          value={filter}
          onChange={setFilter}
          className="md:max-w-3xl"
        />
        <Input
          variantType="search"
          placeholder="Search subjects…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="md:max-w-xs"
          aria-label="Search subjects"
        />
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((subject) => (
            <TeachSubjectCard key={subject.id} subject={subject} />
          ))}
          <button
            type="button"
            onClick={() =>
              showToast({
                title: 'Create Subject',
                description: 'Subject creation is simulated in this preview.',
                variant: 'info',
              })
            }
            className={cn(
              'flex min-h-[240px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-700 bg-slate-900/30 text-slate-400 transition-colors hover:border-slate-600 hover:bg-slate-900/60 hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'
            )}
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800/80 text-indigo-400">
              <Plus className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold">Create a new subject</span>
            <span className="px-6 text-center text-xs text-slate-500">
              Start authoring content for a brand new subject.
            </span>
          </button>
        </div>
      ) : (
        <EmptyState
          title="No subjects found"
          description="Try a different search term or filter."
        />
      )}
    </Container>
  );
};
