import React from 'react';
import { useQueries } from '@tanstack/react-query';
import { BookOpen, Layers, Library, Plus, Rocket, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { EmptyState } from '@/components/ui/empty-state';
import { ErrorState } from '@/components/ui/error-state';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/toast';
import { TeacherNav } from '../components/TeacherNav';
import { FilterTabs } from '../components/FilterTabs';
import { TeachSubjectCard } from '../components/TeachSubjectCard';
import { useSubjects, useCreateSubject, CONTENT_QUERY_KEYS } from '@/features/subjects/hooks/use-content';
import { adaptApiSubjectToTeacher, getSubjectTotalsFromChapters } from '../adapters';
import { cn } from '@/lib/utils';
import type { TeacherSubject } from '../types';
import { apiClient } from '@/lib/axios';

type SubjectFilter = 'all' | 'published' | 'drafts';

const FILTERS: { id: SubjectFilter; label: string; description: string }[] = [
  { id: 'all', label: 'All', description: 'Every subject in your library' },
  { id: 'published', label: 'Published', description: 'Subjects that contain at least one published lesson' },
  { id: 'drafts', label: 'Drafts', description: 'Subjects that still contain unpublished lessons' },
];

const SUBJECT_COLORS = ['#6366f1', '#10b981', '#0ea5e9', '#f43f5e', '#f59e0b', '#8b5cf6'];

interface SubjectWithTotals extends TeacherSubject {
  totals: { chapters: number; lessons: number; published: number; drafts: number };
}

export const TeachSubjectLibrary: React.FC = () => {
  const { showToast } = useToast();
  const [query, setQuery] = React.useState('');
  const [filter, setFilter] = React.useState<SubjectFilter>('all');
  const [createOpen, setCreateOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [grade, setGrade] = React.useState('');
  const [color, setColor] = React.useState(SUBJECT_COLORS[0]);
  const [touched, setTouched] = React.useState(false);
  const createSubject = useCreateSubject();
  const titleMissing = touched && !title.trim();

  const { data: apiSubjects, isLoading, isError, refetch } = useSubjects();

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

  const grandTotals = React.useMemo(
    () =>
      subjectsWithTotals.reduce(
        (acc, subject) => ({
          chapters: acc.chapters + subject.totals.chapters,
          lessons: acc.lessons + subject.totals.lessons,
          published: acc.published + subject.totals.published,
          drafts: acc.drafts + subject.totals.drafts,
        }),
        { chapters: 0, lessons: 0, published: 0, drafts: 0 }
      ),
    [subjectsWithTotals]
  );

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
        case 'all':
        default:
          return true;
      }
    });
  }, [subjectsWithTotals, query, filter]);

  const counts = React.useMemo(
    () => ({
      all: subjectsWithTotals.length,
      published: subjectsWithTotals.filter((s) => s.totals.published > 0).length,
      drafts: subjectsWithTotals.filter((s) => s.totals.drafts > 0).length,
    }),
    [subjectsWithTotals]
  );

  const openCreate = React.useCallback(() => {
    setTouched(false);
    setCreateOpen(true);
  }, []);

  const closeCreate = React.useCallback(() => {
    setCreateOpen(false);
    setTitle('');
    setDescription('');
    setGrade('');
    setColor(SUBJECT_COLORS[0]);
    setTouched(false);
  }, []);

  const handleCreate = async (): Promise<void> => {
    if (!title.trim()) {
      setTouched(true);
      return;
    }
    try {
      await createSubject.mutateAsync({
        title: title.trim(),
        description: description.trim() || undefined,
        color,
        grade: grade.trim() || undefined,
      });
      closeCreate();
      showToast({ title: 'Subject created', description: 'Your new subject has been created.', variant: 'success' });
    } catch {
      showToast({ title: 'Error', description: 'Failed to create subject.', variant: 'error' });
    }
  };

  const isFilteredOut = subjectsWithTotals.length > 0 && filtered.length === 0;

  return (
    <Container size="xl" className="space-y-8">
      <TeacherNav />

      <section
        aria-label="Content Studio"
        className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/15 via-slate-900/70 to-violet-600/15 px-6 py-8 sm:px-8"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:28px_28px] opacity-60"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-16 right-24 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" aria-hidden="true" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
              <Rocket className="h-3.5 w-3.5" aria-hidden="true" />
              Teacher Learning Studio
            </p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
              Your Subjects
            </h1>
            <p className="max-w-xl text-sm text-slate-400">
              Author chapters and lessons, track what is published, and manage drafts — all from one
              calm, focused workspace.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs text-slate-300">
                <Library className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
                {counts.all} subject{counts.all === 1 ? '' : 's'}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs text-slate-300">
                <Layers className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
                {grandTotals.chapters} chapters
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs text-slate-300">
                <BookOpen className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
                {grandTotals.lessons} lessons
              </span>
            </div>
          </div>
          <Button size="lg" leftIcon={<Plus className="h-5 w-5" aria-hidden="true" />} onClick={openCreate}>
            Create Subject
          </Button>
        </div>
      </section>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1.5">
          <FilterTabs
            tabs={FILTERS.map((f) => ({ id: f.id, label: f.label, count: counts[f.id] }))}
            value={filter}
            onChange={setFilter}
            className="md:max-w-3xl"
          />
          <p className="hidden text-xs text-slate-500 md:block">
            {FILTERS.find((f) => f.id === filter)?.description}
          </p>
        </div>
        <Input
          variantType="search"
          placeholder="Search subjects…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="md:max-w-xs"
          aria-label="Search subjects"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-3 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-0">
              <Skeleton className="h-24 rounded-none" />
              <div className="space-y-3 p-5">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          ))
        ) : isError ? (
          <div className="col-span-full">
            <ErrorState
              title="Failed to load subjects"
              message="We couldn't fetch your subject library. Check your connection and try again."
              onRetry={() => void refetch()}
            />
          </div>
        ) : subjectsWithTotals.length === 0 ? (
          <div className="col-span-full">
            <EmptyState
              icon={<Sparkles className="h-8 w-8" />}
              title="Welcome to your learning studio"
              description="Create your first subject to start authoring chapters and lessons."
              actionText="Create Subject"
              onAction={openCreate}
            />
          </div>
        ) : filtered.length > 0 ? (
          filtered.map((subject) => (
            <TeachSubjectCard key={subject.id} subject={subject} totals={subject.totals} />
          ))
        ) : (
          <button
            type="button"
            onClick={openCreate}
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
        )}
      </div>

      {isFilteredOut && (
        <EmptyState
          title={query.trim() ? 'No subjects match your search' : 'No subjects in this view'}
          description={
            query.trim()
              ? `Try a different search term or clear your filters to see all subjects.`
              : `Try another filter to see more of your subjects.`
          }
        />
      )}

      <Modal
        isOpen={createOpen}
        onClose={closeCreate}
        title="Create Subject"
        description="Give your subject a clear, descriptive title. Optional details help learners find it."
      >
        <div className="space-y-5">
          <Input
            label="Subject title *"
            placeholder="e.g. Mathematics"
            value={title}
            autoFocus
            onChange={(event) => { setTitle(event.target.value); setTouched(true); }}
            onKeyDown={(event) => { if (event.key === 'Enter') void handleCreate(); }}
            error={titleMissing ? 'A subject title is required.' : undefined}
          />
          <Textarea
            label="Description"
            placeholder="What will learners explore in this subject?"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="min-h-[72px]"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Grade (optional)"
              placeholder="e.g. Grade 10"
              value={grade}
              onChange={(event) => setGrade(event.target.value)}
            />
            <div className="space-y-1.5">
              <span className="block text-xs font-semibold tracking-wide text-slate-300 uppercase">Color</span>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {SUBJECT_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-label={`Use color ${c}`}
                    onClick={() => setColor(c)}
                    className={cn(
                      'h-7 w-7 rounded-full border-2 transition-transform',
                      color === c ? 'scale-110 border-white' : 'border-transparent hover:scale-105'
                    )}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={closeCreate} disabled={createSubject.isPending}>
              Cancel
            </Button>
            <Button
              onClick={() => void handleCreate()}
              disabled={!title.trim() || createSubject.isPending}
              leftIcon={<Plus className="h-4 w-4" aria-hidden="true" />}
            >
              {createSubject.isPending ? 'Creating…' : 'Create Subject'}
            </Button>
          </div>
        </div>
      </Modal>
    </Container>
  );
};
