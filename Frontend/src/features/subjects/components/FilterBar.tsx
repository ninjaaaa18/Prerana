import React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterSelect {
  key: string;
  label: string;
  options: FilterOption[];
  value: string;
}

export interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  selects: FilterSelect[];
  onSelectChange: (key: string, value: string) => void;
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  selects,
  onSelectChange,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 lg:flex-row lg:items-center',
        className
      )}
    >
      <Input
        variantType="search"
        value={searchValue}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder={searchPlaceholder}
        aria-label="Search"
        className="lg:max-w-xs"
      />

      <div className="flex flex-wrap items-center gap-3">
        {selects.map((select) => (
          <select
            key={select.key}
            value={select.value}
            aria-label={select.label}
            onChange={(event) => onSelectChange(select.key, event.target.value)}
            className="h-10 rounded-lg border border-slate-700 bg-slate-900 px-3 text-sm text-slate-200 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            {select.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ))}
      </div>
    </div>
  );
};
