import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, CheckCircle2, ChevronRight, FilePlus2, FileText, FolderPlus, GraduationCap, Layers, Pencil, Plus, Clock } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Modal } from '@/components/ui/modal';
import { ProgressBar } from '@/components/ui/progress-bar';
import { EmptyState } from '@/components/ui/empty-state';
import { ErrorState } from '@/components/ui/error-state';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/toast';
import { TeacherNav } from '../components/TeacherNav';
import { ContentStatusBadge } from '../components/ContentStatusBadge';
import { useSubject, useSubjectChapters, useCreateChapter } from '@/features/subjects/hooks/use-content';
import { adaptApiSubjectToTeacher, adaptApiChapterToTeacher, getSubjectTotalsFromChapters } from '../adapters';
import { DIFFICULTY_LABELS, LESSON_TYPE_LABELS } from '../utils';
import { cn } from '@/lib/utils';
import type { ContentStatus } from '../types';

function ChapterNumber({ index }: { index: number }) {
  return (
    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 font-display text-sm font-bold text-indigo-300">
      {index + 1}
    </span>
  );
}

const chapterStatusHint = (status: ContentStatus): string => {
  switch (status) {
    case 'published':
      return 'Live and visible to students';
    case 'review':
      return 'Awaiting review before publishing';
    case 'archived':
      return 'Hidden from students';
    default:
      return 'Not published yet';
  }
};

export const TeachSubjectDetail: React.FC = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { subjectId = '' } = useParams<{ subjectId: string }>();

  const { data: apiSubject, isLoading: subjectLoading, isError: subjectError } = useSubject(subjectId);
  const { data: apiChapters, isLoading: chaptersLoading, isError: chaptersError } = useSubjectChapters(subjectId);
  const createChapter = useCreateChapter();

  const [chapterOpen, setChapterOpen] = React.useState(false);
  const [chapterTitle, setChapterTitle] = React.useState('');
  const [chapterDescription, setChapterDescription] = React.useState('');
  const [chapterTouched, setChapterTouched] = React.useState(false);
  const chapterTitleMissing = chapterTouched && !chapterTitle.trim();

  const subject = apiSubject ? adaptApiSubjectToTeacher(apiSubject) : undefined;
  const chapters = (apiChapters ?? []).map(adaptApiChapterToTeacher);
  const totals = apiChapters ? getSubjectTotalsFromChapters(apiChapters) : { chapters: 0, lessons: 0, published: 0, drafts: 0 };
  const overallProgress = totals.lessons === 0 ? 0 : Math.round((totals.published / totals.lessons) * 100);
  const isLoading = subjectLoading || chaptersLoading;

  const openChapterCreate = React.useCallback(() => {
    setChapterTouched(false);
    setChapterOpen(true);
  }, []);

  const closeChapterCreate = React.useCallback(() => {
    setChapterOpen(false);
    setChapterTitle('');
    setChapterDescription('');
    setChapterTouched(false);
  }, []);

  const handleCreateChapter = async (): Promise<void> => {
    if (!chapterTitle.trim()) {
      setChapterTouched(true);
      return;
    }
    try {
      await createChapter.mutateAsync({
        subjectId,
        data: {
          title: chapterTitle.trim(),
          ...(chapterDescription.trim() ? { description: chapterDescription.trim() } : {}),
        },
      });
      closeChapterCreate();
      showToast({ title: 'Chapter created', description: 'Your new chapter is ready for lessons.', variant: 'success' });
    } catch {
      showToast({ title: 'Error', description: 'Failed to create chapter. Please try again.', variant: 'error' });
    }
  };

  if (isLoading) {
    return (
      <Container size="xl" className="space-y-8">
        <TeacherNav />
        <Skeleton className="h-5 w-72" />
        <Skeleton className="h-64 rounded-3xl" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
      </Container>
    );
  }

  if (subjectError || !subject) {
    return (
      <Container size="md">
        <TeacherNav className="mb-8" />
        <ErrorState
          title="Subject not found"
          message="This subject may have been removed. Choose another subject from your library."
          onRetry={() => navigate('/app/teach/subjects')}
          retryText="Back to Subjects"
        />
      </Container>
    );
  }

  return (
    <Container size="xl" className="space-y-8">
      <TeacherNav />

      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-slate-400">
        <Link
          to="/app/teach/subjects"
          className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Subjects
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-600" aria-hidden="true" />
        <span className="truncate font-semibold text-slate-200">{subject.title}</span>
      </nav>

      <section
        aria-label={subject.title}
        className="relative overflow-hidden rounded-3xl border px-6 py-8 sm:px-8"
        style={{
          borderColor: `${subject.color}30`,
          background: `linear-gradient(120deg, ${subject.color}1f, rgba(2,6,23,0.75) 55%, ${subject.color}14)`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:28px_28px] opacity-60"
          aria-hidden="true"
        />
        <div
          className="absolute -right-10 -top-12 h-48 w-48 rounded-full blur-3xl"
          style={{ backgroundColor: `${subject.color}40` }}
          aria-hidden="true"
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary" size="sm">
                <GraduationCap className="h-3 w-3" aria-hidden="true" />
                {subject.grade}
              </Badge>
              <ContentStatusBadge status={totals.published > 0 ? 'published' : 'draft'} size="sm" />
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
              {subject.title}
            </h1>
            <p className="text-sm leading-relaxed text-slate-300">{subject.description}</p>
            <p className="text-xs text-slate-500">Last updated {subject.lastUpdated}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/app/teach/lessons/new"
              className={cn(buttonVariants(), 'inline-flex items-center gap-2')}
            >
              <FilePlus2 className="h-4 w-4" aria-hidden="true" />
              Create Lesson
            </Link>
          </div>
        </div>

        <div className="relative mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="space-y-1 rounded-2xl border border-slate-800/70 bg-slate-950/30 px-5 py-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Layers className="h-3.5 w-3.5" aria-hidden="true" />
              Chapters
            </p>
            <p className="font-display text-3xl font-extrabold text-slate-100">{totals.chapters}</p>
          </div>
          <div className="space-y-1 rounded-2xl border border-slate-800/70 bg-slate-950/30 px-5 py-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              Lessons
            </p>
            <p className="font-display text-3xl font-extrabold text-slate-100">{totals.lessons}</p>
          </div>
          <div className="space-y-1 rounded-2xl border border-slate-800/70 bg-slate-950/30 px-5 py-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              Published
            </p>
            <p className="font-display text-3xl font-extrabold text-emerald-400">{totals.published}</p>
          </div>
          <div className="space-y-1 rounded-2xl border border-slate-800/70 bg-slate-950/30 px-5 py-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <FileText className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
              Drafts
            </p>
            <p className="font-display text-3xl font-extrabold text-amber-400">{totals.drafts}</p>
          </div>
        </div>

        <div className="relative mt-6 max-w-xl space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300">Overall content progress</span>
            <span className="font-semibold text-slate-200">{overallProgress}% published</span>
          </div>
          <ProgressBar value={overallProgress} variant="primary" />
        </div>
      </section>

      <section aria-label="Chapters" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-100">Chapters</h2>
            <p className="text-sm text-slate-400">
              {totals.chapters} chapter{totals.chapters === 1 ? '' : 's'} · Manage the lessons inside each one.
            </p>
          </div>
          <Button variant="outline" size="sm" leftIcon={<FolderPlus className="h-4 w-4" aria-hidden="true" />} onClick={openChapterCreate}>
            Add Chapter
          </Button>
        </div>

        {chaptersError && (
          <ErrorState
            title="Failed to load chapters"
            message="We couldn't load the chapters for this subject. Please try again."
          />
        )}

        {!chaptersError && chapters.length === 0 && (
          <EmptyState
            title="No chapters yet"
            description="Add your first chapter to start authoring lessons."
            actionText="Add Chapter"
            onAction={openChapterCreate}
          />
        )}

        {!chaptersError && chapters.length > 0 && (
          <div className="space-y-4">
            {chapters.map((chapter, index) => (
              <Card key={chapter.id} className="space-y-4 overflow-hidden p-0">
                <div className="border-b border-slate-800/80 px-5 py-4 sm:px-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <ChapterNumber index={index} />
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-display text-lg font-bold text-slate-100">{chapter.title}</h3>
                          <ContentStatusBadge status={chapter.status} size="sm" />
                        </div>
                        <p className="text-xs text-slate-500">{chapterStatusHint(chapter.status)}</p>
                        {chapter.description && (
                          <p className="max-w-2xl text-sm text-slate-400">{chapter.description}</p>
                        )}
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                      <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                      {chapter.lessons.length} lesson{chapter.lessons.length === 1 ? '' : 's'}
                    </span>
                  </div>
                </div>

                <div className="px-5 pb-5 sm:px-6">
                  {chapter.lessons.length > 0 ? (
                    <ol className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/40">
                      {chapter.lessons.map((lesson, lessonIndex) => (
                        <li
                          key={lesson.id}
                          className="flex flex-wrap items-center gap-3 border-b border-slate-800/70 px-4 py-3 transition-colors last:border-b-0 hover:bg-slate-900/60"
                        >
                          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800/80 font-mono text-xs font-semibold text-indigo-400">
                            {lessonIndex + 1}
                          </span>
                          <div className="min-w-0 flex-1 space-y-0.5">
                            <p className="truncate text-sm font-semibold text-slate-100">{lesson.title}</p>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                              <span className="inline-flex items-center gap-1">
                                <Clock className="h-3 w-3" aria-hidden="true" />
                                {lesson.estimatedMinutes} min
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="capitalize">
                                {LESSON_TYPE_LABELS[lesson.type as keyof typeof LESSON_TYPE_LABELS] ?? lesson.type}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="capitalize">
                                {DIFFICULTY_LABELS[lesson.difficulty]}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>v{lesson.version}</span>
                              <span aria-hidden="true">·</span>
                              <span>{lesson.lastUpdated}</span>
                            </div>
                          </div>
                          <ContentStatusBadge status={lesson.status} size="sm" />
                          <Link
                            to={`/app/teach/lessons/${lesson.id}/edit`}
                            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'inline-flex items-center gap-1.5')}
                          >
                            <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                            Edit
                          </Link>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <div className="flex flex-col items-center justify-between gap-3 rounded-xl border border-dashed border-slate-700 px-4 py-5 text-center sm:flex-row sm:text-left">
                      <div>
                        <p className="text-sm font-medium text-slate-300">No lessons in this chapter yet</p>
                        <p className="text-xs text-slate-500">Add a lesson to start filling this chapter with content.</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Plus className="h-3.5 w-3.5" aria-hidden="true" />}
                        onClick={() => {
                          navigate('/app/teach/lessons/new');
                        }}
                      >
                        Create Lesson
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <Modal
        isOpen={chapterOpen}
        onClose={closeChapterCreate}
        title="Add Chapter"
        description={`Create a new chapter inside ${subject.title}.`}
      >
        <div className="space-y-5">
          <Input
            label="Chapter title *"
            placeholder="e.g. Quadratic Equations"
            value={chapterTitle}
            autoFocus
            onChange={(event) => { setChapterTitle(event.target.value); setChapterTouched(true); }}
            onKeyDown={(event) => { if (event.key === 'Enter') void handleCreateChapter(); }}
            error={chapterTitleMissing ? 'A chapter title is required.' : undefined}
          />
          <Textarea
            label="Description (optional)"
            placeholder="What will learners explore in this chapter?"
            value={chapterDescription}
            onChange={(event) => setChapterDescription(event.target.value)}
            className="min-h-[72px]"
          />
          <div className="flex items-center justify-end gap-2 pt-1">
            <Button variant="ghost" onClick={closeChapterCreate} disabled={createChapter.isPending}>
              Cancel
            </Button>
            <Button
              onClick={() => void handleCreateChapter()}
              disabled={!chapterTitle.trim() || createChapter.isPending}
              leftIcon={<FolderPlus className="h-4 w-4" aria-hidden="true" />}
            >
              {createChapter.isPending ? 'Creating…' : 'Add Chapter'}
            </Button>
          </div>
        </div>
      </Modal>
    </Container>
  );
};
