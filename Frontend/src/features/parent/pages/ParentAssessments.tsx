import React from 'react';
import { ClipboardCheck } from 'lucide-react';
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
          aria-label="Assessment results"
          className="relative overflow-hidden rounded-[28px] border border-violet-500/20 bg-slate-950/70 px-6 py-7 shadow-[0_20px_60px_rgba(15,23,42,0.7)] sm:px-8"
        >
          <GalaxyGlow color="violet" x="86%" y="-20%" size={320} opacity={0.14} />
          <GalaxyGlow color="sky" x="18%" y="102%" size={260} opacity={0.1} />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-300">
                <ClipboardCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Mission control
              </p>
              <h1 className="font-display text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
                Assessment results
              </h1>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 px-3 py-2 text-sm text-slate-300">
              {results.length} result{results.length === 1 ? '' : 's'} tracked
            </div>
          </div>
          <p className="relative mt-4 max-w-xl text-sm text-slate-400">
            Scores, grades and trends across every test your children have completed.
          </p>
        </section>
      </Reveal>

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
