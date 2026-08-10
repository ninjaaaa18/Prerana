import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, FilePlus2, FolderPlus, Layers, Pencil, Plus } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress-bar';
import { EmptyState } from '@/components/ui/empty-state';
import { useToast } from '@/components/ui/toast';
import { TeacherNav } from '../components/TeacherNav';
import { ContentStatusBadge } from '../components/ContentStatusBadge';
import { getChaptersForSubject, getSubject, getSubjectTotals } from '../data';
import { LESSON_TYPE_LABELS } from '../utils';
import { cn } from '@/lib/utils';

export const TeachSubjectDetail: React.FC = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { subjectId = '' } = useParams<{ subjectId: string }>();

  const subject = getSubject(subjectId);

  if (!subject) {
    return (
      <Container size="md">
        <TeacherNav className="mb-8" />
        <EmptyState
          icon={<Layers className="h-8 w-8" />}
          title="Subject not found"
          description="This subject may have been removed. Choose another subject from your library."
          actionText="Back to Subjects"
          onAction={() => {
            navigate('/app/teach/subjects');
          }}
        />
      </Container>
    );
  }

  const chapters = getChaptersForSubject(subject.id);
  const totals = getSubjectTotals(subject.id);
  const overallProgress = totals.lessons === 0 ? 0 : Math.round((totals.published / totals.lessons) * 100);

  return (
    <Container size="xl" className="space-y-8">
      <TeacherNav />

      <Link
        to="/app/teach/subjects"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Subjects
      </Link>

      <section
        aria-label={subject.title}
        className="relative overflow-hidden rounded-3xl border px-6 py-8 sm:px-8"
        style={{
          borderColor: `${subject.color}30`,
          background: `linear-gradient(120deg, ${subject.color}1f, rgba(2,6,23,0.75) 55%, ${subject.color}14)`,
        }}
      >
        <div
          className="absolute -right-10 -top-12 h-48 w-48 rounded-full blur-3xl"
          style={{ backgroundColor: `${subject.color}40` }}
          aria-hidden="true"
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary" size="sm">
                {subject.grade}
              </Badge>
              <ContentStatusBadge status={totals.published > 0 ? 'published' : 'draft'} size="sm" />
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
              {subject.title}
            </h1>
            <p className="text-sm leading-relaxed text-slate-300">{subject.description}</p>
            <p className="text-xs text-slate-500">Last updated {subject.lastUpdated}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              leftIcon={<FolderPlus className="h-4 w-4" aria-hidden="true" />}
              onClick={() =>
                showToast({
                  title: 'Add Chapter',
                  description: 'Chapter creation is simulated in this preview.',
                  variant: 'info',
                })
              }
            >
              Add Chapter
            </Button>
            <Link
              to="/app/teach/lessons/new"
              className={cn(buttonVariants(), 'inline-flex items-center gap-2')}
            >
              <FilePlus2 className="h-4 w-4" aria-hidden="true" />
              Create Lesson
            </Link>
          </div>
        </div>

        <div className="relative mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="space-y-2 py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Chapters</p>
            <p className="font-display text-2xl font-extrabold text-slate-100">{totals.chapters}</p>
          </Card>
          <Card className="space-y-2 py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Lessons</p>
            <p className="font-display text-2xl font-extrabold text-slate-100">{totals.lessons}</p>
          </Card>
          <Card className="space-y-2 py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Published</p>
            <p className="font-display text-2xl font-extrabold text-emerald-400">{totals.published}</p>
          </Card>
          <Card className="space-y-2 py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Drafts</p>
            <p className="font-display text-2xl font-extrabold text-amber-400">{totals.drafts}</p>
          </Card>
        </div>

        <div className="relative mt-6 max-w-xl space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300">Overall content progress</span>
            <span className="font-semibold text-slate-200">{overallProgress}%</span>
          </div>
          <ProgressBar value={overallProgress} variant="primary" />
        </div>
      </section>

      <section aria-label="Chapters" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight text-slate-100">Chapters</h2>
            <p className="text-sm text-slate-400">Manage chapters and the lessons inside them.</p>
          </div>
        </div>

        {chapters.length === 0 ? (
          <EmptyState
            title="No chapters yet"
            description="Add your first chapter to start authoring lessons."
            actionText="Add Chapter"
            onAction={() =>
              showToast({
                title: 'Add Chapter',
                description: 'Chapter creation is simulated in this preview.',
                variant: 'info',
              })
            }
          />
        ) : (
          <div className="space-y-4">
            {chapters.map((chapter) => (
              <Card key={chapter.id} className="space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-lg font-bold text-slate-100">{chapter.title}</h3>
                      <ContentStatusBadge status={chapter.status} size="sm" />
                    </div>
                    <p className="max-w-2xl text-sm text-slate-400">{chapter.description}</p>
                    <p className="text-xs text-slate-500">
                      {chapter.lessons.length} lesson{chapter.lessons.length === 1 ? '' : 's'}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      showToast({
                        title: 'Manage Chapter',
                        description: `Chapter management for "${chapter.title}" is simulated in this preview.`,
                        variant: 'info',
                      })
                    }
                  >
                    Manage
                  </Button>
                </div>

                {chapter.lessons.length > 0 && (
                  <ul className="divide-y divide-slate-800/70 rounded-xl border border-slate-800 bg-slate-950/40">
                    {chapter.lessons.map((lesson) => (
                      <li key={lesson.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800/80 text-indigo-400">
                          <BookOpen className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div className="min-w-0 flex-1 space-y-0.5">
                          <p className="truncate text-sm font-semibold text-slate-100">{lesson.title}</p>
                          <p className="text-xs text-slate-500">
                            {LESSON_TYPE_LABELS[lesson.type]} · {lesson.estimatedMinutes} min · v{lesson.version} ·{' '}
                            {lesson.lastUpdated}
                          </p>
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
                  </ul>
                )}

                {chapter.lessons.length === 0 && (
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-slate-700 px-4 py-3">
                    <p className="text-sm text-slate-500">No lessons in this chapter yet.</p>
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
              </Card>
            ))}
          </div>
        )}
      </section>
    </Container>
  );
};
