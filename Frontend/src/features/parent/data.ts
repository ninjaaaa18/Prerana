import { BookOpen, Clock, Flame, TrendingUp } from 'lucide-react';
import type {
  AssessmentResult,
  AssessmentStatus,
  AttentionItem,
  Child,
  ChildPerformance,
  FocusRecommendation,
  Milestone,
  ParentActivity,
  ParentProfile,
  ParentStat,
  ParentStatistics,
  SubjectMastery,
} from './types';

export const PARENT_PROFILE: ParentProfile = {
  id: 'parent-1',
  name: 'Anita Desai',
  role: 'Parent · 3 children',
  childCount: 3,
  motivation:
    'Two children are cruising along on schedule, one needs a gentle push in Mathematics this week.',
};

export const CHILDREN: Child[] = [
  {
    id: 'child-aadhya',
    name: 'Aadhya',
    grade: 'Grade 7',
    school: 'Stellar Academy',
    age: 12,
    color: '#8b5cf6',
    lastActive: 'Today',
  },
  {
    id: 'child-reyansh',
    name: 'Reyansh',
    grade: 'Grade 10',
    school: 'Stellar Academy',
    age: 15,
    color: '#38bdf8',
    lastActive: 'Today',
  },
  {
    id: 'child-kavya',
    name: 'Kavya',
    grade: 'Grade 5',
    school: 'Sunrise Public School',
    age: 10,
    color: '#ec4899',
    lastActive: 'Yesterday',
  },
];

export const CHILD_PERFORMANCE: ChildPerformance[] = [
  {
    childId: 'child-aadhya',
    status: 'ahead',
    streak: 12,
    studyHours: 9.5,
    lessonsCompleted: 18,
    averageScore: 88,
    mastery: 74,
  },
  {
    childId: 'child-reyansh',
    status: 'on-track',
    streak: 8,
    studyHours: 7,
    lessonsCompleted: 14,
    averageScore: 81,
    mastery: 66,
  },
  {
    childId: 'child-kavya',
    status: 'at-risk',
    streak: 3,
    studyHours: 3.5,
    lessonsCompleted: 7,
    averageScore: 62,
    mastery: 41,
  },
];

export const SUBJECT_MASTERY: SubjectMastery[] = [
  {
    id: 'sm-1',
    childId: 'child-aadhya',
    subjectName: 'Mathematics',
    level: 'advanced',
    mastery: 82,
    averageScore: 89,
    completion: 78,
    color: '#6366f1',
  },
  {
    id: 'sm-2',
    childId: 'child-aadhya',
    subjectName: 'Science',
    level: 'proficient',
    mastery: 71,
    averageScore: 84,
    completion: 69,
    color: '#10b981',
  },
  {
    id: 'sm-3',
    childId: 'child-aadhya',
    subjectName: 'English',
    level: 'proficient',
    mastery: 68,
    averageScore: 86,
    completion: 64,
    color: '#f43f5e',
  },
  {
    id: 'sm-4',
    childId: 'child-reyansh',
    subjectName: 'Mathematics',
    level: 'proficient',
    mastery: 72,
    averageScore: 83,
    completion: 70,
    color: '#6366f1',
  },
  {
    id: 'sm-5',
    childId: 'child-reyansh',
    subjectName: 'Science',
    level: 'developing',
    mastery: 58,
    averageScore: 74,
    completion: 52,
    color: '#10b981',
  },
  {
    id: 'sm-6',
    childId: 'child-reyansh',
    subjectName: 'Social Studies',
    level: 'proficient',
    mastery: 66,
    averageScore: 82,
    completion: 61,
    color: '#f59e0b',
  },
  {
    id: 'sm-7',
    childId: 'child-kavya',
    subjectName: 'Mathematics',
    level: 'beginner',
    mastery: 38,
    averageScore: 58,
    completion: 34,
    color: '#6366f1',
  },
  {
    id: 'sm-8',
    childId: 'child-kavya',
    subjectName: 'English',
    level: 'developing',
    mastery: 52,
    averageScore: 70,
    completion: 48,
    color: '#f43f5e',
  },
  {
    id: 'sm-9',
    childId: 'child-kavya',
    subjectName: 'General Science',
    level: 'developing',
    mastery: 45,
    averageScore: 64,
    completion: 40,
    color: '#10b981',
  },
];

export const ASSESSMENT_RESULTS: AssessmentResult[] = [
  {
    id: 'ar-1',
    childId: 'child-aadhya',
    childName: 'Aadhya',
    subjectName: 'Mathematics',
    title: 'Fractions — Unit Test 2',
    score: 94,
    grade: 'A+',
    date: 'Today',
    improvement: 6,
    status: 'excellent',
  },
  {
    id: 'ar-2',
    childId: 'child-aadhya',
    childName: 'Aadhya',
    subjectName: 'Science',
    title: 'Light & Shadows — Quiz',
    score: 88,
    grade: 'A',
    date: 'Yesterday',
    improvement: 3,
    status: 'passed',
  },
  {
    id: 'ar-3',
    childId: 'child-aadhya',
    childName: 'Aadhya',
    subjectName: 'English',
    title: 'Comprehension — Week 5',
    score: 86,
    grade: 'A',
    date: '3 days ago',
    improvement: 2,
    status: 'passed',
  },
  {
    id: 'ar-4',
    childId: 'child-reyansh',
    childName: 'Reyansh',
    subjectName: 'Mathematics',
    title: 'Quadratic Equations — Unit Test 1',
    score: 84,
    grade: 'A',
    date: 'Yesterday',
    improvement: 5,
    status: 'passed',
  },
  {
    id: 'ar-5',
    childId: 'child-reyansh',
    childName: 'Reyansh',
    subjectName: 'Science',
    title: 'Chemical Reactions — Practice Quiz',
    score: 66,
    grade: 'C',
    date: '2 days ago',
    improvement: -4,
    status: 'failed',
  },
  {
    id: 'ar-6',
    childId: 'child-reyansh',
    childName: 'Reyansh',
    subjectName: 'Social Studies',
    title: 'Nationalism — Chapter Quiz',
    score: 82,
    grade: 'A',
    date: '4 days ago',
    improvement: 8,
    status: 'passed',
  },
  {
    id: 'ar-7',
    childId: 'child-kavya',
    childName: 'Kavya',
    subjectName: 'Mathematics',
    title: 'Multiplication — Quick Check',
    score: 55,
    grade: 'D',
    date: 'Yesterday',
    improvement: -7,
    status: 'failed',
  },
  {
    id: 'ar-8',
    childId: 'child-kavya',
    childName: 'Kavya',
    subjectName: 'English',
    title: 'Grammar — Spellings & Tenses',
    score: 71,
    grade: 'B',
    date: '3 days ago',
    improvement: 4,
    status: 'passed',
  },
  {
    id: 'ar-9',
    childId: 'child-reyansh',
    childName: 'Reyansh',
    subjectName: 'Mathematics',
    title: 'Real Numbers — Quick Check',
    score: 91,
    grade: 'A+',
    date: '1 week ago',
    improvement: 3,
    status: 'excellent',
  },
];

export const PARENT_ACTIVITIES: ParentActivity[] = [
  {
    id: 'pa-1',
    childId: 'child-aadhya',
    childName: 'Aadhya',
    type: 'achievement',
    title: 'Aadhya scored 94% in Fractions',
    description: 'Unit Test 2 — best result yet this term.',
    time: 'Today, 6:12 PM',
  },
  {
    id: 'pa-2',
    childId: 'child-reyansh',
    childName: 'Reyansh',
    type: 'assessment',
    title: 'Reyansh took Quadratic Equations test',
    description: 'Scored 84% — up 5 points from last attempt.',
    time: 'Today, 4:40 PM',
  },
  {
    id: 'pa-3',
    childId: 'child-kavya',
    childName: 'Kavya',
    type: 'milestone',
    title: 'Kavya completed 3-day streak',
    description: 'Practised Maths for three days in a row.',
    time: 'Today, 8:05 AM',
  },
  {
    id: 'pa-4',
    childId: 'child-aadhya',
    childName: 'Aadhya',
    type: 'learning',
    title: 'Aadhya finished Light & Shadows chapter',
    description: 'All lessons in the chapter are now complete.',
    time: 'Yesterday, 7:30 PM',
  },
  {
    id: 'pa-5',
    childId: 'child-reyansh',
    childName: 'Reyansh',
    type: 'concern',
    title: 'Reyansh slipped in Chemical Reactions',
    description: 'Practice quiz scored 66% — below the class average.',
    time: 'Yesterday, 5:15 PM',
  },
  {
    id: 'pa-6',
    childId: 'child-kavya',
    childName: 'Kavya',
    type: 'assessment',
    title: 'Kavya attempted Multiplication Quick Check',
    description: 'Scored 55% — 7 points below her last attempt.',
    time: 'Yesterday, 3:48 PM',
  },
  {
    id: 'pa-7',
    childId: 'child-aadhya',
    childName: 'Aadhya',
    type: 'milestone',
    title: 'Aadhya reached 12-day study streak',
    description: 'Longest streak for any child this term.',
    time: '2 days ago',
  },
  {
    id: 'pa-8',
    childId: 'child-reyansh',
    childName: 'Reyansh',
    type: 'learning',
    title: 'Reyansh revised Real Numbers',
    description: 'Completed the revision lesson pack in 20 minutes.',
    time: '2 days ago, 6:05 PM',
  },
  {
    id: 'pa-9',
    childId: 'child-kavya',
    childName: 'Kavya',
    type: 'achievement',
    title: 'Kavya aced her Spellings quiz',
    description: 'Scored 92% — a big confidence boost.',
    time: '3 days ago, 5:30 PM',
  },
  {
    id: 'pa-10',
    childId: 'child-reyansh',
    childName: 'Reyansh',
    type: 'milestone',
    title: 'Reyansh mastered Real Numbers',
    description: 'Mastery level reached for the chapter.',
    time: '4 days ago',
  },
];

export const ATTENTION_ITEMS: AttentionItem[] = [
  {
    id: 'att-1',
    childId: 'child-kavya',
    childName: 'Kavya',
    title: 'Kavya is slipping in Mathematics',
    description: 'Two recent scores below 60%. A gentle review may help.',
    severity: 'high',
  },
  {
    id: 'att-2',
    childId: 'child-reyansh',
    childName: 'Reyansh',
    title: 'Chemistry quiz below average',
    description: 'Chemical Reactions scored 66% — 5 points under the class average.',
    severity: 'medium',
  },
  {
    id: 'att-3',
    childId: 'child-kavya',
    childName: 'Kavya',
    title: 'Study streak at risk',
    description: 'Only 3 days — down from 9 earlier this month.',
    severity: 'low',
  },
];

export const MILESTONES: Milestone[] = [
  {
    id: 'ms-1',
    childId: 'child-aadhya',
    childName: 'Aadhya',
    title: '12-day study streak',
    description: 'Her longest streak of the school year.',
    date: '2 days ago',
    tone: 'habit',
  },
  {
    id: 'ms-2',
    childId: 'child-reyansh',
    childName: 'Reyansh',
    title: 'Mastered Real Numbers',
    description: 'Reached the Mastered level in the chapter.',
    date: '4 days ago',
    tone: 'achievement',
  },
  {
    id: 'ms-3',
    childId: 'child-aadhya',
    childName: 'Aadhya',
    title: 'Perfect on Fractions Test 2',
    description: 'Scored 94% — top of Grade 7.',
    date: 'Today',
    tone: 'achievement',
  },
  {
    id: 'ms-4',
    childId: 'child-kavya',
    childName: 'Kavya',
    title: 'First week of daily practice',
    description: 'Practised every day for 7 consecutive days.',
    date: 'Last week',
    tone: 'progress',
  },
];

export const FOCUS_RECOMMENDATIONS: FocusRecommendation[] = [
  {
    id: 'fr-1',
    childId: 'child-kavya',
    childName: 'Kavya',
    subjectName: 'Mathematics',
    chapter: 'Multiplication & Division',
    reason: 'Recent quick checks have dipped below the pass mark.',
    action: 'Start with the 10-minute multiplication warm-up lesson, then retake the quick check.',
    color: '#ec4899',
  },
  {
    id: 'fr-2',
    childId: 'child-reyansh',
    childName: 'Reyansh',
    subjectName: 'Science',
    chapter: 'Chemical Reactions',
    reason: 'The practice quiz was the lowest score across all subjects this week.',
    action: 'Revisit the Balancing Equations lesson and attempt the practice set again.',
    color: '#38bdf8',
  },
  {
    id: 'fr-3',
    childId: 'child-aadhya',
    childName: 'Aadhya',
    subjectName: 'English',
    chapter: 'Grammar — Reported Speech',
    reason: 'Staying ahead, but comprehension accuracy can be pushed further.',
    action: 'Try the advanced comprehension set to keep the momentum going.',
    color: '#8b5cf6',
  },
];

export const PARENT_STATS: ParentStat[] = [
  {
    id: 'ps-1',
    label: 'Study time this week',
    value: 20,
    unit: 'hrs',
    icon: Clock,
    change: '2 more than last week',
    isPositive: true,
    color: '#8b5cf6',
  },
  {
    id: 'ps-2',
    label: 'Lessons completed',
    value: 39,
    icon: BookOpen,
    change: '5 this week',
    isPositive: true,
    color: '#6366f1',
  },
  {
    id: 'ps-3',
    label: 'Average score',
    value: 77,
    unit: '%',
    icon: TrendingUp,
    change: '2 points up',
    isPositive: true,
    color: '#38bdf8',
  },
  {
    id: 'ps-4',
    label: 'Combined streaks',
    value: 23,
    icon: Flame,
    change: '2 children active today',
    isPositive: true,
    color: '#ec4899',
  },
];

export const PARENT_STATISTICS: ParentStatistics = {
  totalStudyHours: 20,
  totalLessonsCompleted: 39,
  averageScore: 77,
  activeStreak: 23,
  milestones: 4,
  needsAttention: 3,
};

export const getChildren = (): Child[] => CHILDREN;

export const getChild = (id: string): Child | undefined =>
  CHILDREN.find((child) => child.id === id);

export const getChildPerformance = (childId: string): ChildPerformance | undefined =>
  CHILD_PERFORMANCE.find((performance) => performance.childId === childId);

export const getSubjectMastery = (childId: string): SubjectMastery[] =>
  SUBJECT_MASTERY.filter((subject) => subject.childId === childId);

export const getSubjectNames = (): string[] =>
  Array.from(new Set(ASSESSMENT_RESULTS.map((a) => a.subjectName)));

export const getAssessmentResults = (childId: string): AssessmentResult[] =>
  ASSESSMENT_RESULTS.filter((result) => result.childId === childId);

export const getActivitiesForChild = (childId: string): ParentActivity[] =>
  PARENT_ACTIVITIES.filter((activity) => activity.childId === childId);

export const getAttentionItems = (childId?: string): AttentionItem[] =>
  childId ? ATTENTION_ITEMS.filter((item) => item.childId === childId) : ATTENTION_ITEMS;

export const getMilestones = (childId?: string): Milestone[] =>
  childId ? MILESTONES.filter((milestone) => milestone.childId === childId) : MILESTONES;

export const getFocusRecommendation = (childId: string): FocusRecommendation | undefined =>
  FOCUS_RECOMMENDATIONS.find((recommendation) => recommendation.childId === childId);

export const getParentStatistics = (): ParentStatistics => PARENT_STATISTICS;

export const filterAssessmentResults = (filters: {
  childId?: string;
  subjectName?: string;
  status?: AssessmentStatus;
}): AssessmentResult[] =>
  ASSESSMENT_RESULTS.filter((result) => {
    if (filters.childId && result.childId !== filters.childId) return false;
    if (filters.subjectName && result.subjectName !== filters.subjectName) return false;
    if (filters.status && result.status !== filters.status) return false;
    return true;
  });

export const filterActivities = (filters: {
  childId?: string;
  type?: ParentActivity['type'];
}): ParentActivity[] =>
  PARENT_ACTIVITIES.filter((activity) => {
    if (filters.childId && activity.childId !== filters.childId) return false;
    if (filters.type && activity.type !== filters.type) return false;
    return true;
  });

export const getActivityCounts = (): Record<ParentActivity['type'], number> => {
  const counts: Record<ParentActivity['type'], number> = {
    milestone: 0,
    assessment: 0,
    learning: 0,
    concern: 0,
    achievement: 0,
  };
  PARENT_ACTIVITIES.forEach((activity) => {
    counts[activity.type] += 1;
  });
  return counts;
};
