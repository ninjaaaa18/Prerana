import type { LucideIcon } from 'lucide-react';

export type ChildStatus = 'on-track' | 'ahead' | 'at-risk';

export type MasteryLevel = 'beginner' | 'developing' | 'proficient' | 'advanced' | 'mastered';

export type AssessmentStatus = 'passed' | 'failed' | 'pending' | 'excellent';

export type ParentActivityType =
  'milestone' | 'assessment' | 'learning' | 'concern' | 'achievement';

export type MilestoneTone = 'achievement' | 'progress' | 'habit';

export type AttentionSeverity = 'high' | 'medium' | 'low';

export interface ParentProfile {
  id: string;
  name: string;
  role: string;
  childCount: number;
  motivation: string;
}

export interface Child {
  id: string;
  name: string;
  grade: string;
  school: string;
  age: number;
  color: string;
  lastActive: string;
}

export interface ChildPerformance {
  childId: string;
  status: ChildStatus;
  streak: number;
  studyHours: number;
  lessonsCompleted: number;
  averageScore: number;
  mastery: number;
}

export interface SubjectMastery {
  id: string;
  childId: string;
  subjectName: string;
  level: MasteryLevel;
  mastery: number;
  averageScore: number;
  completion: number;
  color: string;
}

export interface AssessmentResult {
  id: string;
  childId: string;
  childName: string;
  subjectName: string;
  title: string;
  score: number;
  grade: string;
  date: string;
  improvement: number;
  status: AssessmentStatus;
}

export interface ParentActivity {
  id: string;
  childId: string;
  childName: string;
  type: ParentActivityType;
  title: string;
  description: string;
  time: string;
}

export interface AttentionItem {
  id: string;
  childId: string;
  childName: string;
  title: string;
  description: string;
  severity: AttentionSeverity;
}

export interface Milestone {
  id: string;
  childId: string;
  childName: string;
  title: string;
  description: string;
  date: string;
  tone: MilestoneTone;
}

export interface FocusRecommendation {
  id: string;
  childId: string;
  childName: string;
  subjectName: string;
  chapter: string;
  reason: string;
  action: string;
  color: string;
}

export interface ParentStatistics {
  totalStudyHours: number;
  totalLessonsCompleted: number;
  averageScore: number;
  activeStreak: number;
  milestones: number;
  needsAttention: number;
}

export interface ParentStat {
  id: string;
  label: string;
  value: number;
  unit?: string;
  icon: LucideIcon;
  change?: string;
  isPositive?: boolean;
  color: string;
}
