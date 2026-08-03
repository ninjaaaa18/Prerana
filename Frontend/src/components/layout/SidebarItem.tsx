import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/icon';
import { Tooltip } from '@/components/ui/tooltip';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/config/navigation';

export interface SidebarItemProps {
  item: NavItem;
  collapsed?: boolean;
  onClick?: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ item, collapsed = false, onClick }) => {
  const reducedMotion = usePrefersReducedMotion();

  const link = (
    <NavLink
      to={item.route}
      end={item.end}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'group relative flex items-center gap-3 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60',
          collapsed ? 'mx-auto w-11 justify-center px-2 py-2.5' : 'w-full px-3 py-2.5',
          isActive
            ? 'text-white'
            : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span
              aria-hidden="true"
              layoutId={reducedMotion ? undefined : 'sidebar-active-indicator'}
              transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              className="absolute inset-0 rounded-lg bg-indigo-500/15"
            />
          )}

          {isActive && (
            <span
              aria-hidden="true"
              className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]"
            />
          )}

          {!reducedMotion && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(circle at 30% 50%, rgba(99,102,241,0.12) 0%, transparent 70%)',
              }}
            />
          )}

          <Icon
            name={item.icon}
            className={cn(
              'relative h-5 w-5 shrink-0 transition-colors',
              isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'
            )}
          />
          {!collapsed && <span className="relative truncate">{item.label}</span>}
        </>
      )}
    </NavLink>
  );

  if (collapsed) {
    return (
      <Tooltip content={item.label} position="right">
        {link}
      </Tooltip>
    );
  }

  return link;
};
