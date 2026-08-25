import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import type { Child } from '../types';

export interface ChildSwitcherProps {
  children: Child[];
  value: string;
  onChange: (childId: string) => void;
  showAll?: boolean;
  className?: string;
}

export const ChildSwitcher: React.FC<ChildSwitcherProps> = ({
  children,
  value,
  onChange,
  showAll = true,
  className,
}) => {
  const options = showAll
    ? [{ id: 'all', name: 'All children', color: '#8b5cf6', grade: '' }, ...children]
    : children;
  const selectedIndex = Math.max(0, options.findIndex((option) => option.id === value));
  const listRef = React.useRef<HTMLDivElement>(null);

  const select = (id: string) => {
    onChange(id);
    listRef.current?.querySelector<HTMLButtonElement>(`[data-child-id="${id}"]`)?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let nextIndex = -1;
    switch (e.key) {
      case 'ArrowRight':
        nextIndex = (selectedIndex + 1) % options.length;
        break;
      case 'ArrowLeft':
        nextIndex = (selectedIndex - 1 + options.length) % options.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = options.length - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    select(options[nextIndex].id);
  };

  return (
    <div
      ref={listRef}
      role="radiogroup"
      aria-label="Choose a child"
      onKeyDown={handleKeyDown}
      className={cn('flex w-full gap-3 overflow-x-auto pb-1.5', className)}
    >
      {options.map((option) => {
        const isSelected = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            data-child-id={option.id}
            aria-checked={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onChange(option.id)}
            className={cn(
              'group inline-flex shrink-0 items-center gap-3 rounded-2xl border px-3 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500',
              isSelected
                ? 'border-violet-500/50 bg-violet-500/10 text-violet-50 shadow-[0_0_0_1px_rgba(139,92,246,0.2)]'
                : 'border-slate-800/80 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:bg-slate-900/80 hover:text-slate-200'
            )}
          >
            {option.grade ? (
              <span
                className="relative inline-flex shrink-0 items-center justify-center rounded-full border"
                style={{
                  borderColor: `${option.color}50`,
                  backgroundColor: `${option.color}22`,
                  boxShadow: isSelected ? `0 0 0 3px ${option.color}18` : 'none',
                }}
              >
                <Avatar name={option.name} size="sm" className="!border-0" />
              </span>
            ) : (
              <span
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-violet-300"
                style={{ borderColor: `${option.color}40`, backgroundColor: `${option.color}1a` }}
                aria-hidden="true"
              >
                <Icon name="Users" className="h-3.5 w-3.5" />
              </span>
            )}
            <span className="whitespace-nowrap">{option.name}</span>
          </button>
        );
      })}
    </div>
  );
};
