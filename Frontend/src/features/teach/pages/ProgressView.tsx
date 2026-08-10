import React from 'react';
import { AlertTriangle, GraduationCap, TrendingUp, Users } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Dropdown } from '@/components/ui/dropdown';
import { ProgressBar } from '@/components/ui/progress-bar';
import { EmptyState } from '@/components/ui/empty-state';
import { GalaxyGlow } from '@/components/theme/GalaxyGlow';
import { Reveal } from '@/components/landing/Reveal';
import { TeacherNav } from '../components/TeacherNav';
import { PerformanceCard } from '../components/PerformanceCard';
import { PerformanceOverview } from '../components/PerformanceOverview';
import type { PerformanceRow } from '../components/PerformanceOverview';
import { AttentionList } from '../components/AttentionList';
import { TeacherActivity } from '../components/TeacherActivity';
import {
  ACTIVE_CLASSES,
  ATTENTION_ITEMS,
  AVERAGE_CLASS_COMPLETION,
  AVERAGE_CLASS_SCORE,
  CLASSES_NEEDING_ATTENTION,
  STUDENTS_NEEDING_ATTENTION,
  STUDENTS_TRACKED,
  SUBJECT_PERFORMANCE,
  SUBJECTS,
  TEACHER_ACTIVITIES,
} from '../data';
import { cn } from '@/lib/utils';
import type { StudentProgress } from '../types';

const TIME_RANGES = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'This term', value: 'term' },
];

const StudentPerformanceRow: React.FC<{ student: StudentProgress; index: number }> = ({
  student,
  index,
}) => {
  const isPositive = student.trend >= 0;
  return (
    <li className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-4 sm:flex-row sm:items-center">
      <span className="flex min-w-0 flex-1 items-center gap-3">
        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[11px] font-bold text-slate-300">
          {index + 1}
        </span>
        <Avatar name={student.name} size="sm" />
        <span className="truncate text-sm font-semibold text-slate-100">{student.name}</span>
      </span>
      <span className="flex flex-1 items-center gap-3">
        <ProgressBar value={student.completion} variant="primary" size="sm" className="flex-1" />
        <span className="shrink-0 text-xs font-semibold text-slate-200">{student.completion}%</span>
      </span>
      <span className="shrink-0 text-xs text-slate-400">
        Avg <span className="font-semibold text-slate-200">{student.averageScore}%</span>
      </span>
      <span className={cn('shrink-0 text-xs font-medium', isPositive ? 'text-emerald-400' : 'text-rose-400')}>
        {isPositive ? '↑' : '↓'} {Math.abs(student.trend)}
      </span>
    </li>
  );
};

export const ProgressView: React.FC = () => {
  const [classId, setClassId] = React.useState(ACTIVE_CLASSES[0]?.id ?? '');
  const [subjectId, setSubjectId] = React.useState(SUBJECTS[0].id);
  const [timeRange, setTimeRange] = React.useState('30d');

  const classRows: PerformanceRow[] = ACTIVE_CLASSES.map((klass) => ({
    id: klass.id,
    label: klass.name,
    value: klass.completion,
    detail: `avg ${klass.averageScore}%`,
  }));

  const subjectRows: PerformanceRow[] = SUBJECT_PERFORMANCE.map((subject) => ({
    id: subject.id,
    label: subject.name,
    value: subject.averageScore,
    detail: `${subject.completion}% complete`,
  }));

  return (
    <Container size="xl" className="space-y-8">
      <TeacherNav />

      <Reveal y={16}>
        <section
          aria-label="Learning progress"
          className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/15 via-slate-900/70 to-violet-600/15 px-6 py-8 sm:px-8"
        >
          <GalaxyGlow color="violet" x="90%" y="-20%" size={340} opacity={0.16} />
          <div className="relative space-y-1.5">
            <h1 className="font-display text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
              Learning Progress
            </h1>
            <p className="max-w-xl text-sm text-slate-400">
              A teacher-level view of completion and performance across your students.
            </p>
          </div>
        </section>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-3">
        <Dropdown
          label="Class"
          options={ACTIVE_CLASSES.map((klass) => ({ label: klass.name, value: klass.id }))}
          value={classId}
          onChange={setClassId}
          className="sm:max-w-xs"
        />
        <Dropdown
          label="Subject"
          options={SUBJECTS.map((subject) => ({ label: subject.title, value: subject.id }))}
          value={subjectId}
          onChange={setSubjectId}
          className="sm:max-w-xs"
        />
        <Dropdown
          label="Time range"
          options={TIME_RANGES}
          value={timeRange}
          onChange={setTimeRange}
          className="sm:max-w-xs"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <PerformanceCard title="Students tracked" value={STUDENTS_TRACKED} unit="" icon={Users} color="#6366f1" />
        <PerformanceCard title="Average completion" value={AVERAGE_CLASS_COMPLETION} icon={GraduationCap} color="#10b981" />
        <PerformanceCard title="Average score" value={AVERAGE_CLASS_SCORE} icon={TrendingUp} color="#38bdf8" />
        <PerformanceCard
          title="Need attention"
          value={CLASSES_NEEDING_ATTENTION}
          unit=""
          icon={AlertTriangle}
          color="#f43f5e"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <PerformanceOverview rows={classRows} title="Class performance" />
        <PerformanceOverview rows={subjectRows} title="Subject performance" />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section aria-label="Student performance" className="space-y-4">
          <h2 className="font-display text-xl font-bold tracking-tight text-slate-100">
            Student performance
          </h2>
          {STUDENTS_NEEDING_ATTENTION.length > 0 ? (
            <ul className="space-y-3">
              {STUDENTS_NEEDING_ATTENTION.map((student, index) => (
                <StudentPerformanceRow key={student.id} student={student} index={index} />
              ))}
            </ul>
          ) : (
            <EmptyState title="No students to show" description="Student data will appear here." />
          )}
        </section>

        <div className="space-y-8">
          <section aria-label="Needs attention" className="space-y-4">
            <h2 className="font-display text-xl font-bold tracking-tight text-slate-100">
              Needs attention
            </h2>
            <AttentionList items={ATTENTION_ITEMS} />
          </section>

          <Card className="p-5">
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-slate-300">
              Recent activity
            </h3>
            <TeacherActivity activities={TEACHER_ACTIVITIES.slice(0, 3)} />
          </Card>
        </div>
      </div>
    </Container>
  );
};
