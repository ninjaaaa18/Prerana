import React from 'react';
import {
  ArrowDown,
  ArrowUp,
  Check,
  CheckCircle2,
  CircleDot,
  HelpCircle,
  ListOrdered,
  Mail,
  Plus,
  Shuffle,
  Trash2,
  Type,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Dropdown } from '@/components/ui/dropdown';
import { createQuestion } from '../data';
import { cn } from '@/lib/utils';
import type { TeacherQuestion, TeacherQuestionType } from '../types';

const QUESTION_TYPE_META: Record<TeacherQuestionType, { label: string; icon: LucideIcon; className: string }> = {
  mcq: { label: 'Multiple Choice', icon: CircleDot, className: 'border-indigo-500/20 bg-indigo-600/10 text-indigo-400' },
  'true-false': { label: 'True / False', icon: CheckCircle2, className: 'border-emerald-500/20 bg-emerald-600/10 text-emerald-400' },
  'fill-blank': { label: 'Fill in the Blank', icon: Type, className: 'border-amber-500/20 bg-amber-500/10 text-amber-400' },
  match: { label: 'Matching', icon: Shuffle, className: 'border-violet-500/20 bg-violet-600/10 text-violet-400' },
  ordering: { label: 'Ordering', icon: ListOrdered, className: 'border-sky-500/20 bg-sky-600/10 text-sky-400' },
  'short-answer': { label: 'Short Answer', icon: Mail, className: 'border-rose-500/20 bg-rose-600/10 text-rose-400' },
};

const QUESTION_TYPES: TeacherQuestionType[] = [
  'mcq',
  'true-false',
  'fill-blank',
  'match',
  'ordering',
  'short-answer',
];

const QuestionPreview: React.FC<{ question: TeacherQuestion }> = ({ question }) => {
  switch (question.type) {
    case 'mcq':
      return (
        <ul className="space-y-1">
          {question.options.map((option, index) => (
            <li
              key={index}
              className={cn(
                'flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs',
                index === question.correctIndex
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : 'border-slate-800 text-slate-300'
              )}
            >
              {index === question.correctIndex && <Check className="h-3 w-3" aria-hidden="true" />}
              {option}
            </li>
          ))}
        </ul>
      );
    case 'true-false':
      return (
        <p className="text-xs text-slate-300">
          Correct answer:{' '}
          <span className="font-semibold text-emerald-400">{question.answer ? 'True' : 'False'}</span>
        </p>
      );
    case 'fill-blank':
      return (
        <p className="text-xs text-slate-300">
          Answer: <span className="font-semibold text-amber-400">{question.answer}</span>
        </p>
      );
    case 'match':
      return (
        <ul className="grid gap-1 sm:grid-cols-2">
          {question.pairs.map((pair, index) => (
            <li key={index} className="flex items-center justify-between rounded-lg border border-slate-800 px-3 py-1.5 text-xs text-slate-300">
              <span>{pair.left}</span>
              <span className="text-slate-500">→</span>
              <span className="text-violet-300">{pair.right}</span>
            </li>
          ))}
        </ul>
      );
    case 'ordering':
      return (
        <ol className="space-y-1">
          {question.items.map((item, index) => (
            <li key={index} className="flex items-center gap-2 rounded-lg border border-slate-800 px-3 py-1.5 text-xs text-slate-300">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-slate-400">
                {index + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      );
    case 'short-answer':
      return (
        <p className="text-xs text-slate-400">
          <span className="font-semibold text-rose-300">Sample answer:</span> {question.sampleAnswer}
        </p>
      );
  }
};

export interface QuestionBuilderProps {
  questions: TeacherQuestion[];
  onChange: (questions: TeacherQuestion[]) => void;
  className?: string;
}

export const QuestionBuilder: React.FC<QuestionBuilderProps> = ({
  questions,
  onChange,
  className,
}) => {
  const addQuestion = (type: TeacherQuestionType) => {
    onChange([...questions, createQuestion(type, questions.length + 1)]);
  };

  const removeQuestion = (id: string) => {
    onChange(questions.filter((question) => question.id !== id));
  };

  const moveQuestion = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= questions.length) return;
    const next = [...questions];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-400">
          <span className="font-semibold text-slate-200">{questions.length}</span> question
          {questions.length === 1 ? '' : 's'}
        </p>
        <Dropdown
          label="Add question"
          placeholder="Choose question type"
          options={QUESTION_TYPES.map((type) => ({
            label: QUESTION_TYPE_META[type].label,
            value: type,
          }))}
          onChange={(value) => addQuestion(value as TeacherQuestionType)}
          className="w-full sm:w-64"
        />
      </div>

      {questions.length === 0 ? (
        <div className="flex h-32 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-700 bg-slate-950/40 text-sm text-slate-500">
          <Plus className="h-5 w-5 text-slate-600" aria-hidden="true" />
          <p>No questions yet — add one from the dropdown.</p>
        </div>
      ) : (
        <ol className="space-y-3">
          {questions.map((question, index) => {
            const meta = QUESTION_TYPE_META[question.type];
            const Icon = meta.icon;
            return (
              <li
                key={question.id}
                className="relative rounded-xl border border-slate-800 bg-slate-900/60 p-4"
              >
                <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-[11px] font-bold text-slate-300">
                      {index + 1}
                    </span>
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[10px] font-bold uppercase tracking-wider',
                        meta.className
                      )}
                    >
                      <Icon className="h-3 w-3" aria-hidden="true" />
                      {meta.label}
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveQuestion(index, -1)}
                      disabled={index === 0}
                      aria-label="Move question up"
                      className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200 disabled:pointer-events-none disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveQuestion(index, 1)}
                      disabled={index === questions.length - 1}
                      aria-label="Move question down"
                      className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200 disabled:pointer-events-none disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeQuestion(question.id)}
                      aria-label="Remove question"
                      className="rounded-md p-1 text-slate-400 transition-colors hover:bg-rose-500/10 hover:text-rose-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </span>
                </div>

                <p className="mb-3 text-sm font-medium text-slate-100">{question.prompt}</p>
                <QuestionPreview question={question} />

                <span className="mt-3 flex items-center gap-1 text-[11px] text-slate-500">
                  <HelpCircle className="h-3 w-3" aria-hidden="true" />
                  Preview only — answers are locked for learners.
                </span>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
};
