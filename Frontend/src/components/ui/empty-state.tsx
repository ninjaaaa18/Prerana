import * as React from 'react';
import { FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No records found',
  description = 'There is no data to display right now.',
  icon,
  actionText,
  onAction,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'p-10 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-4 max-w-md mx-auto my-6',
        className
      )}
      {...props}
    >
      <div className="inline-flex p-4 rounded-full bg-slate-800/80 border border-slate-700 text-indigo-400">
        {icon || <FolderOpen className="w-8 h-8" />}
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-bold font-display text-slate-100">{title}</h3>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
      {actionText && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
