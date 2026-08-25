import type { BadgeProps } from '@/components/ui/badge';
import type {
  AssessmentStatus,
  AttentionSeverity,
  ChildStatus,
  MasteryLevel,
  MilestoneTone,
  ParentActivityType,
} from './types';

export const CHILD_STATUS_LABELS: Record<ChildStatus, string> = {
  'on-track': 'On Track',
  ahead: 'Ahead of Schedule',
  'at-risk': 'Needs Support',
};

export const CHILD_STATUS_BADGE_VARIANT: Record<ChildStatus, NonNullable<BadgeProps['variant']>> = {
  'on-track': 'success',
  ahead: 'info',
  'at-risk': 'destructive',
};

export const MASTERY_LEVEL_LABELS: Record<MasteryLevel, string> = {
  beginner: 'Beginner',
  developing: 'Developing',
  proficient: 'Proficient',
  advanced: 'Advanced',
  mastered: 'Mastered',
};

export const MASTERY_LEVEL_BADGE_VARIANT: Record<
  MasteryLevel,
  NonNullable<BadgeProps['variant']>
> = {
  beginner: 'secondary',
  developing: 'info',
  proficient: 'primary',
  advanced: 'warning',
  mastered: 'success',
};

export const ASSESSMENT_STATUS_LABELS: Record<AssessmentStatus, string> = {
  passed: 'Passed',
  failed: 'Needs Retake',
  pending: 'Scheduled',
  excellent: 'Excellent',
};

export const ASSESSMENT_STATUS_BADGE_VARIANT: Record<
  AssessmentStatus,
  NonNullable<BadgeProps['variant']>
> = {
  passed: 'success',
  failed: 'destructive',
  pending: 'secondary',
  excellent: 'info',
};

export const ACTIVITY_TYPE_LABELS: Record<ParentActivityType, string> = {
  milestone: 'Milestone',
  assessment: 'Assessment',
  learning: 'Learning',
  concern: 'Concern',
  achievement: 'Achievement',
};

export const ATTENTION_SEVERITY_LABELS: Record<AttentionSeverity, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export const ATTENTION_SEVERITY_BADGE_VARIANT: Record<
  AttentionSeverity,
  NonNullable<BadgeProps['variant']>
> = {
  high: 'destructive',
  medium: 'warning',
  low: 'info',
};

export const MILESTONE_TONE_LABELS: Record<MilestoneTone, string> = {
  achievement: 'Achievement',
  progress: 'Progress',
  habit: 'Habit',
};

export const gradeFromScore = (score: number): string => {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 40) return 'D';
  return 'F';
};
