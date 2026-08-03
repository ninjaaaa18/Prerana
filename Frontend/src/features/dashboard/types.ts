import type { LucideIcon } from 'lucide-react';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type ActivityType = 'chapter' | 'ai' | 'quiz' | 'achievement';

export interface StudentProfile {
  name: string;
  streak: number;
}

export interface ContinueLearningItem {
  subjectId: string;
  subjectName: string;
  chapter: string;
  progress: number;
  estimatedMinutes: number;
}

export interface Subject {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  progress: number;
  chaptersCompleted: number;
  chaptersTotal: number;
  estimatedMinutes: number;
}

export interface DailyGoal {
  id: string;
  label: string;
  value: number;
  target: number;
  unit: string;
  icon: LucideIcon;
}

export interface Assessment {
  id: string;
  subjectName: string;
  title: string;
  date: string;
  durationMinutes: number;
  difficulty: Difficulty;
}

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  time: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  unlocked: boolean;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  change?: string;
  isPositive?: boolean;
}
