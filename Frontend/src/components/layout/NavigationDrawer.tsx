import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { SidebarItem } from './SidebarItem';
import { SidebarGroup } from './SidebarGroup';
import { SidebarFooter } from './SidebarFooter';
import { MANAGE_NAV_SECTIONS, PRIMARY_NAV_SECTIONS, filterSectionsForRole, type Role } from '@/config/navigation';
import { useScrollLock } from '@/hooks/use-scroll-lock';

export interface NavigationDrawerProps {
  open: boolean;
  onClose: () => void;
  role?: Role;
  className?: string;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  open,
  onClose,
  role,
  className,
}) => {
  const drawerRef = React.useRef<HTMLDivElement>(null);

  useScrollLock(open);

  const sections = React.useMemo(
    () => filterSectionsForRole([...PRIMARY_NAV_SECTIONS, ...MANAGE_NAV_SECTIONS], role),
    [role]
  );

  React.useEffect(() => {
    if (!open) return;

    const drawer = drawerRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusables = drawer?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    focusables?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !drawer) return;

      const items = Array.from(
        drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className={cn('fixed inset-0 z-[1300] lg:hidden', className)}>
          <motion.button
            type="button"
            tabIndex={-1}
            aria-label="Close navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
          />

          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 32 }}
            className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col border-r border-slate-800 bg-slate-950 shadow-2xl"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800/60 px-4">
              <Logo href="/app" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800/70 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
              {sections.map((section) => (
                <SidebarGroup key={section.label} label={section.label}>
                  {section.items.map((item) => (
                    <SidebarItem key={item.route} item={item} onClick={onClose} />
                  ))}
                </SidebarGroup>
              ))}
            </div>

            <SidebarFooter />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
