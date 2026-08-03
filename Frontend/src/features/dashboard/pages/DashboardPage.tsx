import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/landing/Reveal';
import { DashboardHero } from '../components/DashboardHero';
import { ContinueLearningCard } from '../components/ContinueLearningCard';
import { DailyGoals } from '../components/DailyGoals';
import { SubjectGrid } from '../components/SubjectGrid';
import { AITutorCard } from '../components/AITutorCard';
import { AssessmentList } from '../components/AssessmentList';
import { ActivityTimeline } from '../components/ActivityTimeline';
import { AchievementGrid } from '../components/AchievementGrid';
import { StatsGrid } from '../components/StatsGrid';
import { DashboardSection } from '../components/DashboardSection';
import {
  ACHIEVEMENTS,
  ACTIVITIES,
  ASSESSMENTS,
  CONTINUE_LEARNING,
  DAILY_GOALS,
  MOTIVATION,
  STATS,
  STUDENT_PROFILE,
  SUBJECTS,
} from '../data';

const viewAllLink =
  'inline-flex items-center gap-1 text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-10">
      <DashboardHero
        name={STUDENT_PROFILE.name}
        streak={STUDENT_PROFILE.streak}
        motivation={MOTIVATION}
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <Reveal className="xl:col-span-2">
          <ContinueLearningCard {...CONTINUE_LEARNING} />
        </Reveal>
        <Reveal>
          <DailyGoals goals={DAILY_GOALS} />
        </Reveal>
      </div>

      <DashboardSection
        title="Your Subjects"
        subtitle="Pick up where you left off"
        action={
          <Link to="/app/subjects" className={viewAllLink}>
            View all
            <ChevronRight className="h-4 w-4" />
          </Link>
        }
      >
        <Reveal>
          <SubjectGrid subjects={SUBJECTS} />
        </Reveal>
      </DashboardSection>

      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal className="h-full">
          <AITutorCard className="h-full" />
        </Reveal>
        <Reveal className="h-full">
          <DashboardSection
            title="Upcoming Assessments"
            subtitle="Your next checkpoints"
            action={
              <Link to="/app/assessments" className={viewAllLink}>
                View all
                <ChevronRight className="h-4 w-4" />
              </Link>
            }
          >
            <AssessmentList assessments={ASSESSMENTS} />
          </DashboardSection>
        </Reveal>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <DashboardSection
            title="Recent Activity"
            subtitle="Your latest milestones"
            action={
              <Link to="/app/progress" className={viewAllLink}>
                View all
                <ChevronRight className="h-4 w-4" />
              </Link>
            }
          >
            <ActivityTimeline activities={ACTIVITIES} />
          </DashboardSection>
        </Reveal>
        <Reveal>
          <DashboardSection
            title="Achievements"
            subtitle="Badges you've earned"
            action={
              <Link to="/app/progress" className={viewAllLink}>
                View all
                <ChevronRight className="h-4 w-4" />
              </Link>
            }
          >
            <AchievementGrid achievements={ACHIEVEMENTS} />
          </DashboardSection>
        </Reveal>
      </div>

      <DashboardSection
        title="Learning Statistics"
        subtitle="Your learning at a glance"
      >
        <StatsGrid stats={STATS} />
      </DashboardSection>
    </div>
  );
};
