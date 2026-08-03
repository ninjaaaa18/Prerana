import React from 'react';
import { NavLink } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { MOBILE_NAV_ITEMS } from '@/config/navigation';

export interface MobileNavProps {
  onOpenMore: () => void;
  className?: string;
}

export const MobileNav: React.FC<MobileNavProps> = ({ onOpenMore, className }) => {
  return (
    <nav
      aria-label="Primary"
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-slate-800 bg-slate-950/95 backdrop-blur-md md:hidden',
        className
      )}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-5">
        {MOBILE_NAV_ITEMS.map((item) => (
          <NavLink
            key={item.route}
            to={item.route}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500/60',
                isActive ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-200'
              )
            }
          >
            <Icon name={item.icon} className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
        <button
          type="button"
          onClick={onOpenMore}
          aria-label="More menu"
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium text-slate-500 transition-colors hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500/60"
        >
          <MoreHorizontal className="h-5 w-5" />
          <span>More</span>
        </button>
      </div>
    </nav>
  );
};
