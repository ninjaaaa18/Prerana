import * as React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryText?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'An error occurred while loading content. Please try again.',
  onRetry,
  retryText = 'Try Again',
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'p-8 rounded-2xl bg-rose-950/20 border border-rose-900/40 text-center space-y-4 max-w-md mx-auto my-6',
        className
      )}
      {...props}
    >
      <div className="inline-flex p-3 rounded-full bg-rose-900/30 text-rose-400">
        <AlertCircle className="w-8 h-8" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-bold font-display text-rose-200">{title}</h3>
        <p className="text-sm text-rose-300/80">{message}</p>
      </div>
      {onRetry && (
        <Button
          variant="destructive"
          size="sm"
          onClick={onRetry}
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          {retryText}
        </Button>
      )}
    </div>
  );
};
