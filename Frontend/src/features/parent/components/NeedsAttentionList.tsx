import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';
import { ATTENTION_SEVERITY_BADGE_VARIANT, ATTENTION_SEVERITY_LABELS } from '../utils';
import { cn } from '@/lib/utils';
import type { AttentionItem } from '../types';

export interface NeedsAttentionListProps {
  items: AttentionItem[];
  className?: string;
}

export const NeedsAttentionList: React.FC<NeedsAttentionListProps> = ({ items, className }) => {
  if (items.length === 0) {
    return <EmptyState title="All clear" description="Nothing needs your attention right now." />;
  }

  return (
    <ul className={cn('space-y-3', className)}>
      {items.map((item) => (
        <li key={item.id}>
          <Card className="flex flex-col gap-4 border border-amber-500/10 bg-slate-950/50 p-4 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-300">
                <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold text-slate-100">{item.childName}</h3>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{item.title}</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-400">{item.description}</p>
              </div>
            </div>
            <Badge
              variant={ATTENTION_SEVERITY_BADGE_VARIANT[item.severity]}
              size="sm"
              className="shrink-0 self-start"
            >
              {ATTENTION_SEVERITY_LABELS[item.severity]}
            </Badge>
          </Card>
        </li>
      ))}
    </ul>
  );
};
