import React from 'react';
import { motion } from 'framer-motion';
import { Check, FileDown, Loader2, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress-bar';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';
import type { ResourceItem, ResourceType } from '../types';

export interface ResourcePreviewProps {
  resource: ResourceItem | null;
  onClose: () => void;
  className?: string;
}

type GenerateState = 'idle' | 'generating' | 'ready';

const CENTER_STYLES: Record<ResourceType, string> = {
  'mind-map': '#818cf8',
  flashcards: '#fbbf24',
  slides: '#34d399',
  infographic: '#f472b6',
  'audio-overview': '#22d3ee',
  'data-table': '#a78bfa',
  'flow-diagram': '#fb923c',
};

function MindMapPreview() {
  const satellites = ['Roots', 'Formula', 'Discriminant', 'Graph', 'Practice'];
  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <div className="rounded-xl border border-indigo-500/30 bg-indigo-600/15 px-4 py-2 text-sm font-semibold text-indigo-200">
        Quadratic Equations
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {satellites.map((label) => (
          <span
            key={label}
            className="rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs text-slate-300"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function FlashcardsPreview() {
  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <div className="w-full max-w-xs rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
          Front
        </p>
        <p className="mt-1 text-sm font-medium text-slate-200">
          What is the discriminant of a quadratic equation?
        </p>
      </div>
      <div className="w-full max-w-xs rounded-xl border border-slate-700 bg-slate-800/80 p-4 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Back</p>
        <p className="mt-1 text-sm text-slate-300">b² − 4ac — it decides the nature of the roots.</p>
      </div>
    </div>
  );
}

function SlidesPreview() {
  return (
    <div className="flex flex-wrap justify-center gap-3 py-2">
      {['Title', 'Key idea', 'Example'].map((label, index) => (
        <div
          key={label}
          className="flex h-24 w-32 flex-col justify-between rounded-lg border border-slate-700 bg-slate-800/60 p-3"
        >
          <span className="text-[10px] uppercase tracking-wider text-slate-500">
            Slide {index + 1}
          </span>
          <span className="text-xs font-semibold text-slate-200">{label}</span>
        </div>
      ))}
    </div>
  );
}

function InfographicPreview() {
  return (
    <div className="flex flex-col gap-2 py-2">
      <div className="rounded-lg bg-slate-800/80 px-4 py-2 text-center text-sm font-semibold text-slate-100">
        Photosynthesis in 60 seconds
      </div>
      <div className="flex gap-2">
        <div className="flex-1 rounded-lg bg-emerald-500/20 p-2 text-center text-[11px] font-medium text-emerald-300">
          Sunlight
        </div>
        <div className="flex-1 rounded-lg bg-sky-500/20 p-2 text-center text-[11px] font-medium text-sky-300">
          Water
        </div>
        <div className="flex-1 rounded-lg bg-indigo-500/20 p-2 text-center text-[11px] font-medium text-indigo-300">
          CO₂
        </div>
      </div>
      <div className="rounded-lg bg-slate-700/50 p-2 text-center text-[11px] font-medium text-slate-300">
        ↓ Glucose + Oxygen
      </div>
    </div>
  );
}

function AudioPreview() {
  const bars = [3, 7, 5, 9, 6, 11, 8, 12, 7, 9, 5, 10, 6, 4, 8];
  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <div className="flex h-16 items-center gap-1">
        {bars.map((height, index) => (
          <span
            key={index}
            className="w-1.5 rounded-full bg-sky-400/70"
            style={{ height: `${height * 6}px` }}
          />
        ))}
      </div>
      <p className="text-[11px] text-slate-500">0:00 — 3:24 narrated overview</p>
    </div>
  );
}

function DataTablePreview() {
  const rows = [
    ['Equation', 'Discriminant', 'Roots'],
    ['x² − 5x + 6', '1', '2 real'],
    ['x² + 4x + 4', '0', '1 repeated'],
    ['x² + x + 1', '−3', 'No real'],
  ];
  return (
    <div className="overflow-x-auto py-2">
      <table className="w-full text-left text-xs">
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={cn(rowIndex > 0 && 'border-t border-slate-800')}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={cn(
                    'px-3 py-2',
                    rowIndex === 0
                      ? 'font-semibold uppercase tracking-wider text-violet-300'
                      : 'text-slate-300'
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FlowDiagramPreview() {
  const steps = ['Identify type', 'Apply formula', 'Verify answer'];
  return (
    <div className="flex flex-col items-stretch gap-1.5 py-2">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-2 text-center text-xs font-medium text-orange-200">
            {step}
          </div>
          {index < steps.length - 1 && (
            <div className="flex justify-center text-orange-400/60">↓</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function PreviewBody({ type }: { type: ResourceType }) {
  switch (type) {
    case 'mind-map':
      return <MindMapPreview />;
    case 'flashcards':
      return <FlashcardsPreview />;
    case 'slides':
      return <SlidesPreview />;
    case 'infographic':
      return <InfographicPreview />;
    case 'audio-overview':
      return <AudioPreview />;
    case 'data-table':
      return <DataTablePreview />;
    case 'flow-diagram':
      return <FlowDiagramPreview />;
    default:
      return null;
  }
}

export const ResourcePreview: React.FC<ResourcePreviewProps> = ({ resource, onClose }) => {
  const reducedMotion = usePrefersReducedMotion();
  const [state, setState] = React.useState<GenerateState>('idle');
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (!resource) {
      setState('idle');
      setProgress(0);
      return;
    }
    setState('idle');
    setProgress(0);
  }, [resource]);

  React.useEffect(() => {
    if (!resource) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resource, onClose]);

  React.useEffect(() => {
    if (state !== 'generating') return;
    const timer = window.setInterval(() => {
      setProgress((prev) => {
        const next = prev + 14;
        if (next >= 100) {
          window.clearInterval(timer);
          window.setTimeout(() => setState('ready'), 200);
          return 100;
        }
        return next;
      });
    }, 120);
    return () => window.clearInterval(timer);
  }, [state]);

  if (!resource) return null;

  const accent = CENTER_STYLES[resource.type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`${resource.title} preview`}>
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={reducedMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative flex max-h-[85vh] w-full max-w-lg flex-col gap-5 overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900 p-6 shadow-soft"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border"
              style={{
                color: accent,
                borderColor: `${accent}40`,
                backgroundColor: `${accent}1a`,
              }}
            >
              <resource.icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-lg font-bold tracking-tight text-slate-100">
                {resource.title}
              </h3>
              <Badge variant="secondary" size="sm">
                {resource.fileType} · {resource.size}
              </Badge>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3">
          <PreviewBody type={resource.type} />
        </div>

        <div className="flex items-center gap-3">
          {state === 'generating' ? (
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Generating {resource.title.toLowerCase()}…
              </div>
              <ProgressBar value={progress} variant="primary" size="sm" />
            </div>
          ) : state === 'ready' ? (
            <div className="flex flex-1 items-center gap-2 text-sm font-medium text-emerald-400">
              <Check className="h-4 w-4" />
              Ready to download (simulated)
            </div>
          ) : (
            <p className="flex-1 text-xs text-slate-500">
              This is a UI preview — generation is simulated.
            </p>
          )}

          {state !== 'generating' && (
            <Button
              variant={state === 'ready' ? 'secondary' : 'primary'}
              size="sm"
              onClick={() => {
                if (state === 'ready') return;
                setState('generating');
                setProgress(0);
              }}
              disabled={state === 'ready'}
            >
              {state === 'ready' ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Done
                </>
              ) : (
                <>
                  <FileDown className="h-3.5 w-3.5" />
                  Generate
                </>
              )}
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
