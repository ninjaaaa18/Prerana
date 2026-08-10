import React from 'react';
import {
  CheckSquare,
  FileCheck2,
  FileText,
  Play,
  Sigma,
  Square,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { subjectMeta } from '../data';
import type { Resource, ResourceCategory } from '../types';

interface ResourcePreviewProps {
  resource: Resource;
  className?: string;
}

const MockDocument: React.FC<{ lines?: number; color: string }> = ({ lines = 8, color }) => (
  <div className="flex w-full max-w-sm flex-col gap-2 rounded-xl border border-slate-700/60 bg-slate-900/90 p-4 shadow-2xl">
    <div className="flex items-center gap-2">
      <span className="h-2 w-8 rounded-full" style={{ backgroundColor: color }} />
      <div className="flex-1">
        <div className="h-2 w-3/4 rounded bg-slate-700" />
        <div className="mt-1 h-1.5 w-1/2 rounded bg-slate-800" />
      </div>
      <FileText className="h-5 w-5 text-slate-600" />
    </div>
    <div className="h-px bg-slate-800" />
    {Array.from({ length: lines }).map((_, index) => (
      <div key={index} className="h-1.5 rounded bg-slate-700/70" style={{ width: `${100 - (index % 4) * 12}%` }} />
    ))}
    <div className="flex justify-end gap-2 pt-2">
      <span className="h-2 w-8 rounded bg-slate-800" />
      <span className="h-2 w-8 rounded bg-slate-800" />
    </div>
  </div>
);

const MockVideo: React.FC<{ color: string }> = ({ color }) => (
  <div className="relative flex w-full max-w-sm items-center justify-center overflow-hidden rounded-xl border border-slate-700/60 bg-slate-950 shadow-2xl">
    <div
      className="absolute inset-0 opacity-20"
      style={{ background: `linear-gradient(135deg, ${color}, transparent)` }}
    />
    <div className="absolute inset-0 flex items-end px-4 pb-3">
      <div className="flex gap-1.5">
        <span className="h-1.5 w-10 rounded bg-slate-700" />
        <span className="h-1.5 w-6 rounded bg-slate-700" />
        <span className="h-1.5 w-8 rounded bg-slate-700" />
      </div>
    </div>
    <span
      className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg"
      style={{ color }}
    >
      <Play className="ml-0.5 h-6 w-6 fill-current" />
    </span>
  </div>
);

const MockSlide: React.FC<{ color: string }> = ({ color }) => (
  <div className="flex w-full max-w-sm flex-col gap-2 rounded-xl border border-slate-700/60 bg-slate-900/90 p-4 shadow-2xl">
    <div className="h-3 w-1/2 rounded" style={{ backgroundColor: color }} />
    <div className="mt-1 h-2 w-full rounded bg-slate-700" />
    <div className="h-2 w-2/3 rounded bg-slate-700" />
    <div className="mt-1 flex justify-end gap-1">
      <span className="h-1.5 w-10 rounded bg-slate-800" />
    </div>
    <div className="flex justify-center gap-1 pt-1">
      <span className="h-1.5 w-5 rounded-full bg-slate-600" />
      <span className="h-1.5 w-5 rounded-full bg-slate-800" />
      <span className="h-1.5 w-5 rounded-full bg-slate-800" />
    </div>
  </div>
);

const MockImage: React.FC<{ color: string }> = ({ color }) => (
  <div className="relative flex w-full max-w-sm items-center justify-center rounded-xl border border-slate-700/60 bg-slate-950 shadow-2xl">
    <div className="relative h-28 w-2/3 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800">
      <span
        className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-lg opacity-70"
        style={{ backgroundColor: color }}
      />
      <span className="absolute bottom-1 left-1 h-1.5 w-1/3 rounded bg-slate-600" />
    </div>
  </div>
);

const MockMindMap: React.FC<{ color: string }> = ({ color }) => (
  <div className="relative flex w-full max-w-sm items-center justify-center rounded-xl border border-slate-700/60 bg-slate-950 p-6 shadow-2xl">
    <span className="h-9 w-9 rounded-full" style={{ backgroundColor: color }} />
    <span className="absolute left-1/4 top-1/4 h-2 w-2 rounded-full bg-slate-600" />
    <span className="absolute right-1/4 top-1/3 h-2 w-2 rounded-full bg-slate-600" />
    <span className="absolute left-1/3 bottom-1/4 h-2 w-2 rounded-full bg-slate-600" />
    <span className="absolute right-1/3 bottom-1/5 h-2 w-2 rounded-full bg-slate-600" />
    <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden="true">
      <line x1="50%" y1="50%" x2="25%" y2="25%" stroke={color} strokeWidth="1" />
      <line x1="50%" y1="50%" x2="75%" y2="30%" stroke={color} strokeWidth="1" />
      <line x1="50%" y1="50%" x2="32%" y2="78%" stroke={color} strokeWidth="1" />
      <line x1="50%" y1="50%" x2="70%" y2="80%" stroke={color} strokeWidth="1" />
    </svg>
  </div>
);

const MockFormula: React.FC<{ color: string }> = ({ color }) => (
  <div className="flex w-full max-w-sm flex-col gap-2 rounded-xl border border-slate-700/60 bg-slate-900/90 p-4 shadow-2xl">
    <span className="flex items-center gap-2 text-xs font-bold" style={{ color }}>
      <Sigma className="h-4 w-4" />
      Formula sheet
    </span>
    <div className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-center font-mono text-sm text-slate-200">
      ax² + bx + c = 0
    </div>
    <div className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-center font-mono text-sm text-slate-300">
      x = (−b ± √(b² − 4ac)) / 2a
    </div>
    <div className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-center font-mono text-xs text-slate-400">
      sin²θ + cos²θ = 1
    </div>
  </div>
);

const MockCheatSheet: React.FC<{ color: string }> = ({ color }) => (
  <div className="flex w-full max-w-sm flex-wrap justify-center gap-2 rounded-xl border border-slate-700/60 bg-slate-900/90 p-4 shadow-2xl">
    {Array.from({ length: 6 }).map((_, index) => (
      <div
        key={index}
        className="flex h-10 w-16 items-center justify-center rounded-lg border border-slate-800 bg-slate-950/60"
      >
        <span className="h-1.5 w-8 rounded" style={{ backgroundColor: index === 2 ? color : '#475569' }} />
      </div>
    ))}
    <FileCheck2 className="mt-1 h-4 w-4 text-slate-600" />
  </div>
);

const MockWorksheet: React.FC<{ color: string }> = ({ color }) => (
  <div className="flex w-full max-w-sm flex-col gap-3 rounded-xl border border-slate-700/60 bg-slate-900/90 p-4 shadow-2xl">
    {[1, 2, 3].map((question) => (
      <div key={question} className="flex items-start gap-2">
        <span
          className="mt-0.5 flex h-4 w-4 items-center justify-center rounded border border-slate-600"
          style={{ color }}
        >
          {question === 2 ? <CheckSquare className="h-3.5 w-3.5" /> : <Square className="h-3.5 w-3.5" />}
        </span>
        <div className="flex-1 space-y-1.5 pt-0.5">
          <div className="h-2 w-full rounded bg-slate-700" />
          <div className="h-2 w-5/6 rounded bg-slate-800" />
        </div>
      </div>
    ))}
  </div>
);

const PREVIEWS: Record<ResourceCategory, React.FC<{ color: string }>> = {
  pdf: MockDocument,
  notes: MockDocument,
  video: MockVideo,
  presentation: MockSlide,
  image: MockImage,
  'mind-map': MockMindMap,
  'formula-sheet': MockFormula,
  'cheat-sheet': MockCheatSheet,
  'practice-worksheet': MockWorksheet,
};

export const ResourcePreview: React.FC<ResourcePreviewProps> = ({ resource, className }) => {
  const Preview = PREVIEWS[resource.category];
  const lineCount = resource.category === 'pdf' ? 10 : 8;
  const color = subjectMeta(resource.subjectId).color;

  return (
    <div
      className={cn(
        'flex min-h-56 items-center justify-center rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6',
        className
      )}
    >
      {resource.category === 'pdf' || resource.category === 'notes' ? (
        <MockDocument lines={lineCount} color={color} />
      ) : (
        <Preview color={color} />
      )}
    </div>
  );
};
