import {
  Award,
  BookOpen,
  BookOpenCheck,
  Calculator,
  Code2,
  Flame,
  FlaskConical,
  Globe2,
  Hourglass,
  Languages,
  Map,
  Palette,
  Target,
  Timer,
  Zap,
} from 'lucide-react';
import type {
  Achievement,
  ActivityItem,
  Assessment,
  ContinueLearningItem,
  DailyGoal,
  Stat,
  StudentProfile,
  Subject,
} from './types';

export const STUDENT_PROFILE: StudentProfile = {
  name: 'Aarav Sharma',
  streak: 5,
};

export const MOTIVATION =
  'Every expert was once a beginner. Today is a great day to learn something new.';

export const CONTINUE_LEARNING: ContinueLearningItem = {
  subjectId: 'mathematics',
  subjectName: 'Mathematics',
  chapter: 'Quadratic Equations — Roots & Solutions',
  progress: 64,
  estimatedMinutes: 25,
};

export const SUBJECTS: Subject[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: Calculator,
    color: '#6366f1',
    progress: 68,
    chaptersCompleted: 17,
    chaptersTotal: 25,
    estimatedMinutes: 25,
  },
  {
    id: 'science',
    name: 'Science',
    icon: FlaskConical,
    color: '#10b981',
    progress: 42,
    chaptersCompleted: 10,
    chaptersTotal: 24,
    estimatedMinutes: 40,
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    icon: Code2,
    color: '#0ea5e9',
    progress: 85,
    chaptersCompleted: 22,
    chaptersTotal: 26,
    estimatedMinutes: 15,
  },
  {
    id: 'english',
    name: 'English',
    icon: Languages,
    color: '#f43f5e',
    progress: 55,
    chaptersCompleted: 14,
    chaptersTotal: 26,
    estimatedMinutes: 30,
  },
  {
    id: 'social-studies',
    name: 'Social Studies',
    icon: Globe2,
    color: '#f59e0b',
    progress: 30,
    chaptersCompleted: 7,
    chaptersTotal: 24,
    estimatedMinutes: 45,
  },
  {
    id: 'arts',
    name: 'Arts',
    icon: Palette,
    color: '#8b5cf6',
    progress: 20,
    chaptersCompleted: 4,
    chaptersTotal: 20,
    estimatedMinutes: 35,
  },
];

export const DAILY_GOALS: DailyGoal[] = [
  { id: 'lessons', label: 'Lessons today', value: 2, target: 3, unit: 'lessons', icon: BookOpen },
  { id: 'study-time', label: 'Study time', value: 45, target: 60, unit: 'min', icon: Timer },
  { id: 'quiz', label: 'Quiz target', value: 1, target: 2, unit: 'quizzes', icon: Target },
  { id: 'streak', label: 'Streak goal', value: 5, target: 7, unit: 'days', icon: Flame },
];

export const ASSESSMENTS: Assessment[] = [
  {
    id: 'assessment-1',
    subjectName: 'Mathematics',
    title: 'Algebra Mid-Term',
    date: 'Aug 12, 2026',
    durationMinutes: 60,
    difficulty: 'hard',
  },
  {
    id: 'assessment-2',
    subjectName: 'Science',
    title: 'Physics Quiz 3',
    date: 'Aug 14, 2026',
    durationMinutes: 30,
    difficulty: 'medium',
  },
  {
    id: 'assessment-3',
    subjectName: 'Computer Science',
    title: 'Python Basics Test',
    date: 'Aug 18, 2026',
    durationMinutes: 45,
    difficulty: 'easy',
  },
];

export const ACTIVITIES: ActivityItem[] = [
  {
    id: 'activity-1',
    type: 'chapter',
    title: 'Completed Chapter — Quadratic Roots',
    description: 'Mathematics · 8 lessons',
    time: '2 hours ago',
  },
  {
    id: 'activity-2',
    type: 'ai',
    title: 'AI session — Photosynthesis mind map',
    description: 'Science · AI Studio',
    time: 'Yesterday',
  },
  {
    id: 'activity-3',
    type: 'quiz',
    title: 'Quiz completed — Algebra Basics',
    description: 'Scored 92% · Mathematics',
    time: '2 days ago',
  },
  {
    id: 'activity-4',
    type: 'achievement',
    title: 'Achievement unlocked — 7 Day Streak',
    description: 'Keep the momentum going',
    time: '3 days ago',
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'achievement-1',
    title: '7 Day Streak',
    description: 'Learn 7 days in a row',
    icon: Flame,
    unlocked: true,
  },
  {
    id: 'achievement-2',
    title: 'Fast Learner',
    description: 'Complete 10 lessons in a week',
    icon: Zap,
    unlocked: true,
  },
  {
    id: 'achievement-3',
    title: 'Quiz Master',
    description: 'Score 90%+ in 5 quizzes',
    icon: Target,
    unlocked: false,
  },
  {
    id: 'achievement-4',
    title: 'Explorer',
    description: 'Study 5 different subjects',
    icon: Map,
    unlocked: false,
  },
];

export const STATS: Stat[] = [
  {
    id: 'stat-1',
    label: 'Hours studied',
    value: 24,
    unit: 'hrs',
    icon: Hourglass,
    change: '18% this week',
    isPositive: true,
  },
  {
    id: 'stat-2',
    label: 'Lessons completed',
    value: 32,
    unit: 'lessons',
    icon: BookOpenCheck,
    change: '5 this week',
    isPositive: true,
  },
  {
    id: 'stat-3',
    label: 'Average score',
    value: 87,
    unit: '%',
    icon: Award,
    change: '3% this week',
    isPositive: true,
  },
  {
    id: 'stat-4',
    label: 'Current streak',
    value: 5,
    unit: 'days',
    icon: Flame,
    change: '2 day streak',
    isPositive: true,
  },
];
