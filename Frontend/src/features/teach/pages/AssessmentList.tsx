import React from 'react';
import { ClipboardCheck, FileQuestion, Plus, Rocket, TrendingUp } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { EmptyState } from '@/components/ui/empty-state';
import { useToast } from '@/components/ui/toast';
import { GalaxyGlow } from '@/components/theme/GalaxyGlow';
import { Reveal } from '@/components/landing/Reveal';
import { TeacherNav } from '../components/TeacherNav';
import { TeacherStatGrid } from '../components/TeacherStatGrid';
import { FilterTabs } from '../components/FilterTabs';
import { AssessmentGrid } from '../components/AssessmentGrid';
import { ContentStatusBadge } from '../components/ContentStatusBadge';
import { ASSESSMENTS, getQuestionsForAssessment } from '../data';
import { DIFFICULTY_LABELS } from '../utils';
import type { TeacherAssessment, TeacherStat } from '../types';

type AssessmentFilter = 'all' | 'published' | 'draft' | 'archived';

const FILTERS: { id: AssessmentFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'published', label: 'Published' },
  { id: 'draft', label: 'Draft' },
  { id: 'archived', label: 'Archived' },
];

export const AssessmentList: React.FC = () => {
  const { showToast } = useToast();
  const [filter, setFilter] = React.useState<AssessmentFilter>('all');
  const [preview, setPreview] = React.useState<TeacherAssessment | null>(null);

  const stats = React.useMemo<TeacherStat[]>(
    () => [
      { id: 'as-1', label: 'Total Assessments', value: ASSESSMENTS.length, icon: ClipboardCheck },
      {
        id: 'as-2',
        label: 'Published',
        value: ASSESSMENTS.filter((a) => a.status === 'published').length,
        icon: Rocket,
      },
      {
        id: 'as-3',
        label: 'Drafts',
        value: ASSESSMENTS.filter((a) => a.status === 'draft').length,
        icon: FileQuestion,
      },
      {
        id: 'as-4',
        label: 'Average Score',
        value: Math.round(
          ASSESSMENTS.filter((a) => a.attempts > 0).reduce((sum, a) => sum + a.averageScore, 0) /
            Math.max(1, ASSESSMENTS.filter((a) => a.attempts > 0).length)
        ),
        unit: '%',
        icon: TrendingUp,
      },
    ],
    []
  );

  const filtered = React.useMemo(() => {
    if (filter === 'all') return ASSESSMENTS;
    return ASSESSMENTS.filter((assessment) => assessment.status === filter);
  }, [filter]);

  const counts = React.useMemo(
    () => ({
      all: ASSESSMENTS.length,
      published: ASSESSMENTS.filter((a) => a.status === 'published').length,
      draft: ASSESSMENTS.filter((a) => a.status === 'draft').length,
      archived: ASSESSMENTS.filter((a) => a.status === 'archived').length,
    }),
    []
  );

  const previewQuestions = preview ? getQuestionsForAssessment(preview.id) : [];

  return (
    <Container size="xl" className="space-y-8">
      <TeacherNav />

      <Reveal y={16}>
        <section
          aria-label="Assessment Studio"
          className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/15 via-slate-900/70 to-violet-600/15 px-6 py-8 sm:px-8"
        >
          <GalaxyGlow color="violet" x="90%" y="-20%" size={340} opacity={0.16} />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1.5">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
                <Rocket className="h-3.5 w-3.5" aria-hidden="true" />
                Assessment Studio
              </p>
              <h1 className="font-display text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
                Assessments
              </h1>
              <p className="max-w-xl text-sm text-slate-400">
                Build, preview and manage quizzes for your classes.
              </p>
            </div>
            <Button
              size="lg"
              leftIcon={<Plus className="h-5 w-5" aria-hidden="true" />}
              onClick={() =>
                showToast({
                  title: 'Create Assessment',
                  description: 'Assessment creation is simulated in this preview.',
                  variant: 'info',
                })
              }
            >
              Create Assessment
            </Button>
          </div>
        </section>
      </Reveal>

      <TeacherStatGrid stats={stats} />

      <FilterTabs
        tabs={FILTERS.map((f) => ({ id: f.id, label: f.label, count: counts[f.id] }))}
        value={filter}
        onChange={setFilter}
        className="md:max-w-lg"
      />

      {filtered.length > 0 ? (
        <AssessmentGrid
          assessments={filtered}
          onPreview={setPreview}
          onDuplicate={(assessment) =>
            showToast({
              title: 'Assessment duplicated',
              description: `A copy of "${assessment.title}" is being prepared.`,
              variant: 'success',
            })
          }
          onViewResults={(assessment) =>
            showToast({
              title: 'View results',
              description:
                assessment.attempts > 0
                  ? `${assessment.attempts} attempts · average ${assessment.averageScore}%.`
                  : 'No attempts recorded yet for this assessment.',
              variant: 'info',
            })
          }
        />
      ) : (
        <EmptyState
          title="No assessments here"
          description="Try a different filter, or create a new assessment."
        />
      )}

      <Modal
        isOpen={preview !== null}
        onClose={() => setPreview(null)}
        title={preview?.title ?? 'Assessment preview'}
        description={preview ? `${preview.subject} · ${preview.chapter}` : undefined}
        maxWidth="2xl"
      >
        {preview && (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <ContentStatusBadge status={preview.status} size="sm" />
              <Badge variant="outline" size="sm">
                {preview.questionCount} questions
              </Badge>
              <Badge variant="outline" size="sm">
                {DIFFICULTY_LABELS[preview.difficulty]}
              </Badge>
              <Badge variant="outline" size="sm">
                {preview.durationMinutes} min
              </Badge>
            </div>

            {previewQuestions.length > 0 ? (
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Question preview
                </p>
                {previewQuestions.map((question, index) => (
                  <div key={question.id} className="rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2.5">
                    <p className="text-sm text-slate-200">
                      {index + 1}. {question.prompt}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">
                This assessment has no editable questions loaded in this preview.
              </p>
            )}
          </div>
        )}
      </Modal>
    </Container>
  );
};
