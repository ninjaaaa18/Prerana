import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultTabId, className }) => {
  const [activeTabId, setActiveTabId] = React.useState(defaultTabId || tabs[0]?.id || '');
  const tabListRef = React.useRef<HTMLDivElement>(null);
  const baseId = React.useId();

  const activeTab = tabs.find((t) => t.id === activeTabId);

  const activateTab = (tabId: string) => {
    setActiveTabId(tabId);
    const tabButton = tabListRef.current?.querySelector<HTMLButtonElement>(
      `[data-tab-id="${tabId}"]`
    );
    tabButton?.focus();
  };

  const handleTabListKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTabId);
    let nextIndex = -1;

    switch (e.key) {
      case 'ArrowRight':
        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    if (nextIndex >= 0) {
      activateTab(tabs[nextIndex].id);
    }
  };

  return (
    <div className={cn('w-full space-y-4', className)}>
      <div
        ref={tabListRef}
        role="tablist"
        aria-label="Tabs"
        onKeyDown={handleTabListKeyDown}
        className="flex items-center gap-1 border-b border-slate-800 pb-1 overflow-x-auto"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              data-tab-id={tab.id}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTabId(tab.id)}
              className={cn(
                'relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40',
                isActive ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <motion.div
        key={activeTabId}
        role="tabpanel"
        id={`${baseId}-panel-${activeTabId}`}
        aria-labelledby={`${baseId}-tab-${activeTabId}`}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="pt-2"
      >
        {activeTab?.content}
      </motion.div>
    </div>
  );
};
