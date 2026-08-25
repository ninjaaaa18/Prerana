import React from 'react';
import { ClipboardCheck, ScanLine, Telescope } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Dropdown } from '@/components/ui/dropdown';
import { EmptyState } from '@/components/ui/empty-state';
import { GalaxyGlow } from '@/components/theme/GalaxyGlow';
import { Reveal } from '@/components/landing/Reveal';
import { ParentNav } from '../components/ParentNav';
import { AssessmentResultCard } from '../components/AssessmentResultCard';
import { filterAssessmentResults, getChildren, getSubjectNames } from '../data';
import type { AssessmentStatus } from '../types';

const CHILD_FILTERS = (): { label: string; value: string }[] => [
  { label: 'All children', value: 'all' },
  ...getChildren().map((child) => ({ label: child.name, value: child.id })),
];

const STATUS_FILTERS: { label: string; value: string }[] = [
  { label: 'All results', value: 'all' },
  { label: 'Excellent', value: 'excellent' },
  { label: 'Passed', value: 'passed' },
  { label: 'Needs retake', value: 'failed' },
  { label: 'Scheduled', value: 'pending' },
];

export const ParentAssessments: React.FC = () => {
  const [childId, setChildId] = React.useState('all');
  const [subjectName, setSubjectName] = React.useState('all');
  const [status, setStatus] = React.useState('all');

  const results = filterAssessmentResults({
    childId: childId === 'all' ? undefined : childId,
    subjectName: subjectName === 'all' ? undefined : subjectName,
    status: status === 'all' ? undefined : (status as AssessmentStatus),
  });

  return (
    <Container size="xl" className="space-y-8">
      <ParentNav />

      <Reveal y={16}>
        <section
          aria-label="Assessment observatory"
          className="relative overflow-hidden rounded-[28px] border border-cyan-400/20 bg-[radial-gradient(circle_at_88%_18%,rgba(56,189,248,0.12),transparent_28%),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(16,10,38,0.9))] px-6 py-7 shadow-[0_20px_60px_rgba(15,23,42,0.7)] sm:px-8"
        >
          <GalaxyGlow color="violet" x="86%" y="-20%" size={280} opacity={0.12} />
          <GalaxyGlow color="sky" x="18%" y="112%" size={220} opacity={0.08} />
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300">
                <Telescope className="h-3.5 w-3.5" aria-hidden="true" />
                Assessment observatory
              </p>
              <h1 className="font-display text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
                Mission Results
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-slate-400">
                Track every learning mission your children have completed, from first attempt to breakthrough.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-cyan-400/15 bg-slate-950/55 px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                <ScanLine className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-xl font-extrabold leading-none text-slate-100">{results.length}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Missions tracked</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <section
        aria-label="Mission scanner"
        className="relative overflow-visible rounded-2xl border border-violet-400/15 bg-slate-950/60 p-4 shadow-[0_14px_40px_rgba(15,23,42,0.35)] sm:p-5"
      >
        <div className="mb-4 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
          <h2 className="text-[10px] font-bold uppercase tracking-[0.24em] text-violet-200">Mission scanner</h2>
          <span className="ml-auto text-[10px] uppercase tracking-[0.16em] text-slate-600">Filter telemetry</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Dropdown label="Child" options={CHILD_FILTERS()} value={childId} onChange={setChildId} />
          <Dropdown
            label="Subject"
            options={[
              { label: 'All subjects', value: 'all' },
              ...getSubjectNames().map((name) => ({ label: name, value: name })),
            ]}
            value={subjectName}
            onChange={setSubjectName}
          />
          <Dropdown label="Result" options={STATUS_FILTERS} value={status} onChange={setStatus} />
        </div>
      </section>

      {results.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((result) => (
            <AssessmentResultCard key={result.id} result={result} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No results match"
          description="Try adjusting the filters to see more assessment results."
          icon={<ClipboardCheck className="h-8 w-8" aria-hidden="true" />}
        />
      )}
    </Container>
  );
};
