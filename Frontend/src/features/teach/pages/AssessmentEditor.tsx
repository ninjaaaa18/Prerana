import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ClipboardCheck, Eye, Rocket, Save, Send } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dropdown } from '@/components/ui/dropdown';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { useToast } from '@/components/ui/toast';
import { TeacherNav } from '../components/TeacherNav';
import { ContentStatusBadge } from '../components/ContentStatusBadge';
import { QuestionBuilder } from '../components/QuestionBuilder';
import { Toggle } from '../components/Toggle';
import { getAssessment, getQuestionsForAssessment, SUBJECTS } from '../data';
import { DIFFICULTY_LABELS } from '../utils';
import type { Difficulty, TeacherQuestion } from '../types';

const DIFFICULTIES: Difficulty[] = ['beginner', 'intermediate', 'advanced'];

export const AssessmentEditor: React.FC = () => {
  const { showToast } = useToast();
  const { assessmentId = '' } = useParams<{ assessmentId: string }>();
  const assessment = getAssessment(assessmentId);

  const [title, setTitle] = React.useState(assessment?.title ?? '');
  const [description, setDescription] = React.useState(
    assessment ? `Practice quiz covering ${assessment.chapter}.` : ''
  );
  const [subjectId, setSubjectId] = React.useState(assessment?.subjectId ?? SUBJECTS[0].id);
  const [chapter, setChapter] = React.useState(assessment?.chapter ?? '');
  const [duration, setDuration] = React.useState(String(assessment?.durationMinutes ?? 20));
  const [passingScore, setPassingScore] = React.useState(String(assessment?.passingScore ?? 40));
  const [difficulty, setDifficulty] = React.useState<Difficulty>(assessment?.difficulty ?? 'intermediate');
  const [questions, setQuestions] = React.useState<TeacherQuestion[]>(
    assessment ? getQuestionsForAssessment(assessment.id) : []
  );
  const [attempts, setAttempts] = React.useState('Unlimited');
  const [randomize, setRandomize] = React.useState(true);
  const [showAnswers, setShowAnswers] = React.useState(false);
  const [previewOpen, setPreviewOpen] = React.useState(false);

  if (!assessment) {
    return (
      <Container size="md">
        <TeacherNav className="mb-8" />
        <EmptyState
          icon={<ClipboardCheck className="h-8 w-8" />}
          title="Assessment not found"
          description="This assessment may have been removed. Pick another assessment to edit."
          actionText="Back to Assessments"
        />
      </Container>
    );
  }

  const subject = SUBJECTS.find((s) => s.id === subjectId);

  return (
    <Container size="xl" className="space-y-8">
      <TeacherNav />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/app/teach/assessments"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Assessments
          </Link>
          <div>
            <h1 className="font-display text-xl font-bold tracking-tight text-slate-100 sm:text-2xl">
              Edit Assessment
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <ContentStatusBadge status={assessment.status} size="sm" />
              <span>Updated {assessment.lastUpdated}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            leftIcon={<Save className="h-4 w-4" aria-hidden="true" />}
            onClick={() =>
              showToast({
                title: 'Draft saved',
                description: 'Your changes are stored locally in this preview.',
                variant: 'success',
              })
            }
          >
            Save Draft
          </Button>
          <Button
            variant="outline"
            leftIcon={<Eye className="h-4 w-4" aria-hidden="true" />}
            onClick={() => setPreviewOpen(true)}
          >
            Preview
          </Button>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-3">
        <div className="space-y-8 xl:col-span-2">
          <Card className="space-y-5">
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-slate-300">
              Assessment Details
            </h2>
            <Input
              label="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Quadratic Equations — Unit Test 1"
            />
            <Textarea
              label="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="min-h-[80px]"
              placeholder="Describe what this assessment covers…"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Dropdown
                label="Subject"
                options={SUBJECTS.map((s) => ({ label: s.title, value: s.id }))}
                value={subjectId}
                onChange={setSubjectId}
              />
              <Input
                label="Chapter"
                value={chapter}
                onChange={(event) => setChapter(event.target.value)}
                placeholder="e.g. Quadratic Equations"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Input
                label="Duration (minutes)"
                type="number"
                min={5}
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
              />
              <Input
                label="Passing score (%)"
                type="number"
                min={0}
                max={100}
                value={passingScore}
                onChange={(event) => setPassingScore(event.target.value)}
              />
              <Dropdown
                label="Difficulty"
                options={DIFFICULTIES.map((d) => ({
                  label: DIFFICULTY_LABELS[d],
                  value: d,
                }))}
                value={difficulty}
                onChange={(value) => setDifficulty(value as Difficulty)}
              />
            </div>
          </Card>

          <Card className="space-y-5">
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-slate-300">
              Question Builder
            </h2>
            <QuestionBuilder questions={questions} onChange={setQuestions} />
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="space-y-4">
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-slate-300">
              Assessment Settings
            </h2>
            <Input
              label="Allowed attempts"
              value={attempts}
              onChange={(event) => setAttempts(event.target.value)}
              placeholder="e.g. Unlimited or 2"
            />
            <div className="space-y-4 border-t border-slate-800 pt-4">
              <Toggle
                label="Randomize question order"
                description="Shuffle questions for each attempt."
                checked={randomize}
                onChange={setRandomize}
              />
              <Toggle
                label="Show answers after submission"
                description="Reveal correct answers once a student finishes."
                checked={showAnswers}
                onChange={setShowAnswers}
              />
            </div>
          </Card>

          <Card className="space-y-4">
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-slate-300">
              Publish
            </h2>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                leftIcon={<Send className="h-4 w-4" aria-hidden="true" />}
                onClick={() =>
                  showToast({
                    title: 'Submitted for review',
                    description: 'An admin will review this assessment before publishing.',
                    variant: 'info',
                  })
                }
              >
                Submit for Review
              </Button>
              <Button
                variant="primary"
                className="w-full"
                leftIcon={<Rocket className="h-4 w-4" aria-hidden="true" />}
                onClick={() =>
                  showToast({
                    title: 'Assessment published',
                    description: `${title} is now live (simulated in this preview).`,
                    variant: 'success',
                  })
                }
              >
                Publish
              </Button>
            </div>
            <p className="text-xs leading-relaxed text-slate-500">
              Publishing is simulated — no changes are saved outside this preview.
            </p>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title={title || 'Untitled assessment'}
        description={subject ? `${subject.title} · ${chapter || 'No chapter'}` : undefined}
        maxWidth="2xl"
      >
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" size="sm">
              {questions.length} questions
            </Badge>
            <Badge variant="secondary" size="sm">
              {DIFFICULTY_LABELS[difficulty]}
            </Badge>
            <Badge variant="secondary" size="sm">
              {duration} min
            </Badge>
            <Badge variant="secondary" size="sm">
              Pass {passingScore}%
            </Badge>
            {randomize && (
              <Badge variant="outline" size="sm">
                Randomized
              </Badge>
            )}
          </div>

          {questions.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Questions
              </p>
              {questions.map((question, index) => (
                <div key={question.id} className="rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2.5">
                  <p className="text-sm text-slate-200">
                    {index + 1}. {question.prompt}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">No questions added yet.</p>
          )}
        </div>
      </Modal>
    </Container>
  );
};
