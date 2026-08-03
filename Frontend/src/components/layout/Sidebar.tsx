import React from 'react';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { SidebarItem } from './SidebarItem';
import { SidebarSection } from './SidebarSection';
import { PRIMARY_NAV_SECTIONS, SECONDARY_NAV_SECTIONS } from '@/config/navigation';

export interface SidebarProps {
  collapsed?: boolean;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, className }) => {
  return (
    <aside
      aria-label="Primary sidebar"
      className={cn(
        'fixed inset-y-0 left-0 z-30 hidden flex-col border-r border-slate-800 bg-slate-950/90 backdrop-blur-md transition-[width] duration-200 md:flex',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <div
        className={cn(
          'flex h-16 shrink-0 items-center border-b border-slate-800/60',
          collapsed ? 'justify-center px-2' : 'px-4'
        )}
      >
        <Logo href="/app" collapsed={collapsed} />
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto py-4">
        {PRIMARY_NAV_SECTIONS.map((section) => (
          <SidebarSection key={section.label} label={section.label} collapsed={collapsed}>
            {section.items.map((item) => (
              <SidebarItem key={item.route} item={item} collapsed={collapsed} />
            ))}
          </SidebarSection>
        ))}
      </div>

      <div className="shrink-0 space-y-6 border-t border-slate-800/60 py-3">
        {SECONDARY_NAV_SECTIONS.map((section) => (
          <SidebarSection key={section.label} label={section.label} collapsed={collapsed}>
            {section.items.map((item) => (
              <SidebarItem key={item.route} item={item} collapsed={collapsed} />
            ))}
          </SidebarSection>
        ))}
      </div>
    </aside>
  );
};
