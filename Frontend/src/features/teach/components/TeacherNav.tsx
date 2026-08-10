import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@/components/ui/icon';
import { TEACH_NAV_SECTIONS } from '../navigation';
import { cn } from '@/lib/utils';

export interface TeacherNavProps {
  className?: string;
}

export const TeacherNav: React.FC<TeacherNavProps> = ({ className }) => {
  return (
    <nav
      aria-label="Teacher workspace"
      className={cn(
        'overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm',
        className
      )}
    >
      <div className="flex w-max items-center gap-1.5 px-3 py-2.5">
        {TEACH_NAV_SECTIONS.map((section) => (
          <React.Fragment key={section.label}>
            <span
              className="px-2 text-[10px] font-bold uppercase tracking-widest text-slate-500"
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
                    'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
                    isActive
                      ? 'border border-indigo-500/40 bg-indigo-600/20 text-indigo-300'
                      : 'border border-transparent text-slate-400 hover:bg-slate-800/70 hover:text-slate-200'
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
