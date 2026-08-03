import React from 'react';
import { CalendarClock, FolderOpen, Trophy } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';

export interface EmptyAssessmentStateProps {
  variant?: 'none' | 'completed' | 'upcoming';
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

const defaultContent = {
  none: {
    icon: <FolderOpen className="h-8 w-8" />,
    title: 'No assessments found',
    description: 'New assessments will appear here. Check back soon!',
  },
  completed: {
    icon: <Trophy className="h-8 w-8" />,
    title: 'No completed assessments',
    description: 'Finish an assessment to see your scores and review here.',
  },
  upcoming: {
    icon: <CalendarClock className="h-8 w-8" />,
    title: 'No upcoming assessments',
    description: 'You’re all caught up. Scheduled assessments will show here.',
  },
} as const;

export const EmptyAssessmentState: React.FC<EmptyAssessmentStateProps> = ({
  variant = 'none',
  icon,
  title,
  description,
  actionText,
  onAction,
  className,
}) => {
  const defaults = defaultContent[variant];
  return (
    <EmptyState
      icon={icon ?? defaults.icon}
      title={title ?? defaults.title}
      description={description ?? defaults.description}
      actionText={actionText}
      onAction={onAction}
      className={cn('my-0', className)}
    />
  );
};
