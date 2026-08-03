import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/landing/Reveal';
import { STUDENT_PROFILE } from '@/features/dashboard/data';
import { DashboardSection } from '@/features/dashboard/components/DashboardSection';
import { ProgressHero } from '../components/ProgressHero';
import { OverviewCards } from '../components/OverviewCards';
import { StudyChart } from '../components/StudyChart';
import { ContributionCalendar } from '../components/ContributionCalendar';
import { SubjectProgressGrid } from '../components/SubjectProgressGrid';
import { LearningInsights } from '../components/LearningInsights';
import { GoalsSection } from '../components/GoalsSection';
import { AchievementGallery } from '../components/AchievementGallery';
import { LearningTimeline } from '../components/LearningTimeline';
import {
  ACHIEVEMENTS,
  CONTRIBUTION_DAYS,
  GOALS,
  INSIGHTS,
  OVERVIEW_STATS,
  STREAK,
  SUBJECT_PROGRESS,
  TIMELINE,
  WEEKLY_STUDY,
} from '../data';

const viewAllLink =
  'inline-flex items-center gap-1 text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300';

export const ProgressPage: React.FC = () => {
  const overallCompletion = OVERVIEW_STATS.find((stat) => stat.id === 'completion')?.value ?? 58;
  const weeklyHours = OVERVIEW_STATS.find((stat) => stat.id === 'weekly-time')?.value ?? 9.5;

  return (
    <div className="space-y-10">
      <Reveal y={16}>
        <ProgressHero
          name={STUDENT_PROFILE.name}
          streak={STREAK}
          overallCompletion={overallCompletion}
          weeklyHours={weeklyHours}
          subjectCount={SUBJECT_PROGRESS.length}
        />
      </Reveal>

      <Reveal>
        <OverviewCards stats={OVERVIEW_STATS} />
      </Reveal>

      <DashboardSection
        title="Study Activity"
        subtitle="Your weekly rhythm and daily consistency"
      >
        <div className="grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <StudyChart data={WEEKLY_STUDY} className="h-full" />
          </Reveal>
          <Reveal className="lg:col-span-2">
            <ContributionCalendar days={CONTRIBUTION_DAYS} className="h-full" />
          </Reveal>
        </div>
      </DashboardSection>

      <DashboardSection
        title="Subject Progress"
        subtitle="Where you stand in each subject"
        action={
          <Link to="/app/subjects" className={viewAllLink}>
            View subjects
            <ChevronRight className="h-4 w-4" />
          </Link>
        }
      >
        <Reveal>
          <SubjectProgressGrid subjects={SUBJECT_PROGRESS} />
        </Reveal>
      </DashboardSection>

      <div className="grid gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <DashboardSection
            title="Learning Insights"
            subtitle="Personalized signals to guide you"
          >
            <LearningInsights insights={INSIGHTS} />
          </DashboardSection>
        </Reveal>
        <Reveal className="h-full">
          <DashboardSection title="Goals" subtitle="Daily, weekly and monthly targets">
            <GoalsSection goals={GOALS} />
          </DashboardSection>
        </Reveal>
      </div>

      <DashboardSection
        title="Achievements"
        subtitle="Badges you’ve earned along the way"
      >
        <Reveal>
          <AchievementGallery achievements={ACHIEVEMENTS} />
        </Reveal>
      </DashboardSection>

      <DashboardSection
        title="Learning Timeline"
        subtitle="Your recent milestones in order"
      >
        <Reveal>
          <LearningTimeline events={TIMELINE} />
        </Reveal>
      </DashboardSection>
    </div>
  );
};
