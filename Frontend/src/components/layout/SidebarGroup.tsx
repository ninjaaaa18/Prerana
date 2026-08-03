import React from 'react';
import { cn } from '@/lib/utils';

export interface SidebarGroupProps {
  label: string;
  collapsed?: boolean;
  children: React.ReactNode;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  label,
  collapsed = false,
  children,
}) => {
  return (
    <div className="space-y-1">
      {!collapsed && (
        <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </p>
      )}
      <nav
        aria-label={label}
        className={cn('flex flex-col gap-1', collapsed && 'items-center')}
      >
        {children}
      </nav>
    </div>
  );
};
