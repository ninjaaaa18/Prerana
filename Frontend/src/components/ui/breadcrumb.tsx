import * as React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  return (
    <nav className={cn('flex items-center text-sm text-slate-400', className)} aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 flex-wrap">
        <li className="flex items-center gap-1.5">
          <span className="p-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
            <Home className="w-3.5 h-3.5" />
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              {item.isCurrent || isLast ? (
                <span className="font-semibold text-slate-200">{item.label}</span>
              ) : (
                <a
                  href={item.href || '#'}
                  className="hover:text-slate-200 transition-colors"
                >
                  {item.label}
                </a>
              )}
              {!isLast && <ChevronRight className="w-3.5 h-3.5 text-slate-600" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
