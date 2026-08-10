import React from 'react';
import { Badge } from '@/components/ui/badge';
import { STUDENT_STATUS_BADGE_VARIANT, STUDENT_STATUS_LABELS } from '../utils';
import type { StudentStatus } from '../types';

export interface StudentStatusBadgeProps {
  status: StudentStatus;
  size?: 'sm' | 'md';
  className?: string;
}

export const StudentStatusBadge: React.FC<StudentStatusBadgeProps> = ({
  status,
  size = 'sm',
  className,
}) => {
  return (
    <Badge variant={STUDENT_STATUS_BADGE_VARIANT[status]} size={size} className={className}>
      {STUDENT_STATUS_LABELS[status]}
    </Badge>
  );
};
