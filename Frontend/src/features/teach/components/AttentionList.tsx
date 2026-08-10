import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/empty-state';
import { ATTENTION_SEVERITY_BADGE_VARIANT } from '../utils';
import { cn } from '@/lib/utils';
import type { AttentionItem } from '../types';

const SEVERITY_LABELS: Record<AttentionItem['severity'], string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export interface AttentionListProps {
  items: AttentionItem[];
  className?: string;
}

export const AttentionList: React.FC<AttentionListProps> = ({ items, className }) => {
  if (items.length === 0) {
    return (
      <EmptyState
        title="All clear"
        description="Nothing needs your attention right now."
      />
    );
  }

  return (
    <ul className={cn('space-y-3', className)}>
      {items.map((item) => (
        <li key={item.id}>
          <Card className="flex items-start justify-between gap-3 py-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
                <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <div className="space-y-0.5">
                <h3 className="text-sm font-semibold text-slate-100">{item.title}</h3>
                <p className="text-xs text-slate-400">{item.description}</p>
              </div>
            </div>
            <Badge variant={ATTENTION_SEVERITY_BADGE_VARIANT[item.severity]} size="sm">
              {SEVERITY_LABELS[item.severity]}
            </Badge>
          </Card>
        </li>
      ))}
    </ul>
  );
};
