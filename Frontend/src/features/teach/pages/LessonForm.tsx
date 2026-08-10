import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Eye, FilePlus2, Send, Save } from 'lucide-react';
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
import { LessonEditor } from '../components/LessonEditor';
import { AITeachingAssistant } from '../components/AITeachingAssistant';
import {
  getChapterForLesson,
  getChaptersForSubject,
  getLesson,
  getSubject,
  SUBJECTS,
} from '../data';
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

export const LessonForm: React.FC = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { lessonId } = useParams<{ lessonId: string }>();

  const isEditMode = Boolean(lessonId);
  const existingLesson = lessonId ? getLesson(lessonId) : undefined;
  const existingChapter = lessonId ? getChapterForLesson(lessonId) : undefined;

  const [title, setTitle] = React.useState(existingLesson?.title ?? '');
  const [subjectId, setSubjectId] = React.useState(existingChapter?.subjectId ?? SUBJECTS[0].id);
  const [chapterId, setChapterId] = React.useState(existingChapter?.id ?? '');
  const [lessonType, setLessonType] = React.useState<LessonType>(existingLesson?.type ?? 'concept');
  const [minutes, setMinutes] = React.useState(String(existingLesson?.estimatedMinutes ?? 10));
  const [objective, setObjective] = React.useState(existingLesson?.learningObjective ?? '');
  const [blocks, setBlocks] = React.useState<LessonBlock[]>(existingLesson?.blocks ?? []);
  const [visibility, setVisibility] = React.useState<Visibility>('students');
  const [difficulty, setDifficulty] = React.useState<Difficulty>(
    existingLesson?.difficulty ?? 'beginner'
  );
  const [tags, setTags] = React.useState(existingLesson?.tags.join(', ') ?? '');
  const [previewOpen, setPreviewOpen] = React.useState(false);

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

  const chapterOptions = getChaptersForSubject(subjectId);
  const subject = getSubject(subjectId);
  const parsedMinutes = Number(minutes) || 0;

  const showSaved = () =>
    showToast({
      title: isEditMode ? 'Draft updated' : 'Draft saved',
      description: 'Your changes are stored locally in this preview.',
      variant: 'success',
    });

  const showReview = () =>
    showToast({
      title: 'Submitted for review',
      description: 'An admin will review this lesson before it is published.',
      variant: 'info',
    });

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
                <span>Updated {existingLesson.lastUpdated}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" leftIcon={<Save className="h-4 w-4" aria-hidden="true" />} onClick={showSaved}>
            Save Draft
          </Button>
          <Button variant="outline" leftIcon={<Eye className="h-4 w-4" aria-hidden="true" />} onClick={() => setPreviewOpen(true)}>
            Preview
          </Button>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-3">
        <div className="space-y-8 xl:col-span-2">
          <Card className="space-y-5">
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-slate-300">
              Basic Information
            </h2>
            <Input
              label="Lesson title"
              placeholder="e.g. The Quadratic Formula"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Dropdown
                label="Subject"
                options={SUBJECTS.map((s) => ({ label: s.title, value: s.id }))}
                value={subjectId}
                onChange={(value) => {
                  setSubjectId(value);
                  setChapterId(getChaptersForSubject(value)[0]?.id ?? '');
                }}
              />
              <Dropdown
                label="Chapter"
                options={chapterOptions.map((c) => ({ label: c.title, value: c.id }))}
                value={chapterId}
                onChange={setChapterId}
                placeholder="Select a chapter"
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
              />
            </div>
          </Card>

          <Card className="space-y-5">
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-slate-300">
              Learning Objective
            </h2>
            <Textarea
              label="Objective"
              placeholder="What will learners be able to do after this lesson?"
              value={objective}
              onChange={(event) => setObjective(event.target.value)}
              className="min-h-[90px]"
            />
          </Card>

          <Card className="space-y-5">
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-slate-300">
              Lesson Content
            </h2>
            <LessonEditor blocks={blocks} onChange={setBlocks} />
          </Card>

          <Card className="space-y-5">
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-slate-300">
              Lesson Settings
            </h2>
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
              helperText="Separate tags with commas."
            />
          </Card>
        </div>

        <div className="space-y-6">
          <AITeachingAssistant />
          <Card className="space-y-3">
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-slate-300">
              Publish Status
            </h2>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Current status</span>
              <ContentStatusBadge status={existingLesson?.status ?? 'draft'} size="sm" />
            </div>
            <p className="text-xs leading-relaxed text-slate-500">
              Content is saved as a draft until it is submitted and approved for publishing.
            </p>
          </Card>
        </div>
      </div>

      <div className="sticky bottom-4 z-20 rounded-2xl border border-slate-800 bg-slate-900/90 p-4 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <p className="text-sm font-semibold text-slate-200">
              {subject?.title ?? 'Subject'} · {title || 'Untitled lesson'}
            </p>
            <p className="text-xs text-slate-500">
              {blocks.length} content blocks · {parsedMinutes} min estimated · {tags || 'no tags'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" leftIcon={<Save className="h-4 w-4" aria-hidden="true" />} onClick={showSaved}>
              Save Draft
            </Button>
            <Button variant="outline" leftIcon={<Eye className="h-4 w-4" aria-hidden="true" />} onClick={() => setPreviewOpen(true)}>
              Preview
            </Button>
            <Button variant="primary" leftIcon={<Send className="h-4 w-4" aria-hidden="true" />} onClick={showReview}>
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
