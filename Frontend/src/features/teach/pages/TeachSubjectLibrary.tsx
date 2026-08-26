import React from 'react';
import { useQueries } from '@tanstack/react-query';
import { Plus, Rocket } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { GalaxyGlow } from '@/components/theme/GalaxyGlow';
import { Reveal } from '@/components/landing/Reveal';
import { useToast } from '@/components/ui/toast';
import { TeacherNav } from '../components/TeacherNav';
import { FilterTabs } from '../components/FilterTabs';
import { TeachSubjectCard } from '../components/TeachSubjectCard';
import { useSubjects, useCreateSubject, CONTENT_QUERY_KEYS } from '@/features/subjects/hooks/use-content';
import { adaptApiSubjectToTeacher, getSubjectTotalsFromChapters } from '../adapters';
import { cn } from '@/lib/utils';
import type { TeacherSubject } from '../types';
import { apiClient } from '@/lib/axios';

type SubjectFilter = 'all' | 'mine' | 'published' | 'drafts';

const FILTERS: { id: SubjectFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'mine', label: 'My Subjects' },
  { id: 'published', label: 'Published' },
  { id: 'drafts', label: 'Drafts' },
];

interface SubjectWithTotals extends TeacherSubject {
  totals: { chapters: number; lessons: number; published: number; drafts: number };
}

export const TeachSubjectLibrary: React.FC = () => {
  const { showToast } = useToast();
  const [query, setQuery] = React.useState('');
  const [filter, setFilter] = React.useState<SubjectFilter>('all');
  const [newTitle, setNewTitle] = React.useState('');
  const [showCreate, setShowCreate] = React.useState(false);
  const createSubject = useCreateSubject();

  const { data: apiSubjects, isLoading } = useSubjects();

  const subjectIds = React.useMemo(
    () => (apiSubjects ?? []).map((s) => s.id),
    [apiSubjects]
  );

  const chapterQueries = useQueries({
    queries: subjectIds.map((id) => ({
      queryKey: [...CONTENT_QUERY_KEYS.subjectChapters(id)] as unknown[],
      queryFn: async () => {
        const res = await apiClient.get<{ data: Array<{ id: string; status: string; lessons?: Array<{ status: string }> }> }>(`/subjects/${id}/chapters`);
        return res.data.data;
      },
      enabled: Boolean(id),
    })),
  });

  const subjectsWithTotals: SubjectWithTotals[] = React.useMemo(() => {
    if (!apiSubjects) return [];
    return apiSubjects.map((s, i) => {
      const chapters = (chapterQueries[i]?.data ?? []) as Array<{ id: string; status: string; lessons?: Array<{ status: string }> }>;
      return {
        ...adaptApiSubjectToTeacher(s),
        totals: getSubjectTotalsFromChapters(chapters),
      };
    });
  }, [apiSubjects, chapterQueries]);

  const filtered = React.useMemo(() => {
    return subjectsWithTotals.filter((subject) => {
      const matchesQuery =
        query.trim() === '' ||
        `${subject.title} ${subject.description}`.toLowerCase().includes(query.trim().toLowerCase());

      if (!matchesQuery) return false;

      switch (filter) {
        case 'published':
          return subject.totals.published > 0;
        case 'drafts':
          return subject.totals.drafts > 0;
        case 'mine':
        default:
          return true;
      }
    });
  }, [subjectsWithTotals, query, filter]);

  const counts = React.useMemo(
    () => ({
      all: subjectsWithTotals.length,
      mine: subjectsWithTotals.length,
      published: subjectsWithTotals.filter((s) => s.totals.published > 0).length,
      drafts: subjectsWithTotals.filter((s) => s.totals.drafts > 0).length,
    }),
    [subjectsWithTotals]
  );

  const handleCreate = async (): Promise<void> => {
    if (!newTitle.trim()) return;
    try {
      await createSubject.mutateAsync({ title: newTitle.trim() });
      setNewTitle('');
      setShowCreate(false);
      showToast({ title: 'Subject created', description: 'Your new subject has been created.', variant: 'success' });
    } catch {
      showToast({ title: 'Error', description: 'Failed to create subject.', variant: 'error' });
    }
  };

  if (isLoading) {
    return (
      <Container size="xl" className="space-y-8">
        <TeacherNav />
        <Skeleton className="h-40 rounded-3xl" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-60 rounded-2xl" />
          ))}
        </div>
      </Container>
    );
  }

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
              onClick={() => setShowCreate(!showCreate)}
            >
              Create Subject
            </Button>
          </div>
        </section>
      </Reveal>

      {showCreate && (
        <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <Input
            placeholder="Subject title..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') void handleCreate(); }}
            className="flex-1"
            aria-label="New subject title"
          />
          <Button onClick={() => void handleCreate()} disabled={!newTitle.trim() || createSubject.isPending}>
            {createSubject.isPending ? 'Creating...' : 'Create'}
          </Button>
          <Button variant="ghost" onClick={() => { setShowCreate(false); setNewTitle(''); }}>
            Cancel
          </Button>
        </div>
      )}

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
            <TeachSubjectCard key={subject.id} subject={subject} totals={subject.totals} />
          ))}
          <button
            type="button"
            onClick={() => setShowCreate(true)}
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
