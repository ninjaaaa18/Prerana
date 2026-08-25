import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock3, Flame, Orbit, Target } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';
import { ParentNav } from '../components/ParentNav';
import { ChildHero } from '../components/ChildHero';
import { ParentStatGrid } from '../components/ParentStatGrid';
import { ParentSection } from '../components/ParentSection';
import { SubjectMasteryList } from '../components/SubjectMasteryList';
import { AssessmentHistoryList } from '../components/AssessmentHistoryList';
import { StrengthWeaknessList } from '../components/StrengthWeaknessList';
import type { TopicItem } from '../components/StrengthWeaknessList';
import { ActivityFeed } from '../components/ActivityFeed';
import { FocusRecommendationCard } from '../components/FocusRecommendationCard';
import {
  getActivitiesForChild,
  getAssessmentResults,
  getChild,
  getChildPerformance,
  getFocusRecommendation,
  getSubjectMastery,
} from '../data';
import type { ParentStat } from '../types';

export const ChildDetail: React.FC = () => {
  const { childId = '' } = useParams<{ childId: string }>();
  const navigate = useNavigate();

  const child = getChild(childId);

  if (!child) {
    return (
      <Container size="xl" className="space-y-8">
        <ParentNav />
        <EmptyState
          title="Child not found"
          description="We could not find a child with this id. It may have been removed or the link is incorrect."
          icon={<BookOpen className="h-8 w-8" aria-hidden="true" />}
          actionText="Back to Mission Control"
          onAction={() => navigate('/app/parent')}
        />
      </Container>
    );
  }

  const performance = getChildPerformance(child.id);
  const subjects = getSubjectMastery(child.id);
  const assessmentResults = getAssessmentResults(child.id);
  const activities = getActivitiesForChild(child.id);
  const recommendation = getFocusRecommendation(child.id);

  const stats: ParentStat[] = performance
    ? [
        {
          id: 'cs-1',
          label: 'Current streak',
          value: performance.streak,
          unit: 'days',
          icon: Flame,
          color: '#f59e0b',
        },
        {
          id: 'cs-2',
          label: 'Study hours',
          value: performance.studyHours,
          unit: 'hrs',
          icon: Clock3,
          color: '#8b5cf6',
        },
        {
          id: 'cs-3',
          label: 'Lessons completed',
          value: performance.lessonsCompleted,
          icon: BookOpen,
          color: '#6366f1',
        },
        {
          id: 'cs-4',
          label: 'Average score',
          value: performance.averageScore,
          unit: '%',
          icon: Target,
          color: '#38bdf8',
        },
      ]
    : [];

  const strengths: TopicItem[] = subjects
    .filter((subject) => subject.mastery >= 70)
    .map((subject) => ({
      id: `${subject.id}-strength`,
      name: subject.subjectName,
      value: subject.mastery,
    }));
  const weaknesses: TopicItem[] = subjects
    .filter((subject) => subject.mastery < 50)
    .map((subject) => ({
      id: `${subject.id}-weakness`,
      name: subject.subjectName,
      value: subject.mastery,
    }));

  return (
    <Container size="xl" className="space-y-8 pb-8">
      <ParentNav />

      <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/35 px-3 py-2 text-xs text-slate-400 sm:px-4">
        <div className="flex items-center gap-2">
          <Orbit className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" />
          <span className="font-medium uppercase tracking-[0.22em] text-slate-500">Mission control</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeft className="h-4 w-4" aria-hidden="true" />}
          onClick={() => navigate('/app/parent')}
          className="px-2 text-slate-300 hover:text-slate-100"
        >
          Back
        </Button>
      </div>

      {performance && <ChildHero child={child} performance={performance} />}

      <ParentStatGrid stats={stats} />

      <div className="grid gap-8 xl:grid-cols-[1.7fr_0.9fr]">
        <div className="space-y-8">
          <ParentSection title="Subject mastery" subtitle={`How ${child.name} is performing across subjects.`}>
            <SubjectMasteryList subjects={subjects} />
          </ParentSection>

          <ParentSection title="Assessment history" subtitle="Recent test and quiz results.">
            <div className="rounded-[26px] border border-slate-800/80 bg-slate-950/40 p-3 sm:p-4">
              <AssessmentHistoryList results={assessmentResults} />
            </div>
          </ParentSection>
        </div>

        <div className="space-y-8">
          <ParentSection title="Next mission" subtitle="The most helpful next step.">
            {recommendation ? (
              <FocusRecommendationCard recommendation={recommendation} />
            ) : (
              <EmptyState
                title="No recommendation"
                description="A focus recommendation will appear here."
              />
            )}
          </ParentSection>

          <ParentSection
            title="Strengths & focus areas"
            subtitle={`Where ${child.name} shines and where support helps.`}
          >
            <StrengthWeaknessList strengths={strengths} weaknesses={weaknesses} />
          </ParentSection>
        </div>
      </div>

      <ParentSection title="Recent learning activity" subtitle={`The latest learning moments for ${child.name}.`}>
        <div className="rounded-[26px] border border-slate-800/80 bg-slate-950/40 p-3 sm:p-4">
          <ActivityFeed activities={activities.slice(0, 5)} />
        </div>
      </ParentSection>
    </Container>
  );
};
