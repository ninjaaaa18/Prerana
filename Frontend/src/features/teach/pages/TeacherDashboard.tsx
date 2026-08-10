import React from 'react';
import { ClipboardCheck, FilePlus2, FolderCheck, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';
import { TeacherNav } from '../components/TeacherNav';
import { TeacherHero } from '../components/TeacherHero';
import { TeacherStatGrid } from '../components/TeacherStatGrid';
import { TeacherSection } from '../components/TeacherSection';
import { QuickActionCard } from '../components/QuickActionCard';
import { DraftCard } from '../components/DraftCard';
import { TeacherActivity } from '../components/TeacherActivity';
import { AttentionList } from '../components/AttentionList';
import { PerformanceOverview } from '../components/PerformanceOverview';
import type { PerformanceRow } from '../components/PerformanceOverview';
import {
  ACTIVE_CLASSES,
  ATTENTION_ITEMS,
  DRAFTS,
  QUICK_ACTIONS,
  TEACHER_ACTIVITIES,
  TEACHER_STATS,
} from '../data';

const QUICK_ACTION_ICONS: Record<string, LucideIcon> = {
  'qa-1': FilePlus2,
  'qa-2': ClipboardCheck,
  'qa-3': Users,
  'qa-4': FolderCheck,
};

const classPerformanceRows = (): PerformanceRow[] =>
  ACTIVE_CLASSES.map((klass) => ({
    id: klass.id,
    label: `${klass.name} · ${klass.subject}`,
    value: klass.completion,
    detail: `avg ${klass.averageScore}%`,
  }));

export const TeacherDashboard: React.FC = () => {
  const classRows = React.useMemo(classPerformanceRows, []);

  return (
    <Container size="xl" className="space-y-8">
      <TeacherNav />
      <TeacherHero />

      <TeacherStatGrid stats={TEACHER_STATS} />

      <TeacherSection
        title="Quick Actions"
        subtitle="Jump straight into your most common tasks."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {QUICK_ACTIONS.map((action) => (
            <QuickActionCard
              key={action.id}
              title={action.title}
              description={action.description}
              to={action.to}
              color={action.color}
              icon={QUICK_ACTION_ICONS[action.id] ?? FilePlus2}
            />
          ))}
        </div>
      </TeacherSection>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <TeacherSection
            title="Recent Drafts"
            subtitle="Content you have been working on recently."
            action={
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-300">
                {DRAFTS.length} drafts
              </span>
            }
          >
            {DRAFTS.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {DRAFTS.map((draft) => (
                  <DraftCard key={draft.id} draft={draft} />
                ))}
              </div>
            ) : (
              <EmptyState title="No drafts" description="Drafted content will appear here." />
            )}
          </TeacherSection>

          <TeacherSection
            title="Class Performance Snapshot"
            subtitle="How your active classes are tracking."
          >
            <PerformanceOverview rows={classRows} />
          </TeacherSection>
        </div>

        <div className="space-y-8">
          <TeacherSection
            title="Needs Attention"
            subtitle="Things that may need your follow-up today."
          >
            <AttentionList items={ATTENTION_ITEMS} />
          </TeacherSection>

          <TeacherSection
            title="Recent Activity"
            subtitle="The latest movements across your workspace."
          >
            <Card className="p-5">
              <TeacherActivity activities={TEACHER_ACTIVITIES} />
            </Card>
          </TeacherSection>
        </div>
      </div>
    </Container>
  );
};
