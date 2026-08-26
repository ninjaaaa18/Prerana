import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogOut, Settings } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { UserAvatar } from '@/components/layout/UserAvatar';
import { NAV_VERSION } from '@/config/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

export interface SidebarFooterProps {
  collapsed?: boolean;
  name?: string;
  email?: string;
  className?: string;
}

const actionClass =
  'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-800/70 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60';

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  collapsed = false,
  name = 'Guest',
  email,
  className,
}) => {
  const { logout } = useAuth();
  const settingsButton = (
    <NavLink to="/app/settings" aria-label="Settings" className={actionClass}>
      <Settings className="h-4 w-4" />
    </NavLink>
  );

  const logoutButton = (
    <button
      type="button"
      aria-label="Log out"
      onClick={() => void logout()}
      className={cn(actionClass, 'hover:text-rose-300')}
    >
      <LogOut className="h-4 w-4" />
    </button>
  );

  return (
    <div className={cn('shrink-0 border-t border-slate-800/60 p-3', className)}>
      {collapsed ? (
        <div className="flex flex-col items-center gap-2">
          <Tooltip content={name} position="right">
            <span className="inline-flex">
              <UserAvatar name={name} email={email} size="sm" />
            </span>
          </Tooltip>
          <div className="flex items-center gap-1">
            <Tooltip content="Settings" position="right">
              {settingsButton}
            </Tooltip>
            <Tooltip content="Log out" position="right">
              {logoutButton}
            </Tooltip>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-2.5">
          <UserAvatar name={name} email={email} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-200">{name}</p>
            <p className="truncate text-xs text-slate-500">{email || 'Signed in'}</p>
          </div>
          <div className="flex items-center gap-0.5">
            {settingsButton}
            {logoutButton}
          </div>
        </div>
      )}
      {!collapsed && (
        <p className="mt-2 px-1 text-center text-[11px] text-slate-600">{NAV_VERSION}</p>
      )}
    </div>
  );
};
