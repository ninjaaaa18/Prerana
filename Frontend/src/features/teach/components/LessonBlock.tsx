import React from 'react';
import {
  Beaker,
  Code2,
  Copy,
  Heading2,
  HelpCircle,
  Image as ImageIcon,
  Lightbulb,
  Text,
  Trash2,
  Video,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { LessonBlock as LessonBlockData, LessonBlockType } from '../types';

const BLOCK_META: Record<LessonBlockType, { label: string; icon: LucideIcon; className: string }> = {
  heading: { label: 'Heading', icon: Heading2, className: 'border-indigo-500/20 bg-indigo-600/10 text-indigo-400' },
  paragraph: { label: 'Paragraph', icon: Text, className: 'border-slate-600/30 bg-slate-800/60 text-slate-300' },
  image: { label: 'Image', icon: ImageIcon, className: 'border-violet-500/20 bg-violet-600/10 text-violet-400' },
  video: { label: 'Video', icon: Video, className: 'border-rose-500/20 bg-rose-600/10 text-rose-400' },
  code: { label: 'Code', icon: Code2, className: 'border-sky-500/20 bg-sky-600/10 text-sky-400' },
  'key-point': { label: 'Key Point', icon: Lightbulb, className: 'border-amber-500/20 bg-amber-500/10 text-amber-400' },
  example: { label: 'Example', icon: Beaker, className: 'border-emerald-500/20 bg-emerald-600/10 text-emerald-400' },
  question: { label: 'Question', icon: HelpCircle, className: 'border-fuchsia-500/20 bg-fuchsia-600/10 text-fuchsia-400' },
};

export interface LessonBlockProps {
  block: LessonBlockData;
  onChange: (updates: Partial<LessonBlockData>) => void;
  onRemove: () => void;
  onDuplicate: () => void;
  className?: string;
}

export const LessonBlock: React.FC<LessonBlockProps> = ({
  block,
  onChange,
  onRemove,
  onDuplicate,
  className,
}) => {
  const meta = BLOCK_META[block.type];
  const Icon = meta.icon;

  const isHeading = block.type === 'heading';
  const isMedia = block.type === 'image' || block.type === 'video';

  return (
    <div className={cn('rounded-xl border border-slate-800 bg-slate-900/60 p-4', className)}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[10px] font-bold uppercase tracking-wider',
            meta.className
          )}
        >
          <Icon className="h-3 w-3" aria-hidden="true" />
          {meta.label}
        </span>
        <span className="flex items-center gap-1">
          <button
            type="button"
            onClick={onDuplicate}
            aria-label="Duplicate block"
            className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove block"
            className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-rose-500/10 hover:text-rose-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </span>
      </div>

      {isHeading && (
        <Input
          value={block.content}
          onChange={(event) => onChange({ content: event.target.value })}
          placeholder="Section heading"
          className="font-display text-lg font-bold"
          aria-label="Heading text"
        />
      )}

      {block.type === 'paragraph' && (
        <Textarea
          value={block.content}
          onChange={(event) => onChange({ content: event.target.value })}
          placeholder="Write your paragraph here…"
          className="min-h-[80px]"
          aria-label="Paragraph content"
        />
      )}

      {isMedia && (
        <div className="space-y-3">
          <Input
            value={block.content}
            onChange={(event) => onChange({ content: event.target.value })}
            placeholder={block.type === 'image' ? 'Paste an image URL…' : 'Paste a video URL…'}
            label={block.type === 'image' ? 'Image URL' : 'Video URL'}
          />
          <div
            className="flex h-24 items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-950/60 text-xs text-slate-500"
            aria-hidden="true"
          >
            <span className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              {block.type === 'image' ? 'Image preview' : 'Video embed preview'}
            </span>
          </div>
        </div>
      )}

      {block.type === 'code' && (
        <div className="space-y-2">
          <Input
            value={block.language ?? ''}
            onChange={(event) => onChange({ language: event.target.value })}
            placeholder="Language (e.g. python)"
            label="Language"
          />
          <Textarea
            value={block.content}
            onChange={(event) => onChange({ content: event.target.value })}
            placeholder="Paste code here…"
            className="font-mono text-xs"
            aria-label="Code content"
          />
        </div>
      )}

      {(block.type === 'key-point' || block.type === 'example' || block.type === 'question') && (
        <Textarea
          value={block.content}
          onChange={(event) => onChange({ content: event.target.value })}
          placeholder={
            block.type === 'key-point'
              ? 'Highlight a key idea…'
              : block.type === 'example'
                ? 'Add a worked example…'
                : 'Add a question for learners…'
          }
          className={cn(
            'min-h-[70px]',
            block.type === 'key-point' && 'border-amber-500/20 bg-amber-500/5',
            block.type === 'example' && 'border-emerald-500/20 bg-emerald-500/5',
            block.type === 'question' && 'border-fuchsia-500/20 bg-fuchsia-500/5'
          )}
          aria-label={`${meta.label} content`}
        />
      )}
    </div>
  );
};
