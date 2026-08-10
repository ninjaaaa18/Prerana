import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, GraduationCap, TrendingDown, TrendingUp, Users } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { EmptyState } from '@/components/ui/empty-state';
import { Tabs } from '@/components/ui/tabs';
import { GalaxyGlow } from '@/components/theme/GalaxyGlow';
import { Reveal } from '@/components/landing/Reveal';
import { TeacherNav } from '../components/TeacherNav';
import { PerformanceCard } from '../components/PerformanceCard';
import { PerformanceOverview } from '../components/PerformanceOverview';
import type { PerformanceRow } from '../components/PerformanceOverview';
import { StudentTable } from '../components/StudentTable';
import { StudentCard } from '../components/StudentCard';
import { TeacherActivity } from '../components/TeacherActivity';
import { TEACHER_PROFILE, CHAPTER_PERFORMANCE, getClass, getStudentsForClass, STRONG_TOPICS, SUBJECT_PERFORMANCE, TEACHER_ACTIVITIES, WEAK_TOPICS } from '../data';
import { cn } from '@/lib/utils';

export const ClassDetail: React.FC = () => {
  const { classId = '' } = useParams<{ classId: string }>();
  const klass = getClass(classId);
  const [studentQuery, setStudentQuery] = React.useState('');

  if (!klass) {
    return (
      <Container size="md">
        <TeacherNav className="mb-8" />
        <EmptyState
          icon={<Users className="h-8 w-8" />}
          title="Class not found"
          description="This class may have been removed. Choose another class from your list."
          actionText="Back to Classes"
        />
      </Container>
    );
  }

  const students = getStudentsForClass(classId);
  const filteredStudents = students.filter((student) =>
    studentQuery.trim() === '' ||
    student.name.toLowerCase().includes(studentQuery.trim().toLowerCase())
  );
  const isPositive = klass.trend >= 0;

  const subjectRows: PerformanceRow[] = SUBJECT_PERFORMANCE.map((subject) => ({
    id: subject.id,
    label: subject.name,
    value: subject.averageScore,
    detail: `${subject.completion}% complete`,
  }));

  const chapterRows: PerformanceRow[] = CHAPTER_PERFORMANCE.map((chapter) => ({
    id: chapter.id,
    label: chapter.name,
    value: chapter.completion,
    detail: `avg ${chapter.averageScore}%`,
  }));

  const weakRows: PerformanceRow[] = WEAK_TOPICS.map((topic) => ({
    id: topic.id,
    label: topic.name,
    value: topic.performance,
    variant: 'coral',
  }));

  const strongRows: PerformanceRow[] = STRONG_TOPICS.map((topic) => ({
    id: topic.id,
    label: topic.name,
    value: topic.performance,
    variant: 'emerald',
  }));

  return (
    <Container size="xl" className="space-y-8">
      <TeacherNav />

      <Link
        to="/app/teach/classes"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Classes
      </Link>

      <Reveal y={16}>
        <section
          aria-label={klass.name}
          className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/15 via-slate-900/70 to-violet-600/15 px-6 py-8 sm:px-8"
        >
          <GalaxyGlow color="indigo" x="10%" y="-25%" size={360} opacity={0.2} />
          <GalaxyGlow color="violet" x="90%" y="115%" size={320} opacity={0.14} />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <Avatar name={klass.name} size="xl" />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-display text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
                    {klass.name}
                  </h1>
                  {klass.status === 'archived' ? (
                    <Badge variant="secondary" size="sm">
                      Archived
                    </Badge>
                  ) : (
                    <Badge variant="success" size="sm" dot>
                      Active
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-slate-400">
                  {klass.subject} · Section {klass.section} · {klass.grade}
                </p>
                <p className="flex items-center gap-2 text-xs text-slate-500">
                  <Avatar name={TEACHER_PROFILE.name} size="sm" />
                  {TEACHER_PROFILE.name} · Class Teacher
                </p>
              </div>
            </div>

            <div className={cn('flex items-center gap-2 rounded-xl border px-4 py-2', isPositive ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-rose-500/30 bg-rose-500/10 text-rose-300')}>
              {isPositive ? (
                <TrendingUp className="h-4 w-4" aria-hidden="true" />
              ) : (
                <TrendingDown className="h-4 w-4" aria-hidden="true" />
              )}
              <span className="text-sm font-semibold">{isPositive ? '+' : ''}{klass.trend} pts this month</span>
            </div>
          </div>
        </section>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-3">
        <PerformanceCard
          title="Students"
          value={klass.studentCount}
          unit=""
          icon={Users}
          color="#6366f1"
        />
        <PerformanceCard
          title="Completion"
          value={klass.completion}
          icon={GraduationCap}
          color="#10b981"
        />
        <PerformanceCard
          title="Average Score"
          value={klass.averageScore}
          icon={TrendingUp}
          color="#38bdf8"
        />
      </div>

      <Tabs
        defaultTabId="overview"
        tabs={[
          {
            id: 'overview',
            label: 'Overview',
            content: (
              <div className="space-y-8">
                <div className="grid gap-8 lg:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="font-display text-sm font-bold uppercase tracking-wider text-slate-300">
                      Weak topics
                    </h3>
                    <PerformanceOverview rows={weakRows} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-display text-sm font-bold uppercase tracking-wider text-slate-300">
                      Strongest topics
                    </h3>
                    <PerformanceOverview rows={strongRows} />
                  </div>
                </div>
                <Card className="space-y-4 p-5">
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-slate-300">
                    Recent activity
                  </h3>
                  <TeacherActivity activities={TEACHER_ACTIVITIES.slice(0, 3)} />
                </Card>
              </div>
            ),
          },
          {
            id: 'students',
            label: 'Students',
            content: (
              <div className="space-y-6">
                <Input
                  variantType="search"
                  placeholder="Search students…"
                  value={studentQuery}
                  onChange={(event) => setStudentQuery(event.target.value)}
                  className="max-w-sm"
                  aria-label="Search students"
                />
                {filteredStudents.length === 0 ? (
                  <EmptyState title="No students found" description="Try a different search term." />
                ) : (
                  <>
                    <div className="hidden lg:block">
                      <StudentTable students={filteredStudents} classId={classId} />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
                      {filteredStudents.map((student) => (
                        <StudentCard key={student.id} student={student} classId={classId} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ),
          },
          {
            id: 'performance',
            label: 'Performance',
            content: (
              <div className="grid gap-8 lg:grid-cols-2">
                <PerformanceOverview rows={subjectRows} title="Subject performance" />
                <PerformanceOverview rows={chapterRows} title="Chapter performance" />
              </div>
            ),
          },
          {
            id: 'activity',
            label: 'Activity',
            content: (
              <Card className="p-5">
                <TeacherActivity activities={TEACHER_ACTIVITIES} />
              </Card>
            ),
          },
        ]}
      />
    </Container>
  );
};
