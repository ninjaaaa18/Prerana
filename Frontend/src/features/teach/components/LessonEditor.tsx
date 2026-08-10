import React from 'react';
import {
  ArrowDown,
  ArrowUp,
  Beaker,
  Code2,
  Heading2,
  HelpCircle,
  Image as ImageIcon,
  Lightbulb,
  Text,
  Plus,
  Video,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { LessonBlock } from './LessonBlock';
import { cn } from '@/lib/utils';
import type { LessonBlock as LessonBlockData, LessonBlockType } from '../types';

const TOOLBAR_BLOCKS: { type: LessonBlockType; label: string; icon: LucideIcon }[] = [
  { type: 'heading', label: 'Heading', icon: Heading2 },
  { type: 'paragraph', label: 'Paragraph', icon: Text },
  { type: 'image', label: 'Image', icon: ImageIcon },
  { type: 'video', label: 'Video', icon: Video },
  { type: 'code', label: 'Code', icon: Code2 },
  { type: 'key-point', label: 'Key Point', icon: Lightbulb },
  { type: 'example', label: 'Example', icon: Beaker },
  { type: 'question', label: 'Question', icon: HelpCircle },
];

const DEFAULT_CONTENT: Record<LessonBlockType, Omit<LessonBlockData, 'id' | 'type'>> = {
  heading: { content: 'New section heading' },
  paragraph: { content: '' },
  image: { content: '' },
  video: { content: '' },
  code: { content: '', language: 'python' },
  'key-point': { content: '' },
  example: { content: '' },
  question: { content: '' },
};

const makeId = (): string => `block-${Math.random().toString(36).slice(2, 10)}`;

export interface LessonEditorProps {
  blocks: LessonBlockData[];
  onChange: (blocks: LessonBlockData[]) => void;
  className?: string;
}

export const LessonEditor: React.FC<LessonEditorProps> = ({ blocks, onChange, className }) => {
  const addBlock = (type: LessonBlockType) => {
    onChange([...blocks, { id: makeId(), type, ...DEFAULT_CONTENT[type] }]);
  };

  const updateBlock = (id: string, updates: Partial<LessonBlockData>) => {
    onChange(blocks.map((block) => (block.id === id ? { ...block, ...updates } : block)));
  };

  const removeBlock = (id: string) => {
    onChange(blocks.filter((block) => block.id !== id));
  };

  const duplicateBlock = (id: string) => {
    const index = blocks.findIndex((block) => block.id === id);
    if (index < 0) return;
    const source = blocks[index];
    const copy = { ...source, id: makeId() };
    const next = [...blocks];
    next.splice(index + 1, 0, copy);
    onChange(next);
  };

  const moveBlock = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Add block
        </span>
        {TOOLBAR_BLOCKS.map((item) => (
          <button
            key={item.type}
            type="button"
            onClick={() => addBlock(item.type)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-slate-600 hover:bg-slate-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <item.icon className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
            {item.label}
          </button>
        ))}
      </div>

      {blocks.length === 0 ? (
        <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-700 bg-slate-950/40 text-sm text-slate-500">
          <Plus className="h-5 w-5 text-slate-600" aria-hidden="true" />
          <p>No content yet — add your first block above.</p>
        </div>
      ) : (
        <ol className="space-y-3">
          {blocks.map((block, index) => (
            <li key={block.id} className="relative">
              <LessonBlock
                block={block}
                onChange={(updates) => updateBlock(block.id, updates)}
                onRemove={() => removeBlock(block.id)}
                onDuplicate={() => duplicateBlock(block.id)}
              />
              <div className="absolute right-4 top-4 flex flex-col">
                <span className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveBlock(index, -1)}
                    disabled={index === 0}
                    aria-label="Move block up"
                    className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200 disabled:pointer-events-none disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveBlock(index, 1)}
                    disabled={index === blocks.length - 1}
                    aria-label="Move block down"
                    className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200 disabled:pointer-events-none disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                </span>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};
