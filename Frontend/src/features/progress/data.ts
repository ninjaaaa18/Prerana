import {
  Award,
  BookOpen,
  BookOpenCheck,
  Bot,
  CalendarCheck,
  ClipboardCheck,
  Compass,
  Crown,
  Flame,
  FlaskConical,
  Globe2,
  Layers,
  Sun,
  Target,
  Timer,
  TrendingDown,
  TrendingUp,
  Zap,
  Calculator,
  Code2,
  Languages,
  Palette,
} from 'lucide-react';
import type {
  Achievement,
  ActivityLevel,
  DayActivity,
  Goal,
  Insight,
  OverviewStat,
  SubjectProgress,
  TimelineEvent,
  WeekStudyDatum,
} from './types';

const iso = (date: Date): string => date.toISOString().slice(0, 10);

function mulberry32(seed: number): () => number {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ACTIVITY_DAYS = 26 * 7;

function buildContributionDays(): DayActivity[] {
  const rand = mulberry32(20260803);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(start.getDate() - ACTIVITY_DAYS);

  const days: DayActivity[] = [];
  for (let i = 0; i <= ACTIVITY_DAYS; i += 1) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    const dow = date.getDay();
    const weeksAgo = Math.floor((ACTIVITY_DAYS - i) / 7);
    const boost = Math.max(0, 1 - weeksAgo / 26);

    let active: boolean;
    if (dow === 0 || dow === 6) {
      active = rand() < 0.16 + boost * 0.4;
    } else {
      active = rand() < 0.26 + boost * 0.55;
    }
    if (i >= ACTIVITY_DAYS - 4) active = true;

    if (!active) {
      days.push({ date: iso(date), level: 0, minutes: 0 });
      continue;
    }

    const roll = rand();
    const level: ActivityLevel =
      roll < 0.45 ? 1 : roll < 0.75 ? 2 : roll < 0.92 ? 3 : 4;
    const minutes = level * (12 + Math.round(rand() * 14));
    days.push({ date: iso(date), level, minutes });
  }
  return days;
}

export const STREAK = 5;

export const OVERVIEW_STATS: OverviewStat[] = [
  {
    id: 'completion',
    label: 'Overall completion',
    value: 58,
    unit: '%',
    icon: Target,
    accent: '#6366f1',
    change: '6% this month',
    isPositive: true,
  },
  {
    id: 'weekly-time',
    label: 'Weekly study time',
    value: 9.5,
    unit: 'hrs',
    icon: Timer,
    accent: '#10b981',
    change: '1.5 hrs more than last week',
    isPositive: true,
  },
  {
    id: 'streak',
    label: 'Current streak',
    value: STREAK,
    unit: 'days',
    icon: Flame,
    accent: '#f59e0b',
    change: 'Personal best: 12 days',
    isPositive: true,
  },
  {
    id: 'lessons',
    label: 'Total lessons',
    value: 148,
    unit: 'lessons',
    icon: BookOpenCheck,
    accent: '#0ea5e9',
    change: '5 this week',
    isPositive: true,
  },
  {
    id: 'chapters',
    label: 'Chapters completed',
    value: 74,
    unit: 'chapters',
    icon: Layers,
    accent: '#8b5cf6',
    change: '2 this month',
    isPositive: true,
  },
  {
    id: 'assessments',
    label: 'Assessments completed',
    value: 23,
    unit: 'assessments',
    icon: ClipboardCheck,
    accent: '#f43f5e',
    change: 'Average score 87%',
    isPositive: true,
  },
];

export const SUBJECT_PROGRESS: SubjectProgress[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: Calculator,
    color: '#6366f1',
    progress: 68,
    lessonsCompleted: 54,
    lessonsTotal: 82,
    chaptersCompleted: 17,
    chaptersTotal: 25,
    averageScore: 92,
    lastActivity: 'Today',
  },
  {
    id: 'science',
    name: 'Science',
    icon: FlaskConical,
    color: '#10b981',
    progress: 42,
    lessonsCompleted: 30,
    lessonsTotal: 70,
    chaptersCompleted: 10,
    chaptersTotal: 24,
    averageScore: 84,
    lastActivity: 'Yesterday',
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    icon: Code2,
    color: '#0ea5e9',
    progress: 85,
    lessonsCompleted: 76,
    lessonsTotal: 90,
    chaptersCompleted: 22,
    chaptersTotal: 26,
    averageScore: 88,
    lastActivity: 'Today',
  },
  {
    id: 'english',
    name: 'English',
    icon: Languages,
    color: '#f43f5e',
    progress: 55,
    lessonsCompleted: 38,
    lessonsTotal: 70,
    chaptersCompleted: 14,
    chaptersTotal: 26,
    averageScore: 81,
    lastActivity: '3 days ago',
  },
  {
    id: 'social-studies',
    name: 'Social Studies',
    icon: Globe2,
    color: '#f59e0b',
    progress: 30,
    lessonsCompleted: 22,
    lessonsTotal: 72,
    chaptersCompleted: 7,
    chaptersTotal: 24,
    averageScore: 74,
    lastActivity: 'Aug 1',
  },
  {
    id: 'arts',
    name: 'Arts',
    icon: Palette,
    color: '#8b5cf6',
    progress: 20,
    lessonsCompleted: 9,
    lessonsTotal: 46,
    chaptersCompleted: 4,
    chaptersTotal: 20,
    averageScore: 86,
    lastActivity: '2 weeks ago',
  },
];

export const WEEKLY_STUDY: WeekStudyDatum[] = [
  { date: '2026-05-25', label: 'May 25', hours: 4, lessons: 3, assessments: 1 },
  { date: '2026-06-01', label: 'Jun 1', hours: 5.5, lessons: 4, assessments: 1 },
  { date: '2026-06-08', label: 'Jun 8', hours: 6, lessons: 5, assessments: 2 },
  { date: '2026-06-15', label: 'Jun 15', hours: 4.5, lessons: 3, assessments: 1 },
  { date: '2026-06-22', label: 'Jun 22', hours: 7, lessons: 6, assessments: 2 },
  { date: '2026-06-29', label: 'Jun 29', hours: 8.5, lessons: 7, assessments: 2 },
  { date: '2026-07-06', label: 'Jul 6', hours: 6.5, lessons: 5, assessments: 1 },
  { date: '2026-07-13', label: 'Jul 13', hours: 9, lessons: 8, assessments: 3 },
  { date: '2026-07-20', label: 'Jul 20', hours: 8, lessons: 7, assessments: 2 },
  { date: '2026-07-27', label: 'Jul 27', hours: 11, lessons: 9, assessments: 3 },
  { date: '2026-08-03', label: 'Aug 3', hours: 9.5, lessons: 8, assessments: 2 },
];

export const CONTRIBUTION_DAYS: DayActivity[] = buildContributionDays();

export const INSIGHTS: Insight[] = [
  {
    id: 'strength',
    tone: 'positive',
    title: 'Your strength: Mathematics',
    description:
      'You average 92% across 9 mathematics assessments. Weekly review sessions keep this sharp.',
    icon: TrendingUp,
  },
  {
    id: 'improve',
    tone: 'warning',
    title: 'Needs improvement: Social Studies',
    description:
      'Only 7 of 24 chapters completed. Two focused 30-minute sessions this week would build momentum.',
    icon: TrendingDown,
  },
  {
    id: 'recommended',
    tone: 'info',
    title: 'Recommended next: Quadratic Equations',
    description:
      'Your next chapter in Mathematics. Estimated 75 minutes — perfect for your highest-score subject.',
    icon: BookOpen,
  },
  {
    id: 'consistency',
    tone: 'ai',
    title: 'Consistency: streak at risk',
    description:
      'You’ve studied 5 days in a row. One session today unlocks the 7-day streak achievement.',
    icon: CalendarCheck,
  },
  {
    id: 'ai-recommendation',
    tone: 'ai',
    title: 'AI recommendation: Science refresh',
    description:
      'Science scores dipped to 74%. Ask AI Studio for a quick Photosynthesis revision quiz before your next assessment.',
    icon: Bot,
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'streak-7',
    title: '7 Day Streak',
    description: 'Learn for 7 days in a row',
    icon: Flame,
    rarity: 'rare',
    earnedDate: 'Aug 1, 2026',
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    description: 'Score 90%+ in 5 quizzes',
    icon: Target,
    rarity: 'epic',
    earnedDate: 'Jul 28, 2026',
  },
  {
    id: 'explorer',
    title: 'Explorer',
    description: 'Study 5 different subjects',
    icon: Compass,
    rarity: 'rare',
    earnedDate: 'Jul 25, 2026',
  },
  {
    id: 'ai-enthusiast',
    title: 'AI Enthusiast',
    description: 'Complete 10 AI Studio sessions',
    icon: Bot,
    rarity: 'common',
    earnedDate: 'Jul 22, 2026',
  },
  {
    id: 'perfect-score',
    title: 'Perfect Score',
    description: 'Score 100% on any assessment',
    icon: Award,
    rarity: 'epic',
    earnedDate: 'Jul 21, 2026',
  },
  {
    id: 'fast-learner',
    title: 'Fast Learner',
    description: 'Complete 10 lessons in a week',
    icon: Zap,
    rarity: 'common',
    earnedDate: 'Jul 18, 2026',
  },
  {
    id: 'century-club',
    title: 'Century Club',
    description: 'Complete 100 lessons',
    icon: Crown,
    rarity: 'epic',
  },
  {
    id: 'early-bird',
    title: 'Early Bird',
    description: 'Study before 8 AM for 10 days',
    icon: Sun,
    rarity: 'common',
  },
];

export const TIMELINE: TimelineEvent[] = [
  {
    id: 'tl-1',
    type: 'lesson',
    title: 'Completed chapter — Quadratic Roots',
    description: 'Mathematics · 8 lessons',
    date: 'Aug 3, 2026',
    time: '2 hours ago',
  },
  {
    id: 'tl-2',
    type: 'ai',
    title: 'AI session — Photosynthesis mind map',
    description: 'Science · AI Studio',
    date: 'Aug 2, 2026',
    time: 'Yesterday',
  },
  {
    id: 'tl-3',
    type: 'assessment',
    title: 'Assessment completed — Linear Equations',
    description: 'Scored 94% · Mathematics',
    date: 'Aug 1, 2026',
  },
  {
    id: 'tl-4',
    type: 'achievement',
    title: 'Achievement unlocked — 7 Day Streak',
    description: 'Keep the momentum going',
    date: 'Aug 1, 2026',
  },
  {
    id: 'tl-5',
    type: 'lesson',
    title: 'Completed 5 lessons — Python Basics',
    description: 'Computer Science',
    date: 'Jul 30, 2026',
  },
  {
    id: 'tl-6',
    type: 'assessment',
    title: 'Assessment completed — Physics Quiz 2',
    description: 'Scored 81% · Science',
    date: 'Jul 28, 2026',
  },
  {
    id: 'tl-7',
    type: 'ai',
    title: 'AI revision — Rational numbers',
    description: 'Mathematics · AI Studio',
    date: 'Jul 27, 2026',
  },
  {
    id: 'tl-8',
    type: 'achievement',
    title: 'Achievement unlocked — Perfect Score',
    description: 'Scored 100% on Algebra Basics',
    date: 'Jul 21, 2026',
  },
];

export const GOALS: Goal[] = [
  {
    id: 'daily',
    label: 'Daily goal',
    description: 'Study 60 minutes',
    value: 45,
    target: 60,
    unit: 'min',
    icon: Timer,
  },
  {
    id: 'weekly',
    label: 'Weekly goal',
    description: 'Complete 6 lessons',
    value: 4,
    target: 6,
    unit: 'lessons',
    icon: BookOpen,
  },
  {
    id: 'monthly',
    label: 'Monthly goal',
    description: 'Finish 15 assessments',
    value: 9,
    target: 15,
    unit: 'assessments',
    icon: ClipboardCheck,
  },
];
