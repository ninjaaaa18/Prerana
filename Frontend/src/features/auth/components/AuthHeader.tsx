import React from 'react';
import { cn } from '@/lib/utils';

export interface AuthHeaderProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ icon, title, subtitle, className }) => {
  return (
    <div className={cn('space-y-2 text-center', className)}>
      {icon && (
        <div className="inline-flex items-center justify-center rounded-2xl border border-indigo-500/25 bg-indigo-600/10 p-3 text-indigo-400">
          {icon}
        </div>
      )}
      <h1 className="font-display text-2xl font-bold tracking-tight text-slate-100 sm:text-[1.75rem]">
        {title}
      </h1>
      {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
    </div>
  );
};
