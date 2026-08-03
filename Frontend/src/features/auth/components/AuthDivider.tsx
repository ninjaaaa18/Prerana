import React from 'react';
import { cn } from '@/lib/utils';

export interface AuthDividerProps {
  label?: string;
  className?: string;
}

export const AuthDivider: React.FC<AuthDividerProps> = ({
  label = 'or continue with',
  className,
}) => {
  return (
    <div className={cn('flex items-center gap-3', className)} role="separator" aria-label={label}>
      <div className="h-px flex-1 bg-slate-800" />
      <span className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</span>
      <div className="h-px flex-1 bg-slate-800" />
    </div>
  );
};
