import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LogoProps {
  href?: string;
  collapsed?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ href = '/', collapsed = false, className }) => {
  return (
    <Link
      to={href}
      aria-label="Prerana home"
      className={cn(
        'group flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60',
        className
      )}
    >
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25">
        <Sparkles className="h-5 w-5" />
      </span>
      {!collapsed && (
        <span className="font-display text-xl font-bold tracking-tight text-slate-100 transition-colors group-hover:text-white">
          Prerana
        </span>
      )}
    </Link>
  );
};
