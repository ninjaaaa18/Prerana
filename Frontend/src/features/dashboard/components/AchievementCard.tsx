import React from 'react';
import { Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Achievement } from '../types';

export const AchievementCard: React.FC<Achievement> = ({ title, description, icon: Icon, unlocked }) => {
  return (
    <Card className={cn('relative space-y-3 p-5 text-center', !unlocked && 'opacity-60')}>
      <div
        className={cn(
          'mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border',
          unlocked
            ? 'border-amber-500/30 bg-amber-500/10 text-amber-400'
            : 'border-slate-700 bg-slate-800/60 text-slate-500'
        )}
      >
        {unlocked ? <Icon className="h-6 w-6" /> : <Lock className="h-5 w-5" />}
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-bold text-slate-100">{title}</h3>
        <p className="text-xs leading-relaxed text-slate-500">{description}</p>
      </div>

      <Badge variant={unlocked ? 'success' : 'secondary'} size="sm">
        {unlocked ? 'Unlocked' : 'Locked'}
      </Badge>
    </Card>
  );
};
