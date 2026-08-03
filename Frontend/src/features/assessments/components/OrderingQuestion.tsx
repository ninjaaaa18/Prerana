import React from 'react';
import { ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { OrderingItem } from '../types';

export interface OrderingQuestionProps {
  items: OrderingItem[];
  value: string[];
  onChange: (ids: string[]) => void;
  className?: string;
}

export const OrderingQuestion: React.FC<OrderingQuestionProps> = ({
  items,
  value,
  onChange,
  className,
}) => {
  const order = value.length === items.length ? value : items.map((item) => item.id);

  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= order.length) return;
    const next = [...order];
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    onChange(next);
  };

  return (
    <ol className={cn('space-y-2.5', className)} aria-label="Order the items">
      {order.map((id, index) => {
        const item = items.find((candidate) => candidate.id === id);
        if (!item) return null;
        return (
          <li
            key={id}
            className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 font-display text-sm font-bold text-indigo-300">
              {index + 1}
            </span>
            <GripVertical className="h-4 w-4 shrink-0 text-slate-600" aria-hidden="true" />
            <span className="flex-1 text-sm text-slate-200">{item.label}</span>
            <div className="flex shrink-0 flex-col gap-1">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label={`Move “${item.label}” up`}
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 transition-colors hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-30 disabled:hover:bg-slate-800"
              >
                <ChevronUp className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === order.length - 1}
                aria-label={`Move “${item.label}” down`}
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 transition-colors hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-30 disabled:hover:bg-slate-800"
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
          </li>
        );
      })}
    </ol>
  );
};
