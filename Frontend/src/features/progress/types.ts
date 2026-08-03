import type { LucideIcon } from 'lucide-react';

export type InsightTone = 'positive' | 'warning' | 'info' | 'ai';

export interface OverviewStat {
  id: string;
  label: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  accent: string;
  change?: string;
  isPositive?: boolean;
}

export interface SubjectProgress {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  progress: number;
  lessonsCompleted: number;
  lessonsTotal: number;
  chaptersCompleted: number;
  chaptersTotal: number;
  averageScore: number;
  lastActivity: string;
}

export type ActivityLevel = 0 | 1 | 2 | 3 | 4;

export interface DayActivity {
  date: string;
  level: ActivityLevel;
  minutes: number;
}

export interface WeekStudyDatum {
  date: string;
  label: string;
  hours: number;
  lessons: number;
  assessments: number;
}

export interface Insight {
  id: string;
  tone: InsightTone;
  title: string;
  description: string;
  icon: LucideIcon;
}

export type AchievementRarity = 'common' | 'rare' | 'epic';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  rarity: AchievementRarity;
  earnedDate?: string;
}

export type TimelineEventType = 'lesson' | 'assessment' | 'ai' | 'achievement';

export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  title: string;
  description: string;
  date: string;
  time?: string;
}

export interface Goal {
  id: string;
  label: string;
  description: string;
  value: number;
  target: number;
  unit: string;
  icon: LucideIcon;
}
