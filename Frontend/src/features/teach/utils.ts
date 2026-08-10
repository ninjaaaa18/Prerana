import type { BadgeProps } from '@/components/ui/badge';
import type { ContentStatus, Difficulty, LessonType, StudentStatus } from './types';

export const STATUS_LABELS: Record<ContentStatus, string> = {
  draft: 'Draft',
  review: 'In Review',
  published: 'Published',
  archived: 'Archived',
};

export const STATUS_BADGE_VARIANT: Record<ContentStatus, NonNullable<BadgeProps['variant']>> = {
  draft: 'warning',
  review: 'info',
  published: 'success',
  archived: 'secondary',
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export const LESSON_TYPE_LABELS: Record<LessonType, string> = {
  concept: 'Concept',
  practice: 'Practice',
  project: 'Project',
  'assessment-prep': 'Assessment Prep',
};

export const STUDENT_STATUS_LABELS: Record<StudentStatus, string> = {
  'on-track': 'On Track',
  ahead: 'Ahead',
  'at-risk': 'At Risk',
  inactive: 'Inactive',
};

export const STUDENT_STATUS_BADGE_VARIANT: Record<StudentStatus, NonNullable<BadgeProps['variant']>> = {
  'on-track': 'success',
  ahead: 'info',
  'at-risk': 'destructive',
  inactive: 'secondary',
};

export const ATTENTION_SEVERITY_BADGE_VARIANT: Record<'high' | 'medium' | 'low', NonNullable<BadgeProps['variant']>> = {
  high: 'destructive',
  medium: 'warning',
  low: 'info',
};
