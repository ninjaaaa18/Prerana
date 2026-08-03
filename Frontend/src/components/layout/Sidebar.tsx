import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { SidebarItem } from './SidebarItem';
import { SidebarGroup } from './SidebarGroup';
import { SidebarFooter } from './SidebarFooter';
import {
  MANAGE_NAV_SECTIONS,
  PRIMARY_NAV_SECTIONS,
  filterSectionsForRole,
  type Role,
} from '@/config/navigation';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';
import { SIDEBAR_WIDTH } from '@/constants/breakpoints';

export interface SidebarProps {
  collapsed?: boolean;
  role?: Role;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, role, className }) => {
  const reducedMotion = usePrefersReducedMotion();

  const primarySections = role
    ? filterSectionsForRole([...PRIMARY_NAV_SECTIONS, ...MANAGE_NAV_SECTIONS], role)
    : PRIMARY_NAV_SECTIONS;

  return (
    <motion.aside
      aria-label="Primary sidebar"
      initial={false}
      animate={{ width: collapsed ? SIDEBAR_WIDTH.collapsed : SIDEBAR_WIDTH.expanded }}
      transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 32 }}
      className={cn(
        'fixed inset-y-0 left-0 z-30 hidden flex-col overflow-hidden border-r border-slate-800 bg-slate-950/90 backdrop-blur-md md:flex',
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
        {primarySections.map((section) => (
          <SidebarGroup key={section.label} label={section.label} collapsed={collapsed}>
            {section.items.map((item) => (
              <SidebarItem key={item.route} item={item} collapsed={collapsed} />
            ))}
          </SidebarGroup>
        ))}
      </div>

      <SidebarFooter collapsed={collapsed} />
    </motion.aside>
  );
};
