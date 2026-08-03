import React from 'react';
import { Menu } from 'lucide-react';
import { Logo } from './Logo';
import { SearchBar } from './SearchBar';
import { NotificationButton } from './NotificationButton';
import { UserMenu } from './UserMenu';

export interface TopbarProps {
  onToggleSidebar: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar }) => {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-slate-800 bg-slate-900/70 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800/70 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="lg:hidden">
          <Logo href="/app" />
        </div>
      </div>

      <div className="hidden flex-1 justify-center md:flex">
        <SearchBar className="max-w-md" />
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <NotificationButton />
        <UserMenu />
      </div>
    </header>
  );
};
