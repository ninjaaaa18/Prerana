import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, LogOut, Settings, User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export interface UserMenuProps {
  name?: string;
  email?: string;
  className?: string;
}

const menuItemClass =
  'flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-800/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60';

export const UserMenu: React.FC<UserMenuProps> = ({ name = 'Guest', email = '', className }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="User menu"
        className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-slate-800/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
      >
        <Avatar name={name} size="sm" />
        <span className="hidden text-left lg:block">
          <span className="block text-sm font-medium leading-tight text-slate-200">{name}</span>
          <span className="block max-w-[10rem] truncate text-xs leading-tight text-slate-500">
            {email || 'Signed in'}
          </span>
        </span>
        <ChevronDown
          className={cn(
            'hidden h-4 w-4 text-slate-500 transition-transform duration-200 lg:block',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="menu"
            aria-label="User menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 p-1.5 shadow-2xl"
          >
            <Link
              role="menuitem"
              to="/app/profile"
              onClick={() => setIsOpen(false)}
              className={menuItemClass}
            >
              <User className="h-4 w-4" />
              Profile
            </Link>
            <Link
              role="menuitem"
              to="/app/settings"
              onClick={() => setIsOpen(false)}
              className={menuItemClass}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
            <button type="button" role="menuitem" className={menuItemClass}>
              <HelpCircle className="h-4 w-4" />
              Help
            </button>
            <div aria-hidden="true" className="my-1 h-px bg-slate-800" />
            <button type="button" role="menuitem" className={cn(menuItemClass, 'text-rose-400 hover:text-rose-300')}>
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
