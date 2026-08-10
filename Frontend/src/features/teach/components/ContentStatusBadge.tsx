import React from 'react';
import { Badge } from '@/components/ui/badge';
import { STATUS_BADGE_VARIANT, STATUS_LABELS } from '../utils';
import type { ContentStatus } from '../types';

export interface ContentStatusBadgeProps {
  status: ContentStatus;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ContentStatusBadge: React.FC<ContentStatusBadgeProps> = ({
  status,
  size,
  className,
}) => {
  return (
    <Badge variant={STATUS_BADGE_VARIANT[status]} size={size} dot className={className}>
      {STATUS_LABELS[status]}
    </Badge>
  );
};
