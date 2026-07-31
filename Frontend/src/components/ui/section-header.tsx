import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  action,
  align = 'left',
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-800/80',
        align === 'center' && 'text-center items-center',
        align === 'right' && 'text-right items-end',
        className
      )}
      {...props}
    >
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-100 tracking-tight">
          {title}
        </h2>
        {subtitle && <p className="text-sm text-slate-400 max-w-2xl">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
