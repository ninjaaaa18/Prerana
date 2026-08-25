import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@/components/ui/icon';
import { PARENT_NAV_SECTIONS } from '../navigation';
import { cn } from '@/lib/utils';

export interface ParentNavProps {
  className?: string;
}

export const ParentNav: React.FC<ParentNavProps> = ({ className }) => {
  return (
    <nav
      aria-label="Parent dashboard"
      className={cn(
        'overflow-x-auto rounded-2xl border border-violet-500/20 bg-slate-950/60 shadow-[0_0_0_1px_rgba(139,92,246,0.08)] backdrop-blur-md',
        className
      )}
    >
      <div className="flex w-max items-center gap-2 px-3 py-2.5">
        {PARENT_NAV_SECTIONS.map((section) => (
          <React.Fragment key={section.label}>
            <span
              className="px-2 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500"
              aria-hidden="true"
            >
              {section.label}
            </span>
            {section.items.map((item) => (
              <NavLink
                key={item.route}
                to={item.route}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.75 text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500',
                    isActive
                      ? 'border-violet-500/40 bg-violet-500/10 text-violet-100 shadow-[0_0_20px_rgba(139,92,246,0.15)]'
                      : 'border-transparent text-slate-400 hover:border-slate-700/70 hover:bg-slate-900/80 hover:text-slate-200'
                  )
                }
              >
                <Icon name={item.icon} className="h-3.5 w-3.5" aria-hidden="true" />
                {item.label}
              </NavLink>
            ))}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};
