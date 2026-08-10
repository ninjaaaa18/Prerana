import { cn } from '@/lib/utils';

export interface FilterTab<T extends string> {
  id: T;
  label: string;
  count?: number;
}

export interface FilterTabsProps<T extends string> {
  tabs: FilterTab<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export const FilterTabs = <T extends string>({
  tabs,
  value,
  onChange,
  className,
}: FilterTabsProps<T>) => {
  return (
    <div
      role="tablist"
      aria-label="Filter"
      className={cn('flex items-center gap-1.5 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 p-1.5', className)}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === value;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
              isActive
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
                : 'border border-transparent text-slate-400 hover:bg-slate-800/70 hover:text-slate-200'
            )}
          >
            {tab.label}
            {typeof tab.count === 'number' && (
              <span
                className={cn(
                  'rounded-full px-1.5 text-[10px] font-bold',
                  isActive ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800 text-slate-400'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
