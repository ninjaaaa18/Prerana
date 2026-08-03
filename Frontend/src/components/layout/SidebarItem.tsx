import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@/components/ui/icon';
import { Tooltip } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/config/navigation';

export interface SidebarItemProps {
  item: NavItem;
  collapsed?: boolean;
  onClick?: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ item, collapsed = false, onClick }) => {
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
            ? 'bg-indigo-500/15 text-white'
            : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            name={item.icon}
            className={cn(
              'h-5 w-5 shrink-0 transition-colors',
              isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'
            )}
          />
          {!collapsed && <span className="truncate">{item.label}</span>}
          {isActive && !collapsed && (
            <span
              aria-hidden="true"
              className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-indigo-400"
            />
          )}
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
