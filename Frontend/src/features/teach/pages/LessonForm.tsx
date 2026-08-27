import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Eye, FilePlus2, Send, Save, HelpCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dropdown } from '@/components/ui/dropdown';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/toast';
import { TeacherNav } from '../components/TeacherNav';
import { ContentStatusBadge } from '../components/ContentStatusBadge';
import { LessonEditor } from '../components/LessonEditor';
import { useLesson, useSubjects, useSubjectChapters, useCreateLesson, useUpdateLesson } from '@/features/subjects/hooks/use-content';
import { adaptApiSubjectToTeacher } from '../adapters';
import { DIFFICULTY_LABELS, LESSON_TYPE_LABELS } from '../utils';
import { cn } from '@/lib/utils';
import type { Difficulty, LessonBlock, LessonBlockType, LessonType, Visibility } from '../types';

const LESSON_TYPES: LessonType[] = ['concept', 'practice', 'project', 'assessment-prep'];
const VISIBILITIES: Visibility[] = ['public', 'students', 'private'];
const DIFFICULTIES: Difficulty[] = ['beginner', 'intermediate', 'advanced'];

const BLOCK_STYLES: Record<LessonBlockType, string> = {
  heading: '',
  paragraph: '',
  image: '',
  video: '',
  code: '',
  'key-point': 'border-amber-500/25 bg-amber-500/5 text-amber-200',
  example: 'border-emerald-500/25 bg-emerald-500/5 text-emerald-200',
  question: 'border-fuchsia-500/25 bg-fuchsia-500/5 text-fuchsia-200',
};

const BLOCK_LABELS: Record<LessonBlockType, string> = {
  heading: 'Heading',
  paragraph: 'Paragraph',
  image: 'Image',
  video: 'Video',
  code: 'Code',
  'key-point': 'Key Point',
  example: 'Example',
  question: 'Question',
};

interface SectionHeadingProps {
  step: number;
  title: string;
  description: string;
  complete?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ step, title, description, complete }) => {
  return (
    <div className="flex items-start gap-3">
      <span
        className={cn(
          'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-display text-sm font-bold',
          complete
            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
            : 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300'
        )}
      >
        {complete ? <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> : step}
      </span>
      <div className="space-y-1">
        <h2 className="font-display text-base font-bold tracking-tight text-slate-100">{title}</h2>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
};

const PreviewBlock: React.FC<{ block: LessonBlock }> = ({ block }) => {
  if (block.type === 'heading') {
    return <h4 className="font-display text-base font-bold text-slate-100">{block.content}</h4>;
  }
  if (block.type === 'paragraph') {
    return <p className="text-sm leading-relaxed text-slate-300">{block.content}</p>;
  }
  if (block.type === 'code') {
    return (
      <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3 font-mono text-xs text-sky-300">
        {block.content}
      </pre>
    );
  }
  if (block.type === 'image' || block.type === 'video') {
    return (
      <p className="text-xs text-slate-400">
        {block.type === 'image' ? 'Image' : 'Video'} URL:{' '}
        <span className="text-slate-500">{block.content || 'Not set'}</span>
      </p>
    );
  }
  return (
    <div className={cn('rounded-lg border px-3 py-2 text-sm', BLOCK_STYLES[block.type])}>
      <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-wider opacity-70">
        {BLOCK_LABELS[block.type]}
      </span>
      {block.content}
    </div>
  );
};

interface StepsRailProps {
  current: number;
  completed: number[];
  onSelect?: (stepId: number) => void;
}

const LESSON_OUTLINE_STEPS = [
  { id: 1, label: 'Basics' },
  { id: 2, label: 'Learning Details' },
  { id: 3, label: 'Content' },
  { id: 4, label: 'Settings / Review' },
];

const StepsRail: React.FC<StepsRailProps> = ({ current, completed, onSelect }) => {
  return (
    <Card className="p-0">
      <div className="border-b border-slate-800 px-5 py-4">
        <h2 className="font-display text-sm font-bold uppercase tracking-wider text-slate-300">
          Lesson outline
        </h2>
        <p className="mt-0.5 text-xs text-slate-500">Jump to any section of this lesson.</p>
      </div>
      <ol className="space-y-1 p-3">
        {LESSON_OUTLINE_STEPS.map((step) => {
          const isCurrent = step.id === current;
          const isDone = completed.includes(step.id);
          return (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => onSelect?.(step.id)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
                  isCurrent ? 'bg-indigo-600/10' : 'hover:bg-slate-800/50'
                )}
              >
                <span
                  className={cn(
                    'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold',
                    isDone
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : isCurrent
                        ? 'bg-indigo-500/20 text-indigo-300'
                        : 'bg-slate-800 text-slate-500'
                  )}
                >
                  {isDone ? <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" /> : step.id}
                </span>
                <span
                  className={cn(
                    'text-xs font-semibold',
                    isCurrent ? 'text-indigo-200' : isDone ? 'text-slate-200' : 'text-slate-500'
                  )}
                >
                  {step.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </Card>
  );
};

export const LessonForm: React.FC = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { lessonId } = useParams<{ lessonId: string }>();
  const isEditMode = Boolean(lessonId);

  const { data: existingLesson, isLoading: lessonLoading } = useLesson(lessonId ?? '');
  const { data: apiSubjects } = useSubjects();

  const subjects = React.useMemo(
    () => (apiSubjects ?? []).map(adaptApiSubjectToTeacher),
    [apiSubjects]
  );

  const [selectedSubjectId, setSelectedSubjectId] = React.useState('');
  const { data: apiChapters } = useSubjectChapters(selectedSubjectId);
  const chapterOptions = React.useMemo(() => {
    if (!apiChapters) return [];
    return apiChapters.map((ch) => ({ label: ch.title, value: ch.id }));
  }, [apiChapters]);

  const createLesson = useCreateLesson();
  const updateLesson = useUpdateLesson();

  const [title, setTitle] = React.useState('');
  const [chapterId, setChapterId] = React.useState('');
  const [lessonType, setLessonType] = React.useState<LessonType>('concept');
  const [minutes, setMinutes] = React.useState('10');
  const [objective, setObjective] = React.useState('');
  const [blocks, setBlocks] = React.useState<LessonBlock[]>([]);
  const [visibility, setVisibility] = React.useState<Visibility>('students');
  const [difficulty, setDifficulty] = React.useState<Difficulty>('beginner');
  const [tags, setTags] = React.useState('');
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [initialized, setInitialized] = React.useState(false);
  const [touched, setTouched] = React.useState(false);

  const sectionRefs = {
    1: React.useRef<HTMLDivElement>(null),
    2: React.useRef<HTMLDivElement>(null),
    3: React.useRef<HTMLDivElement>(null),
    4: React.useRef<HTMLDivElement>(null),
  };

  React.useEffect(() => {
    if (isEditMode && existingLesson && !initialized) {
      setTitle(existingLesson.title);
      setLessonType((existingLesson.type as LessonType) || 'concept');
      setMinutes(String(existingLesson.estimatedMinutes));
      setObjective(existingLesson.learningObjective);
      setBlocks(
        (existingLesson.blocks ?? []).map((b) => ({
          id: b.id || `block-${Math.random().toString(36).slice(2)}`,
          type: b.type as LessonBlockType,
          content: b.content,
          ...(b.label ? { label: b.label } : {}),
          ...(b.language ? { language: b.language } : {}),
        }))
      );
      setDifficulty((existingLesson.difficulty as Difficulty) || 'beginner');
      setTags(existingLesson.tags ?? '');
      setChapterId(existingLesson.chapterId);

      const existingChapter = existingLesson.chapter;
      if (existingChapter?.subject?.id) {
        setSelectedSubjectId(existingChapter.subject.id);
      }
      setInitialized(true);
    }
  }, [isEditMode, existingLesson, initialized]);

  React.useEffect(() => {
    if (!isEditMode && subjects.length > 0 && !selectedSubjectId) {
      setSelectedSubjectId(subjects[0].id);
    }
  }, [isEditMode, subjects, selectedSubjectId]);

  const subject = subjects.find((s) => s.id === selectedSubjectId);

  const completedSteps = React.useMemo(() => {
    const done: number[] = [];
    if (title.trim() || subject?.title) done.push(1);
    if (objective.trim()) done.push(2);
    if (blocks.length > 0) done.push(3);
    if (tags.trim() || difficulty || visibility) done.push(4);
    return done;
  }, [title, subject, objective, blocks, tags, difficulty, visibility]);

  const currentStep = React.useMemo(() => {
    for (let i = 1; i <= 4; i++) {
      if (!completedSteps.includes(i)) return i;
    }
    return 4;
  }, [completedSteps]);

  const handleOutlineSelect = (stepId: number): void => {
    const ref = sectionRefs[stepId as keyof typeof sectionRefs]?.current;
    ref?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (isEditMode && lessonLoading) {
    return (
      <Container size="xl" className="space-y-8">
        <TeacherNav />
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-8 xl:grid-cols-3">
          <div className="space-y-6 xl:col-span-2">
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-32 rounded-2xl" />
            <Skeleton className="h-64 rounded-2xl" />
          </div>
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </Container>
    );
  }

  if (isEditMode && !existingLesson) {
    return (
      <Container size="md">
        <TeacherNav className="mb-8" />
        <EmptyState
          icon={<FilePlus2 className="h-8 w-8" />}
          title="Lesson not found"
          description="This lesson may have been removed. Pick another lesson to edit."
          actionText="Back to Subjects"
          onAction={() => navigate('/app/teach/subjects')}
        />
      </Container>
    );
  }

  const parsedMinutes = Number(minutes) || 0;
  const missingRequired = !title.trim() || !chapterId;
  const showValidation = touched && missingRequired;

  const handleSaveDraft = async (): Promise<void> => {
    const data = {
      title: title || 'Untitled lesson',
      type: lessonType,
      difficulty,
      estimatedMinutes: parsedMinutes,
      learningObjective: objective,
      blocks,
      tags,
    };

    try {
      if (isEditMode && lessonId) {
        await updateLesson.mutateAsync({ lessonId, data: { ...data, status: 'draft' } });
        showToast({ title: 'Draft updated', description: 'Your changes have been saved.', variant: 'success' });
      } else if (chapterId) {
        await createLesson.mutateAsync({ chapterId, data });
        showToast({ title: 'Draft saved', description: 'Your new lesson has been created.', variant: 'success' });
        navigate('/app/teach/subjects');
      } else {
        setTouched(true);
        showToast({ title: 'Almost there', description: 'Add a title and choose a chapter to save.', variant: 'info' });
      }
    } catch {
      showToast({ title: 'Error', description: 'Failed to save. Please try again.', variant: 'error' });
    }
  };

  const handleSubmitForReview = async (): Promise<void> => {
    if (missingRequired) {
      setTouched(true);
      showToast({ title: 'Missing details', description: 'A lesson title and chapter are required before submitting.', variant: 'error' });
      return;
    }

    const data = {
      title: title.trim(),
      type: lessonType,
      difficulty,
      estimatedMinutes: parsedMinutes,
      learningObjective: objective,
      blocks,
      tags,
      status: 'review' as const,
    };

    try {
      if (isEditMode && lessonId) {
        await updateLesson.mutateAsync({ lessonId, data });
        showToast({ title: 'Submitted for review', description: 'An admin will review this lesson before it is published.', variant: 'info' });
      } else if (chapterId) {
        await createLesson.mutateAsync({ chapterId, data });
        showToast({ title: 'Lesson created', description: 'Submitted for review.', variant: 'info' });
        navigate('/app/teach/subjects');
      }
    } catch {
      showToast({ title: 'Error', description: 'Failed to submit. Please try again.', variant: 'error' });
    }
  };

  const handleCancel = (): void => {
    navigate(-1);
  };

  return (
    <Container size="xl" className="space-y-8">
      <TeacherNav />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/app/teach/subjects"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Content
          </Link>
          <div>
            <h1 className="font-display text-xl font-bold tracking-tight text-slate-100 sm:text-2xl">
              {isEditMode ? 'Edit Lesson' : 'Create Lesson'}
            </h1>
            {isEditMode && existingLesson && (
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <ContentStatusBadge status={existingLesson.status} size="sm" />
                <span>Version {existingLesson.version}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {showValidation && (
        <div role="alert" className="rounded-xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          <p className="flex items-center gap-2 font-medium">
            <AlertCircle className="h-4 w-4 text-rose-300" aria-hidden="true" />
            You need a lesson title and a chapter before this lesson can be saved.
          </p>
        </div>
      )}

      <div className="grid gap-8 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Card ref={sectionRefs[1]} className="scroll-mt-28 space-y-5">
            <SectionHeading
              step={1}
              title="Basics"
              description="Where this lesson lives and how it is classified. Title and chapter are required."
              complete={Boolean(title.trim() || chapterId)}
            />
            <div className="space-y-5">
              <Input
                label="Lesson title *"
                placeholder="e.g. The Quadratic Formula"
                value={title}
                onChange={(event) => { setTitle(event.target.value); setTouched(true); }}
                helperText="A clear, specific title helps learners and reviewers."
                error={showValidation && !title.trim() ? 'Lesson title is required.' : undefined}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Dropdown
                  label="Subject"
                  options={subjects.map((s) => ({ label: s.title, value: s.id }))}
                  value={selectedSubjectId}
                  onChange={(value) => {
                    setSelectedSubjectId(value);
                    setChapterId('');
                    setTouched(true);
                  }}
                />
                <Dropdown
                  label="Chapter *"
                  options={chapterOptions}
                  value={chapterId}
                  onChange={(value) => { setChapterId(value); setTouched(true); }}
                  placeholder={selectedSubjectId ? 'Select a chapter' : 'Choose a subject first'}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Dropdown
                  label="Lesson type"
                  options={LESSON_TYPES.map((type) => ({
                    label: LESSON_TYPE_LABELS[type],
                    value: type,
                  }))}
                  value={lessonType}
                  onChange={(value) => setLessonType(value as LessonType)}
                />
                <Input
                  label="Estimated reading time (minutes)"
                  type="number"
                  min={1}
                  value={minutes}
                  onChange={(event) => setMinutes(event.target.value)}
                  helperText="How long learners should expect to spend."
                />
              </div>
            </div>
          </Card>

          <Card ref={sectionRefs[2]} className="scroll-mt-28 space-y-5">
            <SectionHeading
              step={2}
              title="Learning Details"
              description="The outcome learners should reach by the end of the lesson. Optional but recommended."
              complete={Boolean(objective.trim())}
            />
            <Textarea
              label="Objective"
              placeholder="What will learners be able to do after this lesson?"
              value={objective}
              onChange={(event) => setObjective(event.target.value)}
              className="min-h-[90px]"
              helperText="Keep it to one clear sentence. Example: “Solve quadratic equations using the formula.”"
            />
          </Card>

          <Card ref={sectionRefs[3]} className="scroll-mt-28 space-y-5">
            <SectionHeading
              step={3}
              title="Content"
              description="Compose the blocks of this lesson — headings, text, media, code and more."
              complete={blocks.length > 0}
            />
            <LessonEditor blocks={blocks} onChange={setBlocks} />
          </Card>

          <Card ref={sectionRefs[4]} className="scroll-mt-28 space-y-5">
            <SectionHeading
              step={4}
              title="Settings / Review"
              description="Tune visibility, difficulty and searchable tags. All fields here are optional."
              complete={Boolean(tags.trim() || difficulty || visibility)}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Dropdown
                label="Visibility"
                options={VISIBILITIES.map((v) => ({ label: v, value: v }))}
                value={visibility}
                onChange={(value) => setVisibility(value as Visibility)}
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
            <Input
              label="Tags"
              placeholder="algebra, quadratics, practice"
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              helperText="Separate tags with commas to make this lesson easier to find."
            />
          </Card>
        </div>

        <div className="space-y-6">
          <StepsRail current={currentStep} completed={completedSteps} onSelect={handleOutlineSelect} />
        </div>
      </div>

      <div className="sticky bottom-4 z-20 rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-lg shadow-black/30 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400 sm:inline-flex">
              <FilePlus2 className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0 space-y-0.5">
              <p className="truncate text-sm font-semibold text-slate-200">
                {title.trim() || (isEditMode ? 'Untitled lesson' : subject?.title ?? 'New lesson')}
              </p>
              <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 truncate text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <ContentStatusBadge status={existingLesson?.status ?? 'draft'} size="sm" />
                </span>
                <span>{blocks.length} content blocks · {parsedMinutes} min</span>
                {missingRequired ? (
                  <span className="inline-flex items-center gap-1 font-medium text-amber-300">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    Title + chapter required
                  </span>
                ) : (
                  <span className="text-emerald-400">Ready to save</span>
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="ghost" leftIcon={<HelpCircle className="h-4 w-4" aria-hidden="true" />} onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="outline" leftIcon={<Save className="h-4 w-4" aria-hidden="true" />} onClick={() => void handleSaveDraft()}>
              Save Draft
            </Button>
            <Button variant="outline" leftIcon={<Eye className="h-4 w-4" aria-hidden="true" />} onClick={() => setPreviewOpen(true)}>
              Preview
            </Button>
            <Button variant="primary" leftIcon={<Send className="h-4 w-4" aria-hidden="true" />} onClick={() => void handleSubmitForReview()}>
              Submit for Review
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title={title || 'Untitled lesson'}
        description={`${subject?.title ?? 'Subject'} · ${LESSON_TYPE_LABELS[lessonType]} · ${parsedMinutes} min`}
        maxWidth="2xl"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Learning objective
            </p>
            <p className="text-sm text-slate-300">{objective || 'No objective set yet.'}</p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Content</p>
            {blocks.length === 0 ? (
              <p className="text-sm text-slate-500">No content blocks added yet.</p>
            ) : (
              blocks.map((block) => <PreviewBlock key={block.id} block={block} />)
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" size="sm">
              {DIFFICULTY_LABELS[difficulty]}
            </Badge>
            <Badge variant="secondary" size="sm">
              {visibility} visibility
            </Badge>
            {tags
              .split(',')
              .map((tag) => tag.trim())
              .filter(Boolean)
              .slice(0, 5)
              .map((tag) => (
                <Badge key={tag} variant="outline" size="sm">
                  #{tag}
                </Badge>
              ))}
          </div>
        </div>
      </Modal>
    </Container>
  );
};
